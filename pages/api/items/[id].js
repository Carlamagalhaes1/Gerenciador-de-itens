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
    const {
      query: { id },
      method
    } = req

    const items = await readData()
    const index = items.findIndex(i => i.id === id)
    if (index === -1) return res.status(404).json({ error: 'Item não encontrado' })

    if (method === 'GET') {
      return res.status(200).json(items[index])
    }

    if (method === 'PUT') {
      const { title, description } = req.body
      if (!title) return res.status(400).json({ error: 'title is required' })

      items[index] = { ...items[index], title, description: description || '' }
      await writeData(items)
      return res.status(200).json(items[index])
    }

    if (method === 'DELETE') {
      const [removed] = items.splice(index, 1)
      await writeData(items)
      return res.status(200).json({ removedId: removed.id })
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${method} Not Allowed`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro no servidor' })
  }
}
