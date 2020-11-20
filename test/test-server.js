// this is a mockup server to emulate response from external services
const express = require('express')
const app = express()
const { writeFileSync, readFileSync } = require('fs')
const port = process.env.TEST_SERV_PORT
const outputPath = require('path').join(__dirname, 'server-output.json')

app.use(express.json())

function updateOutput (field, value) {
  const output = JSON.parse(readFileSync(outputPath, 'utf8'))
  writeFileSync(outputPath, JSON.stringify({ ...output, [field]: value }), 'utf8')
}

app.get('/repos/:owner/:name', (req, res) => {
  updateOutput('GITHUB_API_REPO_CALL', true)
  const { owner, name } = req.params
  if (owner === 'test' && name === 'test') {
    updateOutput('REPO_PUBLIC', true)
    res.send('OK')
  } else {
    updateOutput('REPO_PUBLIC', false)
    res.status(404).send('Not found...')
  }
})

app.get('/repos/:owner/:name/actions/secrets/public-key', (req, res) => {
  updateOutput('GITHUB_API_PK_CALL', true)
  res.json({
    key_id: '012345678912345678',
    key: 'FFmX54M5acBsXctw0BSt79PtUFMMLVc/6qtNqfMOm64='
  })
})

app.put('/repos/:owner/:name/actions/secrets/:secret_name', (req, res) => {
  updateOutput('GITHUB_API_SECRET_CALL', true)
  res.status(204).json({})
})

app.post('/v1/github/repos', (req, res) => {
  updateOutput('CC_API_CALL', true)
  res.status(201).json({
    data: {
      attributes: {
        test_reporter_id: Buffer.from('a1b4').toString('base64')
      }
    }
  })
})

app.listen(port, () => {
  writeFileSync(outputPath, JSON.stringify({}), 'utf8') // reset output file
  console.log(`READY: test server started at http://localhost:${port}`)
})
