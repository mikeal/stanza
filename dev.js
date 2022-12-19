import { createServer } from 'esbuild-server'

const bundle = {
  bundle: true,
  entryPoints: ['./components.js']
}
const dev = {
  static: './',
}

const server = createServer(bundle, dev)
server.start()

