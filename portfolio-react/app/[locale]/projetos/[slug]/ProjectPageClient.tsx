'use client'

import { motion, useScroll } from 'motion/react'
import { useTranslations } from 'next-intl'
import projectsData from '../data/projects.json'
import { Link } from '../../../../i18n/navigation'
import { ProjectMedia } from '../../../components/ProjectMedia'
import { ScrollReveal } from '../../../components/ScrollReveal'
import { BeforeAfter, type BeforeAfterCount } from '../../../components/BeforeAfter'
import { Reconstrucao, hasReconstrucao } from '../../../components/Reconstrucao'

// Página de case = detalhe de uma execução (DESIGN.md §4): cabeçalho com status e
// metadados, mídia, e os "nós" problema → solução → detalhes → impacto → aprendizados.

interface ProjectPageClientProps {
    slug: string
}

type Run = { before: string; after: string; frequency: string; countPrefix?: string; countSuffix?: string }
type Metric = { label: string; value: string | number }

// Campos extras que alguns cases têm; os sequenciais viram cadeia de nós.
const DETAIL_FIELDS = ['architecture', 'pipeline', 'keyFeatures', 'keyMetrics', 'dataInputs'] as const
const SEQUENTIAL = new Set(['architecture', 'pipeline'])

type Project = (typeof projectsData.projetos)[number] & { video?: string; contagem?: { de: number; para: number } }

function countFor(p: Project, run: Run): BeforeAfterCount | undefined {
    return p.contagem
        ? { from: p.contagem.de, to: p.contagem.para, prefix: run.countPrefix, suffix: run.countSuffix }
        : undefined
}

