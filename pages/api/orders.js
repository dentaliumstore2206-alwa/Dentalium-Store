import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise
      const db = client.db('dentalium-store')
      const orders = await db.collection('orders').find({}).toArray()
      res.status(200).json(orders)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' })
    }
  } else if (req.method === 'POST') {
    try {
      const client = await clientPromise
      const db = client.db('dentalium-store')
      const result = await db.collection('orders').insertOne(req.body)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: 'Failed to add order' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}