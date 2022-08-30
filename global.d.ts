declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export = value;
}

// declare module '*.module.css' {
//   const classes: { [key: string]: string };
//   export default classes;
// }
