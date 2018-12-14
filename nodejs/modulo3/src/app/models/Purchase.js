const mongoose = require('mongoose')

const mongoosePaginate = require('mongoose-paginate')

const PurchaseSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    ad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        required: true
    },
    //usuario que fez o pedido 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

})

//mongoose.plugin(mongoosePaginate)

module.exports = mongoose.model('Purchase', PurchaseSchema)