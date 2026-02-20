const express = require('express');
const cors = require('cors')
const app = express()
const PORT = 3001

const products = require('./products.json')

app.use(cors())

app.get('/products', (req, res) => {
    const { name, category } = req.query;
    let filterByCategory = products;

    if (category) {
        filterByCategory = products.filter((products) => {
            return products.category === category.toLowerCase()
        })
    }

    if (name) {
        filterByCategory = filterByCategory.filter((products) => {
            return products.name.includes(name.toLowerCase()) || products.namept.includes(name.toLowerCase())
        })
    }
    res.status(200).json(filterByCategory)
})

app.get('/product/id/:id', (req, res) => {
    const { id } = req.params
    const filtered = products.find((item) => { return item.id == id })
    if (!filtered) {
        return res.status(404).json({
            message: "Product not found."
        })
    }
    res.status(200).json(filtered)

})
app.get('/product/:sku', (req, res) => {
    const { sku } = req.params
    const filtered = products.find((item) => {
        return item.sku == sku
    })
    if (!filtered) {
        return res.status(404).json({
            message: "Product not found."
        })
    }
    res.status(200).json(filtered)

})



app.listen(PORT, () => {
    console.log('Servidor online na porta', PORT)
})