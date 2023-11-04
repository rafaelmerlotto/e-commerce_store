import express from 'express'
import dotenv from 'dotenv'
import findItems from './src/models/findModel';
import createItem from './src/models/createModel';
import updateItem from './src/models/updateModel';
import deleteItem from './src/models/deleteModel';


dotenv.config()
const server = express();
server.use(express.json())



// get all collections 
server.get('/', async (req, res) => {
   

    //const getItems = await findItems()
    res.status(200).send({ msg: '' })
})

// find by id
server.get('/:id', async (req, res)=> {
    const { id } = req.params
    const findItem = await findItems(id)
    res.status(200).send({ msg: findItem })

})

//create items
server.post('/', async (req, res) => {
    const { name, price } = req.body
    const result = await createItem(name, price);
    console.log(result)
    res.status(200).send({ msg: result })
})

// change items
server.put('/:id', async (req, res) => {
    const { name, price } = req.body;
    const { id } = req.params
    const result = await updateItem(id, name, price)
    console.log(result)
    res.status(200).send({ msg: result })
})

//delete Items
server.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await deleteItem(id)
    console.log(result)
    res.status(200).send({ msg: result })
})



const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export { server }