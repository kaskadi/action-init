// this is a mockup server to emulate response from external services
const express = require('express')
const app = express()
const port = process.env.TEST_SERV_PORT

app.use(express.json())

app.get('/repos/:owner/:name', (req, res) => {
  const { owner, name } = req.params
  if (owner === 'test' && name === 'test') {
    res.send('OK')
  } else {
    res.status(404).send('Not found...')
  }
})

app.post('/v1/github/repos', (req, res) => {
  res.status(201).json({})
})

app.listen(port, () => {
  console.log(`READY: test server started at http://localhost:${port}`)
})
