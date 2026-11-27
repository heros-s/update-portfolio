'use client'

import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

// "Antes" reconstruído (DESIGN.md §6). Regras: sempre rotulado como reconstituição,
// feito em HTML (esquemático, nunca imitando um print) e só com fatos do case.
// Valores que seriam inventados aparecem tarjados.

type Locale = 'pt' | 'en'

const LABEL: Record<Locale, string> = {
    pt: 'reconstituição ilustrativa, não é print original',
    en: 'illustrative reconstruction, not an original screenshot',
}

const BEFORE: Record<Locale, string> = { pt: 'antes', en: 'before' }

function Redacted({ w = 'w-10' }: { w?: string }) {
    return <span aria-hidden="true" className={cn('inline-block h-2.5 rounded-[1px] bg-border align-middle', w)} />
}

function Frame({
    locale,
    title,
    caption,
    children,
}: {
    locale: Locale
    title: string
    caption: string
    children: React.ReactNode
}) {
    return (
        <figure className="flex flex-col border border-dashed border-muted-foreground/40 bg-sunken">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-dashed border-muted-foreground/40 px-4 py-2.5 font-mono text-xs">
                <span className="text-muted-foreground">
                    {BEFORE[locale]}: {title}
                </span>
                <span className="text-run">{LABEL[locale]}</span>
            </div>
            <div className="overflow-x-auto p-4 md:p-5">{children}</div>
            <figcaption className="border-t border-dashed border-muted-foreground/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                {caption}
            </figcaption>
        </figure>
    )
}

function Chain({ steps }: { steps: string[] }) {
    return (
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[13px]">
            {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                    <span className="border border-border px-2.5 py-1.5 text-foreground">{s}</span>
                    {i < steps.length - 1 && (
                        <span aria-hidden="true" className="text-muted-foreground">
                            →
                        </span>
                    )}
                </li>
            ))}
        </ol>
    )
}

