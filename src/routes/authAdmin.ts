import express from 'express'

const authAdmin = express();


authAdmin.post('/login/admin/', async (req, res) => {
    const { email, password, token, verified } = req.body

})