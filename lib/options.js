import path from 'path'

export default function options(name, dir) {
  const metaPath = path.join(dir, 'meta.js')
  const req = require(metaPath)
  let opts = {}
  opts = req
  return opts
}