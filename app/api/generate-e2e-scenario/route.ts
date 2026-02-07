import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { PlanLien, PlanSite } from '../../../utils/shared/planDuSiteTypes';
import type { E2eIdInventoryItem } from '../../../utils/backoffice';
import { generateE2eIdInventory, genererContenuSpecE2E } from '../../../utils/backoffice';

const PLAN_PATH = path.join(process.cwd(), 'data', '_Pages-Liens-Et-Menus.json');
const SPEC_PATH = path.join(process.cwd(), 'tests', 'end-to-end', 'parcours-complet-liens.spec.ts');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const chemin = body?.chemin;
    if (!Array.isArray(chemin) || chemin.length === 0) {
      return NextResponse.json(
        { error: 'Body doit contenir { chemin: string[] } non vide' },
        { status: 400 }
      );
    }

    if (!fs.existsSync(PLAN_PATH)) {
      return NextResponse.json(
        { error: 'Plan du site (_Pages-Liens-Et-Menus.json) introuvable' },
        { status: 404 }
      );
    }

    const planContent = fs.readFileSync(PLAN_PATH, 'utf8');
    const plan: PlanSite = JSON.parse(planContent);
    const pages = (plan.pages || []) as { url: string; titre?: string }[];
    const liens = (plan.liens || []) as PlanLien[];

    let inventory: E2eIdInventoryItem[] = [];
    try {
      inventory = generateE2eIdInventory();
    } catch {
      inventory = [];
    }

    const codeTest = genererContenuSpecE2E(chemin, liens, pages, inventory);

    const specDir = path.dirname(SPEC_PATH);
    if (!fs.existsSync(specDir)) {
      fs.mkdirSync(specDir, { recursive: true });
    }
    fs.writeFileSync(SPEC_PATH, codeTest, 'utf8');

    return NextResponse.json({
      success: true,
      path: SPEC_PATH,
    });
  } catch (error) {
    console.error('Erreur génération scénario E2E:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Erreur lors de la génération du scénario E2E',
      },
      { status: 500 }
    );
  }
}
