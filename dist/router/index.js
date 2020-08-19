"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_router_1 = require("../lib/decorator-router");
require("../controller/component");
require("../controller/enterprise");
require("../controller/component-type");
require("../controller/component-props");
exports.default = (app) => {
    app.use(decorator_router_1.getRouter().routes());
    app.use(decorator_router_1.getRouter().allowedMethods());
};
