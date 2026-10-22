/**
 * MJ BARBER - Booking & Validation Model
 * Input sanitization (XSS mitigation), Peruvian phone number validation,
 * and WhatsApp deep-link builder conforming to the official specification.
 */

import { BUSINESS_CONFIG } from "./business.model";
import { OFFICIAL_SERVICES } from "./service.model";

export interface BookingFormData {
  clientName: string;
  phoneNumber: string; // Peruvian 9-digit format (e.g., 953745382)
  serviceName: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

export interface ValidationErrors {
  clientName?: string;
  phoneNumber?: string;
  serviceName?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly sanitizedData: BookingFormData;
  readonly errors: ValidationErrors;
}

/**
 * Sanitizes user input against Cross-Site Scripting (XSS) and injection vectors.
 * Removes dangerous tags, script blocks, attributes, javascript: schemes, and control characters.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/javascript:/gi, "") // Neutralize pseudo-protocols
    .replace(/data:/gi, "")
    .replace(/vbscript:/gi, "")
    // Neutralize inline event handlers
    .replace(/on\w+\s*=/gi, "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Strip control characters
    .trim();
}

/**
 * Validates a Peruvian mobile phone number.
 * Standard format: exactly 9 digits, starting with 9 (e.g. 953745382).
 * Allows inputs with prefixes like +51 or spaces/hyphens by normalizing them first.
 */
export function normalizePeruvianPhone(phone: string): string {
  // Strip all non-digit characters
  let digits = phone.replace(/\D/g, "");

  // If user included Peru country code '51' at the start (11 digits: 519XXXXXXXX), strip the '51'
  if (digits.length === 11 && digits.startsWith("519")) {
    digits = digits.slice(2);
  }

  return digits;
}

export function isValidPeruvianPhone(phone: string): boolean {
  const normalized = normalizePeruvianPhone(phone);
  // Peruvian mobile numbers start with 9 and have 9 digits
  return /^9\d{8}$/.test(normalized);
}

/**
 * Validates whether the selected service matches one of the official catalog services.
 */
export function isValidOfficialService(serviceName: string): boolean {
  const sanitized = sanitizeString(serviceName);
  return OFFICIAL_SERVICES.some(
    (s) => s.name.toLowerCase() === sanitized.toLowerCase()
  );
}

/**
 * Full validator for the booking form.
 */
export function validateBookingForm(data: Partial<BookingFormData>): ValidationResult {
  const errors: ValidationErrors = {};

  const sanitizedName = sanitizeString(data.clientName || "");
  const rawPhone = data.phoneNumber || "";
  const normalizedPhone = normalizePeruvianPhone(rawPhone);
  const sanitizedService = sanitizeString(data.serviceName || "");
  const sanitizedDate = sanitizeString(data.preferredDate || "");
  const sanitizedTime = sanitizeString(data.preferredTime || "");
  const sanitizedNotes = sanitizeString(data.notes || "");

  // Client Name Validation (optional or minimum 2 characters if provided)
  if (sanitizedName.length > 0 && sanitizedName.length < 2) {
    errors.clientName = "El nombre debe contener al menos 2 caracteres.";
  } else if (sanitizedName.length > 60) {
    errors.clientName = "El nombre no debe exceder los 60 caracteres.";
  }

  // Service Name Validation (mandatory)
  if (!sanitizedService) {
    errors.serviceName = "Debe seleccionar un servicio del catálogo oficial.";
  } else if (!isValidOfficialService(sanitizedService)) {
    errors.serviceName = "El servicio seleccionado no pertenece al catálogo oficial.";
  }

  // Phone Number Validation (Peruvian mobile 9-digits)
  if (!rawPhone.trim()) {
    errors.phoneNumber = "El número telefónico / WhatsApp es requerido.";
  } else if (!isValidPeruvianPhone(rawPhone)) {
    errors.phoneNumber = "Ingrese un número celular peruano válido (9 dígitos, comenzando con 9).";
  }

  // Date validation (if supplied)
  if (sanitizedDate) {
    const selectedDate = new Date(`${sanitizedDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      errors.preferredDate = "Formato de fecha inválido.";
    } else if (selectedDate < today) {
      errors.preferredDate = "La fecha seleccionada no puede ser anterior a hoy.";
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    sanitizedData: {
      clientName: sanitizedName,
      phoneNumber: normalizedPhone,
      serviceName: sanitizedService,
      preferredDate: sanitizedDate,
      preferredTime: sanitizedTime,
      notes: sanitizedNotes,
    },
    errors,
  };
}

/**
 * Builds the official WhatsApp deep link.
 * Strict required format:
 * "Hola MJ BARBER, deseo agendar una cita para el servicio: [Servicio] en Calle Nueva 104."
 *
 * If client name or preferred schedule are provided, they are appended elegantly while
 * preserving the exact core requirement requested by the user.
 */
export function buildWhatsAppBookingUrl(
  serviceName: string,
  clientName?: string,
  preferredDate?: string,
  preferredTime?: string
): string {
  const sanitizedService = sanitizeString(serviceName);
  const sanitizedClient = sanitizeString(clientName || "");
  const sanitizedDate = sanitizeString(preferredDate || "");
  const sanitizedTime = sanitizeString(preferredTime || "");

  // Base mandatory formatted message as strictly required:
  // "Hola MJ BARBER, deseo agendar una cita para el servicio: [Servicio] en Calle Nueva 104."
  let message = `Hola MJ BARBER, deseo agendar una cita para el servicio: ${sanitizedService} en Calle Nueva 104.`;

  const extraDetails: string[] = [];
  if (sanitizedClient) {
    extraDetails.push(`Mi nombre: ${sanitizedClient}`);
  }
  if (sanitizedDate) {
    extraDetails.push(`Fecha preferida: ${sanitizedDate}`);
  }
  if (sanitizedTime) {
    extraDetails.push(`Hora estimada: ${sanitizedTime}`);
  }

  if (extraDetails.length > 0) {
    message += `\n(${extraDetails.join(" | ")})`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_CONFIG.phoneWhatsapp}?text=${encodedMessage}`;
}

/**
 * Returns the exact preview text without URL encoding.
 */
export function getFormattedMessagePreview(
  serviceName: string,
  clientName?: string,
  preferredDate?: string,
  preferredTime?: string
): string {
  const sanitizedService = sanitizeString(serviceName) || "[Seleccione un servicio]";
  let message = `Hola MJ BARBER, deseo agendar una cita para el servicio: ${sanitizedService} en Calle Nueva 104.`;

  const extraDetails: string[] = [];
  if (clientName && clientName.trim()) {
    extraDetails.push(`Mi nombre: ${sanitizeString(clientName)}`);
  }
  if (preferredDate) {
    extraDetails.push(`Fecha: ${sanitizeString(preferredDate)}`);
  }
  if (preferredTime) {
    extraDetails.push(`Hora: ${sanitizeString(preferredTime)}`);
  }

  if (extraDetails.length > 0) {
    message += `\n(${extraDetails.join(" | ")})`;
  }

  return message;
}
