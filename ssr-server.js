const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/a', (req, res) => {
    return app.render(req, res, '/about', req.query)
  })

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts/detail', { id: req.params.id })
  })

  server.get('/posts/:id/edit', (req, res) => {
    return app.render(req, res, '/posts/edit', { id: req.params.id })
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