// pjt1: relatório de ponto conferido linha a linha (~300 registros/mês, ~2 h/dia).
function Ponto({ locale }: { locale: Locale }) {
    const c = {
        pt: {
            title: 'relatório de ponto',
            cols: ['colaborador', 'data', 'h. extra', 'chamado?', 'ação manual'],
            actions: ['cobrar colaborador', 'cobrar gestor', 'conferir', 'cobrar colaborador', 'cobrar gestor', 'conferir'],
            tickets: ['não', 'pendente', '?', 'não', 'pendente', '?'],
            more: '… ~300 registros por mês',
            caption:
                'Todo dia o RH extraía o relatório de ponto, filtrava quem fez hora extra, conferia um a um se o chamado existia e cobrava colaborador ou gestor individualmente: cerca de 2 horas por dia.',
        },
        en: {
            title: 'timesheet report',
            cols: ['employee', 'date', 'overtime', 'ticket?', 'manual action'],
            actions: ['nudge employee', 'nudge manager', 'check', 'nudge employee', 'nudge manager', 'check'],
            tickets: ['no', 'pending', '?', 'no', 'pending', '?'],
            more: '… ~300 records per month',
            caption:
                'Every day HR pulled the timesheet report, filtered who worked overtime, checked one by one whether a ticket existed and chased employees or managers individually: about 2 hours a day.',
        },
    }[locale]
    return (
        <Frame locale={locale} title={c.title} caption={c.caption}>
            <table className="w-full min-w-[520px] border-collapse font-mono text-[13px]">
                <thead>
                    <tr className="text-left text-muted-foreground">
                        {c.cols.map((h) => (
                            <th key={h} className="border-b border-border py-2 pr-4 font-normal">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {c.actions.map((a, i) => (
                        <tr key={i}>
                            <td className="border-b border-border py-2 pr-4">
                                <Redacted w="w-24" />
                            </td>
                            <td className="border-b border-border py-2 pr-4">
                                <Redacted w="w-12" />
                            </td>
                            <td className="border-b border-border py-2 pr-4">
                                <Redacted w="w-8" />
                            </td>
                            <td className="border-b border-border py-2 pr-4 text-muted-foreground">{c.tickets[i]}</td>
                            <td className="border-b border-border py-2 pr-4 text-run">{a}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="pt-3 font-mono text-[13px] text-muted-foreground">{c.more}</p>
        </Frame>
    )
}

// pjt2: CSV mensal do ERP, só dados brutos.
function CsvErp({ locale }: { locale: Locale }) {
    const c = {
        pt: {
            title: 'export mensal do ERP (.csv)',
            caption:
                'Todo mês chegava um CSV do ERP com receita bruta, lucro bruto, lucro líquido, CMV e despesas operacionais, só os números brutos: nenhum comparativo entre períodos, nenhum indicador pronto.',
        },
        en: {
            title: 'monthly ERP export (.csv)',
            caption:
                'Every month an ERP CSV arrived with gross revenue, gross profit, net profit, COGS and operating expenses, raw numbers only: no period comparisons, no ready-made indicators.',
        },
    }[locale]
    const cols = ['mes', 'receita_bruta', 'lucro_bruto', 'lucro_liquido', 'cmv', 'despesas_op']
    return (
        <Frame locale={locale} title={c.title} caption={c.caption}>
            <div className="min-w-[560px] font-mono text-[13px]">
                <div className="grid grid-cols-6 gap-3 border-b border-border pb-2 text-muted-foreground">
                    {cols.map((h) => (
                        <span key={h}>{h}</span>
                    ))}
                </div>
                {Array.from({ length: 6 }).map((_, r) => (
                    <div key={r} className="grid grid-cols-6 gap-3 border-b border-border py-2">
                        {cols.map((h) => (
                            <span key={h}>
                                <Redacted w={h === 'mes' ? 'w-8' : 'w-16'} />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </Frame>
    )
}

// pjt3: ciclo manual de hora em hora, 08:00 às 20:00, segunda a sábado.
function CicloMailing({ locale }: { locale: Locale }) {
    const c = {
        pt: {
            title: 'ciclo manual de campanha',
            steps: ['query no PostgreSQL', 'aguardar', 'exportar CSV', 'subir no discador via SFTP'],
            each: '15–20 min',
            days: 'segunda a sábado',
            caption:
                'A cada hora, das 08:00 às 20:00, de segunda a sábado, alguém repetia o ciclo inteiro à mão. Cada rodada levava de 15 a 20 minutos.',
        },
        en: {
            title: 'manual campaign cycle',
            steps: ['PostgreSQL query', 'wait', 'export CSV', 'upload to dialer via SFTP'],
            each: '15–20 min',
            days: 'Monday to Saturday',
            caption:
                'Every hour from 08:00 to 20:00, Monday to Saturday, someone repeated the whole cycle by hand. Each round took 15 to 20 minutes.',
        },
    }[locale]
    const hours = Array.from({ length: 13 }, (_, i) => `${String(8 + i).padStart(2, '0')}:00`)
    return (
        <Frame locale={locale} title={c.title} caption={c.caption}>
            <div className="flex flex-col gap-5">
                <Chain steps={c.steps} />
                <div className="flex flex-col gap-2">
                    <p className="font-mono text-xs text-muted-foreground">{c.days}</p>
                    <ol className="grid grid-cols-4 gap-1.5 font-mono text-xs sm:grid-cols-7 md:grid-cols-13">
                        {hours.map((h) => (
                            <li key={h} className="flex flex-col gap-1 border border-border p-1.5">
                                <span>{h}</span>
                                <span className="text-run">{c.each}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Frame>
    )
}

// pjt5: 200+ slides montados à mão a cada pesquisa.
function Slides({ locale }: { locale: Locale }) {
    const c = {
        pt: {
            title: 'apresentação da pesquisa de clima',
            steps: ['extrair CSV', 'criar gráficos', 'capturar prints', 'montar slides'],
            count: '200+ slides por pesquisa',
            caption:
                'A cada pesquisa o RH extraía o CSV, criava os gráficos à mão, capturava prints e montava uma apresentação com mais de 200 slides.',
        },
        en: {
            title: 'engagement survey deck',
            steps: ['export CSV', 'build charts', 'take screenshots', 'assemble slides'],
            count: '200+ slides per survey',
            caption:
                'For every survey HR exported the CSV, built charts by hand, took screenshots and assembled a deck of more than 200 slides.',
        },
    }[locale]
    return (
        <Frame locale={locale} title={c.title} caption={c.caption}>
            <div className="flex flex-col gap-5">
                <Chain steps={c.steps} />
                <div className="flex flex-col gap-2">
                    <div aria-hidden="true" className="grid grid-cols-20 gap-1">
                        {Array.from({ length: 200 }).map((_, i) => (
                            <span key={i} className="aspect-[16/10] border border-border" />
                        ))}
                    </div>
                    <p className="font-mono text-[13px] text-run">{c.count}</p>
                </div>
            </div>
        </Frame>
    )
}

// pjt6: distância casa → sede calculada à mão para cada colaborador.
function DistanciaManual({ locale }: { locale: Locale }) {
    const c = {
        pt: {
            title: 'cálculo de distância, um por um',
            steps: ['abrir o Maps', 'digitar o endereço', 'traçar rota até a sede', 'copiar os km'],
            times: '× 150+ colaboradores',
            caption:
                'Para o primeiro relatório ESG era preciso a distância real (não em linha reta) entre a casa de mais de 150 colaboradores e a sede. Feito à mão, seria um trabalho lento e sujeito a erro.',
        },
        en: {
            title: 'distance calculation, one by one',
            steps: ['open Maps', 'type the address', 'route to HQ', 'copy the km'],
            times: '× 150+ employees',
            caption:
                'The first ESG report needed the real road distance (not a straight line) between the homes of 150+ employees and HQ. Done by hand, it would be slow and error-prone.',
        },
    }[locale]
    return (
        <Frame locale={locale} title={c.title} caption={c.caption}>
            <div className="flex flex-col gap-3">
                <Chain steps={c.steps} />
                <p className="font-mono text-[13px] text-run">{c.times}</p>
            </div>
        </Frame>
    )
}

const BY_PROJECT: Record<string, (p: { locale: Locale }) => React.ReactElement> = {
    pjt1: Ponto,
    pjt2: CsvErp,
    pjt3: CicloMailing,
    pjt5: Slides,
    pjt6: DistanciaManual,
}

export function hasReconstrucao(projectKey: string) {
    return projectKey in BY_PROJECT
}

export function Reconstrucao({ projectKey }: { projectKey: string }) {
    const locale = (useLocale() === 'en' ? 'en' : 'pt') as Locale
    const Component = BY_PROJECT[projectKey]
    return Component ? <Component locale={locale} /> : null
}
