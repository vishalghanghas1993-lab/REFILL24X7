import { calculateLevel, calculateXp, levelProgressPercent } from '../utils/formatters';
import ProfileDropdown from './ProfileDropdown';

function HubPanel({
  profile,
  onProfileChange,
  hoursPlayed,
  setHoursPlayed,
  favoritesCount,
  achievementCount,
  streak,
  theme,
  setTheme,
  font,
  setFont,
  selectedVideo,
  onOpenAchievements,
  onFactoryReset,
}) {
  const level = calculateLevel(hoursPlayed);
  const progress = levelProgressPercent(hoursPlayed);

  const incrementHours = () => setHoursPlayed((prev) => prev + 1);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <ProfileDropdown profile={profile} onProfileChange={onProfileChange} />

        <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
          <h3 className="font-orbitron text-lg">XP & Progression</h3>
          <p className="text-sm text-slate-300">{calculateXp(hoursPlayed)} XP • Level {level}</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-[var(--accent)] transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
          <button type="button" onClick={incrementHours} className="mt-3 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold">
            +1 Hour Played
          </button>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">Run Streak: <strong>{streak} days</strong></article>
          <article className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">Favorites: <strong>{favoritesCount}</strong></article>
          <article className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">Hours Played: <strong>{hoursPlayed}</strong></article>
          <article className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">Achievements: <strong>{achievementCount}</strong></article>
        </section>
      </div>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
          <h3 className="font-orbitron text-lg">Theme</h3>
          <div className="mt-3 flex gap-2">
            {['#dc2626', '#7c3aed', '#0ea5e9', '#16a34a', '#f59e0b'].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setTheme(color)}
                className={`h-8 w-8 rounded-full border-2 ${theme === color ? 'border-white' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <select value={font} onChange={(event) => setFont(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
            <option value="orbitron">Orbitron</option>
            <option value="rajdhani">Rajdhani</option>
            <option value="inter">Inter</option>
          </select>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
          <h3 className="font-orbitron text-lg">Category Preview</h3>
          {selectedVideo ? <video src={selectedVideo} className="mt-3 h-40 w-full rounded-xl object-cover" controls autoPlay muted loop /> : <p className="mt-2 text-sm text-slate-400">No preview selected.</p>}
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
          <div className="grid gap-2">
            <button type="button" className="rounded-lg bg-indigo-600 px-3 py-2" onClick={() => window.open('https://discord.com', '_blank')}>Discord</button>
            <button type="button" className="rounded-lg bg-emerald-600 px-3 py-2" onClick={() => window.open('https://whatsapp.com', '_blank')}>WhatsApp Community</button>
            <button type="button" className="rounded-lg bg-slate-700 px-3 py-2" onClick={onOpenAchievements}>Achievements</button>
            <button type="button" className="rounded-lg bg-slate-700 px-3 py-2" onClick={() => window.open('mailto:feedback@crooz-in.local', '_blank')}>Feedback</button>
            <button type="button" className="rounded-lg bg-rose-800 px-3 py-2" onClick={onFactoryReset}>Factory Reset</button>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default HubPanel;
