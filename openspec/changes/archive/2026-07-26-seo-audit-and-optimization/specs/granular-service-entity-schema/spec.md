# Capability Specification: Granular Service Entity Schema

## Requirement: Modular Service JSON-LD Schema Injection

Service Hub and Location Spoke pages MUST dynamically embed granular `Service` JSON-LD structured data to communicate specific HVAC offerings to search engine crawlers.

### Scenario: Service Hub and Spoke pages dynamic Service JSON-LD generation
- **Given** a rendered page with page type `hub` or `spoke`
- **When** the HTML `<head>` structured data script block is generated
- **Then** a valid JSON-LD `@type: "Service"` object MUST be included in the JSON-LD script array
- **And** the `Service` entity MUST contain `name`, `serviceType`, and `description` properties accurately reflecting the page's targeted HVAC service (e.g. maintenance, repair, installation, or gas recharge).

## Requirement: Provider & Geographic Area Alignment

The `Service` schema MUST explicitly reference the root `HVACBusiness` provider and bind service delivery to localized geographic entities.

### Scenario: Service entity provider and location binding
- **Given** a `Service` JSON-LD schema block rendered on a Spoke page (e.g., `/servicios/mantenimiento-de-aires-acondicionados/zona-hotelera`)
- **When** search engine crawlers process the structured data graph
- **Then** the `provider` property MUST reference the main `@type: "HVACBusiness"` root entity
- **And** the `areaServed` property MUST specify a `@type: "AdministrativeArea"` or `@type: "Place"` object containing the exact `locationName` (e.g., "Zona Hotelera, Cancún").

## Requirement: Commercial FAQ Schema Policy Compliance

The application MUST strictly exclude commercial `FAQPage` JSON-LD schema to maintain compliance with Google rich results policies for commercial service websites.

### Scenario: Prohibition of commercial FAQPage JSON-LD schema
- **Given** any rendered HTML page across the entire 50-page site
- **When** all JSON-LD `<script type="application/ld+json">` elements in the DOM are inspected
- **Then** the JSON-LD payload MUST NOT contain any `@type: "FAQPage"` entity definition
- **And** interactive FAQ content MUST be rendered using semantic HTML `<details>` and `<summary>` elements without accompanying `FAQPage` structured data tags.
