import {Product} from '../models/Product.js'
import {Customer} from '../models/Customer.js'

export const resolvers = {
    Query: {
        products: () => Product.find(),
        customers: () => Customer.find(),
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
    }
};
