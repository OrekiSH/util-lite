const path = require('path');
const fs = require('fs');
const child = require('child_process');
const { transformFileSync } = require('@babel/core');

const packagesDir = path.resolve(__dirname, '../packages');

function transpile(name, modules) {
  const input = `${packagesDir}/${name}/index.ts`;
  const { code } = transformFileSync(input, {
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-env', {
        modules,
      }],
    ],
    plugins: ['@babel/plugin-transform-runtime'],
    comments: false,
  });
  // output
  const dir = `${packagesDir}/${name}/${modules === 'cjs' ? 'lib' : 'es'}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(`${dir}/index.js`, code);

  child.execSync(`tsc ${input} --declaration --emitDeclarationOnly --outDir ${dir}`);
}

const pkgs = fs.readdirSync(packagesDir)
  .filter((e) => fs.lstatSync(`${packagesDir}/${e}`).isDirectory());

pkgs.forEach((name) => {
  transpile(name, 'cjs');
  transpile(name, false);
});