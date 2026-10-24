import { build } from 'esbuild';
import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('lib', { recursive: true });
await build({entryPoints:['src/index.ts'],outfile:'lib/index.js',bundle:true,platform:'node',format:'esm',target:'node22',external:['sql.js'],sourcemap:true});
await build({entryPoints:['src/client.tsx'],outfile:'lib/client.js',bundle:true,platform:'browser',format:'cjs',target:'es2022',external:['react','react-dom'],banner:{js:'window.__ModuleLoader__.load({id:"dsh-wanxiang-knowledge",factory:(require)=>{var module={exports:{}};var exports=module.exports;'},footer:{js:'return module.exports;}});'}});
await build({entryPoints:['src/panel.ts'],outfile:'lib/panel.js',bundle:true,platform:'browser',format:'iife',target:'es2022'});
for(const file of ['panel.html','style.css']) await copyFile(`src/${file}`,`lib/${file}`);
await copyFile('node_modules/sql.js/dist/sql-wasm.wasm','lib/sql-wasm.wasm');
console.log('Plugin built.');
