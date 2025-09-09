import { Router } from "express";
import { deleteSubreddits, getPages, getSubredditById, getSubreddits, saveSubredditsOnDB } from "../subreddits.controller";

export const subredditRouter = Router();

subredditRouter.get('/all/:page', getSubreddits);
subredditRouter.get('/save', saveSubredditsOnDB);
subredditRouter.get('/findone/:id', getSubredditById);
subredditRouter.get('/pages', getPages);
subredditRouter.delete('/', deleteSubreddits);

export default subredditRouter;