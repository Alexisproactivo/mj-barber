/**
 * MJ BARBER - Schema.org JSON-LD Structured Data
 * Provides search engines and web crawlers with rich semantics of type "BarberShop".
 */

import React from "react";
import { BUSINESS_CONFIG } from "../models/business.model";
import { OFFICIAL_SERVICES } from "../models/service.model";

export const JsonLdView: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: BUSINESS_CONFIG.name,
    legalName: BUSINESS_CONFIG.legalName,
    description: BUSINESS_CONFIG.slogans.primary,
    telephone: BUSINESS_CONFIG.phoneDisplay,
    priceRange: "$$",
    currenciesAccepted: "PEN",
    paymentAccepted: "Cash, Yape, Plin, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_CONFIG.address.street,
      addressLocality: BUSINESS_CONFIG.address.city,
      postalCode: BUSINESS_CONFIG.address.postalCode,
      addressRegion: BUSINESS_CONFIG.address.region,
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_CONFIG.address.latitude,
      longitude: BUSINESS_CONFIG.address.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo Oficial de Servicios MJ BARBER",
      itemListElement: OFFICIAL_SERVICES.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
