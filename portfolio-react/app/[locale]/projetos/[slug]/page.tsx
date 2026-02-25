import { getTranslations } from 'next-intl/server'
import projectsData from "../data/projects.json"
import { ProjectPageClient } from './ProjectPageClient'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

interface ProjectPageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const t = await getTranslations({ locale, namespace: 'projects.items' })
  const projectBase = projectsData.projetos.find(p => p.slug === slug)
  if (!projectBase) return {}

  const pKey = projectBase.key
  const title = t(`${pKey}.title`)
  const subtitle = t(`${pKey}.subtitle`)

  return {
    title,
    description: subtitle,
    alternates: {
      canonical: `${siteUrl}/${locale}/projetos/${slug}`,
      languages: {
        'pt': `${siteUrl}/pt/projetos/${slug}`,
        'en': `${siteUrl}/en/projetos/${slug}`,
        'x-default': `${siteUrl}/pt/projetos/${slug}`,
      }
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  return <ProjectPageClient slug={slug} />
}