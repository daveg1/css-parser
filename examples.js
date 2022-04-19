module.exports = [
  `
    div,
    div span,
    div a,
  `,
  `
    div {
      height: 100px;
      width: 100px;
    }

    div span,
    div a {
      color: blue;
    }
  `,
  `
    div {
      height: 100px;
      width: 25vw;
      background-color: red;
      background-size: 100%;
      background-position: fixed;
      margin-top: 100px;
      margin-bottom: 200px;
      margin-left: 30px;
      margin-right: 50px;
    }
  
    h1,
    i {
      display: block;
      margin:         0  0 0 10px;
    }
  
    h1
    span {
      color: red
    }
  `,
]