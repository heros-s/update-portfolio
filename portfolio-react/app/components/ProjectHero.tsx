interface ProjectHeroProps {
  titulo: string
  subtitulo: string
  descricaoCurta: string
}

export function ProjectHero({ 
  titulo, 
  subtitulo, 
  descricaoCurta, 
}: ProjectHeroProps) {
  return (
    <section className="bg-zinc-950 pt-32 pb-12 px-6 border-b border-zinc-900">
      <div className="flex flex-col items-center justify-center text-white text-center max-w-4xl mx-auto">
        <p className="text-cyan-400 mb-4 text-sm uppercase tracking-wider">{subtitulo}</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{titulo}</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">{descricaoCurta}</p>
      </div>
    </section>
  )
}