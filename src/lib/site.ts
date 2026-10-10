// 블로그 이름·소개는 여기서 바꾼다.
export const SITE = {
  title: 'gagip',
  description: '앱과 게임을 설계 관점에서 분석하고 기록합니다.',
};

export const sections = [
  { key: 'analysis', label: 'Analysis', desc: '앱·게임·웹 서비스를 설계 관점에서 분석한 글' },
  { key: 'experiments', label: 'Experiments', desc: '궁금한 질문을 모델링하고 시뮬레이션으로 확인한 실험 노트' },
  { key: 'notes', label: 'Notes', desc: '짧은 메모와 프로그래밍 기록' },
] as const;

export type SectionKey = (typeof sections)[number]['key'];

// base 경로(GitHub Pages 하위 경로)를 붙인 내부 링크
export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

export const fmtDate = (d: Date) => d.toISOString().slice(0, 10);
