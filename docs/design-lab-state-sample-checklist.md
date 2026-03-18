## [체크리스트] 디자인랩 상태 샘플 점검

- [ ] `design-lab` 페이지 진입 시 디버그 UI 노출 플래그(false) 접근 차단 동작 확인
- [ ] Cocktail/Ingredient 컴포넌트 상태 버튼에서 `ready/loading/empty/error` 조합으로 전환 가능
- [ ] `loading` 상태에서 스켈레톤 노출 확인
- [ ] `error` 상태에서 에러 메시지 노출 및 fallback 동작 확인
- [ ] 검색어 입력 시 검색 결과 0건에서 `검색 결과가 없습니다.` 메시지 표시
- [ ] 소스 샘플이 비어 있을 때 `샘플 데이터가 없습니다.` 메시지 표시
- [ ] 상태 전환/로딩/에러/빈 상태에서 UI 깨짐 없음
- [ ] 공통 메시지(에러/빈 상태) 하드코딩 제거 및 fixture 상수 사용 반영
- [ ] 관련 파일 변경 증빙 포맷/위치 PR 본문 반영

### 상태 샘플 증빙 규칙(문서/스크린샷)
- 상태별 시나리오(`ready`, `loading`, `empty`, `error`) 캡처를 PR 본문에 `docs` 또는 커밋 링크와 함께 첨부
- 빈 상태 메시지는 `sourceEmpty`/`searchResultEmpty` 분기 명시
- 실패/예외 시나리오 메시지와 화면 동작은 fixture 상수(`designLabFallbackMessage` 등) 사용 근거를 함께 명시
