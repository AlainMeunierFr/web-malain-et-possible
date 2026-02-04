/**
 * API Route : GET /api/vitrine/openapi.json
 * Retourne la spécification OpenAPI 3.0 de l'API Vitrine
 * US-12.6 - CA6 : Documentation Swagger
 */

import { NextResponse } from 'next/server';
import { generateOpenApiSpec } from '@/utils/vitrine/openApiSpec';

export async function GET() {
  const spec = generateOpenApiSpec();
  return NextResponse.json(spec);
}
