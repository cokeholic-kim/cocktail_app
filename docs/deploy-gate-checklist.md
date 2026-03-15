# Deploy Gate Checklist (P0)

## 검증 항목
- npm run lint
- npm run typecheck
- npm run build
- npm run check:p0-smoke
- npm run check:deps-compat

## 기본 스모크 경로
- GET 200 체크 대상:
  - /
  - /cocktails
  - /ingredients
  - /myingredients
  - /cocktails/[name]
  - /ingredients/[name]
  - /login
  - /join

## 폴백/오류 대응
- 목록/상세/재료 페이지에서 fallback UI가 깨지지 않는지 확인한다.
- API 응답이 비어 있어도 빈 화면/에러 화면으로 안정적으로 렌더링되는지 확인한다.
- API 실패/네트워크 미연결 상태에서 핵심 화면 진입이 중단되지 않는지 확인한다.

## 배포 체크 (Next.js 16)
- 기본 빌드는 webpack 기반 설정을 기준으로 실행한다.
  - npm run dev (`next dev --webpack`)
  - npm run build (`next build --webpack`)
- `next.config.mjs` 변경 시 설정 충돌이 없도록 `webpack/turbopack` 의도에 맞게 일치성 점검한다.
- dev/build 시 `--turbopack`/`--webpack` 사용 의도를 문서화한다.

## PR 체크
- PR 본문에 이슈 번호를 `Closes #이슈번호`로 기록한다.
- 변경 내용 요약을 3줄 내외로 작성한다.
- 변경이 없는 항목이 있으면 해당 항목을 제외하지 않음(명시).
- 변경 전/후 결과를 PR 본문에 기록한다.
- 필수 게이트 결과:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run check:deps-compat`
  - 수동 테스트 결과(스크린샷/로그)
- 미해결 리뷰 코멘트 0개 확인 후 최종 병합한다.
