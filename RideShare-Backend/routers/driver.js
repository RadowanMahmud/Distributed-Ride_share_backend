const express = require('express')
const router = express.Router()
const Driver = require('../models/Driver')


router.get('/fetch', async (req,res) => {
    try{
        const drivers = await Driver.find()
        res.json(drivers)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/delete', async (req,res) => {
    try{
        const drivers = await Driver.deleteOne({ _id: req.body.id})
        res.json(drivers)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/add', async (req,res) => {
    const driver = new Driver({
        name: req.body.name,
        car: req.body.car,
        positionX: req.body.positionX,
        positionY: req.body.positionY,
        rating: req.body.rating,
    })
    try{
        //console.log(req)
        const  result = await driver.save()
        res.json(result)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/',async (req, res) => {
    try{
        const driver = await Driver.findById(req.body.id)
        driver.positionX = req.body.positionX
        driver.positionY = req.body.positionY
        driver.status = false
        const result = await driver.save()
        res.send( result)
    }catch (err){
        res.send('Error' + err)
    }
})
module.exports = router
