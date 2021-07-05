const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.resolve(__dirname, '../build')))

var server = app.listen(8089, () => {
  var port = server.address().port
  console.log(`Your production application is running here: http://localhost:${port}`)
})
