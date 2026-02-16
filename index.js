const express = require('express');
const cors = require('cors')
const app = express()
const PORT = 3001

const products = require('./products.json')

app.use(cors())

app.get('/products', (req,res) => {
    const {name, category} = req.query;
    let filterByCategory = products;

        if(category){
            filterByCategory = products.filter((products) => {
                return products.category === category.toLowerCase() 
            })
        }

        if(name){
            filterByCategory = filterByCategory.filter((products) => {
                return products.name.includes(name.toLowerCase()) || products.namept.includes(name.toLowerCase())
            })
        }
    res.json(filterByCategory)
})

app.get('/product/:id', (req, res) => {
    const {id} = req.params
    const filtered = products.filter((item) => {return item.id == id})
    res.json(filtered)
})



app.listen(PORT, () => {
    console.log('Servidor online na porta', PORT)
})