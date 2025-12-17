# Style Dictionary 커스텀 설정 가이드

## 설정 파일

| 파일 | 용도 |
|-----|-----|
| `sd.config.ts` | 라이트 테마 빌드 설정 |
| `sd.config.dark.ts` | 다크 테마 빌드 설정 |

## 커스텀 트랜스폼

### name/kebab-flat
토큰 경로를 kebab-case로 변환 (중첩 제거):
- `ink.black` → `ink-black`
- `color.primary.500` → `color-primary-500`

### name/camel-flat
토큰 경로를 camelCase로 변환:
- `ink.black` → `inkBlack`
- `color.primary.500` → `colorPrimary500`

## 커스텀 포맷

### css/components
컴포넌트 토큰을 CSS 클래스로 변환:

```css
/* 입력: tokens/components/button.json */
.button-primary {
  background: var(--accent-blue);
  color: var(--paper-white);
}
```

## 토큰 정의 형식 (DTCG)

Design Token Community Group 형식 사용:

```json
{
  "토큰명": {
    "$value": "값",
    "$type": "color | dimension | ...",
    "$description": "설명 (선택)"
  }
}
```

## 다크 모드

`[data-theme="dark"]` 선택자로 오버라이드:

```html
<html data-theme="dark">
```

다크 테마 토큰: `tokens/themes/dark.json`
