import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const base = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  repo: z.string().url().optional(), // 원본 코드 레포 링크
  draft: z.boolean().default(false),
});

// 글은 폴더 단위: <컬렉션>/<슬러그>/index.mdx (이미지는 같은 폴더에 둔다)
// 슬러그 = 폴더 이름
const make = <T extends z.ZodRawShape>(dir: string, extra?: T) =>
  defineCollection({
    loader: glob({
      pattern: '**/*.{md,mdx}',
      base: `./src/content/${dir}`,
      generateId: ({ entry }) => entry.split('/')[0],
    }),
    schema: extra ? base.extend(extra) : base,
  });

export const collections = {
  experiments: make('experiments', {
    status: z.enum(['정의중', '진행중', '완료']),
    problem: z.string().optional(), // math-game-lab 레포의 problems/<이름>
    summary: z.string().optional(), // 목록 카드용 한 줄 결론
  }),
  analysis: make('analysis', {
    target: z.string(), // 분석 대상 이름
    targetType: z.enum(['app', 'game', 'web']),
    perspective: z.string(), // 분석 관점
  }),
  notes: make('notes'),
};
