import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getPageUrl } from './getPageUrl.ts';
import { getSiloLinks, type SiloPageEntry } from './siloLinking.ts';

const mockPages: SiloPageEntry[] = [
  {
    id: 'index',
    data: {
      title: 'Aires Acondicionados Cancún | Reparación y Mantenimiento',
      description: 'Servicio técnico especializado en Cancún.',
      h1: 'Reparación y Mantenimiento de Aires Acondicionados en Cancún',
      type: 'hub',
      service: 'general',
    },
  },
  {
    id: 'reparacion-aires-acondicionados-cancun',
    data: {
      title: 'Reparación de Aires Acondicionados en Cancún',
      description: 'Reparación urgente 24h.',
      h1: 'Reparación de Aires Acondicionados en Cancún',
      type: 'hub',
      service: 'reparacion',
    },
  },
  {
    id: 'mantenimiento-aires-acondicionados-cancun',
    data: {
      title: 'Mantenimiento de Aires Acondicionados en Cancún',
      description: 'Mantenimiento preventivo.',
      h1: 'Mantenimiento de Aires Acondicionados en Cancún',
      type: 'hub',
      service: 'mantenimiento',
    },
  },
  {
    id: 'reparacion-en-zona-hotelera',
    data: {
      title: 'Reparación en Zona Hotelera',
      description: 'Servicio express en Zona Hotelera.',
      h1: 'Reparación de Aires Acondicionados en Zona Hotelera Cancún',
      type: 'spoke',
      service: 'reparacion',
      locationName: 'Zona Hotelera',
      locationSlug: 'zona-hotelera',
      parentHub: 'reparacion-aires-acondicionados-cancun',
    },
  },
  {
    id: 'mantenimiento-en-puerto-cancun',
    data: {
      title: 'Mantenimiento en Puerto Cancún',
      description: 'Mantenimiento premium en Puerto Cancún.',
      h1: 'Mantenimiento de Aire Acondicionado en Puerto Cancún',
      type: 'spoke',
      service: 'mantenimiento',
      locationName: 'Puerto Cancún',
      locationSlug: 'puerto-cancun',
      parentHub: 'mantenimiento-aires-acondicionados-cancun',
    },
  },
  {
    id: 'privacidad',
    data: {
      title: 'Aviso de Privacidad',
      description: 'Políticas de privacidad.',
      h1: 'Aviso de Privacidad',
      type: 'legal',
      service: 'legal',
    },
  },
];

test('getPageUrl normalizes slugs correctly', () => {
  assert.equal(getPageUrl({ id: 'index' }), '/');
  assert.equal(getPageUrl({ id: 'reparacion-aires-acondicionados-cancun' }), '/reparacion-aires-acondicionados-cancun');
  assert.equal(getPageUrl({ id: '/privacidad/' }), '/privacidad');
});

test('Home page returns all Hub links', () => {
  const home = mockPages.find((p) => p.id === 'index')!;
  const links = getSiloLinks(home, mockPages);

  assert.equal(links.type, 'home');
  assert.ok(links.hubs);
  assert.ok(links.hubs.length >= 2);
  assert.ok(links.hubs.some((h) => h.slug === 'reparacion-aires-acondicionados-cancun'));
  assert.ok(links.hubs.some((h) => h.slug === 'mantenimiento-aires-acondicionados-cancun'));
});

test('Hub page returns child Spokes', () => {
  const repHub = mockPages.find((p) => p.id === 'reparacion-aires-acondicionados-cancun')!;
  const links = getSiloLinks(repHub, mockPages);

  assert.equal(links.type, 'hub');
  assert.ok(links.spokes);
  assert.ok(links.spokes.some((s) => s.slug === 'reparacion-en-zona-hotelera'));
});

test('Spoke page returns parent Hub, Home, and laterals', () => {
  const spoke = mockPages.find((p) => p.id === 'reparacion-en-zona-hotelera')!;
  const links = getSiloLinks(spoke, mockPages);

  assert.equal(links.type, 'spoke');
  assert.equal(links.parentHub?.slug, 'reparacion-aires-acondicionados-cancun');
  assert.equal(links.home?.slug, 'index');
});

