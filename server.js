const express = require('express')

const routes = require('./lib/routes/routes')

const app = express();
app.use(express.json());
app.use(routes)

app.use(express.static('./lib/public', { extensions: ['html'] }))

app.listen(5173, () => {
    console.log('Server started!')
})