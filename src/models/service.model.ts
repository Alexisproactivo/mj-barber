/**
 * MJ BARBER - Service Model
 * Typed definition and master catalog of the 7 official services.
 */

export interface ServiceItem {
  readonly id: string;
  readonly code: number;
  readonly name: string;
  readonly category: 'cabello' | 'barba' | 'afeitado' | 'tratamiento';
  readonly durationMinutes: number;
  readonly description: string;
  readonly detailedRitual: string;
  readonly tools: string[];
  readonly badge?: string;
  readonly popular?: boolean;
}

/**
 * Official catalog of 7 services requested:
 * 1. Tintura de cabello
 * 2. Acondicionamiento de barba
 * 3. Afeitado
 * 4. Afeitado con navaja
 * 5. Rasurado con toallas calientes
 * 6. Rasurado de cabeza
 * 7. Alisado
 */
export const OFFICIAL_SERVICES: readonly ServiceItem[] = [
  {
    id: "tintura-cabello",
    code: 1,
    name: "Tintura de cabello",
    category: "cabello",
    durationMinutes: 60,
    description: "Colorimetría capilar masculina, cobertura de canas o tonalidades personalizadas con pigmentos de alta fijación que protegen la fibra capilar.",
    detailedRitual: "Diagnóstico capilar previo, aplicación técnica de pigmentos orgánicos sin amoníaco agresivo, lavado revitalizante y peinado estructurado con cera mate.",
    tools: ["Pigmentos minerales", "Pincel de precisión", "Champú matizador"],
    badge: "Colorimetría",
  },
  {
    id: "acondicionamiento-barba",
    code: 2,
    name: "Acondicionamiento de barba",
    category: "barba",
    durationMinutes: 35,
    description: "Tratamiento intensivo de hidratación profunda, desenredo, recorte de puntas y aplicación de bálsamos y aceites esenciales de cedro.",
    detailedRitual: "Lavado con jabón artesanal para barba, vaporización botánica de poro, perfilado sutil con tijera japonesa y sellado con aceite de jojoba y cera de abeja.",
    tools: ["Vaporizador botánico", "Tijera japonesa", "Bálsamo artesanal"],
    badge: "Cuidado Facial",
    popular: true,
  },
  {
    id: "afeitado",
    code: 3,
    name: "Afeitado",
    category: "afeitado",
    durationMinutes: 30,
    description: "Afeitado tradicional con preparación dérmica previa, espuma tibia batida a mano en cuenco de cerámica y loción calmante astringente.",
    detailedRitual: "Masaje preparatorio con crema pre-shave, aplicación de espuma densa con brocha de cerdas naturales, pase suave y cierre con loción de sándalo.",
    tools: ["Brocha de pelo natural", "Espuma tibia", "Tónico de sándalo"],
    badge: "Clásico",
  },
  {
    id: "afeitado-navaja",
    code: 4,
    name: "Afeitado con navaja",
    category: "afeitado",
    durationMinutes: 40,
    description: "La cumbre de la barbería tradicional: afeitado milimétrico con navaja de filo de acero templado, delineado quirúrgico y máxima suavidad.",
    detailedRitual: "Estudio de la dirección del crecimiento del vello, estiramiento manual de la piel, pase certero a contrapelo con navaja desinfectada y bálsamo regenerador con piedra alumbre.",
    tools: ["Navaja de acero de precisión", "Piedra de alumbre", "Bálsamo regenerador"],
    badge: "Maestría Tradicional",
    popular: true,
  },
  {
    id: "rasurado-toallas-calientes",
    code: 5,
    name: "Rasurado con toallas calientes",
    category: "afeitado",
    durationMinutes: 45,
    description: "Ritual multisensorial con paños calientes impregnados en eucalipto que abren los poros para un rasurado libre de irritaciones.",
    detailedRitual: "Doble toalla caliente vaporizada con aceites esenciales, afeitado profundo al ras, compresa fría final para cerrar los poros y masaje relajante en sienes.",
    tools: ["Toallas de algodón vaporizadas", "Aceite de eucalipto", "Compresa fría tonificante"],
    badge: "Ritual Signature",
    popular: true,
  },
  {
    id: "rasurado-cabeza",
    code: 6,
    name: "Rasurado de cabeza",
    category: "cabello",
    durationMinutes: 35,
    description: "Rasurado craneal completo y uniforme con acabado pulido, protección solar hidratante y masaje de cuero cabelludo.",
    detailedRitual: "Exfoliación suave del cuero cabelludo, afeitado a navaja o máquina de fricción cero, y aplicación de emulsión matificante protectora.",
    tools: ["Máquina de cero ras", "Navaja de filo continuo", "Emulsión matificante UV"],
    badge: "Precisión Craneal",
  },
  {
    id: "alisado",
    code: 7,
    name: "Alisado",
    category: "tratamiento",
    durationMinutes: 65,
    description: "Tratamiento disciplinante capilar con keratina vegetal para controlar volumen, eliminar encrespamiento y brindar peinabilidad duradera.",
    detailedRitual: "Lavado detox clarificante, aplicación mechón a mechón de keratina vegetal libre de formol, activación térmica mediante plancha de turmalina y serum sellador.",
    tools: ["Plancha de turmalina", "Keratina vegetal", "Serum de argán"],
    badge: "Tratamiento Textura",
  },
] as const;

export function getServiceById(id: string): ServiceItem | undefined {
  return OFFICIAL_SERVICES.find((service) => service.id === id);
}

export function getServiceByName(name: string): ServiceItem | undefined {
  return OFFICIAL_SERVICES.find((service) => service.name.toLowerCase() === name.toLowerCase());
}
