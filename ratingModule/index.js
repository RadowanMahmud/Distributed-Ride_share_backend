const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const url = 'mongodb://localhost/MyExpressDataRating'
const Rating = require('./models/Rating')

app.use(cors())
app.use(express.json())

mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true})
const con = mongoose.connection

con.on('open',function (){
    console.log('connected to rating db -----')
})

// app.post('/rating',async (req,res)=>{
//     const rating = new Rating({
//         driver_id: req.body.id,
//         rating: req.body.points,
//     })
//     try{
//         //console.log(req)
//         const  result = await rating.save()
//         res.json(result)
//     }catch (err){
//         res.send('Error' + err)
//     }
// })

app.listen(9003, ()=>{
    console.log("Server for rating opened at port port 9003")
})
