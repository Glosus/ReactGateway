'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const services = require("./src/services").openWeather

const app = express()
app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log('Server started on port ' + port)
})

app.get('/api/warehouse/items', async (req, res) => {
  const result = await services('itemService', req.originalUrl, req.method);
  res.send(result)
})

app.get('/api/warehouse/items/:item_id', async (req, res) => {
  const result = await services('itemService', req.originalUrl, req.method);
  res.send(result)
})

app.post('/api/warehouse/items', async (req, res) => {
  if (req.body.name && req.body.amount) {
    const body = {
      name : req.body.name,
      amount : req.body.amount
    }
    const result = await services('itemService', req.originalUrl, req.method, JSON.stringify(body));
    res.send(result);
  } else {
    res.sendStatus(400); //400 Bad Request
  }
})

app.put('/api/warehouse/items/:id/addition/:amount', async (req, res) => {
  const result = await services('itemService', req.originalUrl, req.method);
  res.send(result)
})

app.get('/api/orders', async (req, res) => {
  const result = await services('orderService', req.originalUrl, req.method);
  res.send(result)
})

app.get('/api/orders/:order_id', async (req, res) => {
  const result = await services('orderService', req.originalUrl, req.method);
  res.send(result)
})

app.put('/api/orders/:order_id/addition', async (req, res) => {
  const result = await services('orderService', req.originalUrl, req.method);
  res.send(result)
})

app.put('/api/orders/:order_id/payment', async (req, res) => {
  const body = {
    username : req.body.username,
    cardAuthorizationInfo : req.body.cardAuthorizationInfo
  }
  const result = await services('paymentService', req.originalUrl, req.method, JSON.stringify(body));
  res.send(result)
})

app.put('/api/orders/:order_id/status/:status', async (req, res) => {
  const result = await services('orderService', req.originalUrl, req.method);
  res.send(result)
})

app.all('*', async (req, res) => {
  console.log('Request URL:', req.originalUrl);
  console.log('Request Type:', req.method);
  //console.log('Request Headers:', req.headers);
  console.log('Request Query:', JSON.stringify(req.query));
  console.log('Request Body:', JSON.stringify(req.body));
  console.log('Request Params:', JSON.stringify(req.params));
  res.sendStatus(400); //400 Bad Request
})

//GET - api/warehouse/items
//GET - api/warehouse/items/{item_id}
//POST - api/warehouse/items
//PUT - api/warehouse/items/{id}/addition/{amount}
//GET - api/orders
//GET - api/orders/{order_id}
//PUT - api/orders/{order_id}/addition
//PUT - api/orders/{order_id}/pay
//PUT - api/orders/{order_id}/status/{status}
