---
name: scope-isolation-guard
description: >
  Directivas de aislamiento de alcance para agentes de IA. Garantiza que el
  agente NUNCA modifique archivos fuera del alcance definido en el prompt.
  Obligatorio activar al inicio de cualquier sesión de trabajo en este proyecto.
triggers:
  - on_task_start
  - on_file_edit
---

# 🔒 Scope Isolation Guard — Del Mar Artesanías

## Propósito
Garantizar que cada intervención del agente sea **quirúrgica, acumulativa y nunca destructiva**. Este skill define el protocolo de control de alcance que debe seguirse en cada tarea.

---

## Regla 1 — Aislamiento Estricto de Cambios

> **NUNCA** modificar, refactorizar ni borrar archivos, componentes, estilos o configuraciones que no hayan sido **explícitamente solicitados** en el prompt de la tarea actual.

### Aplicación práctica:
- Si la tarea dice "actualiza el texto del footer", **solo** se edita `Footer.jsx`.
- Si durante esa tarea se detecta código mejorable en `Navbar.jsx`, **no se toca**. Se registra como sugerencia.
- Prohibido modificar archivos contiguos "de paso" aunque parezcan relacionados.

---

## Regla 2 — Confirmación de Alcance Antes de Ejecutar

Antes de aplicar cualquier cambio que afecte a **más de un componente o archivo**, el agente debe:

1. Listar los archivos que serán modificados.
2. Describir brevemente el cambio en cada uno.
3. Esperar confirmación explícita del usuario antes de proceder.

### Formato de confirmación requerido:
```
📋 RESUMEN DE ALCANCE
─────────────────────────────
Archivos a intervenir:
  1. src/components/sections/Catalog.jsx → [descripción del cambio]
  2. src/data/products.js → [descripción del cambio]

¿Confirmas estos cambios? (sí / no)
```

---

## Regla 3 — Cero Refactorización Impulsiva

Si durante la ejecución de una tarea el agente detecta:
- Código duplicado en otro archivo
- Imports no utilizados en archivos contiguos
- Estilos inline que podrían mejorarse

**Acción requerida:** Notificar como sugerencia al final de la respuesta, bajo el encabezado `💡 Sugerencia detectada (requiere autorización)`. **No aplicar el cambio.**

---

## Regla 4 — Respetar Lógica e Integraciones Existentes

### Estructuras protegidas en este proyecto:
| Archivo/Directorio | Razón de protección |
|---|---|
| `src/data/products.js` | Fuente de verdad del catálogo. Solo editar con datos reales del usuario. |
| `src/data/story.js` | Textos aprobados por la fundadora. No modificar sin instrucción. |
| `src/data/pillars.js` | Los 4 pilares institucionales. Inmutables sin autorización. |
| `src/constants/whatsapp.js` | Número de WhatsApp oficial. No cambiar. |
| `public/` | Imágenes reales de la fundadora y productos. No borrar. |
| `tailwind.config.js` | Tokens de diseño del sistema. Solo editar con autorización explícita. |
| `src/index.css` | Estilos globales base. Solo editar con autorización explícita. |

---

## Regla 5 — Protocolo de Rollback

Si un cambio provoca un error en la aplicación (pantalla en blanco, error de compilación, etc.):

1. **Identificar** el archivo exacto que causó el error.
2. **Restaurar únicamente** ese archivo al estado anterior.
3. **Reportar** el error al usuario con la causa exacta antes de intentar cualquier otra modificación.
4. **No intentar** arreglar el error introduciendo cambios adicionales sin autorización.

---

## Checklist pre-edición (ejecutar mentalmente antes de cada cambio)

- [ ] ¿El archivo que voy a editar fue explícitamente mencionado en el prompt?
- [ ] ¿El cambio afecta a más de un archivo? → Solicitar confirmación de alcance.
- [ ] ¿El cambio elimina código existente? → Verificar que no rompe imports o dependencias.
- [ ] ¿El cambio modifica datos de negocio (precios, textos, contacto)? → Verificar que el usuario proporcionó los datos.
- [ ] ¿El cambio es reversible sin afectar otros componentes?

---

## Archivos que NUNCA se tocan sin autorización explícita

```
.env
.env.local
package.json
vite.config.js
tailwind.config.js
public/favicon.svg
public/icons.svg
```
