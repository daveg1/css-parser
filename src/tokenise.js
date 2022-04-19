const IGNORE_CHARS = /[\n\r\t]/
const CSS_CHARS = /[\{\}\,\:\;]/

function canSkip(prevChar, char) {
  // Skip unneeded whitespace
  if (char === ' ') {
    // Nullish
    if (!prevChar) {
      return true
    }

    // Whitespace
    if (prevChar === ' ' || prevChar.match(IGNORE_CHARS)) {
      return true
    }

    // CSS chars
    if (prevChar.match(CSS_CHARS)) {
      return true
    }
  }

  // Skip unwanted chars
  if (char.match(IGNORE_CHARS)) {
    return true
  }

  return false
}

module.exports = function tokenise(csstext) {
  const tokens = []

  // 1. Extract selectors
  let str = ''
  let char = null
  let prevChar = null

  outer:
  for (let cursor = 0; cursor < csstext.length; cursor++) {
    prevChar = char
    char = csstext[cursor]

    if (canSkip(prevChar, char)) {
      continue
    }

    if (char === ',') {
      tokens.push({ name: 'selector', value: str })
      tokens.push({ name: 'comma', value: ',' })
      str = ''
      continue
    }

    if (char === '{') {
      tokens.push({ name: 'selector', value: str })
      tokens.push({ name: 'open_bracket', value: '{' })

      // Reset string & move cursor by one
      str = ''
      cursor++

      inner:
      for (; cursor < csstext.length; cursor++) {
        prevChar = char
        char = csstext[cursor]

        if (canSkip(prevChar, char)) {
          continue
        }

        if (char === ':') {
          tokens.push({ name: 'property', value: str })
          tokens.push({ name: 'colon', value: ':' })
          str = ''
          continue inner
        }

        if (char === ';') {
          tokens.push({ name: 'value', value: str })
          tokens.push({ name: 'terminator', value: ';' })
          str = ''
          continue inner
        }

        if (char === '}') {
          tokens.push({ name: 'value', value: str })
          tokens.push({ name: 'close_bracket', value: '}' })
          str = ''
          continue outer
        }

        str += char
      }
    }

    str += char
  }

  if (str) {
    tokens.push({ name: 'selector', value: str })
  }

  return tokens
}