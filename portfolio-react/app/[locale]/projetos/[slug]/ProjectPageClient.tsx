'use client'

import projectsData from "../data/projects.json"
import { ProjectHero } from "../../../components/ProjectHero"
import { ProjectProblem } from "../../../components/ProjectProblem"
import { ProjectSolution } from "../../../components/ProjectSolution"
import { ProjectImpact } from "../../../components/ProjectImpact"
import { ProjectTechStack } from "../../../components/ProjectTechStack"
import { ProjectMedia } from "../../../components/ProjectMedia"
import { useTranslations } from 'next-intl'

interface ProjectPageClientProps {
  slug: string
}

export function ProjectPageClient({ slug }: ProjectPageClientProps) {
  const projectBase = projectsData.projetos.find(p => p.slug === slug)
  
  const tp = useTranslations('projects.items')
  const tNav = useTranslations('projectPage')
  const tf = useTranslations('projects.filters')

  if (!projectBase) {
    return <div>{tNav('projectNotFound')}</div>
  }

  const CATEGORY_MAP: Record<string, string> = {
    'automacao': tf('automation'),
    'bi': tf('bi'),
    'data': tf('dataEngineering')
  }

  const pKey = projectBase.key
  
  const project = {
    ...projectBase,
    titulo: tp(`${pKey}.title`),
    subtitulo: tp(`${pKey}.subtitle`),
    categoriasTraduzidas: tp.raw(`${pKey}.categories`) 
      ? (tp.raw(`${pKey}.categories`) as string[]).join(' & ') 
      : projectBase.categorias.map(cat => CATEGORY_MAP[cat] || cat).join(' & '),
    problema: tp(`${pKey}.problem`),
    solucao: tp(`${pKey}.solution`),
  }

  return (
    <div className="bg-zinc-950 text-white">
      <ProjectHero 
        titulo={project.titulo}
        subtitulo={project.categoriasTraduzidas}
        descricaoCurta={project.subtitulo}
      />
      <ProjectMedia 
        imagens={projectBase.imagens}
        video={(projectBase as { video?: string }).video}
        titulo={project.titulo}
      />
      <ProjectProblem problema={project.problema} />
      <ProjectSolution 
        solucao={project.solucao}
        tecnologias={projectBase.tecnologias}
      />
      <ProjectImpact 
        impacto={tp.raw(`${pKey}.impact`) as string[]}
        metricas={tp.raw(`${pKey}.metrics`) as unknown as Record<string, { label: string; value: string | number }>}
      />
      <ProjectTechStack 
        tecnologias={projectBase.tecnologias}
        categorias={tp.raw(`${pKey}.categories`) as string[] || projectBase.categorias}
        desafios={tp.raw(`${pKey}.challenges`) as string[]}
      />
    </div>
  )
}