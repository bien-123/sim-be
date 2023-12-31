import mongoose, { Schema } from "mongoose";

const SimChema = new Schema ({
    s3: { type: [String] },
    c: { type: [String] },
    pt: Number,
    d: Boolean,
    f: String,
    h: Boolean,
    d2: Boolean,
    c2: Number,
    t: Number,
    idSim: String,
    pn: Number,
    score: Number,
    highlight: String,
    telcoText: String,
    priceFormatted: String,
    categoryText: String,
    categoryUrl: String,
    priceInstallment: String,
    categoriesText: { type: [String] },
    status: String,
}, {timestamps: true})

const SimModel = mongoose.model('Sim', SimChema);

export default SimModel;