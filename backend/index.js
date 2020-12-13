const express = require('express')
const app = express()
const db = require('./config/db')
const consign = require('consign')

app.get('/', (req, res) => {
    res.status(200).send('Meu backend')
})

app.listen(3000, () => {
    console.log('Backend executando...')
})