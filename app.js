const express = require('express')
const app = express()
const path = require('path')

const folderPath = path.join(__dirname, 'dist', 'mysummary-frontend')
console.log(folderPath)

app.use(express.static(folderPath))

app.get('/', (request, response) => {
  return response.sendFile(path.join(folderPath, 'index.html'))
})

const port = process.env.port || 4200
app.listen(port, () => {
  console.log(`Server open in port ${port}`)
})