export function ProjectPageClient({ slug }: ProjectPageClientProps) {
    const projects = projectsData.projetos as Project[]
    const index = projects.findIndex((p) => p.slug === slug)
    const project = projects[index]

    const tp = useTranslations('projects.items')
    const t = useTranslations('projectPage')
    const tProjects = useTranslations('projects')
    const { scrollYProgress } = useScroll()

    if (!project) {
        return <div className="mx-auto max-w-[1200px] px-4 pt-32 pb-20 md:px-10">{t('projectNotFound')}</div>
    }

    const k = project.key
    const run = tp.raw(`${k}.run`) as Run
    const labels = { before: tProjects('beforeLabel'), after: tProjects('afterLabel') }
    const categories = (tp.raw(`${k}.categories`) as string[] | undefined) ?? project.categorias
    const stack = (tp.raw(`${k}.techStack`) as string[] | undefined) ?? project.tecnologias
    const impact = tp.raw(`${k}.impact`) as string[] | string
    const metrics = tp.raw(`${k}.metrics`) as Record<string, Metric>
    const challenges = tp.raw(`${k}.challenges`) as string[] | string
    const funFact = tp.has(`${k}.funFact`) ? tp(`${k}.funFact`) : null
    const detailField = DETAIL_FIELDS.find((f) => tp.has(`${k}.${f}`))
    const details = detailField ? (tp.raw(`${k}.${detailField}`) as string[]) : null

    const next = projects[(index + 1) % projects.length]
    const nextRun = tp.raw(`${next.key}.run`) as Run

    return (
        <>
            <motion.div
                aria-hidden="true"
                className="fixed inset-x-0 top-16 z-40 h-0.5 origin-left bg-run"
                style={{ scaleX: scrollYProgress }}
            />

            <article className="mx-auto flex max-w-[1200px] flex-col gap-14 px-4 pt-28 pb-20 md:px-10 md:pt-32">
                <header className="flex flex-col gap-8">
                    <div className="flex flex-col gap-5">
                        <Link
                            href="/#projetos"
                            className="self-start font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                        >
                            ← {t('back')}
                        </Link>
                        <p className="flex flex-wrap gap-x-3 font-mono text-[13px]">
                            <span className="text-ok">● {t('statusShipped')}</span>
                            <span className="text-muted-foreground">{project.fluxo}</span>
                        </p>
                        <h1 className="max-w-[22ch] text-4xl leading-[1.02] font-bold tracking-[-0.03em] text-balance md:text-6xl">
                            {tp(`${k}.title`)}
                        </h1>
                        <p className="max-w-[60ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                            {tp(`${k}.subtitle`)}
                        </p>
                    </div>

                    <dl className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
                        <MetaItem label={t('meta.beforeAfter')}>
                            <BeforeAfter before={run.before} after={run.after} count={countFor(project, run)} labels={labels} className="text-[15px]" />
                        </MetaItem>
                        <MetaItem label={t('meta.frequency')}>
                            <span className="font-mono text-[15px]">{run.frequency}</span>
                        </MetaItem>
                        <MetaItem label={t('meta.categories')}>{categories.join(', ')}</MetaItem>
                        <MetaItem label={t('meta.stack')}>
                            <span className="font-mono text-[13px] leading-relaxed">{project.tecnologias.join(', ')}</span>
                        </MetaItem>
                    </dl>
                </header>

                <ProjectMedia imagens={project.imagens} video={project.video} titulo={tp(`${k}.title`)} />

                <ol className="flex flex-col">
                    <Node slug={t('nodes.problem')} heading={t('sections.problem')}>
                        <Prose>{tp(`${k}.problem`)}</Prose>
                        {hasReconstrucao(k) && (
                            <div className="flex flex-col gap-3 pt-2">
                                <p className="text-sm text-muted-foreground">{t('reconstructionNote')}</p>
                                <Reconstrucao projectKey={k} />
                            </div>
                        )}
                    </Node>

                    <Node slug={t('nodes.solution')} heading={t('sections.solution')}>
                        <Prose>{tp(`${k}.solution`)}</Prose>
                        <p className="font-mono text-[13px] text-muted-foreground">
                            {t('meta.stack')}: <span className="text-foreground">{stack.join(', ')}</span>
                        </p>
                    </Node>

                    {detailField && details && (
                        <Node slug={t('nodes.details')} heading={t(`sections.${detailField}`)}>
                            {SEQUENTIAL.has(detailField) ? (
                                <ol className="flex flex-col gap-2 font-mono text-[13px]">
                                    {details.map((step, i) => (
                                        <li key={step} className="flex flex-col items-start gap-2">
                                            <span className="border border-border bg-sunken px-3 py-2">{step}</span>
                                            {i < details.length - 1 && (
                                                <span aria-hidden="true" className="pl-4 text-muted-foreground">
                                                    ↓
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <List items={details} />
                            )}
                        </Node>
                    )}

                    <Node slug={t('nodes.impact')} heading={t('sections.impact')}>
                        <List items={Array.isArray(impact) ? impact : [impact]} marker="+" markerClass="text-ok" />
                        <dl className="mt-2 border-t border-border">
                            {Object.entries(metrics).map(([key, m]) => (
                                <div
                                    key={key}
                                    className="grid grid-cols-1 gap-1 border-b border-border py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6"
                                >
                                    <dt className="text-sm text-muted-foreground">{m.label}</dt>
                                    <dd className="font-mono text-[15px]">{m.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </Node>

                    <Node slug={t('nodes.learnings')} heading={t('sections.challenges')}>
                        <List items={Array.isArray(challenges) ? challenges : [challenges]} />
                    </Node>

                    {funFact && (
                        <Node slug={t('nodes.note')} heading={t('sections.funFact')}>
                            <Prose>{funFact}</Prose>
                        </Node>
                    )}
                </ol>

                <Link
                    href={`/projetos/${next.slug}`}
                    className="group flex flex-col gap-3 border border-border bg-sunken p-5 transition-colors hover:bg-surface md:p-6"
                >
                    <span className="font-mono text-[13px] text-muted-foreground">{t('nextRun')}</span>
                    <span className="font-mono text-[13px] text-muted-foreground">{next.fluxo}</span>
                    <span className="text-xl font-semibold underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-run md:text-2xl">
                        {tp(`${next.key}.title`)}
                    </span>
                    <BeforeAfter
                        before={nextRun.before}
                        after={nextRun.after}
                        count={countFor(next, nextRun)}
                        labels={labels}
                        className="text-[15px]"
                    />
                </Link>
            </article>
        </>
    )
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2 border-b border-border py-4 sm:pr-6 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0">
            <dt className="font-mono text-xs text-muted-foreground">{label}</dt>
            <dd>{children}</dd>
        </div>
    )
}

function Node({ slug, heading, children }: { slug: string; heading: string; children: React.ReactNode }) {
    return (
        <li className="grid gap-4 border-t border-border py-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10 lg:py-14">
            <p className="flex items-center gap-2 self-start font-mono text-[13px] text-muted-foreground lg:sticky lg:top-24">
                <span aria-hidden="true" className="text-ok">●</span>
                {slug}
            </p>
            <ScrollReveal className="flex min-w-0 flex-col gap-5">
                <h2 className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">{heading}</h2>
                {children}
            </ScrollReveal>
        </li>
    )
}

function Prose({ children }: { children: React.ReactNode }) {
    return <p className="max-w-[68ch] text-lg leading-relaxed text-foreground/90">{children}</p>
}

function List({ items, marker = '–', markerClass = 'text-muted-foreground' }: { items: string[]; marker?: string; markerClass?: string }) {
    return (
        <ul className="flex max-w-[68ch] flex-col gap-2.5">
            {items.map((item) => (
                <li key={item} className="grid grid-cols-[1.25rem_minmax(0,1fr)] text-lg leading-relaxed">
                    <span aria-hidden="true" className={`font-mono ${markerClass}`}>
                        {marker}
                    </span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}
