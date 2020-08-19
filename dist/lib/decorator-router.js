"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const RootRouter = new koa_router_1.default();
function Controller(prefix = '') {
    return (target) => {
        const router = new koa_router_1.default({
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
    };
}
exports.Controller = Controller;
function request(method, path) {
    return (target, propertyKey, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = (router) => {
            if (!router) {
                router = new koa_router_1.default();
            }
            router[method](path, (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                const result = yield fn(ctx, next);
                ctx.body = ctx.body || result;
            }));
            RootRouter.use(router.routes(), router.allowedMethods());
        };
    };
}
function get(path) {
    return request('get', path);
}
exports.get = get;
function post(path) {
    return request('post', path);
}
exports.post = post;
function getRouter() {
    return RootRouter;
}
exports.getRouter = getRouter;
