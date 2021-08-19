// какие запросы/мутации понадобятся (минимум 4, можно больше)

const { graphql, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLInt, GraphQLInputObjectType} = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql');

let productArr = [
    {id: 1, title: "Товар 1", description: "Описание", price: 100, category: 1 },
    {id: 2, title: "Товар 2", description: "", price: 200, category: 1 },
    {id: 3, title: "Товар 3", description: "Описание 3", price: 300, category: 2 },
    {id: 4, title: "Товар 4", description: "", price: 400, category: 2 },
]

let categoriesArr = [
    {id: 0, parentID: 0, title: "Топ категория" },
    {id: 1, parentID: 0, title: "Под категория 1" },
    {id: 2, parentID: 1, title: "Под категория 2" },
]

let reviewArr = [
    {id: 0, product: 1, note: 'Заметка о товаре 1 _ 1' },
    {id: 1, product: 1, note: 'Заметка о товаре 1 _ 2' },
    {id: 2, product: 2, note: 'Заметка о товаре 2' }
]


const ProductType = new GraphQLObjectType({
    name: "products",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        category: {  
            type: new GraphQLList(СategoryType),
            resolve: (root) => {
                return categoriesArr.filter(item=> item.id === root.category);
            }
        },
        rewiews: {
            type: new GraphQLList(ReviewType),
            resolve: (root) => {
                return reviewArr.filter(item=> item.product === root.id);
            }
        }
    })
})

const СategoryType = new GraphQLObjectType({
    name: "categories",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        parentID: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        productList: {
            type: new GraphQLList(ProductType),
            resolve: (cat) => {
                return productArr.filter(prod=> prod.category === cat.id);
            }
        }
    })
})

const ReviewType = new GraphQLObjectType({
    name: "reviews",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        product: { type: new GraphQLNonNull(GraphQLInt) },
        note: { type: GraphQLString },
        category : {
            type: new GraphQLList(СategoryType),
            resolve: (rev) => {
                let productsCategory = productArr.filter(prod => prod.id == rev.id).map(item=>item.category);
                return categoriesArr.filter(cat => productsCategory.includes(cat.id))
            }
        }
    })
})

const inputReviewType = new GraphQLInputObjectType({
    name: 'inputReview',
    fields: {
        id: { type: GraphQLInt },
        product: { type: GraphQLInt },
        note: { type: GraphQLString }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addReview: {
            type: ReviewType,
            args: {
                input: { type: inputReviewType }
            },
            resolve: function (source, args) {
                let review = {
                    id: args.input.id, 
                    product: args.input.product, 
                    note: args.input.note 
                };

                reviewArr.push(review);
                return review;
            }
        },
        updateReview: {
            type: ReviewType,
            args: {
                input: { type: inputReviewType }
            },
            resolve: function (source, args) {
                let review = {
                    id: args.input.id, 
                    product: args.input.product, 
                    note: args.input.note 
                };

                let rev = reviewArr.find(rev => rev.id == review.id);
                if(rev == null) return null;

                rev.note = review.note
                rev.product = review.product

                return review;
            }
        },
        deleteReview: {
            type: ReviewType,
            args: {
                input: { type: inputReviewType }
            },
            resolve: function (source, args) {
                let review = {
                    id: args.input.id, 
                    product: args.input.product, 
                    note: args.input.note 
                };
                
                reviewArr = reviewArr.filter(function(item) {
                    return item.id !== review.id
                })

                return review;
            }
        }
    }
});

const query = new GraphQLObjectType({
    name: "Query",
    fields: () => {
        return {
            products: {
                type: new GraphQLList(ProductType),
                resolve: function () {
                    return productArr
                }
            },
            categories: {
                type: new GraphQLList(СategoryType),
                resolve: function () {
                    return categoriesArr
                }
            },
            reviews: {
                type: new GraphQLList(ReviewType),
                resolve: function () {
                    return reviewArr
                }
            },
        }
    }
})

const schema = new GraphQLSchema({ 
    query: query,
    mutation: mutationType 
});


const app = express();
app.use('/', graphqlHTTP({ schema: schema, graphiql: true }))
app.listen(5000)