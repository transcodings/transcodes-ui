---
description: 버전 릴리스 준비 (CHANGELOG + package.json 버전 업데이트)
argument-hint: [version]
allowed-tools: Bash(git log:*), Bash(git tag:*), Bash(git diff:*), Bash(git describe:*), Read, Edit
---

# Release Preparation

버전 **$ARGUMENTS** 릴리스를 준비하세요.

## 참조 정보

마지막 태그:
!`git describe --tags --abbrev=0 2>/dev/null`

최근 커밋 (20개):
!`git log --oneline -20`

모든 태그:
!`git tag -l --sort=-v:refname`

## 작업

### 1. package.json 버전 업데이트

다음 파일들의 `version` 필드를 `$ARGUMENTS`로 변경:
- `packages/design-tokens/package.json`
- `packages/ui-components/package.json`

ui-components의 `@transcodes/design-tokens` 의존성 버전도 `^$ARGUMENTS`로 업데이트 (같은 버전일 경우).

### 2. CHANGELOG.md 업데이트

커밋들을 분석하여 변경사항을 분류:
- **Added** (feat:, add:)
- **Changed** (refactor:, perf:, update:)
- **Fixed** (fix:)
- **Removed** (remove:)
- **Security** (security:)

각 패키지의 CHANGELOG.md 업데이트:
- `packages/design-tokens/CHANGELOG.md`
- `packages/ui-components/CHANGELOG.md`

Keep a Changelog 형식 준수:
- 제목: `## [$ARGUMENTS] - YYYY-MM-DD`
- 사용자 관점의 명확한 설명
- 역시간순 (최신이 맨 위)
- 각 패키지에 해당하는 변경사항만 기록
- 변경사항이 없는 패키지는 업데이트하지 않음

### 3. 완료 후 안내

작업 완료 후 다음 명령어 안내:
```bash
git add . && git commit -m "chore: release v$ARGUMENTS"
git tag v$ARGUMENTS
git push origin main --tags
```
