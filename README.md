# gagip (개인 사이트)

앱과 게임을 설계 관점에서 분석하고 기록하는 개인 사이트. Astro 7 + MDX + KaTeX + Shiki.
이름과 소개는 `src/lib/site.ts`에서 바꾼다.

## 시작

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 생성
```

Node 22.12 이상이 필요하다.

## 새 글

```bash
npm run new -- experiment dbd-chase-math   # src/content/experiments/dbd-chase-math/index.mdx
npm run new -- analysis   some-service
npm run new -- note       some-memo
```

- 글은 폴더 단위다. 그래프 PNG는 같은 폴더에 넣고 `![설명](./graph.png)`로 쓴다.
- 새 글은 `draft: true`로 시작한다. 개발 서버에서는 보이고, 빌드(배포)에서는 빠진다. 공개하려면 `false`로 바꾼다.
- 폴더 이름이 곧 주소(슬러그)다. 영문 소문자, 숫자, 하이픈만 쓴다.

## 글에서 쓰는 전용 블록 (import 불필요)

| 블록 | 용도 |
| --- | --- |
| `<ResultSummary>` | 글 맨 위 결과 요약 |
| `<Assumptions title="가정">` | 가정 콜아웃 (열린 가정은 `title="열린 가정"`) |
| `<Hypothesis claim="..." verdict="채택|기각|보류">` | 가설과 판정 |

블록 안에 마크다운을 쓸 때는 여는 태그 뒤와 닫는 태그 앞에 빈 줄을 둔다. 수식은 `$...$`, `$$...$$`.

## 배포 (GitHub Pages, 계정명.github.io)

1. GitHub에서 `<계정명>.github.io` 이름으로 레포를 만들고 이 프로젝트를 push한다.
2. `astro.config.mjs`의 `site`는 `https://gagip.github.io`로 설정돼 있다(계정이 다르면 바꾼다).
3. 레포 Settings → Pages → Source를 **GitHub Actions**로 바꾼다.
4. `main`에 push하면 `.github/workflows/deploy.yml`이 빌드하고 배포한다.

## 구조

```
src/content/{experiments,analysis,notes}/<슬러그>/index.mdx   글
src/content.config.ts                                         프론트매터 스키마
src/components/                                               전용 블록, 카드
src/layouts/, src/pages/, src/styles/global.css               레이아웃, 라우팅, 스타일
templates/                                                    새 글 템플릿
```

## 참고

- Astro 7은 기본 마크다운 처리기가 Sätteri라서, 수식용 remark/rehype 플러그인은 `astro.config.mjs`에서 `unified()`로 걸었다.
- `analysis`에 글이 하나도 없으면 빌드 때 "empty" 경고가 나온다. 정상이다.
