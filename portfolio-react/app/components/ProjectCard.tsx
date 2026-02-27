// COMPONENTE que recebe dados via props
import { Link } from "../../i18n/navigation"
import Image from "next/image"

interface ProjectCardProps {
    title: string;
    subtitle: string;
    categories: string[]; // Aceita array de categorias
    slug: string;
    image: string;
}

export function ProjectCard({ title, subtitle, categories, slug, image }: ProjectCardProps) {
    return (
        <Link href={`/projetos/${slug}`} className="block h-full w-full max-w-[400px]">
            <div className="flex flex-col w-full h-[420px] border border-zinc-800 rounded-2xl hover:border-cyan-400 transition-all text-center bg-zinc-900/50 group">
            <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
                <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
            </div>
                <div className="p-6 flex flex-col justify-between overflow-hidden grow">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">{title}</h3>
                    <p className="text-sm text-zinc-400 line-clamp-3">{subtitle}</p>
                </div>
                
                <div className="flex gap-2 justify-center flex-wrap py-3 border-t border-zinc-800/50 flex items-center min-h-[48px]">
                    {categories.map((cat) => (
                        <span key={cat} className="text-[10px] uppercase tracking-wider text-cyan-400 px-2 py-0.5 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                            {cat}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    )
}