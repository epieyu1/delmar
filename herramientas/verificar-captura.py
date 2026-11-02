#!/usr/bin/env python3
"""Verifica una captura PNG contra la paleta, en sRGB.

Uso: python3 herramientas/verificar-captura.py verificacion-.../01-inicio.png

Por qué existe: Chrome guarda las capturas en Display P3. Leídas en crudo, cada
color aparece corrido (el teal #7FBBB2 se lee como 140,185,178) y parece que la
paleta está mal cuando en realidad el CSS es correcto. Este script convierte el
perfil a sRGB antes de comparar y lista los colores sólidos que no pertenecen a
la paleta, con el porcentaje de píxeles que ocupan.
"""
import sys
from collections import Counter

from PIL import Image, ImageCms
import io

PALETTE = {
    (226, 242, 239): 'MIST    #E2F2EF',
    (195, 223, 227): 'GLASS   #C3DFE3',
    (165, 207, 205): 'AQUA    #A5CFCD',
    (127, 187, 178): 'SEA     #7FBBB2',
    (228, 222, 208): 'SAND    #E4DED0',
    (235, 234, 229): 'SHELL   #EBEAE5',
    (35, 63, 82):    'INK     #233F52',
}
# Velos: la tinta se mezcla con cada superficie (--scrim 62 %, --scrim-soft 86 %).
# No son colores nuevos: son la tinta aplicada con alfa sobre la paleta.
INK = (35, 63, 82)
BLENDS = []
for base in PALETTE:
    for a in (0.62, 0.86):
        BLENDS.append(tuple(round(a * INK[i] + (1 - a) * base[i]) for i in range(3)))

TOL = 2          # tolerancia por canal (redondeo de perfil)
MIN_SHARE = 0.002  # 0,2% de la imagen: por debajo es antialias o foto


def near(color):
    for ref in BLENDS:
        if all(abs(color[i] - ref[i]) <= TOL for i in range(3)):
            return 'VELO (tinta sobre paleta)', ref
    for ref, label in PALETTE.items():
        if all(abs(color[i] - ref[i]) <= TOL for i in range(3)):
            return label, ref
    return None, None


def main(path):
    im = Image.open(path)
    icc = im.info.get('icc_profile')
    rgb = im.convert('RGB')
    desc = 'sin perfil'
    if icc:
        src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        desc = ImageCms.getProfileDescription(src).strip()
        is_plain_srgb = desc.lower().startswith('srgb')
        if not is_plain_srgb:
            rgb = ImageCms.profileToProfile(rgb, src, ImageCms.createProfile('sRGB'), outputMode='RGB')
            desc = f'{desc} → convertido a sRGB'

    total = rgb.size[0] * rgb.size[1]
    counts = Counter(rgb.getdata())
    palette_px = 0
    suspects = []
    for color, n in counts.items():
        label, _ = near(color)
        if label:
            palette_px += n
        elif n / total >= MIN_SHARE:
            suspects.append((color, n, n / total))

    print(f'archivo   : {path}')
    print(f'perfil    : {desc}')
    print(f'píxeles   : {total}')
    print(f'paleta    : {palette_px / total * 100:.1f} % de la imagen')
    print(f'sospechosos: {len(suspects)} colores sólidos ≥ {MIN_SHARE * 100}%')
    for color, n, share in sorted(suspects, key=lambda x: -x[1])[:12]:
        print(f'  {str(color):18} {share * 100:5.2f}%  {n} px  ← revisar si no es foto')
    if not suspects:
        print('  ninguno: todo lo demás son fotos y antialias')
    return 0 if not suspects else 1


if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
