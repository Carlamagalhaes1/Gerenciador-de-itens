"use client";
import { useState, useEffect } from "react";
import ItemCard from "./components/ItemCard";
import ItemForm from "./components/ItemForm";
import "./estilos/globals.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then(setItems);
  }, []);

  const handleSave = async (itemData) => {
    if (editItem) {
      const res = await fetch("/api/items", {
        method: "PUT",
        body: JSON.stringify({ ...editItem, ...itemData }),
      });
      const updated = await res.json();
      setItems(items.map(i => i.id === updated.id ? updated : i));
      setEditItem(null);
    } else {
      const res = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(itemData),
      });
      const newItem = await res.json();
      setItems([...items, newItem]);
    }
  };

  const handleDelete = async (id) => {
    await fetch("/api/items", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="container">
      <h1>Gerenciador de tarefas</h1>
      <ItemForm
        onSave={handleSave}
        initial={editItem || { title: "", description: "" }}
        submitLabel={editItem ? "Atualizar" : "Adicionar"}
      />
      <div className="item-list">
        {items.length ? (
          items.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={setEditItem}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>Nenhum item cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
