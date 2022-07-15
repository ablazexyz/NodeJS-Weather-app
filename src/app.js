const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./Utils/geoCode')
const getWeather = require('./Utils/getWeather')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set handlebars location and views
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicPath))

//Start server
app.listen(port,()=>{
    console.log('Server is running on Port: ' + port)
})

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        Name: 'Blaze'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }

    geoCode(req.query.address,(err,{lat,long,Place}={})=>{
        if(err){
            return res.send({
                error: err
            })
        }
        getWeather(lat,long,(err,{text}={})=>{
            res.send({
                place: Place,
                forecast: text
            })
        })
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page...',
        Name: "@Blaze"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page...',
        Name: 'Blaze'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMsg: 'Help article NOT Found',
        Name: 'Blaze'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMsg: '404 NOT Found',
        Name: 'Help Me'
    })
})