test('Zero Orphan Pages (Mock): every non-legal page is referenced by another page', () => {
  const incomingLinksMap = new Map<string, number>();

  for (const page of mockPages) {
    incomingLinksMap.set(page.id, 0);
  }

  for (const page of mockPages) {
    const links = getSiloLinks(page, mockPages);

    if (links.hubs) {
      for (const h of links.hubs) {
        incomingLinksMap.set(h.slug, (incomingLinksMap.get(h.slug) || 0) + 1);
      }
    }
    if (links.spokes) {
      for (const s of links.spokes) {
        incomingLinksMap.set(s.slug, (incomingLinksMap.get(s.slug) || 0) + 1);
      }
    }
    if (links.parentHub) {
      incomingLinksMap.set(
        links.parentHub.slug,
        (incomingLinksMap.get(links.parentHub.slug) || 0) + 1
      );
    }
    if (links.home) {
      incomingLinksMap.set(
        links.home.slug,
        (incomingLinksMap.get(links.home.slug) || 0) + 1
      );
    }
    if (links.laterals) {
      for (const l of links.laterals) {
        incomingLinksMap.set(l.slug, (incomingLinksMap.get(l.slug) || 0) + 1);
      }
    }
  }

  for (const page of mockPages) {
    if (page.data.type !== 'legal') {
      const count = incomingLinksMap.get(page.id) || 0;
      assert.ok(
        count > 0,
        `Page '${page.id}' is an orphan page with 0 incoming internal links!`
      );
    }
  }
});

function parseYamlValue(yamlStr: string, key: string): string | undefined {
  const match = yamlStr.match(new RegExp(`^${key}:\\s*"?(.*?)"?$`, 'm'));
  return match ? match[1].trim() : undefined;
}

test('Zero Orphan Pages & Link Connectivity (Real Content Pages): Exactly 50 pages verified', () => {
  const contentDir = path.resolve(process.cwd(), 'src/content/pages');
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));

  assert.equal(files.length, 50, `Expected 50 pages in src/content/pages, found ${files.length}`);

  const realPages: SiloPageEntry[] = files.map((file) => {
    const id = file.replace(/\.md$/, '');
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(fmMatch, `File ${file} has missing frontmatter`);
    const yaml = fmMatch[1];

    const type = parseYamlValue(yaml, 'type') as 'hub' | 'spoke' | 'legal';
    const service = parseYamlValue(yaml, 'service') || 'general';
    const title = parseYamlValue(yaml, 'title') || '';
    const description = parseYamlValue(yaml, 'description') || '';
    const h1 = parseYamlValue(yaml, 'h1') || '';
    const locationName = parseYamlValue(yaml, 'locationName');
    const locationSlug = parseYamlValue(yaml, 'locationSlug');
    const parentHub = parseYamlValue(yaml, 'parentHub');

    return {
      id,
      data: {
        title,
        description,
        h1,
        type,
        service,
        locationName,
        locationSlug,
        parentHub,
      },
    };
  });

  const incomingLinksMap = new Map<string, number>();
  for (const page of realPages) {
    incomingLinksMap.set(page.id, 0);
  }

  for (const page of realPages) {
    const links = getSiloLinks(page, realPages);

    if (links.hubs) {
      for (const h of links.hubs) {
        incomingLinksMap.set(h.slug, (incomingLinksMap.get(h.slug) || 0) + 1);
      }
    }
    if (links.spokes) {
      for (const s of links.spokes) {
        incomingLinksMap.set(s.slug, (incomingLinksMap.get(s.slug) || 0) + 1);
      }
    }
    if (links.parentHub) {
      incomingLinksMap.set(
        links.parentHub.slug,
        (incomingLinksMap.get(links.parentHub.slug) || 0) + 1
      );
    }
    if (links.home) {
      incomingLinksMap.set(
        links.home.slug,
        (incomingLinksMap.get(links.home.slug) || 0) + 1
      );
    }
    if (links.laterals) {
      for (const l of links.laterals) {
        incomingLinksMap.set(l.slug, (incomingLinksMap.get(l.slug) || 0) + 1);
      }
    }
  }

  for (const page of realPages) {
    if (page.data.type !== 'legal') {
      const count = incomingLinksMap.get(page.id) || 0;
      assert.ok(
        count > 0,
        `Real Page '${page.id}' is an orphan page with 0 incoming internal links!`
      );
    }
  }
});
