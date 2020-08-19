import Koa, {Context} from 'koa'
import Router from './router'
import KoaBodyParser from 'koa-bodyparser'
const cors = require('@koa/cors');

const app = new Koa();
app.use(KoaBodyParser());
app.use(cors());
Router(app);

const port = process.env.NODE_ENV === 'production' ? '3901' : '3001';
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});

app.on('error', (error: Error, ctx: Context) => {
    ctx.body = error;
});

export default app;