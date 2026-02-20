import { Pencil, Play, Star, Trash2 } from 'lucide-react';

function GameCard({ item, onLaunch, onEdit, onDelete, onToggleFavorite }) {
  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-3 transition hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-neon">
      <img src={item.coverUrl} alt={item.title} className="h-36 w-full rounded-xl object-cover" />
      <div className="mt-3 space-y-2">
        <h3 className="font-orbitron text-lg">{item.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-300">{item.description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          <button type="button" className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold" onClick={() => onLaunch(item)}>
            <Play size={14} className="mr-1 inline" /> Launch
          </button>
          <button type="button" className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs" onClick={() => onEdit(item)}>
            <Pencil size={14} className="mr-1 inline" /> Edit
          </button>
          <button type="button" className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs" onClick={() => onToggleFavorite(item.id)}>
            <Star size={14} className={`mr-1 inline ${item.favorite ? 'fill-yellow-400 text-yellow-400' : ''}`} /> Fav
          </button>
          <button type="button" className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-rose-300" onClick={() => onDelete(item.id)}>
            <Trash2 size={14} className="mr-1 inline" /> Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
