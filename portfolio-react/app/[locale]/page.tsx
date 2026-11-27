// Home Page
'use client'
import { useState } from "react"
import { useTranslations } from 'next-intl'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { HeroSection } from "../components/HeroSection"
import { Trajetoria } from '../components/Trajetoria'
import { ContactSection } from '../components/ContactSection'
import { ScrollReveal } from '../components/ScrollReveal'
import { ProjectRow, type ProjectRowData } from '../components/ProjectRow'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import projectsData from "./projetos/data/projects.json"

const FILTERS = [
    { key: 'all', labelKey: 'filters.all' },
    { key: 'automacao', labelKey: 'filters.automation' },
    { key: 'bi', labelKey: 'filters.bi' },
    { key: 'data', labelKey: 'filters.dataEngineering' },
] as const

type Run = { before: string; after: string; frequency: string; countPrefix?: string; countSuffix?: string }

export default function Home() {
    const t = useTranslations('projects')
    const [filter, setFilter] = useState<string>('all')
    const [listRef] = useAutoAnimate<HTMLUListElement>({ duration: 250 })

    const projects = projectsData.projetos.map((p) => {
        const run = t.raw(`items.${p.key}.run`) as Run
        const contagem = (p as { contagem?: { de: number; para: number } }).contagem
        const row: ProjectRowData = {
            slug: p.slug,
            flow: p.fluxo,
            title: t(`items.${p.key}.title`),
            stack: p.tecnologias,
            statusLabel: t('statusShipped'),
            before: run.before,
            after: run.after,
            frequency: run.frequency,
            count: contagem
                ? { from: contagem.de, to: contagem.para, prefix: run.countPrefix, suffix: run.countSuffix }
                : undefined,
        }
        return { id: p.id, categories: p.categorias, row }
    })

    const filtered = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))

    return (
        <>
            <HeroSection />

            <section id="projetos" className="border-b border-border py-20 md:py-24">
                <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 md:px-10">
                    <ScrollReveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-[44px]">{t('sectionTitle')}</h2>
                            <p className="text-muted-foreground">{t('sectionSubtitle')}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span id="filtro-label" className="font-mono text-[13px] text-muted-foreground">
                                {t('filterLabel')}:
                            </span>
                            <ToggleGroup
                                aria-labelledby="filtro-label"
                                value={[filter]}
                                onValueChange={(value) => setFilter(value[0] ?? 'all')}
                                className="flex-wrap"
                            >
                                {FILTERS.map((f) => (
                                    <ToggleGroupItem
                                        key={f.key}
                                        value={f.key}
                                        className="h-11 rounded-[2px] border border-border px-4 font-mono text-[13px] font-normal text-muted-foreground hover:bg-surface hover:text-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
                                    >
                                        {t(f.labelKey)}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    </ScrollReveal>

                    <div>
                        <div
                            aria-hidden="true"
                            className="hidden grid-cols-[110px_minmax(0,1fr)_250px_120px] gap-x-6 border-y border-border px-3 py-3 font-mono text-xs text-muted-foreground md:grid"
                        >
                            <span>{t('columns.status')}</span>
                            <span>{t('columns.flow')}</span>
                            <span>{t('columns.beforeAfter')}</span>
                            <span>{t('columns.frequency')}</span>
                        </div>
                        <ul ref={listRef} className="border-t border-border md:border-t-0">
                            {filtered.map((p) => (
                                <li key={p.id}>
                                    <ProjectRow row={p.row} labels={{ before: t('beforeLabel'), after: t('afterLabel') }} />
                                </li>
                            ))}
                        </ul>
                        <p className="pt-4 font-mono text-[13px] text-muted-foreground">
                            {t('countLabel', { count: filtered.length })}
                        </p>
                    </div>
                </div>
            </section>

            <Trajetoria />

            <section id="contact">
                <ContactSection />
            </section>
        </>
    )
}
