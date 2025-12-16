import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise
      const db = client.db('dentalium-store')
      const products = await db.collection('products').find({}).toArray()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  } else if (req.method === 'POST') {
    try {
      const client = await clientPromise
      const db = client.db('dentalium-store')
      const result = await db.collection('products').insertOne(req.body)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: 'Failed to add product' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}