# Deploy Gate Checklist (P0)

## 필수 점검
- `npm run lint`
- `npm run build`
- `npm run check:p0-smoke`

## 핵심 경로 확인
- 다음 경로에 대해 GET 200 응답과 기본 렌더 결과를 확인한다.
  - `/`
  - `/cocktails`
  - `/ingredients`
  - `/myingredients`
  - `/cocktails/[name]`
  - `/ingredients/[name]`
  - `/login`
  - `/join`

## 수동 점검
- 홈/목록/상세 화면에서 오프라인 fallback(데이터 미연결 시 공지/빈 상태)이 노출되는지 확인한다.
- URL 인코딩 예외 값(`ingredient`, `cocktail`)을 상세 라우트에서 조회 가능한지 확인한다.
- API 요청 실패 경로에서 Promise 실패 처리와 에러 UI가 정상인지 확인한다.

## 실행 방법
- `powershell -ExecutionPolicy Bypass -File .\scripts\p0-deploy-gate.ps1 -BaseUrl https://cocktail-app-sand.vercel.app`
- `powershell -ExecutionPolicy Bypass -File .\scripts\p0-smoke-tests.ps1 -BaseUrl https://cocktail-app-sand.vercel.app -CocktailName "Margarita" -IngredientName "vodka"`

## PR 체크리스트
- PR 본문에 다음을 포함한다.
  - `Closes #이슈번호`
  - 수동 점검 결과(통과/실패)
  - 배포 게이트/스모크 실행 결과
