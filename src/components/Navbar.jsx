import { Bell, Volume2, VolumeX } from 'lucide-react';

function Navbar({ activeTab, onChangeTab, unreadCount, onToggleNotifications, volume, onVolumeChange, muted, onToggleMute }) {
  const tabs = ['home', 'games', 'apps', 'hub'];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <h1 className="font-orbitron text-xl font-bold tracking-widest">CROOZ-IN Launcher</h1>
        <nav className="flex items-center gap-2 rounded-xl bg-slate-900/80 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onChangeTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm uppercase tracking-wide transition ${
                activeTab === tab ? 'bg-[var(--accent)] text-white shadow-neon' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button type="button" className="relative rounded-full bg-slate-900 p-2 hover:bg-slate-800" onClick={onToggleNotifications}>
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-[var(--accent)] px-1.5 text-xs font-semibold">{unreadCount}</span>
            )}
          </button>
          <button type="button" className="rounded-full bg-slate-900 p-2 hover:bg-slate-800" onClick={onToggleMute}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            aria-label="Volume"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={onVolumeChange}
            className="h-1 w-24 cursor-pointer accent-[var(--accent)]"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
