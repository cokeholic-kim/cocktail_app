# 업그레이드 의존성·환경 정합성 정책

## 의존성 업데이트 원칙
- `package.json` 변경은 이슈 번호가 있는 업그레이드 작업에서만 진행한다.
- 변경 후 다음을 모두 수행한다.
  - `npm install` 실행으로 `package-lock.json` 동기화
  - `npm ci --ignore-scripts`로 클린 재설치 확인
  - `npm run check:deps-compat`로 브레이크포인트 점검
- lockfile은 수동 편집하지 않는다.

## 버전 변경 추적 규칙
- 주요 프레임워크 버전은 PR 설명에 변경 사유, 비교 포인트, 테스트 결과를 같이 기록한다.
- `next`, `react`, `react-dom` 같은 런타임 핵심 패키지는 최소 1차 검증 후에만 마이너/메이저 업그레이드로 진행한다.
- 롤백 필요 시 `package.json`과 `package-lock.json`을 함께 되돌리고, PR에서 명시한다.

## 환경 변수 정합성
- `.env*`는 원격으로 커밋하지 않는다.
- 공개 저장소에는 템플릿(`.env.example`)만 노출하고 실제값은 CI/배포 설정에서 관리한다.
- 신규 환경 변수를 추가할 때:
  - 이름, 기본값, 비밀번호/도메인 사용 의도, 노출 범위를 문서화한다.
  - 값 타입(`string/boolean/number`) 변동 시 하위 호환 영향 범위를 점검한다.
- 배포 브랜치 반영 전, `npm run check:deploy-gate`에서 환경 변수 의존 실패가 없어야 한다.
