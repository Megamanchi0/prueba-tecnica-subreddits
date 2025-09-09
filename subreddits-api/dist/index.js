"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subreddit_routes_1 = __importDefault(require("./controllers/routes/subreddit.routes"));
var cors = require("cors");
const app = (0, express_1.default)();
const port = 4000;
app.use(cors());
app.use('/api', subreddit_routes_1.default);
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
