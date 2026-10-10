// 사용법: npm run new -- <experiment|analysis|note> <슬러그>
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const MAP = { experiment: 'experiments', analysis: 'analysis', note: 'notes' };
const [kind, slug] = process.argv.slice(2);

if (!MAP[kind] || !slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error('사용법: npm run new -- <experiment|analysis|note> <슬러그>');
  console.error('슬러그는 영문 소문자, 숫자, 하이픈만 쓴다. 예: dbd-chase-math');
  process.exit(1);
}

const dir = `src/content/${MAP[kind]}/${slug}`;
const file = `${dir}/index.mdx`;
if (existsSync(file)) {
  console.error(`이미 있습니다: ${file}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const body = readFileSync(`templates/${kind}.mdx`, 'utf8')
  .replaceAll('__DATE__', today)
  .replaceAll('__SLUG__', slug);

mkdirSync(dir, { recursive: true });
writeFileSync(file, body);
console.log(`생성: ${file}`);
