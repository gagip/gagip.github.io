import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// GitHub Pages 배포 (gagip.github.io 레포): site만 있으면 되고 base는 필요 없다.
export default defineConfig({
  site: 'https://gagip.github.io',
  integrations: [mdx()],
  markdown: {
    // Astro 7의 기본 처리기는 Sätteri라서, remark/rehype 플러그인(수식)은 unified()로 건다.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
