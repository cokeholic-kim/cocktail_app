# Deploy Gate Checklist (P0)

## 필수 실행 체크
- `npm run lint`
- `npm run build`
- `npm run dev` 실행 후 핵심 페이지 수동 점검:
  - `/`
  - `/cocktails`
  - `/ingredients`
  - `/myingredients`
  - `/cocktails/[name]`
  - `/ingredients/[name]`

## 배포 전 수동 확인
- 백엔드 미연결 시 `OfflineDataNotice` 노출 및 빈 상태 fallback가 보이는지 확인
- 동적 라우트에서 URL 인코딩이 깨지지 않는지 확인
- 브라우저 에러 콘솔에 크래시/미해결 Promise 예외가 없는지 확인

## 실행 스크립트
- `powershell -ExecutionPolicy Bypass -File .\scripts\p0-deploy-gate.ps1 -BaseUrl https://cocktail-app-sand.vercel.app`

## PR 체크리스트 반영
- PR 본문에 다음 항목 반영:
  - `Closes #이슈번호`
  - 게이트 실행 결과 요약(성공/실패 항목)
  - 실패 시 재현/해결 이슈 번호

