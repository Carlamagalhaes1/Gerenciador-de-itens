export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-slate-600 mt-1">{item.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="px-3 py-1 rounded-md border hover:bg-slate-50"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
