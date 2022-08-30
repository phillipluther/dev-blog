declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export = value;
}

declare module '*.module.css' {
  const content: { [key: string]: string };
  export default content;
}
