/**
 * MJ BARBER - Experience View
 * Narrative on traditional barbershop heritage, craftsmanship rituals,
 * and the sanctuary of Calle Nueva 104, Arequipa.
 */

import React from "react";
import { Flame, Wind, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { BUSINESS_CONFIG } from "../models/business.model";

export const ExperienceView: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      title: "Liturgia de Toallas Calientes",
      description:
        "Paños de algodón vaporizados a temperatura exacta con esencias de eucalipto silvestre que abren el poro dérmico, relajan la musculatura facial y ablandan la fibra para un corte sin fricción.",
    },
    {
      icon: Wind,
      title: "Filo Tradicional y Navaja de Acero",
      description:
        "Técnica depurada de estiramiento dérmico y ángulo de corte controlado. Empleamos hojillas de acero inoxidable de un solo uso desechadas tras cada servicio.",
    },
    {
      icon: Sparkles,
      title: "Botánica y Pomadas Artesanales",
      description:
        "Formulaciones con aceites esenciales de cedro, jojoba y ceras de abeja naturales libres de parabenos agresivos que revitalizan el folículo y mantienen el brillo natural.",
    },
    {
      icon: ShieldCheck,
      title: "Puntualidad y Tolerancia Respetada",
      description:
        `Respetamos tu tiempo y el de cada caballero. Operamos con agenda coordinada y una tolerancia estricta de ${BUSINESS_CONFIG.hours.toleranceMinutes} minutos en Calle Nueva 104.`,
    },
  ];

  return (
    <section id="experiencia" className="experience-section" aria-labelledby="exp-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            <span>LA FILOSOFÍA DE LA DISTINCIÓN</span>
            <span className="eyebrow-line" aria-hidden="true" />
          </div>
          <h2 id="exp-heading" className="section-title">
            Un Santuario para el Caballero en Arequipa
          </h2>
          <p className="section-description">
            En un mundo de apresuramiento masivo, recuperamos la liturgia pausada
            de la barbería tradicional: navajas afiladas a mano, sillones de cuero
            pesado y atención consagrada al detalle.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="pillars-grid">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={index} className="pillar-card">
                <div className="pillar-icon-box" aria-hidden="true">
                  <Icon size={24} className="text-brass" />
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-description">{pillar.description}</p>
                <div className="pillar-index" aria-hidden="true">
                  0{index + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Location & Atmosphere Showcase */}
        <div className="atmosphere-banner">
          <div className="atmosphere-content">
            <div className="location-flag">
              <MapPin size={16} className="text-brass" />
              <span>Sede Histórica en Arequipa</span>
            </div>
            <h3 className="atmosphere-title">
              Calle Nueva 104 — El epicentro de la elegancia masculina
            </h3>
            <p className="atmosphere-text">
              Nuestras instalaciones combinan la sobriedad arquitectónica arequipeña
              con iluminación calibrada en tonos cálidos, música ambiental acústica y
              bebida de cortesía para cada cita agendada.
            </p>
            <div className="atmosphere-specs">
              <div className="spec-item">
                <span className="spec-val">7</span>
                <span className="spec-lbl">Servicios Especializados</span>
              </div>
              <div className="spec-item">
                <span className="spec-val">100%</span>
                <span className="spec-lbl">Bioseguridad & Navaja Nueva</span>
              </div>
              <div className="spec-item">
                <span className="spec-val">10 min</span>
                <span className="spec-lbl">Tolerancia Máxima</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
