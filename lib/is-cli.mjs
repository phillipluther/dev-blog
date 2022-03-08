// super quick/dirty check to see if a file is being accessed via package.json/CLI
// or imported; if the prior, we rely on argv[1] ... the execution filepath
export default function (filename) {
  const match = new RegExp(`${filename}$`);
  return match.test(process.argv[1]);
}
