/**
 * MJ BARBER - Business Model
 * Centralized business constants and configurations for Calle Nueva 104, Arequipa.
 */

export interface BusinessConfig {
  readonly name: string;
  readonly legalName: string;
  readonly phoneDisplay: string;
  readonly phoneWhatsapp: string; // 51953745382
  readonly address: {
    readonly street: string;
    readonly city: string;
    readonly postalCode: string;
    readonly region: string;
    readonly country: string;
    readonly fullAddress: string;
    readonly googleMapsUrl: string;
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly hours: {
    readonly weekdays: string;
    readonly weekends: string;
    readonly toleranceMinutes: number;
  };
  readonly slogans: {
    readonly primary: string;
    readonly secondary: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "MJ BARBER",
  legalName: "MJ BARBER Clásica Arequipa",
  phoneDisplay: "+51 953 745 382",
  phoneWhatsapp: "51953745382",
  address: {
    street: "Calle Nueva 104",
    city: "Arequipa",
    postalCode: "04001",
    region: "Arequipa",
    country: "Perú",
    fullAddress: "Calle Nueva 104, Arequipa 04001, Perú",
    googleMapsUrl: "https://maps.google.com/?q=Calle+Nueva+104,+Arequipa+04001,+Peru",
    latitude: -16.4018,
    longitude: -71.5369,
  },
  hours: {
    weekdays: "Lunes a Sábado: 09:00 - 20:00",
    weekends: "Domingos: 10:00 - 16:00",
    toleranceMinutes: 10,
  },
  slogans: {
    primary: "El arte del corte clásico y la distinción en el corazón de Arequipa.",
    secondary: "Maestría en navaja, toallas calientes y estilo atemporal para el caballero moderno.",
  },
};
