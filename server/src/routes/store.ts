import express from 'express'
import {findItem,items, createItem,deleteItem, updateItem} from '../services/storeService'



const app = express();


// get all items
app.get('/', async (req, res, next) => {
    const result = await items({})
    if (!result || result.length === 0) {
        res.status(404).send({ msg: 'there are not articles', check: false })
        return next()
    }
    return res.status(200).send({ articles: result, check: true })
})

// find by id
app.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const result = await findItem(id)
    if (!result) {
        res.status(404).send({ msg: 'Cannot article', check: false })
        return next()
    }
    return res.status(200).send({ msg: result })
})

//create item
app.post('/', async (req, res) => {
    const { name, price } = req.body
    const result = await createItem(name, price, <string>process.env.ADMIN);
    if (!result) {
        res.status(404).send({ msg: 'Cannot create article', check: false })
    }
    return res.status(200).send({ msg: result, check: true })
})

// change item
app.put('/:id', async (req, res) => {
    const { name, price } = req.body;
    const { id } = req.params
    const result = await updateItem(id, name, price)
    if (!result) {
        return res.status(404).send({ msg: 'Cannot change article', check: false })
    }
    return res.status(200).send({ msg: result, check: true })
})

//delete Item
app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await deleteItem(id)
    if (!result) {
        return res.status(404).send({ msg: 'Cannot delete article', check: false })
    }
    return res.status(200).send({ msg: result, check: true })
})



export {app}