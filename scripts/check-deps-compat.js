const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const lockJson = JSON.parse(fs.readFileSync('./package-lock.json', 'utf8'));
const allDeps = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

const targets = {
  next: '16.1.6',
  react: '19.2.4',
  'react-dom': '19.2.4',
  'next-pwa': '5.6.0',
  swiper: '12.1.2',
  tailwindcss: '3.4.19',
  eslint: '9.39.4',
};

function getInstalledVersion(name) {
  const directVersion = allDeps[name];
  if (!directVersion) {
    return null;
  }
  const lockVersion =
    lockJson.packages?.[`node_modules/${name}`]?.version;
  return { range: directVersion, installed: lockVersion || directVersion };
}

function parseMajorMinorPatch(v) {
  const m = String(v).match(/(\d+)\.(\d+)\.(\d+)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function sameMajor(v1, v2) {
  const a = parseMajorMinorPatch(v1);
  const b = parseMajorMinorPatch(v2);
  return Boolean(a && b && a[0] === b[0]);
}

function sameMinor(v1, v2) {
  const a = parseMajorMinorPatch(v1);
  const b = parseMajorMinorPatch(v2);
  return Boolean(a && b && a[0] === b[0] && a[1] === b[1]);
}

let hasFailure = false;
const report = Object.entries(targets).map(([name, target]) => {
  const info = getInstalledVersion(name);
  if (!info) {
    hasFailure = true;
    return `[MISSING] ${name} not found in package.json`;
  }

  if (!sameMajor(info.installed, target)) {
    hasFailure = true;
    return `[MAJOR_MISMATCH] ${name}: target major=${target}, installed=${info.installed} (range=${info.range})`;
  }

  if (!sameMinor(info.installed, target)) {
    return `[MINOR_DIFF] ${name}: target minor=${target}, installed=${info.installed} (range=${info.range})`;
  }

  return `[OK] ${name}: ${info.installed}`;
});

console.log(report.join('\n'));

if (hasFailure) {
  console.error('Dependency compatibility check failed');
  process.exit(1);
}
