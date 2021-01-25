import { Product, ProductTC } from '../models/Product';

const ProductQuery = {
    productById: ProductTC.getResolver('findById'),
    productByIds: ProductTC.getResolver('findByIds'),
    productOne: ProductTC.getResolver('findOne'),
    productMany: ProductTC.getResolver('findMany'),
    productCount: ProductTC.getResolver('count'),
    productConnection: ProductTC.getResolver('connection'),
    productPagination: ProductTC.getResolver('pagination'),
}

const ProductMutation = {
    productCreateOne: ProductTC.getResolver('createOne'),
    productCreateMany: ProductTC.getResolver('createMany'),
    productUpdateById: ProductTC.getResolver('updateById'),
    productUpdateOne: ProductTC.getResolver('updateOne'),
    productUpdateMany: ProductTC.getResolver('updateMany'),
    productRemoveById: ProductTC.getResolver('removeById'),
    productRemoveOne: ProductTC.getResolver('removeOne'),
    productRemoveMany: ProductTC.getResolver('removeMany'),
}
export { ProductQuery, ProductMutation };