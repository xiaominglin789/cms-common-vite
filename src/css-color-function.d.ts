interface ICssColorFunction {
  convert(string: string): string
  parse(string: string): any[]
}

declare module 'css-color-function' {
  const classes: ICssColorFunction
  export default classes
}
