import {readdir,readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.join(process.env.LOCALAPPDATA,'Programs/DeepSeek Harness/resources/app.asar/dsh/node_modules/@deepseek-ai');
const names=(await readdir(root)).filter(name=>/command|model|prompt|slash|llm|agent|session-controller/.test(name));
console.log(names.join('\n'));
await mkdir('dist/commands-models',{recursive:true});
for(const name of names.filter(name=>/command|model|llm$|session-controller/.test(name))){
 const dir=path.join(root,name,'lib');
 for(const file of ['index.js','index.d.ts']){
  try{await writeFile(path.join('dist/commands-models',name+'-'+file),await readFile(path.join(dir,file)));}catch{}
 }
}
