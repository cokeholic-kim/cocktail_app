# 보안 하드닝 체크리스트 (Issue #29 기반)

## 실행 전 점검
- `.env*`에 민감값(`SECRET`, `TOKEN`, `KEY`, `PASSWORD`, `DATABASE_URL`)이 하드코딩되어 있는지 확인
- 브라우저에서 노출 가능한 `NEXT_PUBLIC_*` 값은 접속점(도메인/API URL) 외에 비밀값이 없는지 검증
- 로그인/세션 토큰/쿠키를 콘솔에 출력하지 않도록 로그 코드 점검

## 정적 자산/헤더
- `next.config.mjs`의 보안 헤더 적용 여부 점검
  - `Content-Security-Policy`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `Cross-Origin-*` 계열 헤더
- `public` 정적 파일이 필요한 파일만 배포되는지 확인

## 이미지/원격 URL 정책
- `next.config.mjs`의 `images.remotePatterns`에 허용 도메인만 등록되어 있는지 확인
- 허용되지 않은 외부 URL은 API/DB 단계에서 차단

## 배포 후 확인
- `/` 핵심 페이지 로드 시 CSP/헤더 누락 에러 확인
- API 오류 시에도 UI 레이아웃이 파괴되지 않는지 확인
- `npm run build`와 `npm run lint` 통과 여부 기록
