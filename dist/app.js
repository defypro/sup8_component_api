"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("./router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors = require('@koa/cors');
const app = new koa_1.default();
app.use(koa_bodyparser_1.default());
app.use(cors());
router_1.default(app);
const port = process.env.NODE_ENV === 'production' ? '3901' : '3001';
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
app.on('error', (error, ctx) => {
    ctx.body = error;
});
exports.default = app;
