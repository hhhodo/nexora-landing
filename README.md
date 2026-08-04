# NEXORA — Enterprise IT Solutions Landing Page

Figma 레퍼런스의 그리드 구조(내비게이션 / 히어로 / 마퀴 / OUR SOLUTIONS 4단 비대칭 그리드 / Insights 리스트 / 푸터)를
그대로 재현한 IT 기업용 랜딩페이지입니다. 이미지 영역은 전부 `--color-placeholder`(#d9d9d9) 플레이스홀더로 처리했습니다.

## Stack
- 순수 HTML/CSS/JS, 빌드 도구 없음
- `css/styles.css` — 디자인 토큰 & 그리드 시스템 (수정 금지)
- `css/site.css` — NEXORA 전용 컴포넌트 스타일
- `js/main.js` — 모바일 내비게이션 토글

## 로컬 실행
정적 파일이므로 `index.html`을 브라우저에서 바로 열거나, 아래처럼 로컬 서버로 실행합니다.

```bash
python3 -m http.server 5500
```

## 배포
`main` 브랜치에 푸시하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 GitHub Pages에 배포합니다.
