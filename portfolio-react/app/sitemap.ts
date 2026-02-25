import { MetadataRoute } from 'next'
import projectsData from './[locale]/projetos/data/projects.json'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const locales = ['pt', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
    // Rotas estáticas
    const staticRoutes = ['', '/#projetos', '/#sobre', '/#contact']

    const staticEntries = locales.flatMap(locale =>
    staticRoutes.map(route => ({
    url: `${siteUrl}/${locale}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
    }))
    )

    // Rotas dinâmicas de projeto
    const projectEntries = locales.flatMap(locale =>
    projectsData.projetos.map(project => ({
    url: `${siteUrl}/${locale}/projetos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    }))
)

    return [...staticEntries, ...projectEntries]
}