## 디자인랩 상태 샘플 스토리 구성 가이드

### 목표
- `design-lab`은 API 없이도 핵심 컴포넌트의 상태를 빠르게 확인할 수 있어야 한다.
- 기본/로딩/에러 상태를 화면 레벨에서 일관되게 재현한다.
- 향후 Storybook 연동 시 이 구조를 그대로 스토리로 이식할 수 있게 상태 입력 데이터를 정리한다.

### 상태 시나리오
- `ready`: 샘플 데이터 정상 렌더링
- `loading`: 스켈레톤 노출 + 안내 메시지
- `empty`: 데이터 0건 상태 처리
- `error`: 에러 메시지 노출 + 폴백 동작 유지

### Storybook 대응 포인트(예정)
- 컴포넌트 단위:
  - `CocktailCard`, `IngredientCard`, `NewIngredientCard`, `SearchBox`
- 컨테이너 단위:
  - `DesignLabClient` 상태 조합(`ready`/`loading`/`empty`/`error`) + 검색어 2종
- 공통 메타:
  - 메시지 고정값을 fixture에서 주입하고, 상태 문자열을 `DesignLabState` 타입으로 제한
- 빈 상태 분기:
  - `sourceEmpty`: 소스 데이터 자체가 0건인 경우
  - `searchResultEmpty`: 소스는 존재하지만 검색 결과가 0건인 경우

### 작업 산출물
- 상태별 시나리오 코드 스케치
- 상태별 기대 결과 캡처(ready/loading/empty/error 각 조합)
- 문구 정합성 리뷰 항목(에러/빈 상태 공통 메시지, 검색어별 분기 문구)
