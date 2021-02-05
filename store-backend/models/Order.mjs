import mongoose from 'mongoose';
const { Schema } = mongoose;
import timestamps from 'mongoose-timestamp';

export const OrderSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            lowercase: true
        },
        product_id: {
            type: String,
            required:true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'paid', 'shipped']
        },
        customer_id: {
            type: String,
            required: true
        }
    },
    {
        collection: 'orders',
    }
);

OrderSchema.plugin(timestamps);
OrderSchema.index({createdAt: 1, UpdatedAt: 1});

export const Order = mongoose.model('Order', OrderSchema);
