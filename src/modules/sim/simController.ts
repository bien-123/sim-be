import SimModel from "./model/sim";
import { Request, Response } from "express";
import { AppController } from "dth-core";
import { Controller, Route } from "dth-core/decorators";

@Controller({
    prefix: "/sim",
})
export default class SimController extends AppController {
    @Route("GET /")
    async index(req: Request, res: Response) {
        try {
            const sim = await SimModel.find();
            if(sim.length > 0) {
                res.status(200).send(sim);
            } else {
                res.status(200).json('Không tìm thấy sim!')
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }

    @Route("GET /:idSim")
    async getSim(req: Request, res: Response) {
        try {
            const sim = await SimModel.find({idSim: req.params.idSim});
            res.status(200).send(sim);
        } catch (err) {
            res.status(500).json('Khong tim thay sim')
        }
    }

    @Route("POST /add")
    async add(req: Request, res: Response) {
        try {
            const idSim = await SimModel.findOne({idSim: req.body.idSim});
            if(idSim != null) {
                res.status(500).json('Sim này đã tồn tại!');
            } else {
                const object = req.body
                const saveSim = await SimModel.create(object);
                res.status(200).json(saveSim);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }

    @Route("PUT /update/:id")
    async update(req: Request, res: Response) {
        try {
            const find = await SimModel.findById(req.params.id)
            console.log(find)
            if(find != null) {
                const saveSim = await SimModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                // const saveSim = await SimModel.updateOne({ $set: req.body }, { new: true })
                res.status(200).json(saveSim);
            } else {
                res.status(500).json('ID không tồn tại, bạn hãy kiểm tra lại ID!');
            }
        } catch (err) {
            res.status(500).json('Không tìm thấy sinh viên nào')
        }
    }

    @Route("DELETE /delete/:id")
    async delete(req: Request, res: Response) {
        try {
            const find = await SimModel.findById(req.params.id)
            if(find != null) {
                await SimModel.deleteOne({id: req.params.id})
                res.status(200).json('Deleted successfully')
            } else {
                res.status(500).json('Không tìm thấy sim!')
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // const searchTerm = req.query.q;
    // if (!searchTerm) {
    //     return res.status(400).json({ error: 'Vui lòng cung cấp từ khóa tìm kiếm.' });
    // }

    // try {
    //     // Sử dụng Mongoose để tìm kiếm dữ liệu
    //     const results = await SimModel.find({ idSim: { $regex: searchTerm, $options: 'i' } });
    //     res.json(results);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Có lỗi xảy ra khi tìm kiếm dữ liệu.' });
    // }
    @Route("GET /search")
    async search(req: Request, res: Response) {
        const { query } = req.query;

        try {
            const results = await SimModel.find({
            $or: [
                { idSim: { $regex: query, $options: 'i' } },
                // { description: { $regex: query, $options: 'i' } },
            ],
            });
            console.log(query);
            console.log(results);

            res.json(results);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while searching.' });
        }
    }

    @Route("GET /filter")
    async filter(req: Request, res: Response) {
        try {
            const sortedItems = await SimModel.find({}).sort({ pn: 1 }); // Sắp xếp theo trường "pn" tăng dần
            res.json(sortedItems);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}