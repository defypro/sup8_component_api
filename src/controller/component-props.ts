import {Context} from 'koa'
import {Controller, post} from '../lib/decorator-router'
import AbstractController from "../abstract/abstract-controller";
import ComponentPropsModel from '../models/component-props'
import ComponentModel from '../models/component'

const md5 = require('md5');

@Controller('/component-props')
class ComponentPropsController extends AbstractController {
    constructor() {
        super();
    }

    @post('/list')
    public async list(ctx: Context) {
        let {pageIndex = 0, pageSize = 10, componentId = ''} = ctx.request.body;
        pageIndex = pageIndex > 0 ? pageIndex - 1 : pageIndex;
        const where = {
            componentid: componentId,
            ROW_STATUS: 'Y'
        };
        const {rows: items, count: total} = await ComponentPropsModel.findAndCountAll({
            offset: pageSize * pageIndex, limit: pageSize,
            where,
            order: [
                ['ROW_CREATE_DATE', 'DESC']
            ],
            include: [{
                model: ComponentModel,
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
    }

    @post('/update')
    public async update(ctx: Context) {
        const {Id, title, Propkey, inputtype} = ctx.request.body;
        await ComponentPropsModel.update({
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
    }

    @post('/create')
    public async create(ctx: Context) {
        const {componentid, title, Propkey, inputtype} = ctx.request.body;
        await ComponentPropsModel.create({
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
    }
}