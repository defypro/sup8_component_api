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
const component_1 = __importDefault(require("../models/component"));
const component_type_1 = __importDefault(require("../models/component-type"));
const sequelize_1 = require("sequelize");
const helper_1 = require("../utils/helper");
const component_pagetype_1 = __importDefault(require("../models/component-pagetype"));
const md5 = require('md5');
let ComponentController = class ComponentController extends abstract_controller_1.default {
    constructor() {
        super();
    }
    list(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pageIndex = 0, pageSize = 10, name = '', typeid } = ctx.request.body;
            pageIndex = pageIndex > 0 ? pageIndex - 1 : pageIndex;
            const where = helper_1.clearWhere({
                isdeleted: 'N',
                name: {
                    [sequelize_1.Op.like]: `%${name}%`
                },
                typeid,
            });
            const { rows: items, count: total } = yield component_1.default.findAndCountAll({
                offset: pageSize * pageIndex,
                limit: pageSize,
                where,
                order: [
                    ['ROW_CREATE_DATE', 'DESC']
                ],
                include: [{
                        model: component_type_1.default,
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
            const { id, typeid, name, componentviewname, componentpropviewname, SrcPath } = ctx.request.body;
            yield component_1.default.update({
                typeid,
                name,
                componentviewname,
                componentpropviewname,
                SrcPath
            }, {
                where: {
                    id
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
            const { typeid, name, componentviewname, componentpropviewname, SrcPath } = ctx.request.body;
            const componentId = md5(typeid + name + componentviewname + componentpropviewname + SrcPath + new Date().getTime());
            yield component_1.default.create({
                id: componentId,
                typeid,
                name,
                description: name,
                componentviewname,
                componentpropviewname,
                SrcPath
            });
            yield component_pagetype_1.default.create({
                Id: md5(componentId + new Date().getTime()),
                basecompid: componentId,
            });
            //INSERT INTO `testsupercarrier_masterdata`.`t_sup8_h5_basecomponents`(`id`, `name`, `typeid`, `level`, `sort`, `iconurl`, `ROW_STATUS`, `isdeleted`, `ROW_CREATE_DATE`, `ROW_CREATE_USER`, `ROW_UPDATE_DATE`, `ROW_UPDATE_USER`, `description`, `componentviewname`, `componentpropviewname`, `SrcPath`, `ver`, `BundleName`, `ROW_VER`, `ENTERPRISEID`, `ComponentNo`, `ComponentRange`, `AuditStatus`, `AuditRemark`, `ReleaseStatus`, `packageId`, `PublishH5Plus`, `OssFile`, `OrginalFileName`) VALUES ('41eaf548fa744d518146dbc32c6kddr1', '首页', '41eaf548fa744d518146dbc31typeddr', '1', 1, 'moduleArea_product', 'Y', 'N', '2020-07-07 00:00:00', 'sysadmin', NULL, NULL, '道达尔开盖有奖', 'Home', '', './components/marketing/DDR/', '1.0.1', NULL, NULL, NULL, '', '1', '1', NULL, '1', '', '1', NULL, NULL);
            ctx.body = {
                success: true,
                error: ''
            };
        });
    }
};
__decorate([
    decorator_router_1.post('/list')
], ComponentController.prototype, "list", null);
__decorate([
    decorator_router_1.post('/update')
], ComponentController.prototype, "update", null);
__decorate([
    decorator_router_1.post('/create')
], ComponentController.prototype, "create", null);
ComponentController = __decorate([
    decorator_router_1.Controller('/component')
], ComponentController);
