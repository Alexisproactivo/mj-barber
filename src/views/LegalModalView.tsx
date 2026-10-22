/**
 * MJ BARBER - Legal Modal View
 * Accessible modal displaying the Privacy Policy (Peruvian Law N° 29733)
 * and Terms of Service (10-minute punctuality tolerance policy).
 *
 * Implements Modern Web Guidance:
 * - Native <dialog> element with showModal() / close()
 * - overscroll-behavior: contain on dialog:modal
 * - overflow: hidden & overscroll-behavior: contain on dialog::backdrop
 * - Escape key dismissal & light dismiss on backdrop click
 */

import React, { useEffect, useRef } from "react";
import type { ModalType } from "../controllers/useModalController";
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "../models/legal.model";
import { X, ShieldCheck, Scale, AlertCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "../models/business.model";

interface LegalModalViewProps {
  activeModal: ModalType;
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (type: "privacidad" | "terminos") => void;
}

export const LegalModalView: React.FC<LegalModalViewProps> = ({
  activeModal,
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Sync open/close state with native showModal() / close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native cancel event (e.g. Esc pressed on native dialog)
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  // Light dismiss: clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      onClose();
    }
  };

  const currentDoc =
    activeModal === "privacidad" ? PRIVACY_POLICY : TERMS_AND_CONDITIONS;

  return (
    <dialog
      ref={dialogRef}
      className="legal-modal-dialog"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="modal-doc-title"
      aria-modal="true"
    >
      <div className="modal-inner-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <div className="modal-header">
          <div className="modal-header-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeModal === "privacidad"}
              className={`modal-tab ${activeModal === "privacidad" ? "is-active" : ""}`}
              onClick={() => onSelectTab("privacidad")}
            >
              <ShieldCheck size={16} className="inline-icon" />
              <span>Privacidad (Ley N° 29733)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeModal === "terminos"}
              className={`modal-tab ${activeModal === "terminos" ? "is-active" : ""}`}
              onClick={() => onSelectTab("terminos")}
            >
              <Scale size={16} className="inline-icon" />
              <span>Tolerancia (10 min) & Términos</span>
            </button>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Cerrar modal legal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scrollable">
          <div className="modal-doc-heading-group">
            <span className="modal-doc-badge">DOCUMENTO INSTITUCIONAL OFICIAL</span>
            <h3 id="modal-doc-title" className="modal-doc-title">
              {currentDoc.title}
            </h3>
            <p className="modal-doc-subtitle">{currentDoc.subtitle}</p>
            <div className="modal-doc-meta">
              <span>{currentDoc.legalBasis}</span>
              <span className="bullet-sep">•</span>
              <span>Última revisión: {currentDoc.lastUpdated}</span>
            </div>
          </div>

          {/* Special Banner for 10-Min Punctuality */}
          {activeModal === "terminos" && (
            <div className="tolerance-highlight-banner">
              <AlertCircle size={22} className="banner-icon text-brass" />
              <div>
                <strong>Tolerancia Estricta de 10 Minutos:</strong>
                <p>
                  Para preservar la dedicación artesanal de cada corte y respetar
                  a los clientes subsecuentes, se dispone un margen máximo de 10
                  minutos en Calle Nueva 104, Arequipa. Pasado este tiempo, el turno
                  se liberará para atención por orden de llegada.
                </p>
              </div>
            </div>
          )}

          {/* Sections List */}
          <div className="modal-sections-list">
            {currentDoc.sections.map((sec, index) => (
              <div key={index} className="modal-section-item">
                <h4 className="section-item-heading">{sec.heading}</h4>
                <p className="section-item-content">{sec.content}</p>
                {sec.highlight && (
                  <div className="section-item-highlight">
                    <p>{sec.highlight}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Institutional Contact Footnote */}
          <div className="modal-doc-footer-note">
            <p>
              Cualquier consulta sobre esta política puede ser canalizada vía WhatsApp al{" "}
              <strong>{BUSINESS_CONFIG.phoneDisplay}</strong> o presencialmente en{" "}
              <strong>{BUSINESS_CONFIG.address.fullAddress}</strong>.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-brass btn-sm"
            onClick={onClose}
          >
            Entendido y Conforme
          </button>
        </div>
      </div>
    </dialog>
  );
};
