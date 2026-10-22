/**
 * MJ BARBER - Modal Controller
 * Accessible state management for legal documents and dialog overlays.
 */

import { useState, useCallback, useEffect } from "react";
import type { LegalDocument } from "../models/legal.model";
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "../models/legal.model";

export type ModalType = "privacidad" | "terminos" | null;

export function useModalController() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openPrivacyPolicy = useCallback(() => {
    setActiveModal("privacidad");
  }, []);

  const openTerms = useCallback(() => {
    setActiveModal("terminos");
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeModal !== null) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, closeModal]);

  const currentDocument: LegalDocument | null =
    activeModal === "privacidad"
      ? PRIVACY_POLICY
      : activeModal === "terminos"
      ? TERMS_AND_CONDITIONS
      : null;

  return {
    isOpen: activeModal !== null,
    activeModal,
    currentDocument,
    openPrivacyPolicy,
    openTerms,
    closeModal,
  };
}
