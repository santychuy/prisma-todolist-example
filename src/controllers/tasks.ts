import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();

    return res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

type CreateTaskBody = {
  title: string;
  description?: string;
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body as CreateTaskBody;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body as Partial<CreateTaskBody>;

  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
      },
    });

    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
