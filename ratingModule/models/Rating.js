const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({

    driver_id:{
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required: false
    }

})

module.exports = mongoose.model('Rating', ratingSchema)
