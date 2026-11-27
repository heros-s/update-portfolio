'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface ProjectMediaProps {
    imagens: string[]
    video?: string
    titulo: string
}

// Mídia do case como figura de relatório: moldura "sunken", legenda mono, zoom em Dialog.
export function ProjectMedia({ imagens, video, titulo }: ProjectMediaProps) {
    const t = useTranslations('projectPage')
    const isSvg = (url: string) => url.toLowerCase().endsWith('.svg')

    const figures = imagens.map((src, i) => ({ src, n: i + 1 }))
    const [main, ...rest] = figures

    return (
        <div className="flex flex-col gap-6">
            <div className={video ? 'grid gap-6 lg:grid-cols-2' : 'grid gap-6'}>
                {main && <Figure {...main} titulo={titulo} isSvg={isSvg(main.src)} priority />}
                {video && (
                    <figure className="flex flex-col border border-border bg-sunken">
                        <div className="relative aspect-video">
                            <iframe
                                src={video}
                                title={`${t('media.video')}: ${titulo}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                                className="absolute inset-0 size-full border-0"
                            />
                        </div>
                        <figcaption className="border-t border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
                            {t('media.video')}
                        </figcaption>
                    </figure>
                )}
            </div>
            {rest.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                    {rest.map((f) => (
                        <Figure key={f.src} {...f} titulo={titulo} isSvg={isSvg(f.src)} />
                    ))}
                </div>
            )}
        </div>
    )
}

function Figure({
    src,
    n,
    titulo,
    isSvg,
    priority,
}: {
    src: string
    n: number
    titulo: string
    isSvg: boolean
    priority?: boolean
}) {
    const t = useTranslations('projectPage')
    const alt = `${t('media.image')} ${n}: ${titulo}`

    return (
        <figure className="flex flex-col border border-border bg-sunken">
            <Dialog>
                <DialogTrigger
                    className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden"
                    aria-label={`${t('media.clickToEnlarge')}: ${alt}`}
                >
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        priority={priority}
                        sizes="(max-width: 1024px) 100vw, 1200px"
                        className={isSvg ? 'object-contain p-4' : 'object-cover object-top'}
                    />
                </DialogTrigger>
                <DialogContent className="max-w-[min(1400px,calc(100%-2rem))] gap-3 rounded-[2px] border border-border bg-sunken p-3 ring-0 sm:max-w-[min(1400px,calc(100%-2rem))]">
                    <DialogTitle className="pr-10 font-mono text-xs font-normal text-muted-foreground">
                        {t('figure')} {n} · {titulo}
                    </DialogTitle>
                    <Image
                        src={src}
                        alt={alt}
                        width={1920}
                        height={1080}
                        sizes="100vw"
                        className="max-h-[80vh] w-full object-contain"
                    />
                </DialogContent>
            </Dialog>
            <figcaption className="flex justify-between gap-4 border-t border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
                <span>
                    {t('figure')} {n}
                </span>
                <span aria-hidden="true">{t('media.clickToEnlarge')}</span>
            </figcaption>
        </figure>
    )
}
