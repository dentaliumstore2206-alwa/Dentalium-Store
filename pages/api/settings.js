import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise
      const db = client.db('dentalium-store')
      const settings = await db.collection('settings').findOne({})
      res.status(200).json(settings || {})
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch settings' })
    }
  } else if (req.method === 'PUT') {
    try {
      const client = await clientPromise
      const db = client.db('dentalium-store')
      const result = await db.collection('settings').replaceOne({}, req.body, { upsert: true })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update settings' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}