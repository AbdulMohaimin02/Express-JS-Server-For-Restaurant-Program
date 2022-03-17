const express = require('express')
const router = express.Router()
const {Restaurant,Menu,Item} = require('restaraunt-program')



router.route('/')
    .get((req,res) => {
        res.send(Restaurant.all)
    })
    .post((req,res) => {
        const {name, imageUrl} = req.body
        const restaurant = new Restaurant(name, imageUrl)
        res.status(201).send(restaurant)
    })


router.route('/:id')
    .get((req,res) => {
        const id = req.params.id
        const restaurant = Restaurant.all.find(restaurant => Number (restaurant.id) === Number (id))

        if(restaurant) {
            res.send(restaurant)
        } else {
            res.sendStatus(404)
        }

    })
    .put((req,res) => {
        const id = req.params.id
        const restaurant = Restaurant.all.find(restaurant => Number (restaurant.id) === Number (id))
        
        if(restaurant){  
            restaurant.updateRestaurant(req.body)
            res.send(restaurant)
        } else {
            res.sendStatus(404)
        }
    
        
    })
    .delete((req,res) => {
        const id = req.params.id
        const restaurant = Restaurant.all.find(restaurant => Number (restaurant.id) === Number (id))
    
        if(restaurant){
            restaurant.delete()
            res.send("Item has successfully been deleted")
        } else {
            res.sendStatus(404)
        }
    
    })

module.exports = router