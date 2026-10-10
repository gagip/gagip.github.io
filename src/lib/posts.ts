import { getCollection } from 'astro:content';
import { sections, type SectionKey } from './site';

// 개발 서버에서는 draft도 보이고, 빌드(배포)에서는 제외된다.
export async function getPosts(section: SectionKey) {
  const posts = await getCollection(section, ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAllPosts() {
  const groups = await Promise.all(
    sections.map(async (s) => (await getPosts(s.key)).map((post) => ({ section: s.key, post }))),
  );
  return groups.flat().sort((a, b) => b.post.data.date.valueOf() - a.post.data.date.valueOf());
}
