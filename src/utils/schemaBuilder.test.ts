import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
} from './schemaBuilder.ts';
import type { SiloPageEntry } from './siloLinking.ts';

const mockHubPage: SiloPageEntry = {
  id: 'mantenimiento-aires-acondicionados-cancun',
  data: {
    title: 'Mantenimiento de Aires Acondicionados en Cancún',
    description: 'Servicio de mantenimiento preventivo y correctivo en Cancún.',
    h1: 'Mantenimiento de Aires Acondicionados en Cancún',
    type: 'hub',
    service: 'mantenimiento',
  },
};

const mockSpokePage: SiloPageEntry = {
  id: 'mantenimiento-en-puerto-cancun',
  data: {
    title: 'Mantenimiento en Puerto Cancún',
    description: 'Mantenimiento de aire acondicionado en Puerto Cancún.',
    h1: 'Mantenimiento de Aire Acondicionado en Puerto Cancún',
    type: 'spoke',
    service: 'mantenimiento',
    locationName: 'Puerto Cancún',
    locationSlug: 'puerto-cancun',
    parentHub: 'mantenimiento-aires-acondicionados-cancun',
  },
};

const mockLegalPage: SiloPageEntry = {
  id: 'privacidad',
  data: {
    title: 'Aviso de Privacidad',
    description: 'Aviso de Privacidad',
    h1: 'Aviso de Privacidad',
    type: 'legal',
    service: 'legal',
  },
};

test('buildLocalBusinessSchema returns valid HVACBusiness entity', () => {
  const schema = buildLocalBusinessSchema();
  assert.equal(schema['@type'], 'HVACBusiness');
  assert.equal(schema.name, 'Aires Acondicionados Cancún');
  assert.equal(schema['@id'], 'https://airesacondicionadoscancun.vercel.app/#organization');
  assert.ok(Array.isArray(schema.areaServed));
  assert.ok(schema.areaServed.includes('Cancún'));
});

test('buildBreadcrumbSchema returns valid BreadcrumbList', () => {
  const homeBreadcrumb = buildBreadcrumbSchema(
    { id: 'index', data: mockHubPage.data },
    'Inicio',
    'https://airesacondicionadoscancun.vercel.app/'
  );
  assert.equal(homeBreadcrumb['@type'], 'BreadcrumbList');
  assert.equal(homeBreadcrumb.itemListElement.length, 1);

  const spokeBreadcrumb = buildBreadcrumbSchema(
    mockSpokePage,
    mockSpokePage.data.h1,
    'https://airesacondicionadoscancun.vercel.app/mantenimiento-en-puerto-cancun'
  );
  assert.equal(spokeBreadcrumb['@type'], 'BreadcrumbList');
  assert.equal(spokeBreadcrumb.itemListElement.length, 2);
  assert.equal(spokeBreadcrumb.itemListElement[1].name, mockSpokePage.data.h1);
});

test('buildServiceSchema builds valid Service entity for hub page', () => {
  const serviceSchema = buildServiceSchema(
    mockHubPage,
    'https://airesacondicionadoscancun.vercel.app/mantenimiento-aires-acondicionados-cancun'
  );

  assert.ok(serviceSchema);
  assert.equal(serviceSchema['@type'], 'Service');
  assert.equal(serviceSchema.provider['@type'], 'HVACBusiness');
  assert.equal(serviceSchema.provider['@id'], 'https://airesacondicionadoscancun.vercel.app/#organization');
  assert.ok(Array.isArray(serviceSchema.areaServed));
});

test('buildServiceSchema builds valid Service entity for spoke page', () => {
  const serviceSchema = buildServiceSchema(
    mockSpokePage,
    'https://airesacondicionadoscancun.vercel.app/mantenimiento-en-puerto-cancun'
  );

  assert.ok(serviceSchema);
  assert.equal(serviceSchema['@type'], 'Service');
  assert.equal(serviceSchema.provider['@id'], 'https://airesacondicionadoscancun.vercel.app/#organization');
  assert.deepEqual(serviceSchema.areaServed, {
    '@type': 'Place',
    name: 'Puerto Cancún',
  });
});

test('buildServiceSchema returns null for non-hub/spoke pages', () => {
  const serviceSchema = buildServiceSchema(
    mockLegalPage,
    'https://airesacondicionadoscancun.vercel.app/privacidad'
  );

  assert.equal(serviceSchema, null);
});

test('Strict Policy Compliance: @type "FAQPage" is explicitly prohibited from all schemas', () => {
  const localBiz = JSON.stringify(buildLocalBusinessSchema());
  const breadcrumb = JSON.stringify(
    buildBreadcrumbSchema(mockSpokePage, 'H1', 'https://example.com')
  );
  const serviceHub = JSON.stringify(
    buildServiceSchema(mockHubPage, 'https://example.com')
  );
  const serviceSpoke = JSON.stringify(
    buildServiceSchema(mockSpokePage, 'https://example.com')
  );

  for (const payload of [localBiz, breadcrumb, serviceHub, serviceSpoke]) {
    assert.doesNotMatch(payload, /FAQPage/i, 'Schema payload must not contain FAQPage!');
  }
});
