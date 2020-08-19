import {Context} from 'koa'
import {Controller, post} from '../lib/decorator-router'
import AbstractController from "../abstract/abstract-controller";
import ComponentTypeModel from '../models/component-type'

const md5 = require('md5');

@Controller('/component-type')
class ComponentTypeController extends AbstractController {
    constructor() {
        super();
    }

    @post('/list')
    public async list(ctx: Context) {
        let {pageIndex = 0, pageSize = 10} = ctx.request.body;
        pageIndex = pageIndex > 0 ? pageIndex - 1 : pageIndex;
        const where = {};
        const {rows: items, count: total} = await ComponentTypeModel.findAndCountAll({
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
    }

    @post('/update')
    public async update(ctx: Context) {
        const {Id, title} = ctx.request.body;
        await ComponentTypeModel.update({
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
    }

    @post('/create')
    public async create(ctx: Context) {
        const {title} = ctx.request.body;
        await ComponentTypeModel.create({
            Id: md5(title + new Date().getTime()),
            title,
        });
        ctx.body = {
            success: true,
            error: ''
        };
    }
}