import {Context} from 'koa'
import {Controller, post} from '../lib/decorator-router'
import AbstractController from "../abstract/abstract-controller";
import ComponentModel from '../models/component'
import ComponentTypeModel from '../models/component-type'
import {Op} from "sequelize";
import {clearWhere} from "../utils/helper";
import ComponentPageTypeModel from "../models/component-pagetype";

const md5 = require('md5');

@Controller('/component')
class ComponentController extends AbstractController {
    constructor() {
        super();
    }

    @post('/list')
    public async list(ctx: Context) {
        let {pageIndex = 0, pageSize = 10, name = '', typeid} = ctx.request.body;
        pageIndex = pageIndex > 0 ? pageIndex - 1 : pageIndex;
        const where = clearWhere({
            isdeleted: 'N',
            name: {
                [Op.like]: `%${name}%`
            },
            typeid,
        });
        const {rows: items, count: total} = await ComponentModel.findAndCountAll({
            offset: pageSize * pageIndex,
            limit: pageSize,
            where,
            order: [
                ['ROW_CREATE_DATE', 'DESC']
            ],
            include: [{
                model: ComponentTypeModel,
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
        const {id, typeid, name, componentviewname, componentpropviewname, SrcPath} = ctx.request.body;
        await ComponentModel.update({
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
    }

    @post('/create')
    public async create(ctx: Context) {
        const {typeid, name, componentviewname, componentpropviewname, SrcPath} = ctx.request.body;
        const componentId = md5(typeid + name + componentviewname + componentpropviewname + SrcPath + new Date().getTime());
        await ComponentModel.create({
            id: componentId,
            typeid,
            name,
            description: name,
            componentviewname,
            componentpropviewname,
            SrcPath
        });
        await ComponentPageTypeModel.create({
            Id: md5(componentId + new Date().getTime()),
            basecompid: componentId,
        });
        //INSERT INTO `testsupercarrier_masterdata`.`t_sup8_h5_basecomponents`(`id`, `name`, `typeid`, `level`, `sort`, `iconurl`, `ROW_STATUS`, `isdeleted`, `ROW_CREATE_DATE`, `ROW_CREATE_USER`, `ROW_UPDATE_DATE`, `ROW_UPDATE_USER`, `description`, `componentviewname`, `componentpropviewname`, `SrcPath`, `ver`, `BundleName`, `ROW_VER`, `ENTERPRISEID`, `ComponentNo`, `ComponentRange`, `AuditStatus`, `AuditRemark`, `ReleaseStatus`, `packageId`, `PublishH5Plus`, `OssFile`, `OrginalFileName`) VALUES ('41eaf548fa744d518146dbc32c6kddr1', '首页', '41eaf548fa744d518146dbc31typeddr', '1', 1, 'moduleArea_product', 'Y', 'N', '2020-07-07 00:00:00', 'sysadmin', NULL, NULL, '道达尔开盖有奖', 'Home', '', './components/marketing/DDR/', '1.0.1', NULL, NULL, NULL, '', '1', '1', NULL, '1', '', '1', NULL, NULL);
        ctx.body = {
            success: true,
            error: ''
        };
    }
}