import { promises as fs } from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'items.json')

async function readData() {
  const json = await fs.readFile(dataFile, 'utf8')
  return JSON.parse(json)
}

async function writeData(data) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8')
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const items = await readData()
      return res.status(200).json(items)
    }

    if (req.method === 'POST') {
      const items = await readData()
      const { title, description } = req.body
      if (!title) return res.status(400).json({ error: 'title is required' })

      const id = Date.now().toString()
      const newItem = { id, title, description: description || '' }
      items.unshift(newItem)
      await writeData(items)
      return res.status(201).json(newItem)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro no servidor' })
  }
}
