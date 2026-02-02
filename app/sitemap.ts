import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://web-malain-et-possible.vercel.app'

interface PlanPage {
  url: string
  titre: string
  zone?: 'HomePage' | 'Profils' | 'Autres' | 'Footer' | 'Masqué'
}

interface PlanSite {
  pages: PlanPage[]
}

/**
 * Génère le sitemap.xml dynamiquement à partir de _Pages-Et-Lien.json
 * Exclut automatiquement les pages avec zone = "Masqué"
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Lire le plan du site (source de vérité)
  const planPath = path.join(process.cwd(), 'data', '_Pages-Et-Lien.json')
  const planData: PlanSite = JSON.parse(fs.readFileSync(planPath, 'utf-8'))

  // Filtrer les pages visibles (exclure "Masqué")
  const pagesVisibles = planData.pages.filter(
    (page) => page.zone !== 'Masqué'
  )

  return pagesVisibles.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.url === '/' ? 'weekly' : 'monthly',
    priority: page.url === '/'
      ? 1
      : page.zone === 'Profils'
        ? 0.9
        : page.zone === 'HomePage'
          ? 0.8
          : 0.7,
  }))
}
