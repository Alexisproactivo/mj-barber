/**
 * MJ BARBER - Legal & Compliance Model
 * Institutional confidence documents conforming to Peruvian Law N° 29733 (Personal Data Protection)
 * and Terms of Service with the mandatory 10-minute punctuality tolerance policy.
 */

export interface LegalDocument {
  readonly id: "privacidad" | "terminos";
  readonly title: string;
  readonly subtitle: string;
  readonly legalBasis: string;
  readonly lastUpdated: string;
  readonly sections: ReadonlyArray<{
    readonly heading: string;
    readonly content: string;
    readonly highlight?: string;
  }>;
}

export const PRIVACY_POLICY: LegalDocument = {
  id: "privacidad",
  title: "Política de Privacidad y Protección de Datos Personales",
  subtitle: "Tratamiento transparente y exclusivo para la gestión de turnos",
  legalBasis: "Conforme a la Ley N° 29733 de la República del Perú y su Reglamento (D.S. 003-2013-JUS)",
  lastUpdated: "Octubre 2026",
  sections: [
    {
      heading: "1. Identidad y Domicilio del Responsable",
      content:
        "MJ BARBER, con sede operativa en Calle Nueva 104, distrito y provincia de Arequipa 04001, Perú, es responsable del tratamiento de los datos personales proporcionados por sus clientes en estricto cumplimiento con la legislación peruana.",
    },
    {
      heading: "2. Finalidad Estricta y Limitada del Tratamiento",
      content:
        "Los datos de contacto recolectados (nombre, teléfono móvil peruano de 9 dígitos y preferencias de horario para servicios de barbería) se destinan ÚNICA Y EXCLUSIVAMENTE a la confirmación, coordinación, recordatorio y gestión del turno o cita en nuestra sede de Calle Nueva 104.",
      highlight:
        "MJ BARBER jamás comercializa, cede, transfiere ni utiliza sus datos para spam publicitario o listas de terceros.",
    },
    {
      heading: "3. Medidas de Seguridad y Confidencialidad",
      content:
        "Aplicamos estándares técnicos y organizativos para prevenir la pérdida, alteración, acceso no autorizado o divulgación indebida de sus datos. Los enlaces de mensajería generados a través de WhatsApp operan con encriptación punto a punto nativa de la plataforma.",
    },
    {
      heading: "4. Ejercicio de Derechos ARCO",
      content:
        "En cualquier momento, usted podrá ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) comunicándose directamente a nuestro canal oficial de WhatsApp (+51 953745382) o de forma presencial en nuestro establecimiento en Calle Nueva 104, Arequipa.",
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDocument = {
  id: "terminos",
  title: "Términos de Servicio y Política de Tolerancia",
  subtitle: "Normas de convivencia, puntualidad y excelencia artesanal",
  legalBasis: "Reglamento interno de atención al cliente en Calle Nueva 104, Arequipa",
  lastUpdated: "Octubre 2026",
  sections: [
    {
      heading: "1. Regla Institucional de Tolerancia (10 Minutos)",
      content:
        "La dedicación artesanal de cada servicio requiere el tiempo completo asignado al maestro barbero. Se otorga una tolerancia máxima improrrogable de DIEZ (10) MINUTOS a partir de la hora pactada en Calle Nueva 104. Superado dicho margen sin comunicación previa:",
      highlight:
        "El turno podrá ser reasignado a clientes en lista de espera o en sala presencial para no perjudicar las citas subsiguientes.",
    },
    {
      heading: "2. Modificaciones y Cancelaciones de Turnos",
      content:
        "Agradecemos notificar cualquier reprogramación o anulación de cita con un mínimo de dos (2) horas de anticipación a través del WhatsApp (+51 953745382) a fin de liberar el horario para otro miembro de nuestra comunidad.",
    },
    {
      heading: "3. Estándares Higiénico-Sanitarios y Bioseguridad",
      content:
        "En MJ BARBER empleamos toallas calientes esterilizadas de un solo uso por cliente, desinfección química de navajas y peines en soluciones de grado hospitalario, y cuchillas desechables de filo nuevo para cada afeitado o rasurado.",
    },
    {
      heading: "4. Derecho de Admisión y Conducta",
      content:
        "Nos reservamos el derecho de admisión y permanencia en caso de conductas irrespetuosas hacia nuestro personal o clientes, o ante estados evidentes de alteración que comprometan la seguridad durante el uso de navajas e instrumental punzocortante.",
    },
  ],
};
