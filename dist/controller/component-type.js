"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const decorator_router_1 = require("../lib/decorator-router");
const abstract_controller_1 = __importDefault(require("../abstract/abstract-controller"));
const component_type_1 = __importDefault(require("../models/component-type"));
const md5 = require('md5');
let ComponentTypeController = class ComponentTypeController extends abstract_controller_1.default {
    constructor() {
        super();
    }
    list(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pageIndex = 0, pageSize = 10 } = ctx.request.body;
            pageIndex = pageIndex > 0 ? pageIndex - 1 : pageIndex;
            const where = {};
            const { rows: items, count: total } = yield component_type_1.default.findAndCountAll({
                offset: pageSize * pageIndex, limit: pageSize,
                where,
            });
            ctx.body = {
                result: {
                    items,
                    total
                },
                success: true,
                error: ''
            };
        });
    }
    update(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id, title } = ctx.request.body;
            yield component_type_1.default.update({
                title
            }, {
                where: {
                    Id
                }
            });
            ctx.body = {
                success: true,
                error: ''
            };
        });
    }
    create(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = ctx.request.body;
            yield component_type_1.default.create({
                Id: md5(title + new Date().getTime()),
                title,
            });
            ctx.body = {
                success: true,
                error: ''
            };
        });
    }
};
__decorate([
    decorator_router_1.post('/list')
], ComponentTypeController.prototype, "list", null);
__decorate([
    decorator_router_1.post('/update')
], ComponentTypeController.prototype, "update", null);
__decorate([
    decorator_router_1.post('/create')
], ComponentTypeController.prototype, "create", null);
ComponentTypeController = __decorate([
    decorator_router_1.Controller('/component-type')
], ComponentTypeController);
