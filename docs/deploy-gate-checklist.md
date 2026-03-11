# Deploy Gate Checklist (P0)

## 실행 순서
- `npm run lint`
- `npm run build`
- `npm run check:p0-smoke`
- `npm run check:deps-compat`

## 라우트 점검
- GET 200 확인 경로:
  - `/`
  - `/cocktails`
  - `/ingredients`
  - `/myingredients`
  - `/cocktails/[name]`
  - `/ingredients/[name]`
  - `/login`
  - `/join`

## 오프라인/예외 처리 점검
- 목록/상세/내재료 페이지에서 백엔드 미연결일 때도 fallback UI가 유지되는지 확인한다.
- 검색 결과가 없거나 네트워크 실패 시 안내 문구가 노출되는지 확인한다.
- API 에러가 발생해도 치명적인 레이아웃 깨짐이 없는지 확인한다.

## 빌드 정책 (Next.js 16)
- 현재 운영 기준은 webpack 기반으로 유지한다.
  - `npm run dev` (`next dev --webpack`)
  - `npm run build` (`next build --webpack`)
- `next.config.mjs`(또는 동일 경로의 `next.config.ts`)에 webpack 커스텀 설정이 존재할 경우:
  - Turbopack 경고가 뜨면 기본 운영은 `--webpack`으로 고정한다.
  - Turbopack 정식 마이그레이션이 완료되면 `turbopack` 설정을 명시적으로 분기 처리한다.
- `npm run dev:turbopack`, `npm run build:turbopack`은 비교 점검 용도로 사용한다.

## 롤백/배포 체크
- 배포 실행 전:
  - `npm run check:deploy-gate`
  - `npm run check:p0-smoke`
  - `npm run check:deps-compat`
- 하나라도 실패하면 배포는 중단한다.

## PR 요구사항
- PR 본문에 `Closes #이슈번호` 또는 `Fixes #이슈번호` 필수
- 점검 결과(성공/실패)와 에러 로그 링크 첨부
- PR 템플릿에서 Project 카드 연결 상태 점검
