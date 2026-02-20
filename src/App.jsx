import { useEffect, useMemo, useState } from 'react';
import AddLauncherModal from './components/AddLauncherModal';
import AchievementModal from './components/AchievementModal';
import GameCard from './components/GameCard';
import HubPanel from './components/HubPanel';
import Navbar from './components/Navbar';
import NotificationPanel from './components/NotificationPanel';
import { achievementCatalog, defaultApps, defaultGames, defaultNotifications } from './data/defaults';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateLevel } from './utils/formatters';

function App() {
  // Main persisted states for launcher modules.
  const [activeTab, setActiveTab] = useState('home');
  const [games, setGames] = useLocalStorage('crooz_games', defaultGames);
  const [apps, setApps] = useLocalStorage('crooz_apps', defaultApps);
  const [profile, setProfile] = useLocalStorage('crooz_profile', { username: 'Player One', avatar: '' });
  const [hoursPlayed, setHoursPlayed] = useLocalStorage('crooz_hours', 0);
  const [theme, setTheme] = useLocalStorage('crooz_theme', '#dc2626');
  const [font, setFont] = useLocalStorage('crooz_font', 'orbitron');
  const [volume, setVolume] = useLocalStorage('crooz_volume', 70);
  const [muted, setMuted] = useLocalStorage('crooz_muted', false);
  const [notifications, setNotifications] = useLocalStorage('crooz_notifications', defaultNotifications);
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage('crooz_achievements', []);
  const [streakState, setStreakState] = useLocalStorage('crooz_streak', { count: 1, lastOpen: new Date().toDateString() });

  const [selectedVideo, setSelectedVideo] = useState(games[0]?.videoUrl || '');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ open: false, type: 'games', editing: null });
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', theme);
    document.body.className = `bg-slate-950 text-white font-${font}`;
  }, [theme, font]);

  // Daily run streak tracker.
  useEffect(() => {
    const today = new Date().toDateString();
    if (streakState.lastOpen !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      setStreakState({
        count: streakState.lastOpen === yesterday ? streakState.count + 1 : 1,
        lastOpen: today,
      });
    }
  }, [setStreakState, streakState]);

  const favorites = useMemo(() => [...games, ...apps].filter((item) => item.favorite).slice(0, 8), [games, apps]);
  const totalFavorites = [...games, ...apps].filter((item) => item.favorite).length;

  // Achievement engine recalculates from progression and collection data.
  useEffect(() => {
    const unlocked = new Set(unlockedAchievements);
    if (hoursPlayed > 0) unlocked.add('first-launch');
    if (hoursPlayed >= 100) unlocked.add('100-hours');
    if (hoursPlayed >= 500) unlocked.add('500-hours');
    if (totalFavorites >= 10) unlocked.add('favorites-10');
    if (calculateLevel(hoursPlayed) >= 5) unlocked.add('level-5');
    if (calculateLevel(hoursPlayed) >= 10) unlocked.add('level-10');
    setUnlockedAchievements([...unlocked]);
  }, [hoursPlayed, setUnlockedAchievements, totalFavorites]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const launchItem = (item) => {
    setSelectedVideo(item.videoUrl);
    setHoursPlayed((prev) => prev + 1);
    setNotifications((prev) => [
      { id: crypto.randomUUID(), message: `Launched ${item.title}`, read: false, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const saveLauncher = (payload) => {
    const targetSetter = modalConfig.type === 'games' ? setGames : setApps;
    targetSetter((prev) => {
      if (modalConfig.editing) {
        return prev.map((entry) => (entry.id === modalConfig.editing.id ? { ...entry, ...payload } : entry));
      }
      return [...prev, { id: crypto.randomUUID(), ...payload, favorite: false }];
    });
    setModalConfig({ open: false, type: 'games', editing: null });
  };

  const toggleFavorite = (id, type) => {
    const targetSetter = type === 'games' ? setGames : setApps;
    targetSetter((prev) => {
      const candidate = prev.find((item) => item.id === id);
      if (!candidate?.favorite && totalFavorites >= 8) return prev;
      return prev.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item));
    });
  };

  const deleteLauncher = (id, type) => {
    const targetSetter = type === 'games' ? setGames : setApps;
    targetSetter((prev) => prev.filter((item) => item.id !== id));
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const openAddModal = (type) => setModalConfig({ open: true, type, editing: null });
  const openEditModal = (type, item) => setModalConfig({ open: true, type, editing: item });

  const handleFactoryReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  const filteredGames = games.filter((game) => game.title.toLowerCase().includes(query.toLowerCase()));
  const filteredApps = apps.filter((app) => app.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        unreadCount={unreadCount}
        onToggleNotifications={() => setShowNotifications((prev) => !prev)}
        volume={muted ? 0 : volume}
        onVolumeChange={(event) => setVolume(Number(event.target.value))}
        muted={muted}
        onToggleMute={() => setMuted((prev) => !prev)}
      />
      <NotificationPanel open={showNotifications} items={notifications} onMarkRead={markNotificationRead} />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        {activeTab === 'home' && (
          <>
            <section className="relative overflow-hidden rounded-3xl border border-slate-700 bg-black">
              <video key={selectedVideo} src={selectedVideo} className="h-72 w-full object-cover opacity-60 transition-opacity duration-700" autoPlay muted loop />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 to-transparent p-6">
                <h2 className="font-orbitron text-3xl">{favorites[0]?.title || 'Select a favorite launcher'}</h2>
                <p className="mt-2 max-w-lg text-slate-300">{favorites[0]?.description || 'Your chosen games and apps appear here as quick launch tiles.'}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => favorites[0] && launchItem(favorites[0])} className="rounded-lg bg-[var(--accent)] px-5 py-2 font-semibold">Launch</button>
                  <button type="button" onClick={() => setActiveTab('games')} className="rounded-lg bg-slate-800 px-5 py-2">Explorer</button>
                </div>
              </div>
            </section>
            <section>
              <h3 className="mb-3 font-orbitron text-xl">Favorites ({favorites.length}/8)</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {favorites.map((item) => (
                  <button key={item.id} type="button" onClick={() => setSelectedVideo(item.videoUrl)} className="min-w-56 rounded-xl border border-slate-700 bg-slate-900 p-2 text-left hover:border-[var(--accent)]">
                    <img src={item.coverUrl} alt={item.title} className="h-28 w-full rounded-lg object-cover" />
                    <p className="mt-2 font-semibold">{item.title}</p>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {(activeTab === 'games' || activeTab === 'apps') && (
          <section>
            <div className="mb-4 flex flex-wrap gap-2">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${activeTab}`} className="w-80 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" />
              <button type="button" onClick={() => openAddModal(activeTab)} className="rounded-lg bg-[var(--accent)] px-4 py-2 font-semibold">Add Launcher</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(activeTab === 'games' ? filteredGames : filteredApps).map((item) => (
                <GameCard
                  key={item.id}
                  item={item}
                  onLaunch={launchItem}
                  onEdit={(entry) => openEditModal(activeTab, entry)}
                  onDelete={(id) => deleteLauncher(id, activeTab)}
                  onToggleFavorite={(id) => toggleFavorite(id, activeTab)}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'hub' && (
          <HubPanel
            profile={profile}
            onProfileChange={setProfile}
            hoursPlayed={hoursPlayed}
            setHoursPlayed={setHoursPlayed}
            favoritesCount={totalFavorites}
            achievementCount={unlockedAchievements.length}
            streak={streakState.count}
            theme={theme}
            setTheme={setTheme}
            font={font}
            setFont={setFont}
            selectedVideo={selectedVideo}
            onOpenAchievements={() => setShowAchievementModal(true)}
            onFactoryReset={handleFactoryReset}
          />
        )}
      </main>

      <AddLauncherModal
        open={modalConfig.open}
        onClose={() => setModalConfig({ open: false, type: 'games', editing: null })}
        onSave={saveLauncher}
        editingItem={modalConfig.editing}
      />
      <AchievementModal
        open={showAchievementModal}
        onClose={() => setShowAchievementModal(false)}
        achievements={achievementCatalog}
        unlockedIds={unlockedAchievements}
      />
    </div>
  );
}

export default App;
