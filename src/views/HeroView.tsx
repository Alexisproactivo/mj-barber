/**
 * MJ BARBER - Hero View
 * Editorial hero section presenting the brand identity, value pillars,
 * direct call-to-actions, and integrated Three.js interactive canvas.
 */

import React from "react";
import { Hero3DScene } from "./Hero3DScene";
import { MapPin, Clock, ShieldCheck, ChevronRight, MessageSquareQuote } from "lucide-react";
import { BUSINESS_CONFIG } from "../models/business.model";

interface HeroViewProps {
  onSelectServiceAndBook: (serviceName?: string) => void;
  onOpenTerms: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  onSelectServiceAndBook,
  onOpenTerms,
}) => {
  return (
    <section id="inicio" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-background-decor" aria-hidden="true">
        <div className="hero-radial-glow" />
        <div className="hero-grid-lines" />
      </div>

      <div className="container hero-container">
        {/* Editorial Text Content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            <span className="eyebrow-text">BARBERÍA CLÁSICA ARTESANAL</span>
            <span className="eyebrow-dot" aria-hidden="true" />
            <span className="eyebrow-location">AREQUIPA</span>
          </div>

          <h1 id="hero-title" className="hero-headline">
            <span className="hero-brand-name">MJ BARBER</span>
            <span className="hero-headline-sub">
              Maestría en corte, navaja y toallas calientes.
            </span>
          </h1>

          <p className="hero-lead">
            Ubicados en el corazón tradicional de Arequipa, fusionamos la
            liturgia de la barbería clásica de antaño con técnicas de vanguardia
            en colorimetría, texturizado y cuidado integral masculino.
          </p>

          {/* Value Badges */}
          <div className="hero-badges-strip">
            <div className="hero-badge-item">
              <MapPin size={16} className="badge-icon text-brass" />
              <span>Calle Nueva 104, Centro</span>
            </div>
            <div className="hero-badge-item">
              <Clock size={16} className="badge-icon text-brass" />
              <span>Mon-Sáb 09:00 - 20:00</span>
            </div>
            <button
              type="button"
              className="hero-badge-item hero-badge-button"
              onClick={onOpenTerms}
              title="Conoce la regla de puntualidad de 10 minutos"
            >
              <ShieldCheck size={16} className="badge-icon text-brass" />
              <span>Tolerancia: 10 minutos</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="hero-actions">
            <a
              href="#reservas"
              className="btn btn-brass btn-lg"
              onClick={() => onSelectServiceAndBook()}
            >
              <MessageSquareQuote size={18} className="btn-icon" />
              <span>Agendar Turno Oficial</span>
            </a>
            <a href="#catalogo" className="btn btn-secondary btn-lg">
              <span>Explorar Catálogo</span>
              <ChevronRight size={16} className="btn-icon-right" />
            </a>
          </div>

          {/* Quote / Heritage Micro-note */}
          <div className="hero-craft-quote">
            <div className="quote-accent-bar" aria-hidden="true" />
            <p className="quote-text">
              &ldquo;Cada servicio es un ritual de precisión milimétrica donde el
              tiempo se detiene en honor al buen estilo.&rdquo;
            </p>
          </div>
        </div>

        {/* 3D Interactive Canvas Column */}
        <div className="hero-canvas-column">
          <div className="hero-canvas-wrapper">
            <div className="canvas-frame-border" aria-hidden="true" />
            <Hero3DScene />

            {/* Coordinates Brass Stamp */}
            <div className="canvas-stamp" aria-hidden="true">
              <span className="stamp-city">AREQUIPA</span>
              <span className="stamp-coords">16°24'06.5&quot;S 71°32'12.8&quot;W</span>
              <span className="stamp-address">{BUSINESS_CONFIG.address.street}</span>
            </div>
          </div>
          <div className="canvas-caption-note">
            <span className="indicator-pulse" aria-hidden="true" />
            <span>Mueve el cursor para interactuar con el Barber Pole y Navaja artesanal</span>
          </div>
        </div>
      </div>
    </section>
  );
};
