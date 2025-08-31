import { Request, Response } from 'express';

export const getArticles = async (req: Request, res: Response) => {
  res.json({ message: `Welcome ${req.user.name}, you can see the articles` });
};
