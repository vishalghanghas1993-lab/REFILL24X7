import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  category: '',
  coverUrl: '',
  videoUrl: '',
};

function AddLauncherModal({ open, onClose, onSave, editingItem }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(editingItem || emptyForm);
  }, [editingItem]);

  if (!open) return null;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-3 rounded-2xl border border-slate-700 bg-slate-950 p-6">
        <h3 className="font-orbitron text-xl">{editingItem ? 'Edit Launcher' : 'Add Launcher'}</h3>
        {['title', 'description', 'category', 'coverUrl', 'videoUrl'].map((field) => (
          <input
            key={field}
            name={field}
            required={field === 'title'}
            value={form[field] || ''}
            onChange={updateField}
            placeholder={field}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />
        ))}
        {form.coverUrl && <img src={form.coverUrl} alt="Cover preview" className="h-24 w-full rounded-lg object-cover" />}
        {form.videoUrl && <video src={form.videoUrl} className="h-24 w-full rounded-lg object-cover" controls />}
        <div className="flex justify-end gap-2">
          <button type="button" className="rounded-lg bg-slate-800 px-4 py-2" onClick={onClose}>Cancel</button>
          <button type="submit" className="rounded-lg bg-[var(--accent)] px-4 py-2 font-semibold">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddLauncherModal;
