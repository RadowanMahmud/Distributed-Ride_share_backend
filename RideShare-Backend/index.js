const express = require('express')
// const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const http = require('http')
const sch = require('node-schedule')
// const url = 'mongodb://192.168.0.104:27017/MyExpressDatas'
// const Driver = require('./models/Driver')
// const Rider = require('./models/Rider')

app.use(cors())
app.use(express.json())

// mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true})
// const con = mongoose.connection

// con.on('open',function (){
//     console.log('connected-----')
// })

const job = sch.scheduleJob('*/5 * * * * *', async function(){
    await getDist()
    for (const d of drivers) {
        if(d.status === true) continue;
        else{
            let mindist = 10000000000;
            let selectedrider;
            for (const r of riders){
                if(r.status !== true) {
                    let dist = Math.sqrt((r.positionX-d.positionX)*(r.positionX-d.positionX)+(r.positionY-d.positionY)*(r.positionY-d.positionY))
                    if(dist<mindist){
                        mindist = dist
                        selectedrider = r
                    }
                }
            }
            d.status = true
            // const result = await d.save()
            selectedrider.status = true
            //  const r1 = await selectedrider.save()
            console.log(d.name,selectedrider.name,mindist,d.id)
            callCommunicetion(d.name,selectedrider.name,mindist,d.id)
            await getDist()
            console.log('\n'+drivers.length)
            console.log(riders.length)
        }
    }
});

let drivers = [];
let riders = [];

async function getDist(){
    console.log("scheduler calling dist");
    // if(con){
    //     try{
    //         drivers = await Driver.find({status : false})
    //         riders = await Rider.find({status : false})
    //     }catch (err){
    //         console.log(err)
    //     }
    // }
    for (let i=0; i <drivers.length ; i++){
        if(drivers[i].status === true){
            drivers.splice(i,1)
        }
    }

    for (let i=0; i <riders.length ; i++){
        if(riders[i].status === true){
            riders.splice(i,1)
        }
    }
}

function callCommunicetion(d_name,r_name,min_dist,d_id){
    const message = {
        driver_name: '',
        rider_name: '',
        mindist: 0,
        driver_id: '',
    }

    const communicationRequest = {
        hostname: 'communication-module',
        port: '7000',
        path: '/api/comModel',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    message.driver_name = d_name
    message.rider_name = r_name
    message.mindist = min_dist
    message.driver_id = d_id

    console.log('calling')
    const req = http.request(communicationRequest, res => {
         //console.log(`statusCode: ${res.statusCode} `)
    })
    req.write(JSON.stringify(message))
    req.end()
}

// const driverrouter = require('./routers/driver')
// app.use('/api/driver',driverrouter)
// const riderrouter = require('./routers/rider')
// app.use('/api/rider',riderrouter)

app.post('/api/driver',async (req, res) => {
    try{
        drivers.push(req.body)
        res.send('ok')
    }catch (err){
        res.send('Error' + err)
    }
})

app.post('/api/rider',async (req, res) => {
    try{
        riders.push(req.body)
        res.send('ok')
    }catch (err){
        res.send('Error' + err)
    }
})

// app.post('/rating',async (req,res)=>{
//     try{
//         const driver = await Driver.findById(req.body.id)
//         driver.rating = (driver.rating+req.body.points)/2
//         const result = await driver.save()
//         res.send('ok')
//     }catch (err){
//         res.send(err)
//     }
// })

app.listen(5000, () => {
    console.log('server opened at port number 5000')
})
