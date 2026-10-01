import { useEffect } from 'react';
import Icon from '../common/Icon';

export const PhotoManagerModal = ({ isOpen, onClose, onUploadLocalImages }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (event, targetKey) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onUploadLocalImages(targetKey, objectUrl);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-blue/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-sand-light bg-sand p-5 shadow-floating sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="button-interaction absolute right-4 top-4 rounded-full bg-sand-light p-2 text-deep-blue transition-colors hover:bg-deep-blue hover:text-sand focus:outline-none focus:ring-2 focus:ring-gold/50"
          aria-label="Cerrar gestor de fotos"
        >
          <Icon name="x" className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center">
            <Icon name="image" className="w-5 h-5" />
          </div>
          <div>
            <h3 id="photo-modal-title" className="font-serif font-bold text-base sm:text-lg text-deep-blue">
              Gestor de Fotos de WhatsApp
            </h3>
            <p className="text-[11px] sm:text-sm text-deep-blue/70">
              Prueba tus fotos tomadas desde tu teléfono directamente en la web
            </p>
          </div>
        </div>

        <div className="space-y-4 my-6 text-[11px] sm:text-sm text-deep-blue/80">
          <p className="leading-relaxed">
            Puedes seleccionar fotos desde tu computadora o teléfono para ver cómo lucirán en tu tienda antes de publicarlas:
          </p>

          <div className="space-y-3 p-4 bg-sand-light rounded-2xl border border-sand-light">
            <div>
              <label
                htmlFor="upload-mochila"
                className="block font-semibold text-deep-blue mb-1"
              >
                Foto 1 (Mochilas / Portada):
              </label>
              <input
                id="upload-mochila"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'mochila')}
                className="w-full text-[11px] sm:text-xs text-deep-blue file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[11px] sm:file:text-xs file:font-semibold file:bg-gold file:text-deep-blue hover:file:bg-gold/80 cursor-pointer"
              />
              <span className="text-[10px] sm:text-[11px] text-deep-blue/60 mt-0.5 block">
                Nombre esperado en producción: <code>WhatsApp Image 2026-09-30 at 10.16.35 PM_2.jpeg</code>
              </span>
            </div>

            <div className="pt-2 border-t border-sand-light/80">
              <label
                htmlFor="upload-vestido"
                className="block font-semibold text-deep-blue mb-1"
              >
                Foto 2 (Vestidos de Baño / Colección):
              </label>
              <input
                id="upload-vestido"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'vestido')}
                className="w-full text-[11px] sm:text-xs text-deep-blue file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[11px] sm:file:text-xs file:font-semibold file:bg-teal file:text-sand hover:file:bg-teal-dark cursor-pointer"
              />
              <span className="text-[10px] sm:text-[11px] text-deep-blue/60 mt-0.5 block">
                Nombre esperado en producción: <code>WhatsApp Image 2026-09-30 at 10.17.02 PM.jpeg</code>
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="button-interaction w-full rounded-xl bg-deep-blue py-3 text-xs font-semibold uppercase tracking-wider text-sand transition-colors hover:bg-teal focus:outline-none focus:ring-2 focus:ring-gold/50 sm:text-sm"
        >
          Listo y Guardar Vista Previa
        </button>
      </div>
    </div>
  );
};
export default PhotoManagerModal;
