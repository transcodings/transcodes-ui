# @transcodes/design-tokens 개선 계획

## 현재 상태

**npm publish 준비 완료** - 수동 실행 대기 중

## 남은 작업

### 1. npm publish 실행 (수동)

```bash
cd packages/design-tokens
npm publish --access public
```

### 2. CI/CD 파이프라인 (선택)

필요시 `.github/workflows/publish.yml` 생성:
- 버전 태그 시 npm 자동 배포
- build 검증

### 3. ui-components 통합 (npm publish 후)

ui-components에서 design-tokens 패키지 사용:
```typescript
import '@transcodes/design-tokens';
import '@transcodes/design-tokens/tokens-dark.css';
import '@transcodes/design-tokens/components.css';
```

## 완료된 작업 요약

- ✅ DTCG 표준 준수 ($type 속성)
- ✅ 다크 모드 지원 (tokens-dark.css)
- ✅ WCAG AA 접근성 (4.5:1+ 대비율)
- ✅ 컴포넌트 CSS 클래스 생성
- ✅ npm 패키지 설정 (exports, files, publishConfig)
