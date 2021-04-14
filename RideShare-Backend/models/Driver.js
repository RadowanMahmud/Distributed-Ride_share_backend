const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    car:{
        type: String,
        required: true,
    },
    positionX:{
        type: Number,
        required:true,
    },
    positionY:{
        type:Number,
        required:true,
    },
    status:{
        type: Boolean,
        required:true,
        default: true
    },
    rating:{
        type:Number,
        required: false
    }

})

module.exports = mongoose.model('Driver', driverSchema)
