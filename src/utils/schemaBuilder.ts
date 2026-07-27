import type { SiloPageEntry } from './siloLinking';

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  '@id': string;
  url: string;
  telephone: string;
  priceRange: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  areaServed: string[];
  sameAs: string[];
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  provider: {
    '@type': string;
    '@id': string;
    name: string;
  };
  areaServed:
    | {
        '@type': string;
        name: string;
      }
    | string[];
  serviceType: string;
}

const SERVICE_NAME_MAP: Record<string, string> = {
  mantenimiento: 'Mantenimiento Preventivo y Correctivo de Aire Acondicionado',
  reparacion: 'Reparación de Urgencia de Aire Acondicionado',
  instalacion: 'Instalación Profesional de Minisplit y Aire Acondicionado',
  'carga-gas': 'Carga de Gas Refrigerante R410A / R32',
};

/**
 * Generates the root HVACBusiness JSON-LD object for Schema.org.
 */
export function buildLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: 'Aires Acondicionados Cancún',
    image: 'https://airesacondicionadoscancun.vercel.app/og-image.jpg',
    '@id': 'https://airesacondicionadoscancun.vercel.app/#organization',
    url: 'https://airesacondicionadoscancun.vercel.app',
    telephone: '+529984934110',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Tulum SM 20',
      addressLocality: 'Cancún',
      addressRegion: 'Quintana Roo',
      postalCode: '77500',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.1619,
      longitude: -86.8515,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: [
      'Cancún',
      'Zona Hotelera Cancún',
      'Puerto Cancún',
      'Isla Mujeres',
      'Riviera Maya',
    ],
    sameAs: [
      'https://facebook.com/airesacondicionadoscancun',
      'https://instagram.com/airesacondicionadoscancun',
    ],
  };
}

/**
 * Generates BreadcrumbList JSON-LD object.
 */
export function buildBreadcrumbSchema(
  currentPage: SiloPageEntry,
  h1: string,
  canonicalUrl: string
): BreadcrumbSchema {
  const isHome = currentPage.id === 'index';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://airesacondicionadoscancun.vercel.app/',
      },
      ...(!isHome
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: h1 || currentPage.data.h1 || currentPage.data.title,
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  };
}

/**
 * Generates Service JSON-LD object for Hub and Spoke pages.
 * Enforces strict policy compliance: FAQPage schema is strictly prohibited.
 */
export function buildServiceSchema(
  currentPage: SiloPageEntry,
  canonicalUrl: string
): ServiceSchema | null {
  const pageType = currentPage.data.type;
  if (pageType !== 'hub' && pageType !== 'spoke') {
    return null;
  }

  const rawServiceKey = currentPage.data.service || '';
  const serviceName =
    SERVICE_NAME_MAP[rawServiceKey] ||
    currentPage.data.h1 ||
    currentPage.data.title;

  const provider = {
    '@type': 'HVACBusiness',
    '@id': 'https://airesacondicionadoscancun.vercel.app/#organization',
    name: 'Aires Acondicionados Cancún',
  };

  const areaServed =
    pageType === 'spoke'
      ? {
          '@type': 'Place',
          name: currentPage.data.locationName || 'Cancún',
        }
      : [
          'Cancún',
          'Zona Hotelera Cancún',
          'Puerto Cancún',
          'Isla Mujeres',
          'Riviera Maya',
        ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: currentPage.data.description,
    url: canonicalUrl,
    provider,
    areaServed,
    serviceType: rawServiceKey || 'HVAC Service',
  };
}
