# 업그레이드 브랜치/릴리즈/롤백 정책

## 브랜치 전략
- 업그레이드 공통 작업은 `epic` 하위 이슈별로 개별 브랜치에서 진행한다.
- 브랜치 규칙:
  - `feat/<이슈번호>-요약`
  - `fix/<이슈번호>-요약`
  - `chore/<이슈번호>-요약`
  - `refactor/<이슈번호>-요약`
- 동일 이슈는 동일 브랜치에서 추가 커밋으로 연속 반영한다.

## 검증 단계
1. 로컬 검증: `npm run check:upgrade-regression`
2. 배포 게이트: `npm run check:deploy-gate`
3. 회귀 Smoke: `npm run check:p0-smoke`

## 승인/병합 규칙
- PR은 `Closes #이슈번호` 또는 `Fixes #이슈번호` 의무.
- `main` 병합 전:
  - 빌드 실패 0건
  - 핵심 라우트 200 응답 확인
  - P0 관련 에러 미해결 없음
- 배포 실패 시 hotfix 이슈를 별도로 열고, 긴급 패치 PR로 즉시 대응한다.

## 롤백 전략
- 긴급 이슈 발생 시:
  1. 문제 원인이 되는 업그레이드 PR을 즉시 되돌리는 방식으로 롤백 PR 생성
  2. `package.json`/`package-lock.json` 동기 버전 묶어서 되돌림
  3. 배포 재시도 전 회귀 체크리스트 재실행

## 알림/운영
- 업그레이드 이슈는 상태 변화(Ready/In Progress/Review/Done)를 Project로 추적.
- 배포 일지는 배포일, 결과, 실패 원인, 재시도 내역을 기록해 다음 회차 기획에 반영.
