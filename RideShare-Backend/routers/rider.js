const express = require('express')
const router = express.Router()
const Rider = require('../models/Rider')

router.get('/fetch', async (req,res) => {
    try{
        const riders = await Rider.find()
        res.json(riders)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/delete', async (req,res) => {
    try{
        const riders = await Rider.deleteOne({ _id: req.body.id})
        res.json(riders)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/add', async (req,res) => {
    const rider = new Rider({
        name: req.body.name,
        positionX: req.body.positionX,
        positionY: req.body.positionY,
    })
    try{
        //console.log(req)
        const  result = await rider.save()
        res.json(result)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/',async (req, res) => {
    try{
        const rider = await Rider.findById(req.body.id)
        rider.positionX = req.body.positionX
        rider.positionY = req.body.positionY
        rider.status = false
        const result = await rider.save()
        res.send('ok')
    }catch (err){
        res.send('Error' + err)
    }
})

module.exports = router
