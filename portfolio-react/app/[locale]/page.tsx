// Home Page
'use client' // Permite utilização de hooks como useState
import { HeroSection } from "../components/HeroSection"
import { TechStackCarousel } from "../components/TechStackCarousel"
import { useState } from "react";
import { ProjectCard } from '../components/ProjectCard'
import { AboutSection } from '../components/AboutSection'
import { ContactSection } from '../components/ContactSection'
import projectsData from "./projetos/data/projects.json"
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('projects');
  const [filter, setFilter] = useState('all')

  const CATEGORY_MAP: Record<string, string> = {
    'all': t('filters.all'),
    'automacao': t('filters.automation'),
    'bi': t('filters.bi'),
    'data': t('filters.dataEngineering')
  }

  const projects = projectsData.projetos.map(p => ({
    id: p.id,
    title: t(`items.${p.key}.title`),
    subtitle: t(`items.${p.key}.subtitle`),
    categories: p.categorias.map(cat => CATEGORY_MAP[cat] || cat),
    rawCategories: p.categorias,
    slug: p.slug
  }))

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.rawCategories.includes(filter))

  return (
    <>
      <HeroSection />
      <TechStackCarousel />
      <AboutSection />
      {/* Seção de Projetos */}
      <section id="projetos" className="bg-zinc-950 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center">{t('sectionTitle')}</h1>
          {/* Filtros */}
          <div className="flex gap-3 mb-10 flex-wrap justify-center">
            {Object.keys(CATEGORY_MAP).map(catKey => (
              <button
                key={catKey}
                onClick={() => setFilter(catKey)}
                className={`px-4 py-2 rounded-lg border transition ${filter === catKey
                  ? 'bg-cyan-500 text-black border-cyan-500'
                  : 'border-zinc-700 hover:border-cyan-400'
                  }`}
              >
                {CATEGORY_MAP[catKey]}
              </button>
            ))}
          </div>
          {/* Cards Filtrados */}
          <div className="flex flex-wrap justify-center gap-8">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                title={project.title}
                subtitle={project.subtitle}
                categories={project.categories}
                slug={project.slug}
              />
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  )
}
