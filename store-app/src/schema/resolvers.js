import {Product} from '../models/Product.js'
import {Order} from '../models/Order.js'
import {Customer} from '../models/Customer.js'

export const resolvers = {
    Query: {
        products: () => Product.find(),
        customers: (parent, {id}) => {
            if(id != null) {
                return Customer.find({'_id': {$in: [id]}}).exec();
            }
            return Customer.find();
        },
        order: (parent, {id}) => {
            if (id != null) {
                return Order.find({customer_id: id}).exec();
            }
            return Order.find()
        }
    },
    Mutation: {
        addProduct: async (_, { name, price, quantity, imgLink }) => {
            const newProduct = new Product({name, price, quantity, imgLink});
            await newProduct.save();
            return newProduct;
        },
        addCustomer: async(parent, {customerInput, addressInput}, context, info) => {
            var firstName = customerInput.firstName;
            var lastName = customerInput.lastName;
            var email = customerInput.email;
            var phoneNumber = customerInput.phoneNumber;
            var addressLine1 = addressInput.addressLine1;
            var addressLine2 = addressInput.addressLine2;
            var zip = addressInput.zip;
            var country = addressInput.country;
            var city = addressInput.city;


            const newCustomer = new Customer({firstName, lastName, email, phoneNumber, address:{addressLine1, addressLine2, zip, country, city}});
            await newCustomer.save();
            return newCustomer;
        },
        addOrder: async(parent, {orderInput}) => {
            var id = orderInput.id;
            var product_id = orderInput.product_id;
            var customer_id = orderInput.customer_id;
            var status = orderInput.status;
            
            const newOrder = new Order({id, product_id, status, customer_id});
            await newOrder.save();
            return newOrder;
        }
    }
};
