const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    shippinAddress1: {
        type: String,
        required: true
    },
    shippinAddress2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    totalPrice: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }
})

orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

orderSchema.set('toJSON', {
    virtuals: true
})

exports.Order = mongoose.model('Order', orderSchema)


/*

{
    "orderItems" : [
        {
            "quantity" : 3,
            "product" : ""
        },
        {
            "quantity" : 2,
            "product" : ""
        }
    ],
    "shippingAddress1" : "Flower Street, 45",
    "shippingAddress2" : "1-B",
    "city" : "Prague",
    "zip" : "0000",
    "country" : "Czech Republic",
    "phone" : "+42070378647",
    "user" : ""
}

*/