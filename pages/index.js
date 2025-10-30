import { useEffect, useState } from 'react'
import ItemForm from '../components/ItemForm'
import ItemCard from '../components/ItemCard'

export default function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)
    try {
      const res = await fetch('/api/items')
      const data = await res.json()
      setItems(data)
    } catch (err) {
      setError('Erro ao buscar itens')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(payload) {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      alert('Erro ao criar')
      return
    }
    const newItem = await res.json()
    setItems(prev => [newItem, ...prev])
  }

  async function handleEditSave(payload) {
    const res = await fetch(`/api/items/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      alert('Erro ao atualizar')
      return
    }
    const updated = await res.json()
    setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)))
    setEditing(null)
  }

  async function handleDelete(id) {
    if (!confirm('Deseja realmente excluir este item?')) return
    const res = await fetch(`/api/items/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      alert('Erro ao excluir')
      return
    }
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Gerenciador de Tarefas</h1>
        <p className="text-slate-600">Gerenciador de tarefas para facilitar o dia</p>
      </header>

      <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="font-semibold mb-2">Adicionar novo item</h2>
          <ItemForm onSave={handleCreate} submitLabel="Criar" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="font-semibold mb-2">Editar item</h2>
          {editing ? (
            <div>
              <ItemForm onSave={handleEditSave} initial={editing} submitLabel="Salvar alterações" />
              <button
                onClick={() => setEditing(null)}
                className="mt-2 text-sm underline"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-600">Escolha Editar em um item para editar aqui.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-4">Itens</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-slate-600">Nenhum item ainda.</p>
        ) : (
          <div className="grid gap-4">
            {items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={(it) => setEditing(it)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
