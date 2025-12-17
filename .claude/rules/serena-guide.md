# Serena MCP 사용 가이드

코드 탐색 및 수정 시 **Serena MCP 도구를 우선 사용**할 것.

## 핵심 도구

| 도구 | 용도 |
|-----|-----|
| `find_symbol` | 클래스, 메서드, 함수 등 심볼 검색 (name_path 패턴 지원) |
| `get_symbols_overview` | 파일 내 심볼 구조 파악 |
| `find_referencing_symbols` | 심볼 참조 위치 추적 |
| `replace_symbol_body` | 심볼 본문 교체 |
| `insert_after_symbol` / `insert_before_symbol` | 심볼 전후에 코드 삽입 |
| `search_for_pattern` | 정규식 기반 코드 검색 |

## 장점

- Read/Edit 대비 토큰 사용량 절약
- 심볼 단위로 정확한 코드 추적 가능
- 전체 파일 읽기 없이 필요한 부분만 조회/수정

## 사용 패턴

### 파일 구조 파악
```
get_symbols_overview(relative_path="src/primitives/button.ts")
```

### 특정 심볼 검색
```
find_symbol(name_path_pattern="TcButton/render", include_body=True)
```

### 참조 추적
```
find_referencing_symbols(name_path="TcButton", relative_path="src/primitives/button.ts")
```
