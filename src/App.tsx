/**
 * MJ BARBER - Root Application Component
 * Orchestrates MVC separation:
 * - Models: business constants, 7 official services, validation & legal policies
 * - Controllers: useBookingController, useModalController
 * - Views: Semantic HTML5, Schema.org JSON-LD, Three.js Hero, Catalog, Booking, Modals & Footer
 */

import React from "react";
import { useBookingController } from "./controllers/useBookingController";
import { useModalController } from "./controllers/useModalController";
import { JsonLdView } from "./views/JsonLdView";
import { NavbarView } from "./views/NavbarView";
import { HeroView } from "./views/HeroView";
import { CatalogView } from "./views/CatalogView";
import { ExperienceView } from "./views/ExperienceView";
import { BookingView } from "./views/BookingView";
import { LegalModalView } from "./views/LegalModalView";
import { FooterView } from "./views/FooterView";

export const App: React.FC = () => {
  // Controller hooks
  const bookingController = useBookingController();
  const modalController = useModalController();

  const handleSelectServiceAndBook = (serviceName?: string) => {
    if (serviceName) {
      bookingController.handleServiceSelect(serviceName);
    }
    const bookingSection = document.getElementById("reservas");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-root">
      {/* Schema.org JSON-LD Structured Data */}
      <JsonLdView />

      {/* Accessible Header Navigation */}
      <NavbarView
        onOpenPrivacy={modalController.openPrivacyPolicy}
        onOpenTerms={modalController.openTerms}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero with Three.js 3D Scene */}
        <HeroView
          onSelectServiceAndBook={handleSelectServiceAndBook}
          onOpenTerms={modalController.openTerms}
        />

        {/* Official Catalog (7 Services) */}
        <CatalogView onSelectService={handleSelectServiceAndBook} />

        {/* Experience & Rituals */}
        <ExperienceView />

        {/* Booking Form with Peruvian Phone Validation & WhatsApp Preview */}
        <BookingView
          controller={bookingController}
          onOpenPrivacy={modalController.openPrivacyPolicy}
          onOpenTerms={modalController.openTerms}
        />
      </main>

      {/* Institutional Footer */}
      <FooterView
        onOpenPrivacy={modalController.openPrivacyPolicy}
        onOpenTerms={modalController.openTerms}
        onSelectService={handleSelectServiceAndBook}
      />

      {/* Accessible Legal Modals (Ley N° 29733 & 10-Min Punctuality Policy) */}
      <LegalModalView
        activeModal={modalController.activeModal}
        isOpen={modalController.isOpen}
        onClose={modalController.closeModal}
        onSelectTab={(tab) => {
          if (tab === "privacidad") modalController.openPrivacyPolicy();
          else modalController.openTerms();
        }}
      />
    </div>
  );
};

export default App;
