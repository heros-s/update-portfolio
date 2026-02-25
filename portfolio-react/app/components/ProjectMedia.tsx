'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface ProjectMediaProps {
  imagens: string[]
  video?: string
  titulo: string
}

export function ProjectMedia({ imagens, video, titulo }: ProjectMediaProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const t = useTranslations('projectPage.media');
  
  const heroImage = imagens[0]
  const bonusImages = imagens.slice(1)

  const isSvg = (url: string) => url.toLowerCase().endsWith('.svg')

  // Prevenir scroll quando o zoom está ativo
  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [zoomedImage])

  return (
    <section className="bg-zinc-950 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Seção Principal: Hero + Vídeo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Imagem Hero */}
          <div className="space-y-4">
            <div 
              className="relative group overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl aspect-video cursor-zoom-in bg-zinc-900"
              onClick={() => setZoomedImage(heroImage)}
            >
              <Image 
                src={heroImage} 
                alt={`Imagem principal do projeto ${titulo}`} 
                fill
                className={`transition-transform duration-700 group-hover:scale-105 ${isSvg(heroImage) ? 'object-contain p-4' : 'object-cover'}`}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-medium text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                  {t('clickToEnlarge')}
                </span>
              </div>
            </div>
          </div>

          {/* Container do Vídeo */}
          <div className="space-y-4">
            <div className="relative rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden aspect-video bg-zinc-900 flex items-center justify-center group">
              {video ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={video}
                  title={`Vídeo do projeto ${titulo}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-500 p-8 text-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mb-4 opacity-30"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <path d="m9 8 7 4-7 4Z" />
                  </svg>
                  <p className="text-sm font-medium">{t('videoUnavailable')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seção Fotos Bônus (se houver) */}
        {bonusImages.length > 0 && (
          <div className="pt-12 border-t border-zinc-900">
            <h3 className="text-sm uppercase tracking-[0.2em] text-cyan-500 font-semibold mb-8 text-center">{t('bonusImages')}</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {bonusImages.map((img, index) => (
                <div 
                  key={index}
                  className="relative group overflow-hidden rounded-xl border border-zinc-800 shadow-lg aspect-video cursor-zoom-in bg-zinc-900 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                  onClick={() => setZoomedImage(img)}
                >
                  <Image 
                    src={img} 
                    alt={`Imagem extra ${index + 1} do projeto ${titulo}`} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white font-medium text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                      {t('clickToEnlarge')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modal de Zoom */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setZoomedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl transition-colors z-110 p-2"
            onClick={() => setZoomedImage(null)}
            aria-label={t('closeZoom')}
          >
            &times;
          </button>
          
          <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
            <Image 
              src={zoomedImage} 
              alt={`Imagem ampliada do projeto ${titulo}`}
              width={1920}
              height={1080}
              className="object-contain max-h-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  )
}
