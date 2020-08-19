import KoaRouter from 'koa-router'
import {Context} from 'koa'

const RootRouter = new KoaRouter();

function Controller(prefix: string = '') {
    return (target: any) => {
        const router = new KoaRouter({
            prefix
        });
        let obj = new target;
        let actionList = Object.getOwnPropertyDescriptors(target.prototype);
        target.prototype.router = router;
        for (let key in actionList) {
            const fn = actionList[key].value;
            if (key !== "constructor" && typeof fn === 'function') {
                fn.call(obj, router);
            }
        }
    }
}

function request(method: any, path: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const fn = descriptor.value;
        descriptor.value = (router: any) => {
            if (!router) {
                router = new KoaRouter();
            }
            router[method](path, async (ctx: Context, next: Function) => {
                const result = await fn(ctx, next);
                ctx.body = ctx.body || result;
            });
            RootRouter.use(router.routes(),router.allowedMethods());
        }
    }
}

function get(path: string) {
    return request('get', path);
}

function post(path: string) {
    return request('post', path);
}

function getRouter() {
    return RootRouter;
}

export {
    getRouter,
    Controller,
    get,
    post
}
