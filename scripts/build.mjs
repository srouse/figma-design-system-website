import fs from 'fs';


export default async function build() {
  const dir = './dist';
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir, { recursive: true })
  }

  await fs.promises.writeFile(
    `${dir}/index.html`,
    `hi there again again |${process.env.TEST}|`
  );

  console.log('Created dist folder and made example index');
}


build(); 