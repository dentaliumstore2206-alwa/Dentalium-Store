import clientPromise from '../../../lib/mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body

    if (username === 'admin' && password === 'dentalium2025') {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' })
      res.status(200).json({ token })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}