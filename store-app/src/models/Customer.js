import mongoose from 'mongoose';
const { Schema } = mongoose;
import timestamps from 'mongoose-timestamp';

export const CustomerSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            lowercase: true,
        },
        lastName: {
            type: String,
            required: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            addressLine1: {
                type: String,
                required: true,
                lowercase: true,
            },
            addressLine2: {
                type: String,
                required: false,
                lowercase: true
            },
            zip: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
                lowercase: true
            },
            city: {
                type: String,
                required: true,
                lowercase: true
            },
            order: {
                type: String,
                required: false,
            },
        }
    },
    {
        collection: 'customers',
    }
);

CustomerSchema.plugin(timestamps);
CustomerSchema.index({createdAt: 1, UpdatedAt: 1});

export const Customer = mongoose.model('Customer', CustomerSchema);
