const io = require('socket.io-client')
const http = require('http')
const sch = require('node-schedule')

let socket = io.connect('http://localhost:8001/communication')

// const search = {
//     id: '',
//     positionX: 0,
//     positionY: 0,
// }

const driverSearch = {
    hostname: 'localhost',
    port: 9000,
    path: '/api/driver',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}
const riderSearch = {
    hostname: 'localhost',
    port: 9000,
    path: '/api/rider',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}

// const fetchAllDrivers = {
//     hostname: 'localhost',
//     port: 9000,
//     path: '/api/driver/fetch',
//     method: 'Get',
// }
// const fetchAllRiders = {
//     hostname: 'localhost',
//     port: 9000,
//     path: '/api/rider/fetch',
//     method: 'Get',
// }

let drivers = [
    { 
        "id" : "606d55f19ea6c2935307554c", 
        "status" : true, 
        "name" : "baten",
        "car" : "honda sivic", 
        "positionX" : null, 
        "positionY" : null, 
    },
    { 
        "id" : "606d56149ea6c2935307554d", 
        "status" : true, "name" : "kuddus", 
        "car" : "corolla x", 
        "positionX" : 42.679826857804535, 
        "positionY" : 92.82666915075608, 
    },
    { 
        "id" : "6071e17dd5ea9435c0c7ce76",
        "status" : true, 
        "name" : "bsse", 
        "car" : "iit", 
        "positionX" : 12.822861978852607, 
        "positionY" : 64.28432957626733,
    },
    { 
        "id" : "6071e1a6d5ea9435c0c7ce77", 
        "status" : true, 
        "name" : "test 1", 
        "car" : "test", 
        "positionX" : 45.88489463597687, 
        "positionY" : 96.15417904015939, 
    },
    { 
        "id" : "6071f1947095b8ffcabbd7d8", 
        "status" : true, 
        "name" : "Red", 
        "car" : "car", 
        "positionX" : 80.94767687891435, 
        "positionY" : 4.469194376490315,
     },
]
let riders = [
    { "id" : "606d554c9ea6c29353075547", "name" : "redoy", "positionX" : 34.240085814741384, "positionY" : 75.43426294792823, "status" : true },
    { "id" : "606d556a9ea6c29353075548", "name" : "rider 1", "positionX" : 45.9923015454057, "positionY" : 51.15597501077562, "status" : true },
    { "id" : "606d557e9ea6c29353075549", "name" : "rider 2", "positionX" : 33.912308588453335, "positionY" : 85.38219997156999, "status" : true },
    { "id" : "606d55899ea6c2935307554a", "name" : "radowan", "positionX" : 7.469566136539951, "positionY" : 85.38184254883402, "status" : true },
    { "id" : "606d558f9ea6c2935307554b", "name" : "rafed", "positionX" : 42.222233377514314, "positionY" : 74.82758802548383, "status" : true },

]
// let chkdriver = false
// let chkrider = false

// const reqDriver = http.request(fetchAllDrivers, res => {
//     console.log(`statusCode: ${res.statusCode} \n`)
//     res.on('data', d => {
//         drivers = JSON.parse(d)
//     })
// })
// reqDriver.end()

// const reqRider = http.request(fetchAllRiders, res => {
//     console.log(`statusCode: ${res.statusCode} \n`)
//     res.on('data', d => {
//         riders = JSON.parse(d)
//         if(drivers.length > 0){
//             driversearchfunction()
//             ridersearchfunction()
//             call()
//         }
//     })
// })
// reqRider.end()

// function call(){
//}

const job = sch.scheduleJob('*/6 * * * * *', async function(){
    console.log('\n**************************************************************************************************************\n')
    driversearchfunction()
    ridersearchfunction()
})

function driversearchfunction(){
    drivers.forEach((driver)=>{
        driver.status = false
        driver.positionX = Math.random() * 100
        driver.positionY = Math.random() * 100
        const req = http.request(driverSearch, res => {
            // console.log(`statusCode: ${res.statusCode} `)
        })
        req.write(JSON.stringify(driver))
        req.end()
        console.log(driver.name +" is seraching for a RIDER from postion "+ driver.positionX+" "+driver.positionY )
    })
}
function ridersearchfunction(){
    riders.forEach((rider)=>{
        rider.status = false
        rider.positionX = Math.random() * 100
        rider.positionY = Math.random() * 100
        const req = http.request(riderSearch, res => {
            // console.log(`statusCode: ${res.statusCode} `)
        })
        req.write(JSON.stringify(rider))
        req.end()
        console.log(rider.name +" is seraching for a RIDER from postion "+ rider.positionX+" "+rider.positionY )
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
