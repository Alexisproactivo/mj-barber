/**
 * MJ BARBER - Catalog View
 * Official showcase of the 7 bespoke barbershop services with editorial typography,
 * artisanal specifications, duration, and direct reservation triggers.
 */

import React, { useState } from "react";
import { OFFICIAL_SERVICES } from "../models/service.model";
import type { ServiceItem } from "../models/service.model";
import { Clock, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

interface CatalogViewProps {
  onSelectService: (serviceName: string) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const categories = [
    { id: "todos", label: "Catálogo Completo (7)" },
    { id: "afeitado", label: "Afeitados & Navaja" },
    { id: "cabello", label: "Cabello & Color" },
    { id: "barba", label: "Cuidado de Barba" },
    { id: "tratamiento", label: "Alisado & Textura" },
  ];

  const filteredServices = OFFICIAL_SERVICES.filter((service) => {
    if (activeCategory === "todos") return true;
    return service.category === activeCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  const handleBookService = (service: ServiceItem) => {
    onSelectService(service.name);
    const bookingSection = document.getElementById("reservas");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="catalogo" className="catalog-section" aria-labelledby="catalog-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            <span>EXCELENCIA & DESTREZA</span>
            <span className="eyebrow-line" aria-hidden="true" />
          </div>
          <h2 id="catalog-heading" className="section-title">
            Catálogo Oficial de Servicios
          </h2>
          <p className="section-description">
            Siete procedimientos concebidos bajo el rigor del oficio barbero
            clásico. Cada sesión incluye diagnóstico personalizado y productos
            de formulación artesanal.
          </p>

          {/* Category Filter Pills */}
          <div className="category-filter-bar" role="tablist" aria-label="Filtrar por categoría">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`category-pill ${activeCategory === cat.id ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid" role="list">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <article
                key={service.id}
                className={`service-card ${service.popular ? "is-popular" : ""}`}
                role="listitem"
              >
                {/* Header Strip */}
                <div className="card-top-row">
                  <span className="service-number">
                    {String(service.code).padStart(2, "0")}
                  </span>
                  <div className="service-tags">
                    {service.badge && (
                      <span className="badge-pill badge-brass">
                        {service.badge}
                      </span>
                    )}
                    {service.popular && (
                      <span className="badge-pill badge-popular">
                        <Sparkles size={12} className="inline-icon" />
                        Recomendado
                      </span>
                    )}
                  </div>
                </div>

                {/* Service Name & Duration */}
                <h3 className="service-name">{service.name}</h3>

                <div className="service-meta-row">
                  <span className="service-duration">
                    <Clock size={14} className="meta-icon text-brass" />
                    <span>{service.durationMinutes} minutos aprox.</span>
                  </span>
                  <span className="service-location-meta">Calle Nueva 104</span>
                </div>

                <p className="service-summary">{service.description}</p>

                {/* Ritual Accordion / Details */}
                <div className="service-ritual-toggle">
                  <button
                    type="button"
                    className="btn-ritual-toggle"
                    onClick={() => toggleExpand(service.id)}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? "Ocultar protocolo" : "Ver protocolo del ritual"}</span>
                    <ChevronRight
                      size={14}
                      className={`toggle-arrow ${isExpanded ? "rotated" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="ritual-details-panel">
                      <p className="ritual-explanation">{service.detailedRitual}</p>
                      <div className="ritual-tools-list">
                        <span className="tools-title">Instrumental y formulación:</span>
                        <ul>
                          {service.tools.map((tool, idx) => (
                            <li key={idx}>
                              <CheckCircle2 size={13} className="text-brass inline-icon" />
                              <span>{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-brass-outline btn-block"
                    onClick={() => handleBookService(service)}
                  >
                    <span>Seleccionar y Agendar</span>
                    <ChevronRight size={15} className="btn-icon-right" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Catalog Guarantee Notice */}
        <div className="catalog-bottom-notice">
          <div className="notice-inner">
            <span className="notice-brass-accent" aria-hidden="true" />
            <p>
              Todos los servicios cumplen con protocolos de esterilización de grado hospitalario y navajas con hojillas descartables de un solo uso por cliente en Calle Nueva 104, Arequipa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
