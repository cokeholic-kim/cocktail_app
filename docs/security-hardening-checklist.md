# 보안 하드닝 체크리스트 (Issue #29 기반)

## 하위 이슈 반영 상태
- #76 의존성 취약점 스캔 및 조치 우선순위
- #77 인증/세션/토큰 처리 방식 점검
- #78 API 입력 유효성/권한 경계 점검
- #79 민감정보 노출 및 로그 마스킹 점검
- #80 배포/CI 보안 가드 정비 검토

## 실행 전 점검
- `.env*`에 민감값(`SECRET`, `TOKEN`, `KEY`, `PASSWORD`, `DATABASE_URL`)이 하드코딩되어 있는지 확인
- 브라우저 노출 가능한 `NEXT_PUBLIC_*` 값에 비밀정보가 없는지 확인
- 로그인/세션 토큰/쿠키를 콘솔로 노출하지 않도록 로그 점검

## 정적 자산/헤더
- `next.config.mjs`의 보안 헤더 적용 여부 점검
  - `Content-Security-Policy`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `Cross-Origin-*` 계열 헤더
- `public` 정적 파일이 필요한 파일만 배포되는지 확인

## 인증/세션 경계
- 로그인 요청 시 입력값 길이/형식 검증을 수행하고, 실패 시 일반화된 메시지로 응답한다.
- 세션 상태 체크/로그아웃은 불필요한 토큰 노출 없이 요청 헤더를 최소화한다.
- 에러 쿼리 파라미터 및 URL 기반 에러 문자열을 사용자 노출 전에 마스킹한다.

## 입력 검증/권한 경계
- 사용자 입력 기반 JSON 바디는 trim + 타입 정규화 후 서버로 전달한다.
- 경로 파라미터 사용 구간은 `encodeURIComponent` 등 인코딩 규칙을 일관 적용한다.
- API 응답 파싱 전 `content-type` 기반 분기와 파싱 실패 예외 처리를 둔다.

## 로그/민감정보 노출 관리
- `console.*` 사용 시 민감 키워드(`token`, `password`, `authorization`, `cookie`)는 마스킹 처리한다.
- 예외 메시지/프론트 알림은 원문을 그대로 노출하지 않고, 사용자가 이해 가능한 일반 메시지로 축약한다.
- API 실패/catch 구간은 로그 수집용 메시지를 유지하되 민감값은 가림 처리한다.

## 이미지/원격 URL 정책
- `next.config.mjs`의 `images.remotePatterns`에 허용 도메인만 등록되어 있는지 확인
- 허용되지 않은 외부 URL은 API/DB 단계에서 차단

## 배포 후 확인
- `/` 핵심 페이지 로드 시 CSP/헤더 누락 에러 확인
- API 오류 시에도 UI 레이아웃이 파괴되지 않는지 확인
- `npm run build`와 `npm run lint` 통과 여부 기록

## 의존성 취약점 점검 절차
- 정기 실행 명령:
  - `npm run check:security:report`
  - `npm run check:deps-compat`
- 심각도 기준 대응 우선순위:
  - `high`, `critical`: 즉시 수정/차단 (`P0`, `P1`)
  - `moderate`: 다음 스프린트 내 대응 (`P2`)
- 보고서 산출:
  - `docs/security-reports/security-audit-latest.md`
  - `docs/security-reports/security-audit-latest.json`
- 고위험 취약점이 있으면 변경이 없어도 PR은 블록하고 증빙 링크를 이슈에 첨부한다.
- lockfile 변경 규칙:
  - `package-lock.json` 변경은 이슈 승인 후, `npm` 결과 재현 가능 상태(변경된 패키지, 변경 사유, 영향 범위)와 함께 PR에 명시
  - 예시: `curl -I https://<도메인>/ | grep -Ei "content-security-policy|x-frame-options|strict-transport-security|referrer-policy"`
  - 기대값: `content-security-policy`, `x-frame-options`, `strict-transport-security`, `referrer-policy` 헤더가 모두 응답에 존재
- API 오류 시에도 UI 레이아웃이 파괴되지 않는지 확인
  - 예시: `curl -i https://<도메인>/api/health` 또는 실제 백엔드 헬스 엔드포인트
  - 기대값: 예상 응답(200/204 등) 수신과 페이지 레이아웃 유지
- `npm run build`와 `npm run lint` 통과 여부 기록
  - 예시: `npm run build`  
    기대값: Exit code 0
  - 예시: `npm run lint`  
    기대값: Exit code 0

## 배포/CI 보안 가드
- `.github/workflows/security-audit.yml`를 통해 PR/정기 스케줄에서 보안 게이트를 수행한다.
- 최소 게이트 명령:
  - `npm run lint`
  - `npm run check:security:report`
  - `npm run check:deps-compat`
- PR 본문/이슈에 증빙 파일 경로(`docs/security-reports/...`)를 남긴다.
