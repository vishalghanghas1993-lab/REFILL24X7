function ProfileDropdown({ profile, onProfileChange }) {
  const updateField = (event) => {
    const { name, value } = event.target;
    onProfileChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
      <h3 className="font-orbitron text-lg">Profile Card</h3>
      <div className="mt-3 flex items-center gap-3">
        <img src={profile.avatar || 'https://placehold.co/80x80/111827/ffffff?text=PLAYER'} alt="avatar" className="h-16 w-16 rounded-full object-cover" />
        <div className="w-full space-y-2">
          <input name="username" value={profile.username} onChange={updateField} placeholder="Username" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" />
          <input name="avatar" value={profile.avatar} onChange={updateField} placeholder="Avatar URL" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" />
        </div>
      </div>
    </section>
  );
}

export default ProfileDropdown;
