# Deploy Gate Checklist (P0)

## 필수 점검
- `npm run lint`
- `npm run build`
- `npm run check:p0-smoke`
- `npm run check:deps-compat`

## 핵심 경로 점검
- GET 200 응답 기준으로 아래 경로를 확인한다.
  - `/`
  - `/cocktails`
  - `/ingredients`
  - `/myingredients`
  - `/cocktails/[name]`
  - `/ingredients/[name]`
  - `/login`
  - `/join`

## 수동 점검
- 홈/목록/상세/로그인 경로에서 오프라인 fallback(데이터 미연결 시 공지/빈 상태)이 노출되는지 확인한다.
- 주요 상세 경로의 URL 인코딩 값이 정상 동작하는지 확인한다.
- API 실패 상태에서 에러 UI가 깨지지 않고 표시되는지 확인한다.

## 실행 명령
- `npm run check:deploy-gate`
- `npm run check:p0-smoke`
- `npm run check:deps-compat`

## PR 체크리스트
- `Closes #이슈번호` 또는 `Fixes #이슈번호`를 본문에 기입한다.
- 수동 점검 결과(통과/실패)와 조치 내역을 기록한다.
- PR 본문에 Project 카드 링크를 첨부한다.
