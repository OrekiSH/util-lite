const path = require('path');
const fs = require('fs');

const packagesDir = path.resolve(__dirname, '../packages');
const files = fs.readdirSync(packagesDir);

const version = '0.1.0';
const pkgName = 'util-lite';

files.forEach((shortName) => {
  const name = `@${pkgName}/${shortName}`;

  if (!fs.statSync(path.join(packagesDir, shortName)).isDirectory()) return;

  const pkgPath = path.join(packagesDir, shortName, 'package.json');
  const pkgExists = fs.existsSync(pkgPath);

  if (pkgExists) return;

  const json = {
    name,
    version,
    description: name,
    module: 'es/index.js',
    main: 'lib/index.js',
    unpkg: 'dist/index.js',
    types: 'lib/index.d.ts',
    files: ['lib', 'src', 'dist', 'es'],
    repository: {
      type: 'git',
      url: `https://github.com/OrekiSH/${pkgName}`,
    },
    browserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9'],
    keywords: ['util', 'function'],
    authors: [
      'OrekiSH <orekish@163.com> (https://github.com/OrekiSH)',
    ],
    license: 'MIT',
    bugs: `https://github.com/OrekiSH/${pkgName}/issues`,
    homepage: `https://github.com/OrekiSH/${pkgName}/tree/main/packages/${shortName}#readme`,
    publishConfig: {
      access: 'public',
    },
  };

  fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2));
});
