'use client'

import { Link } from '../../i18n/navigation'
import { BeforeAfter, type BeforeAfterCount } from './BeforeAfter'

export interface ProjectRowData {
    slug: string
    flow: string
    title: string
    stack: string[]
    statusLabel: string
    before: string
    after: string
    frequency: string
    count?: BeforeAfterCount
}

// Uma execução: status · fluxo · antes → depois · frequência (DESIGN.md §4).
export function ProjectRow({ row, labels }: { row: ProjectRowData; labels: { before: string; after: string } }) {
    return (
        <Link
            href={`/projetos/${row.slug}`}
            className="group grid grid-cols-1 gap-x-6 gap-y-3 border-b border-border px-1 py-5 transition-colors hover:bg-surface md:grid-cols-[110px_minmax(0,1fr)_250px_120px] md:items-baseline md:px-3"
        >
            <span className="flex items-baseline justify-between font-mono text-[13px] md:contents">
                <span className="text-ok">
                    <span aria-hidden="true">● </span>
                    {row.statusLabel}
                </span>
                <span className="text-muted-foreground md:order-last">{row.frequency}</span>
            </span>

            <span className="flex min-w-0 flex-col gap-1">
                <span className="font-mono text-[13px] text-muted-foreground">{row.flow}</span>
                <span className="text-lg leading-snug font-semibold text-balance underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-run md:text-xl">
                    {row.title}
                </span>
                <span className="font-mono text-[13px] text-muted-foreground">{row.stack.join(', ')}</span>
            </span>

            <BeforeAfter
                before={row.before}
                after={row.after}
                count={row.count}
                labels={labels}
                className="text-[15px] md:flex-col md:items-start"
            />
        </Link>
    )
}
