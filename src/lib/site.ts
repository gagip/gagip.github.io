// 블로그 이름·소개는 여기서 바꾼다.
export const SITE = {
  title: 'Game Math Lab',
  description: '게임에서 마주친 질문을 수학과 시뮬레이션으로 풀어보는 연구노트',
};

export const sections = [
  { key: 'experiments', label: 'Experiments', desc: '게임에서 생긴 질문을 모델링하고 시뮬레이션으로 확인한 실험 노트' },
  { key: 'analysis', label: 'Analysis', desc: '앱·게임·웹 서비스를 관점을 정해 분석한 글' },
  { key: 'notes', label: 'Notes', desc: '짧은 메모와 회고' },
] as const;

export type SectionKey = (typeof sections)[number]['key'];

// base 경로(GitHub Pages 하위 경로)를 붙인 내부 링크
export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

export const fmtDate = (d: Date) => d.toISOString().slice(0, 10);
