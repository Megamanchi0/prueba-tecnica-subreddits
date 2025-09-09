import { Request, Response } from "express";
import { SubredditService } from "../services/subredditService";

const subredditService = new SubredditService();

export const getSubreddits = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = req.params.page || 1;
    console.log(req.params.page);
    const subreddits = await subredditService.getSubreddits(page as number);
    res.status(200).json(subreddits);
    return;
  } catch (err) {
    const msg = (err as Error).message;
    res.status(400).json({ error: msg });
    return;
  }
};

export const getSubredditById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const subreddit = await subredditService.getSubredditById(id);
    res.status(200).json(subreddit);
    return;
  } catch (err) {
    const msg = (err as Error).message;
    res.status(400).json({ error: msg });
    return;
  }
};

export const saveSubredditsOnDB = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await subredditService.saveSubreddits();
    res.status(200).json({ message: "Subreddits guardados exitosamente en la base de datos" });
    return;
  } catch (err) {
    const msg = (err as Error).message;
    res.status(400).json({ error: msg });
    return;
  }
};

export const deleteSubreddits = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await subredditService.deleteSubreddits();
    res.status(200).json({ message: "Subreddits eliminados exitosamente" });
    return;
  } catch (err) {
    const msg = (err as Error).message;
    res.status(400).json({ error: msg });
    return;
  }
};

export const getPages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pages = await subredditService.getPages();
    res.status(200).json(pages);
    return;
  } catch (err) {
    const msg = (err as Error).message;
    res.status(400).json({ error: msg });
    return;
  }
};