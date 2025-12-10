# @transcodes/ui-components 로드맵

## 현재 상태

**npm publish 준비 중** - IMPLEMENTATION_PLAN.md 참조

## 즉시 작업 필요 (마이그레이션 준비)

> 자세한 내용은 루트의 `IMPLEMENTATION_PLAN.md` 참조

### 컴포넌트 확장
- [ ] tc-input: keydown/paste 이벤트 추가
- [ ] tc-callout: icon 슬롯 추가
- [ ] tc-divider: text prop 추가
- [ ] tc-icon: 13개 아이콘 추가

### npm publish 준비
- [ ] package.json 메타데이터 추가 (author, license, repository)
- [ ] LICENSE 파일 생성

---

## 향후 개선 계획

### Phase 1: 테스트 인프라

```bash
bun add -D vitest @open-wc/testing @vitest/browser
```

- 주요 컴포넌트 테스트 (tc-button, tc-input, tc-otp-input)
- Controllers 테스트
- CI 파이프라인 통합

### Phase 2: a11y 테스트

- Storybook addon-a11y 활용
- 각 스토리에 a11y 규칙 적용
- CI에서 a11y 검사 자동화

### Phase 3: 보안 개선

- tc-text XSS 방어 (unsafeStatic 허용 태그 화이트리스트)

### 나중에

- FormAssociated 구현 (tc-input, tc-otp-input)
- i18n 지원 (lit-localize)
