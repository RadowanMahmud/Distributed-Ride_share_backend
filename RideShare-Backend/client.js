const io = require('socket.io-client')
const http = require('http')
const sch = require('node-schedule')

let socket = io.connect('http://localhost:8001/communication')

const search = {
    id: '',
    positionX: 0,
    positionY: 0,
}

const driverSearch = {
    hostname: 'localhost',
    port: 9000,
    path: '/driver',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}
const riderSearch = {
    hostname: 'localhost',
    port: 9000,
    path: '/rider',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}

const fetchAllDrivers = {
    hostname: 'localhost',
    port: 9000,
    path: '/driver/fetch',
    method: 'Get',
}
const fetchAllRiders = {
    hostname: 'localhost',
    port: 9000,
    path: '/rider/fetch',
    method: 'Get',
}

let drivers = []
let riders = []
let chkdriver = false
let chkrider = false

const reqDriver = http.request(fetchAllDrivers, res => {
    console.log(`statusCode: ${res.statusCode} \n`)
    res.on('data', d => {
        drivers = JSON.parse(d)
    })
})
reqDriver.end()

const reqRider = http.request(fetchAllRiders, res => {
    console.log(`statusCode: ${res.statusCode} \n`)
    res.on('data', d => {
        riders = JSON.parse(d)
        if(drivers.length > 0){
            driversearchfunction()
            ridersearchfunction()
            call()
        }
    })
})
reqRider.end()

function call(){
    const job = sch.scheduleJob('*/6 * * * * *', async function(){
        console.log('\n')
        driversearchfunction()
        ridersearchfunction()
    })
}

function driversearchfunction(){
    drivers.forEach((driver)=>{
        search.id = driver._id
        search.positionX = Math.random() * 100
        search.positionY = Math.random() * 100
        const req = http.request(driverSearch, res => {
            // console.log(`statusCode: ${res.statusCode} `)
        })
        req.write(JSON.stringify(search))
        req.end()
        console.log(driver.name +" is seraching for a RIDER from postion "+ search.positionX+" "+search.positionY )
        search.id = ''
        search.positionX = 0
        search.positionY = 0
    })
}
function ridersearchfunction(){
    riders.forEach((rider)=>{
        search.id = rider._id
        search.positionX = Math.random() * 100
        search.positionY = Math.random() * 100
        const req = http.request(riderSearch, res => {
            // console.log(`statusCode: ${res.statusCode} `)
        })
        req.write(JSON.stringify(search))
        req.end()
        console.log(rider.name +" is seraching for a RIDER from postion "+ search.positionX+" "+search.positionY )
        search.id = ''
        search.positionX = 0
        search.positionY = 0
    })
}


socket.on('welcome',(data)=>{
    console.log('\n')
    let str = data.split('#')
    console.log(str[0])
    giverating(str[1])
})
const saveRating = {
    hostname: 'localhost',
    port: 9000,
    path: '/rating',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}

const rating = {
    id: '',
    points: 5,
}
function giverating(id){
    rating.id = id
    const req = http.request(saveRating, res => {
         console.log(`Ratingg giving statusCode: ${res.statusCode} `)
    })
    req.write(JSON.stringify(rating))
    req.end()
    rating.id = ''
}
