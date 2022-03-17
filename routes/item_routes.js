const express = require ('express')
const router = express.Router({mergeParams: true})
const {Restaurant,Menu,Item} = require('restaraunt-program')


router.use((req,res,next) => {
    const menu = Menu.all.find(menu=> Number(menu.id) === Number(req.params.menu_id ))
    res.locals.menu = menu
    next()
})

router.route('/')
    .get((req,res) => {
        res.send(res.locals.menu.menuItems)
    })
    .post((req,res) => {
        const item = new Item(req.params.menu_id, req.body.name, req.body.price)
        res.locals.menu.addItem(item)
        res.send(res.locals.menu)
    })

router.route('/:id')
    .get((req,res) => {
        const id = req.params.id
        const item = Item.all.find(item => Number(item.id) === Number(id))

        if(item){
            res.send(item)
        } else {
            res.sendStatus(404)
        }
    })
    .put((req,res) => {
        const id = req.params.id
        const item = Item.all.find(item => Number(item.id) === Number(id))


        if (item) {
            item.updateItem(req.body)
            res.send(item)
        } else {
            res.sendStatus(404)
        }

    })
    .delete((req,res) => {
        const id = req.params.id
        const item = Item.all.find(item => Number(item.id) === Number(id))

        if (item) {
            item.deleteItem()
            res.send('Item has successfully been deleted')
        } else {
            res.sendStatus(404)
        }

    })



module.exports = router



