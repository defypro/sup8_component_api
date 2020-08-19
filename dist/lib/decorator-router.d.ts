import KoaRouter from 'koa-router';
declare function Controller(prefix?: string): (target: any) => void;
declare function get(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function post(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function getRouter(): KoaRouter<any, {}>;
export { getRouter, Controller, get, post };
