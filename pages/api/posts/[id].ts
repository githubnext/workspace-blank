import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Get a single post
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } else if (req.method === 'PUT') {
    // Update a post
    const { title, slug, content } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, slug, content },
    });
    res.status(200).json(updatedPost);
  } else if (req.method === 'DELETE') {
    // Delete a post
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
