const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express() 
const port = process.env.PORT || 3000

//define paths for express config 
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up handelbars engine and views location 
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Guyo',
        title: 'weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Guyo',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Guyo',
        title: 'Help',
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'you must provide the address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error,
            })
        }

        forecast(longitude, latitude, (error, response) => {
            if (error) {
                return res.send({
                    error: error,
                })
            }

            res.send({
                response: response,
                address: req.query.address,
                location,
            })
        })
        
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Guyo',
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Guyo',
        title: '404',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => {
    console.log('server is up and running on host ' + port)
})
