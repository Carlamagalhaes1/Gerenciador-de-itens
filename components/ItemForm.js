import { useState, useEffect } from 'react'

export default function ItemForm({ onSave, initial = { title: '', description: '' }, submitLabel }) {
  const [title, setTitle] = useState(initial.title)
  const [description, setDescription] = useState(initial.description)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTitle(initial.title)
    setDescription(initial.description)
  }, [initial])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    await onSave({ title: title.trim(), description: description.trim() })
    setLoading(false)
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Salvando...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
