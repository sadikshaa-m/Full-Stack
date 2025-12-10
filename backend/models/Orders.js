
//order ko chuttai scheme banako kina ki euta user le many order garcha -- seperate order schema makes it clean


import mongoose from "mongoose";
import { validate } from "uuid";


const orderSchema = new mongoose.Schema({

    //we can also add shippping address and payment method here..

    totalAmount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        //ref(reference) ma model ko name lekheko  -- ref deko kina ki id is connected to user/ref
        ref: 'User',
        required: true
    },
    products: {
        type: [
            {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    required: true,
    validate: {
        validator: function(v) {
            return v.length > 0;
        },
        message: 'Order must contain at least one product.'
    }
    },

    //timestamps haleko to automatically add createdAt ra updatedAt (Date)
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;





