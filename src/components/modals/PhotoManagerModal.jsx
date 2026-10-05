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
      className="photo-manager-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="photo-manager-modal">
        <button
          type="button"
          onClick={onClose}
          className="photo-manager-close"
          aria-label="Cerrar gestor de fotos"
        >
          <Icon name="x" className="icon-20" />
        </button>

        <div className="photo-manager-heading">
          <div className="photo-manager-heading__icon">
            <Icon name="image" className="icon-20" />
          </div>
          <div className="photo-manager-heading__copy">
            <h3 id="photo-modal-title" className="photo-manager-title">
              Gestor de Fotos de WhatsApp
            </h3>
            <p className="photo-manager-intro">
              Prueba tus fotos tomadas desde tu teléfono directamente en la web
            </p>
          </div>
        </div>

        <div className="photo-manager-copy">
          <p>
            Puedes seleccionar fotos desde tu computadora o teléfono para ver cómo lucirán en tu tienda antes de publicarlas:
          </p>

          <div className="photo-manager-upload-list">
            <div className="photo-manager-upload">
              <label
                htmlFor="upload-mochila"
                className="photo-manager-label"
              >
                Foto 1 (Mochilas / Portada):
              </label>
              <input
                id="upload-mochila"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'mochila')}
                className="photo-manager-file"
              />
              <span className="photo-manager-filename">
                Nombre esperado en producción: <code>WhatsApp Image 2026-09-30 at 10.16.35 PM_2.jpeg</code>
              </span>
            </div>

            <div className="photo-manager-upload photo-manager-upload--separated">
              <label
                htmlFor="upload-vestido"
                className="photo-manager-label"
              >
                Foto 2 (Vestidos de Baño / Colección):
              </label>
              <input
                id="upload-vestido"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'vestido')}
                className="photo-manager-file"
              />
              <span className="photo-manager-filename">
                Nombre esperado en producción: <code>WhatsApp Image 2026-09-30 at 10.17.02 PM.jpeg</code>
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="photo-manager-submit"
        >
          Listo y Guardar Vista Previa
        </button>
      </div>
    </div>
  );
};
export default PhotoManagerModal;
