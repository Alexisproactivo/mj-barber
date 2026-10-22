/**
 * MJ BARBER - Booking Controller
 * Decoupled controller hook managing booking state, reactive validation,
 * error handling, and WhatsApp deep-link generation.
 */

import { useState, useCallback, useMemo } from "react";
import type {
  BookingFormData,
  ValidationErrors,
} from "../models/booking.model";
import {
  validateBookingForm,
  buildWhatsAppBookingUrl,
  getFormattedMessagePreview,
  normalizePeruvianPhone,
} from "../models/booking.model";
import { OFFICIAL_SERVICES } from "../models/service.model";

export function useBookingController(initialService: string = "") {
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: "",
    phoneNumber: "",
    serviceName: initialService || OFFICIAL_SERVICES[0]?.name || "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Field change handler with instant validation feedback for touched fields
  const handleFieldChange = useCallback(
    (field: keyof BookingFormData, value: string) => {
      setFormData((prev) => {
        const next = { ...prev, [field]: value };
        // If field was already touched, re-validate
        if (touched[field] || isSubmitted) {
          const result = validateBookingForm(next);
          setErrors(result.errors);
        }
        return next;
      });
    },
    [touched, isSubmitted]
  );

  const handleBlur = useCallback(
    (field: keyof BookingFormData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const result = validateBookingForm(formData);
      setErrors(result.errors);
    },
    [formData]
  );

  const handleServiceSelect = useCallback((serviceName: string) => {
    setFormData((prev) => ({ ...prev, serviceName }));
    setTouched((prev) => ({ ...prev, serviceName: true }));
  }, []);

  // WhatsApp deep-link based on sanitized data
  const whatsAppUrl = useMemo(() => {
    return buildWhatsAppBookingUrl(
      formData.serviceName,
      formData.clientName,
      formData.preferredDate,
      formData.preferredTime
    );
  }, [
    formData.serviceName,
    formData.clientName,
    formData.preferredDate,
    formData.preferredTime,
  ]);

  // Live preview message
  const previewMessage = useMemo(() => {
    return getFormattedMessagePreview(
      formData.serviceName,
      formData.clientName,
      formData.preferredDate,
      formData.preferredTime
    );
  }, [
    formData.serviceName,
    formData.clientName,
    formData.preferredDate,
    formData.preferredTime,
  ]);

  // Submit action that validates and redirects
  const submitBooking = useCallback((): boolean => {
    setIsSubmitted(true);
    setTouched({
      clientName: true,
      phoneNumber: true,
      serviceName: true,
      preferredDate: true,
      preferredTime: true,
    });

    const validation = validateBookingForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return false;
    }

    // Direct user to sanitized WhatsApp deep-link
    const url = buildWhatsAppBookingUrl(
      validation.sanitizedData.serviceName,
      validation.sanitizedData.clientName,
      validation.sanitizedData.preferredDate,
      validation.sanitizedData.preferredTime
    );

    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  }, [formData]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      clientName: "",
      phoneNumber: "",
      serviceName: OFFICIAL_SERVICES[0]?.name || "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  }, []);

  return {
    formData,
    errors,
    touched,
    isSubmitted,
    whatsAppUrl,
    previewMessage,
    handleFieldChange,
    handleBlur,
    handleServiceSelect,
    submitBooking,
    resetForm,
    normalizedPhone: normalizePeruvianPhone(formData.phoneNumber),
  };
}
