import { useState, useEffect } from "react";

export default function ItemForm({ onSave, initial = { title: "", description: "" }, submitLabel }) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(initial.title);
    setDescription(initial.description);
  }, [initial]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    await onSave({ title: title.trim(), description: description.trim() });
    setLoading(false);
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}
