const express = require('express')
const restarauntRoutes = require('./routes/restaurants_routs')
const menuRoutes = require('./routes/menus_routes')
const itemRoutes = require('./routes/item_routes')
const {Restaurant,Menu,Item} = require('restaraunt-program')

const app = express()
const PORT = 3000


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/restaurants', restarauntRoutes)
app.use('/restaurants/:restaurant_id/menus', menuRoutes)
app.use('/restaurants/:restaurant_id/menus/:menu_id/items', itemRoutes)



app.listen(PORT, () => {
    Item.init()
    Menu.init()
    Restaurant.init()
    console.log(`The sertver has started on part ${PORT}`)
})

