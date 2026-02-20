function AchievementModal({ open, onClose, achievements, unlockedIds }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-950 p-6">
        <h3 className="font-orbitron text-2xl">Achievements</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {achievements.map((achievement) => {
            const unlocked = unlockedIds.includes(achievement.id);
            return (
              <article key={achievement.id} className={`rounded-xl border p-3 ${unlocked ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-slate-900/80'}`}>
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm text-slate-300">{achievement.requirement}</p>
                <p className="mt-2 text-xs uppercase tracking-wider">{unlocked ? 'Unlocked' : 'Locked'}</p>
              </article>
            );
          })}
        </div>
        <button type="button" onClick={onClose} className="mt-4 rounded-lg bg-[var(--accent)] px-4 py-2">Close</button>
      </section>
    </div>
  );
}

export default AchievementModal;
