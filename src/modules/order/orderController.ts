import OrderModel from "./model/order";
import { Request, Response } from "express";
import { AppController } from "dth-core";
import { Controller, Route } from "dth-core/decorators";

@Controller({
    prefix: "/order",
})

export default class OrderController extends AppController {
    @Route("GET /")
    async index(req: Request, res: Response) {
        try {
            const order = await OrderModel.find()
            if(order.length>0){
                res.status(200).send(order)
            } else{
                res.status(200).json('Không tìm thấy dữ liệu!')
            }
        } catch (e) {
            res.status(500).send(e);
        }
    }

    @Route("POST /add")
    async add(req: Request, res: Response) {
        try {
            const simOrdered = await OrderModel.findOne({sim: req.body.sim})
            if (simOrdered != null) {
                res.status(500).json('Sim này đã có người đặt mua!');
            } else{
                const object = req.body;
                const saveOrder = await OrderModel.create(object);
                res.status(200).json(saveOrder)
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    @Route("PUT /update/:id")
    async update(req: Request, res: Response) {
        try {
            const find = await OrderModel.findById(req.params.id);
            if(find!=null) {
                const saveOrder = await OrderModel.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
                res.status(200).json(saveOrder);
            } else{
                res.status(500).json('ID không tồn tại, bạn hãy kiểm tra lại ID!');
            }
        } catch (e) {
            res.status(500).json('Không tìm thấy sim nào!')
        }
    }

    @Route("DELETE /delete/:id")
    async delete(req: Request, res: Response) {
        try {
            const find = await OrderModel.findById(req.params.id)
            if (find != null) {
                await OrderModel.deleteOne({id: req.params.id})
                res.status(200).json('Deleted successfully')
            } else{
                res.status(200).json('Không tìm thấy thông tin đặt sim')
            }
        }catch (e) {
            res.status(500).json(e)
        }
    }
}