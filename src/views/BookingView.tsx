/**
 * MJ BARBER - Booking View
 * Interactive reservation form with real-time validation, Peruvian phone enforcement,
 * instant live preview of the WhatsApp message, and deep-link generation.
 */

import React from "react";
import { OFFICIAL_SERVICES } from "../models/service.model";
import { BUSINESS_CONFIG } from "../models/business.model";
import { useBookingController } from "../controllers/useBookingController";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  Check,
  ExternalLink,
} from "lucide-react";

const TODAY_ISO_DATE = new Date().toISOString().split("T")[0];

interface BookingViewProps {
  controller: ReturnType<typeof useBookingController>;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const BookingView: React.FC<BookingViewProps> = ({
  controller,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const {
    formData,
    errors,
    touched,
    isSubmitted,
    previewMessage,
    handleFieldChange,
    handleBlur,
    submitBooking,
  } = controller;

  const todayStr = TODAY_ISO_DATE;
  const [currentTime] = React.useState("10:30");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitBooking();
  };

  return (
    <section id="reservas" className="booking-section" aria-labelledby="booking-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            <span>GESTIÓN DE CITAS & PROTOCOLO</span>
            <span className="eyebrow-line" aria-hidden="true" />
          </div>
          <h2 id="booking-heading" className="section-title">
            Agenda tu Cita en MJ BARBER
          </h2>
          <p className="section-description">
            Selecciona tu servicio y completa tus datos de contacto para
            generar el enlace oficial a nuestro canal de WhatsApp
            (+51 953745382) en Calle Nueva 104, Arequipa.
          </p>
        </div>

        <div className="booking-layout-grid">
          {/* Left Column: Form */}
          <div className="booking-form-card">
            <form onSubmit={handleSubmit} noValidate className="form-stack">
              {/* Service Selection */}
              <div className="form-group">
                <label htmlFor="service-select" className="form-label">
                  <span>Servicio Oficial Requerido</span>
                  <span className="label-required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="service-select"
                    className={`form-input select-input ${
                      touched.serviceName && errors.serviceName ? "has-error" : ""
                    }`}
                    value={formData.serviceName}
                    onChange={(e) => handleFieldChange("serviceName", e.target.value)}
                    onBlur={() => handleBlur("serviceName")}
                    required
                  >
                    <option value="" disabled>
                      Seleccione un servicio del catálogo
                    </option>
                    {OFFICIAL_SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {String(s.code).padStart(2, "0")}. {s.name} ({s.durationMinutes} min)
                      </option>
                    ))}
                  </select>
                </div>
                {touched.serviceName && errors.serviceName && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} className="inline-icon" />
                    {errors.serviceName}
                  </p>
                )}
              </div>

              {/* Client Name */}
              <div className="form-group">
                <label htmlFor="client-name" className="form-label">
                  <span>Nombre del Cliente</span>
                </label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon text-muted" />
                  <input
                    type="text"
                    id="client-name"
                    name="clientName"
                    className={`form-input with-left-icon ${
                      touched.clientName && errors.clientName ? "has-error" : ""
                    }`}
                    placeholder="Ej. Carlos Mendoza"
                    value={formData.clientName}
                    onChange={(e) => handleFieldChange("clientName", e.target.value)}
                    onBlur={() => handleBlur("clientName")}
                    maxLength={60}
                    autoComplete="name"
                  />
                </div>
                {touched.clientName && errors.clientName && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} className="inline-icon" />
                    {errors.clientName}
                  </p>
                )}
              </div>

              {/* Phone / WhatsApp (Strict Peruvian 9-digit) */}
              <div className="form-group">
                <label htmlFor="phone-input" className="form-label">
                  <span>Teléfono Móvil / WhatsApp (Perú)</span>
                  <span className="label-required">*</span>
                </label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon text-muted" />
                  <input
                    type="tel"
                    id="phone-input"
                    name="phoneNumber"
                    className={`form-input with-left-icon ${
                      (touched.phoneNumber || isSubmitted) && errors.phoneNumber
                        ? "has-error"
                        : ""
                    }`}
                    placeholder="953745382 (9 dígitos)"
                    value={formData.phoneNumber}
                    onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                    onBlur={() => handleBlur("phoneNumber")}
                    maxLength={14}
                    required
                    autoComplete="tel"
                  />
                </div>
                <div className="input-hint">
                  <span>Formato: celular peruano de 9 dígitos que comience con 9.</span>
                </div>
                {(touched.phoneNumber || isSubmitted) && errors.phoneNumber && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} className="inline-icon" />
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Date & Time Row */}
              <div className="form-row-two-col">
                <div className="form-group">
                  <label htmlFor="date-input" className="form-label">
                    <span>Fecha Sugerida</span>
                  </label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="input-icon text-muted" />
                    <input
                      type="date"
                      id="date-input"
                      name="preferredDate"
                      min={todayStr}
                      className="form-input with-left-icon"
                      value={formData.preferredDate}
                      onChange={(e) => handleFieldChange("preferredDate", e.target.value)}
                      onBlur={() => handleBlur("preferredDate")}
                    />
                  </div>
                  {touched.preferredDate && errors.preferredDate && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} className="inline-icon" />
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="time-select" className="form-label">
                    <span>Horario Estimado</span>
                  </label>
                  <div className="input-with-icon">
                    <Clock size={16} className="input-icon text-muted" />
                    <select
                      id="time-select"
                      name="preferredTime"
                      className="form-input with-left-icon select-input"
                      value={formData.preferredTime}
                      onChange={(e) => handleFieldChange("preferredTime", e.target.value)}
                    >
                      <option value="">Seleccione turno</option>
                      <option value="09:00 AM">09:00 AM (Apertura)</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:30 PM">05:30 PM</option>
                      <option value="07:00 PM">07:00 PM (Último turno)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-brass btn-block btn-lg"
                  aria-label="Confirmar reserva y abrir enlace de WhatsApp"
                >
                  <MessageSquare size={18} className="btn-icon" />
                  <span>Confirmar y Enviar a WhatsApp</span>
                  <ExternalLink size={16} className="btn-icon-right" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Preview & Trust Protocols */}
          <div className="booking-preview-column">
            {/* WhatsApp Card Preview */}
            <div className="whatsapp-preview-card">
              <div className="wa-preview-header">
                <div className="wa-avatar-box">
                  <span className="wa-avatar-text">MJ</span>
                </div>
                <div className="wa-header-info">
                  <span className="wa-contact-name">{BUSINESS_CONFIG.name}</span>
                  <span className="wa-contact-status">Canal Oficial • +51 953745382</span>
                </div>
              </div>

              <div className="wa-bubble-container">
                <div className="wa-speech-bubble">
                  <p className="wa-bubble-text">{previewMessage}</p>
                  <span className="wa-timestamp">
                    {currentTime}
                    <Check size={12} className="inline-icon text-muted ml-1" />
                  </span>
                </div>
              </div>

              <div className="wa-preview-footer">
                <span className="wa-preview-tag">
                  Enlace seguro a https://wa.me/{BUSINESS_CONFIG.phoneWhatsapp}
                </span>
              </div>
            </div>

            {/* Institutional Trust Notices */}
            <div className="trust-policy-box">
              <div className="trust-header">
                <ShieldCheck size={20} className="text-brass" />
                <h4>Garantías Institucionales & Ley N° 29733</h4>
              </div>

              <ul className="trust-list">
                <li>
                  <strong>Protección de Datos (Perú):</strong> Conforme a la Ley N° 29733, tus datos personales se emplean única y estrictamente para la coordinación y confirmación del turno en Calle Nueva 104.
                </li>
                <li>
                  <strong>Regla de Tolerancia de 10 Minutos:</strong> Para honrar la puntualidad de cada cliente y el tiempo del maestro barbero, se aplica una tolerancia máxima de 10 min.
                </li>
              </ul>

              <div className="trust-links">
                <button
                  type="button"
                  className="text-link-brass"
                  onClick={onOpenPrivacy}
                >
                  Leer Política de Privacidad (Ley N° 29733)
                </button>
                <span className="divider-dot" aria-hidden="true">•</span>
                <button
                  type="button"
                  className="text-link-brass"
                  onClick={onOpenTerms}
                >
                  Reglamento de Tolerancia
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
