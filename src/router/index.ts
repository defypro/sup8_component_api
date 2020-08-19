import Koa from 'koa'
import {getRouter} from "../lib/decorator-router";
import '../controller/component'
import '../controller/enterprise'
import '../controller/component-type'
import '../controller/component-props'

export default (app: Koa) => {
    app.use(getRouter().routes());
    app.use(getRouter().allowedMethods());
}