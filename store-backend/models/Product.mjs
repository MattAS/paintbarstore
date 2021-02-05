import mongoose from 'mongoose';
const { Schema } = mongoose;
import timestamps from 'mongoose-timestamp';

export const ProductsSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            lowercase: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        imgLink: {
            type: String,
            required: false
        },
        variants: {
            type: Number,
            required: false
        },
        type: {
            type: String,
            required: true
        },
    },
    {
        collection: 'products',
    }
);

ProductsSchema.plugin(timestamps);
ProductsSchema.index({createdAt: 1, UpdatedAt: 1});

export const Product = mongoose.model('Product', ProductsSchema);
