// COMPONENTE que recebe dados via props
import { Link } from "../../i18n/navigation"

interface ProjectCardProps {
    title: string;
    subtitle: string;
    categories: string[]; // Aceita array de categorias
    slug: string;
}

export function ProjectCard({ title, subtitle, categories, slug }: ProjectCardProps) {
    return (
        <Link href={`/projetos/${slug}`} className="block h-full w-full sm:w-auto">
            <div className="flex flex-col h-full w-full sm:w-[350px] border border-zinc-800 p-6 rounded-2xl hover:border-cyan-400 transition-all text-center bg-zinc-900/50 group">
                <div className="grow flex flex-col justify-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">{title}</h3>
                    <p className="text-sm text-zinc-400 line-clamp-3">{subtitle}</p>
                </div>
                
                <div className="flex gap-2 justify-center flex-wrap pt-4 border-t border-zinc-800/50">
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