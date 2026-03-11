# 업그레이드 브랜치/릴리즈/롤백 정책

## 브랜치 전략
- 업그레이드 공통 작업은 `epic` 하위 이슈별로 개별 브랜치에서 진행한다.
- 새 브랜치는 항상 `main`에서 생성한다.
- 브랜치 규칙:
  - `feat/<이슈번호>-요약`
  - `fix/<이슈번호>-요약`
  - `chore/<이슈번호>-요약`
  - `refactor/<이슈번호>-요약`

## 검증 단계
1. 로컬 검증: `npm run check:upgrade-regression`  
   - 내부적으로 `npm run lint`, `npm run build`, `npm run check:p0-smoke` 실행
2. 배포 게이트: `npm run check:deploy-gate`
3. 회귀 Smoke: `npm run check:p0-smoke`

## 승인/병합 규칙
- PR 본문에 `Closes #이슈번호` 또는 `Fixes #이슈번호`를 필수 기재한다.
- `main` 병합 전 필수 조건:
  - 빌드 실패 0건 (`check:deploy-gate` 통과)
  - 핵심 라우트 200 응답 (`check:p0-smoke` 통과)
  - P0 관련 에러 미해결 없음
- 최소 1명 이상의 승인(또는 팀의 Branch Protection에서 설정한 승인 수) 필요.
- 브랜치 보호/체크 항목은 GitHub Branch Protection에서 필수 체크로 설정한다.
- 배포 실패 시 hotfix 이슈를 별도로 생성하고, 긴급 패치 PR로 즉시 대응한다.

## 롤백 전략
- 긴급 이슈 발생 시:
  1. 문제 원인이 된 업그레이드 PR의 원본 머지 커밋 SHA를 확인한다.
  2. `git revert -m 1 <merge-commit-sha>`로 롤백 커밋 생성 후, 새 브랜치(`chore/<이슈번호>-rollback`)에서 PR 생성
  3. 동일 PR로 `package.json`/`package-lock.json` 변경이 있었던 경우, revert 커밋에서 함께 되돌아오는지 확인한다.
  4. 롤백 PR 본문에 원본 업그레이드 PR 링크(`#원본PR`)와 재검증 결과를 기재한다.
  5. 배포 재시도 전 `npm run check:deploy-gate`, `npm run check:p0-smoke`를 재실행한다.

## 운영/알림
- 업그레이드 이슈 상태(Ready/In Progress/Review/Done)는 Project로 추적한다.
- 배포 일지는 `docs/deployment-log.md`에 아래 항목으로 기록한다.
  - 배포일, 배포 대상 브랜치, 결과, 실패 원인, 재시도 내역, PR/Issue 링크
