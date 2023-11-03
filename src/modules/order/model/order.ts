import mongoose, {Schema} from "mongoose";

const OrderSchema = new Schema ({
    sim: String,
    phone: String,
    price: String,
    name: String,
    address: String,
    other_option: String,
    ip: String,
}, {timestamps: true});

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;