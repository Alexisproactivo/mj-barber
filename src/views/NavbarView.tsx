/**
 * MJ BARBER - Navbar View
 * Bespoke top navigation bar with architectural proportions and direct actions.
 */

import React, { useState, useEffect } from "react";
import { Scissors, Phone, Menu, X, ShieldCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "../models/business.model";

interface NavbarProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const NavbarView: React.FC<NavbarProps> = ({ onOpenTerms }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner container">
        {/* Brand Identity */}
        <a
          href="#inicio"
          className="brand-lockup"
          aria-label="MJ BARBER Inicio"
        >
          <div className="brand-mark-symbol" aria-hidden="true">
            <img
              src="/logo.png"
              alt="Logo MJ Barber"
              style={{
                width: "60px",
                height: "80px",
                objectFit: "contain",
                borderRadius: "4px",
              }}
            />
          </div>
          <div className="brand-text">
            <span className="brand-title">{BUSINESS_CONFIG.name}</span>
            <span className="brand-subtitle">AREQUIPA • CALLE NUEVA 104</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Navegación Principal">
          <ul className="nav-list">
            <li>
              <a href="#catalogo" className="nav-link">
                Catálogo Oficial
              </a>
            </li>
            <li>
              <a href="#experiencia" className="nav-link">
                El Ritual
              </a>
            </li>
            <li>
              <a href="#ubicacion" className="nav-link">
                Ubicación
              </a>
            </li>
            <li>
              <button
                type="button"
                className="nav-link-btn"
                onClick={onOpenTerms}
                aria-label="Ver política de puntualidad de 10 minutos"
              >
                <ShieldCheck size={15} className="mr-1 inline-icon" />
                Tolerancia 10 min
              </button>
            </li>
          </ul>
        </nav>

        {/* Action Button */}
        <div className="header-actions">
          <a
            href="#reservas"
            className="btn btn-brass-outline btn-sm desktop-only"
          >
            Agendar Turno
          </a>
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.phoneWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-brass btn-sm quick-wa-btn"
            aria-label="Contactar por WhatsApp directo"
          >
            <Phone size={14} className="btn-icon" />
            <span className="wa-text-phone">WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <div className="container mobile-nav-content">
            <ul className="mobile-nav-list">
              <li>
                <a
                  href="#catalogo"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Catálogo Oficial de Servicios
                </a>
              </li>
              <li>
                <a
                  href="#experiencia"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  El Ritual & Filosofía
                </a>
              </li>
              <li>
                <a
                  href="#reservas"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Agendar Cita en Línea
                </a>
              </li>
              <li>
                <a
                  href="#ubicacion"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Calle Nueva 104, Arequipa
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="mobile-nav-link-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerms();
                  }}
                >
                  Regla de Tolerancia de 10 min
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};
