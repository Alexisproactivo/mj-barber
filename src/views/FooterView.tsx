/**
 * MJ BARBER - Footer View
 * Institutional footer containing location details, official schedule,
 * direct Google Maps navigation, legal compliance triggers, and catalog shortcuts.
 */

import React from "react";
import { BUSINESS_CONFIG } from "../models/business.model";
import { OFFICIAL_SERVICES } from "../models/service.model";
import {
  Scissors,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Scale,
  Navigation,
} from "lucide-react";

const CURRENT_YEAR = 2026;

interface FooterViewProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSelectService: (serviceName: string) => void;
}

export const FooterView: React.FC<FooterViewProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onSelectService,
}) => {
  const currentYear = CURRENT_YEAR;

  const handleServiceClick = (name: string) => {
    onSelectService(name);
    const bookingEl = document.getElementById("reservas");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="ubicacion" className="site-footer">
      {/* Top Banner with Google Maps CTA */}
      <div className="footer-location-banner">
        <div className="container">
          <div className="location-banner-grid">
            <div className="banner-text-block">
              <span className="banner-badge">SEDE AREQUIPA</span>
              <h3 className="banner-title">Calle Nueva 104, Arequipa 04001</h3>
              <p className="banner-description">
                A pasos de las principales avenidas del centro histórico.
                Disfruta de una experiencia exclusiva de barbería con atención
                reservada y puntual.
              </p>
            </div>
            <div className="banner-action-block">
              <a
                href={BUSINESS_CONFIG.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brass"
              >
                <Navigation size={16} className="btn-icon" />
                <span>Cómo Llegar en Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="container footer-main-content">
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Craft */}
          <div className="footer-col col-brand">
            <div className="brand-lockup footer-brand">
              <div className="brand-mark-symbol" aria-hidden="true">
                <Scissors className="icon-scissors" size={22} strokeWidth={1.75} />
              </div>
              <div className="brand-text">
                <span className="brand-title">{BUSINESS_CONFIG.name}</span>
                <span className="brand-subtitle">BARBERÍA CLÁSICA</span>
              </div>
            </div>
            <p className="footer-bio">
              Dedicados al rescate de las técnicas clásicas de barbería en el
              corazón de Arequipa. Instrumental de precisión, toallas calientes
              al eucalipto y cortes con identidad.
            </p>
            <div className="footer-social-meta">
              <span className="meta-phone-direct">
                <Phone size={14} className="inline-icon text-brass" />
                <a href={`https://wa.me/${BUSINESS_CONFIG.phoneWhatsapp}`}>
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </span>
            </div>
          </div>

          {/* Column 2: Official Services (7) */}
          <div className="footer-col">
            <h4 className="footer-col-title">Catálogo Oficial</h4>
            <ul className="footer-links-list">
              {OFFICIAL_SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => handleServiceClick(service.name)}
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Schedule & Punctuality */}
          <div className="footer-col">
            <h4 className="footer-col-title">Horarios de Atención</h4>
            <ul className="footer-hours-list">
              <li>
                <Clock size={15} className="inline-icon text-brass" />
                <div>
                  <strong>{BUSINESS_CONFIG.hours.weekdays}</strong>
                  <span>Lunes a Sábado</span>
                </div>
              </li>
              <li>
                <Clock size={15} className="inline-icon text-brass" />
                <div>
                  <strong>{BUSINESS_CONFIG.hours.weekends}</strong>
                  <span>Domingos</span>
                </div>
              </li>
            </ul>

            <div className="footer-tolerance-callout">
              <ShieldCheck size={16} className="text-brass inline-icon" />
              <span>
                <strong>Regla de Tolerancia:</strong> 10 minutos de cortesía en Calle Nueva 104.
              </span>
            </div>
          </div>

          {/* Column 4: Institutional & Legal Trust */}
          <div className="footer-col">
            <h4 className="footer-col-title">Políticas Institucionales</h4>
            <p className="footer-legal-desc">
              Garantizamos el tratamiento ético de datos y la máxima transparencia en cada turno.
            </p>
            <ul className="footer-legal-links">
              <li>
                <button
                  type="button"
                  className="footer-legal-btn"
                  onClick={onOpenPrivacy}
                >
                  <ShieldCheck size={14} className="inline-icon text-brass" />
                  <span>Política de Privacidad (Ley N° 29733 Perú)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-legal-btn"
                  onClick={onOpenTerms}
                >
                  <Scale size={14} className="inline-icon text-brass" />
                  <span>Términos de Servicio y Tolerancia (10 min)</span>
                </button>
              </li>
              <li>
                <span className="footer-address-text">
                  <MapPin size={14} className="inline-icon text-brass" />
                  Calle Nueva 104, Arequipa 04001, Perú
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {currentYear} {BUSINESS_CONFIG.name}. Todos los derechos reservados.
          </div>
          <div className="footer-sub-links">
            <span>Arequipa, Perú</span>
            <span className="sep">•</span>
            <button type="button" onClick={onOpenPrivacy} className="sub-link-btn">
              Ley 29733
            </button>
            <span className="sep">•</span>
            <button type="button" onClick={onOpenTerms} className="sub-link-btn">
              Tolerancia 10 min
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
