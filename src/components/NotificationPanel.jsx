import { formatDate } from '../utils/formatters';

function NotificationPanel({ open, items, onMarkRead }) {
  if (!open) return null;

  return (
    <section className="absolute right-4 top-20 z-20 w-80 rounded-xl border border-slate-700 bg-slate-950 p-3 shadow-2xl">
      <h3 className="mb-3 font-orbitron text-lg">Notifications</h3>
      <div className="max-h-72 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onMarkRead(item.id)}
            className={`w-full rounded-lg p-2 text-left ${item.read ? 'bg-slate-900 text-slate-400' : 'bg-[var(--accent)]/20 text-white'}`}
          >
            <p className="text-sm">{item.message}</p>
            <p className="text-xs opacity-70">{formatDate(item.createdAt)}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default NotificationPanel;
