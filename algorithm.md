# CSS Parser in JavaScript
## Steps
1. Tokenise string
2. Remove unneeded whitespace and chars
   1. { background: black; color: blue; } -> {background:black;color:blue}
   2. div span { color: red; } -> div span{color:red}
3. Remove redundancies
   1. { color: blue; color: red; } -> { color: red; }
4. Apply simplifications
   1. #00ff00 -> #0f0
   2. black -> #000
   3. url("./file.png") -> url(./file.png)
5. Output string

## Todo
- [ ] Tokeniser
- [ ] Lexical analyser
- [ ] Minifier

## Usage
1. Run with `node .`
2. View output in /json