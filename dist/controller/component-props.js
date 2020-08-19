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
const component_props_1 = __importDefault(require("../models/component-props"));
const component_1 = __importDefault(require("../models/component"));
const md5 = require('md5');
let ComponentPropsController = class ComponentPropsController extends abstract_controller_1.default {
    constructor() {
        super();
    }
    list(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pageIndex = 0, pageSize = 10, componentId = '' } = ctx.request.body;
            pageIndex = pageIndex > 0 ? pageIndex - 1 : pageIndex;
            const where = {
                componentid: componentId,
                ROW_STATUS: 'Y'
            };
            const { rows: items, count: total } = yield component_props_1.default.findAndCountAll({
                offset: pageSize * pageIndex, limit: pageSize,
                where,
                order: [
                    ['ROW_CREATE_DATE', 'DESC']
                ],
                include: [{
                        model: component_1.default,
                    }],
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
            const { Id, title, Propkey, inputtype } = ctx.request.body;
            yield component_props_1.default.update({
                title, Propkey, inputtype,
                ROW_UPDATE_DATE: new Date()
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
            const { componentid, title, Propkey, inputtype } = ctx.request.body;
            yield component_props_1.default.create({
                Id: md5(inputtype + Propkey + componentid + title + new Date().getTime()),
                componentid,
                title,
                Propkey,
                inputtype,
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
], ComponentPropsController.prototype, "list", null);
__decorate([
    decorator_router_1.post('/update')
], ComponentPropsController.prototype, "update", null);
__decorate([
    decorator_router_1.post('/create')
], ComponentPropsController.prototype, "create", null);
ComponentPropsController = __decorate([
    decorator_router_1.Controller('/component-props')
], ComponentPropsController);
