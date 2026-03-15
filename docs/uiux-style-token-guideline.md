## UI/UX 스타일 토큰 가이드

### 공통 토큰 위치
- 기본 토큰: `src/app/(common)/components/uiTokens.ts`
- Tailwind 전역 클래스는 `src/app/(common)/styles` 또는 `app/globals.css`에서 보완.

### 토큰 사용 규칙
- 색상, border, 배경, 텍스트 강조는 가능하면 `uiTokenStyles` 또는 기존 공통 CSS 클래스 변수로 통일.
- 레이아웃 여백/간격은 `uiTokenStyles.layout`, `uiTokenStyles.search`, `uiTokenStyles.content` 계열 우선 사용.
- 버튼은 `uiTokenStyles.button.primary`를 우선 사용하고, 다른 패턴은 PR 코멘트 사유를 남겨야 함.

### 적용 대상 컴포넌트
- 핵심 컴포넌트: `CocktailCard`, `IngredientCard`, `DataStateNotice`, `SearchBox`, `NewIngredientCard`
- 신규/수정 페이지: `/cocktails`, `/ingredients`, `/myingredients`, `/design-lab`

### 점검 체크리스트
- 새 스타일 추가 시 다음을 확인:
  - 동일 의미의 값에 이미 기존 토큰이 있는지 검색 (`DataViewState`, `uiTokenStyles`, 공통 클래스)
  - 색상 토큰은 hex 대신 토큰/클래스 이름으로 통일
  - 패딩/간격은 기존 공백 토큰과 호환 가능한지 검증
  - 반응형 클래스(`md:`, `lg:`) 사용 시 토큰과 충돌 없는지 확인
  - 미사용 하드코딩 클래스가 없어졌는지 `git diff`에서 재확인
  
### 운영 규칙
- 주간 점검 시 하드코딩 클래스가 새로 도입되면 `[epic/uiux]` 하위 이슈로 반영.
- 디자인 변경 PR에는 아래 항목 결과를 포함:
  - 수동 점검 경로 (`/`, `/cocktails`, `/ingredients`, `/myingredients`)
  - 변경된 토큰 목록/제거된 하드코딩 목록
