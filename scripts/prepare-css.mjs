import { compile } from '@tailwindcss/node';
import { writeFile } from 'node:fs/promises';
const compiler=await compile('@import "tailwindcss";', {base:process.cwd(),onDependency(){}});
await writeFile('src/app/tailwind.generated.css',compiler.build([]));
