import {Context} from 'koa'
import {Controller, post} from '../lib/decorator-router'
import AbstractController from "../abstract/abstract-controller";
import EnterpriseModel from '../models/enterprise'
import {Op} from "sequelize";

@Controller('/enterprise')
class EnterpriseController extends AbstractController {
    constructor() {
        super();
    }

    @post('/search')
    public async search(ctx: Context) {
        const {name} = ctx.request.body;
        const result = await EnterpriseModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });
        ctx.body = {
            result,
            success: true,
            error: ''
        };
    }

}