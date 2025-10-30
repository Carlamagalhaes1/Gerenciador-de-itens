export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="item-card">
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <div>
        <button className="edit-btn" onClick={() => onEdit(item)}>Editar</button>
        <button className="delete-btn" onClick={() => onDelete(item.id)}>Excluir</button>
      </div>
    </div>
  );
}
