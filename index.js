const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {

  const crypto = req.body.crypto
  const fiat = req.body.fiat
  const amount = req.body.amount

  const options = {
    url: 'https://apiv2.bitcoinaverage.com/convert/global',
    method: 'GET',
    qs: {
      from: crypto,
      to: fiat,
      amount,
    }
  }

  request(options, (error, response, body) => {
   
    const data = JSON.parse(body)
    const price = data.price
    const currentDate = data.time

    res.write(`<p>The current date is ${currentDate}<p>`)
    res.write(`<h1>${amount} ${crypto} is currenlty worth ${price}${fiat}</h1>`)
    res.send()
  })
})

app.listen(3030, () => {console.log('Srv running at 3030')})