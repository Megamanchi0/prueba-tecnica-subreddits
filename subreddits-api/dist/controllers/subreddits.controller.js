"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPages = exports.deleteSubreddits = exports.saveSubredditsOnDB = exports.getSubredditById = exports.getSubreddits = void 0;
const subredditService_1 = require("../services/subredditService");
const subredditService = new subredditService_1.SubredditService();
const getSubreddits = async (req, res) => {
    try {
        const page = req.params.page || 1;
        console.log(req.params.page);
        const subreddits = await subredditService.getSubreddits(page);
        res.status(200).json(subreddits);
        return;
    }
    catch (err) {
        const msg = err.message;
        res.status(400).json({ error: msg });
        return;
    }
};
exports.getSubreddits = getSubreddits;
const getSubredditById = async (req, res) => {
    try {
        const id = req.params.id;
        const subreddit = await subredditService.getSubredditById(id);
        res.status(200).json(subreddit);
        return;
    }
    catch (err) {
        const msg = err.message;
        res.status(400).json({ error: msg });
        return;
    }
};
exports.getSubredditById = getSubredditById;
const saveSubredditsOnDB = async (req, res) => {
    try {
        await subredditService.saveSubreddits();
        res.status(200).json({ message: "Subreddits guardados exitosamente en la base de datos" });
        return;
    }
    catch (err) {
        const msg = err.message;
        res.status(400).json({ error: msg });
        return;
    }
};
exports.saveSubredditsOnDB = saveSubredditsOnDB;
const deleteSubreddits = async (req, res) => {
    try {
        await subredditService.deleteSubreddits();
        res.status(200).json({ message: "Subreddits eliminados exitosamente" });
        return;
    }
    catch (err) {
        const msg = err.message;
        res.status(400).json({ error: msg });
        return;
    }
};
exports.deleteSubreddits = deleteSubreddits;
const getPages = async (req, res) => {
    try {
        const pages = await subredditService.getPages();
        res.status(200).json(pages);
        return;
    }
    catch (err) {
        const msg = err.message;
        res.status(400).json({ error: msg });
        return;
    }
};
exports.getPages = getPages;
