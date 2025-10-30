import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "db.json");


async function getData() {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}


async function saveData(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}


export async function GET() {
  const items = await getData();
  return Response.json(items);
}


export async function POST(req) {
  const newItem = await req.json();
  const items = await getData();
  newItem.id = Date.now();
  items.push(newItem);
  await saveData(items);
  return Response.json(newItem);
}


export async function PUT(req) {
  const updatedItem = await req.json();
  const items = await getData();
  const index = items.findIndex((item) => item.id === updatedItem.id);

  if (index === -1) return Response.json({ error: "Item não encontrado" }, { status: 404 });

  items[index] = updatedItem;
  await saveData(items);
  return Response.json(updatedItem);
}


export async function DELETE(req) {
  const { id } = await req.json();
  const items = await getData();
  const filtered = items.filter((item) => item.id !== id);
  await saveData(filtered);
  return Response.json({ message: "Item excluído com sucesso!" });
}
