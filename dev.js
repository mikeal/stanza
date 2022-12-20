import { createServer } from 'esbuild-server'

const bundle = {
  bundle: true,
  entryPoints: ['./includes.js']
}
const dev = {
  static: './',
}

const server = createServer(bundle, dev)
server.start()

