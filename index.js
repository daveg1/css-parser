const fs = require('node:fs')
const path = require('node:path')
const tokenise = require('./src/tokenise')
const examples = require('./examples')

const baseDir = path.join(__dirname, 'json')

function createFile(filepath, data) {
  const dir = path.dirname(filepath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filepath, JSON.stringify(data))
}

examples.forEach((css, i) => {
  const filepath = path.join(baseDir, `ex-${i+1}.json`)
  const tokens = tokenise(css)
  createFile(filepath, tokens)
})