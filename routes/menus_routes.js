const express = require ('express')
const router = express.Router({mergeParams: true})
const {Restaurant,Menu,Item} = require('restaraunt-program')


router.use((req,res,next) => {
    const restaurant = Restaurant.all.find(restaurant => Number(restaurant.id) === Number(req.params.restaurant_id ))
    res.locals.restaurant = restaurant
    next()
})


router.route('/')
    .get((req,res) => {
        res.send(res.locals.restaurant.restaurantMenus)
    })
    .post((req,res) => {
        const menu = new Menu(req.params.restaurant_id, req.body.title)
        res.locals.restaurant.addMenu(menu)
        res.send(res.locals.restaurant)
    })

router.route('/:id')
    .get((req,res) => {
        const id = req.params.id
        const menu = Menu.all.find(menu => Number (menu.id) === Number (id))

        if(menu) {
            res.send(menu)
        } else {
            res.sendStatus(404)
        }

    })
    .put((req,res) => {
        const id = req.params.id
        const menu = Menu.all.find(menu => Number (menu.id) === Number (id))

        
        if(menu){  
            menu.updateMenu(req.body)
            res.send(menu)
        } else {
            res.sendStatus(404)
        }
    
        
    })
    .delete((req,res) => {
        const id = req.params.id
        const menu = Menu.all.find(menu => Number (menu.id) === Number (id))
    
        if(menu){
            menu.deleteMenu()
            res.send("Item has successfully been deleted")
        } else {
            res.sendStatus(404)
        }
    
    })









module.exports = router