import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Get a single page
    const page = await prisma.page.findUnique({
      where: { id: Number(id) },
    });
    if (page) {
      res.status(200).json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } else if (req.method === 'PUT') {
    // Update a page
    const { title, slug, content } = req.body;
    const updatedPage = await prisma.page.update({
      where: { id: Number(id) },
      data: { title, slug, content },
    });
    res.status(200).json(updatedPage);
  } else if (req.method === 'DELETE') {
    // Delete a page
    await prisma.page.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
