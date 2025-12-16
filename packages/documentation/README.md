# Transcodes UI Documentation

Mintlify 기반 공식 문서 사이트입니다.

## 로컬 개발

```bash
# 루트에서
bun run dev:docs

# 또는 packages/documentation에서
bun run dev
```

로컬 서버: http://localhost:3000

## 배포 방법

### Mintlify Cloud 자동 배포 (권장)

1. **Mintlify 대시보드 설정**
   - https://mintlify.com 접속 (GitHub 로그인)
   - "New Documentation" 클릭
   - 저장소 선택: `transcodings/transcodes-ui`
   - Settings → Git Settings:
     - ✅ "Set up as monorepo" 활성화
     - ✅ Documentation Path: `/packages/documentation` (끝에 `/` 없이!)
     - ✅ Branch: `main`
   - Save changes

2. **자동 배포**
   - `main` 브랜치에 푸시하면 자동 배포
   - 배포 URL: `https://[subdomain].mintlify.dev`
   - GitHub App이 변경사항 자동 감지

### 커스텀 도메인 (선택사항)

Mintlify Dashboard → Custom Domain:
- 도메인 추가: `docs.transcodes.io`
- DNS CNAME 레코드 추가
- SSL 자동 발급

### Vercel 통합 (메인 사이트와 통합 시)

메인 사이트가 Vercel에 있다면 `/docs` 경로로 통합 가능:

1. Mintlify Dashboard → Custom domain setup
2. "Host at /docs" 토글 활성화
3. 루트 `vercel.json`에 rewrites 추가 (이미 설정됨)
4. `[subdomain]`을 실제 Mintlify 서브도메인으로 교체

## 문서 구조

- **총 30개 페이지** (80페이지 제한의 37.5%)
- 11,935줄, 380KB

```
packages/documentation/
├── index.mdx              # 홈
├── quickstart.mdx         # Quick Start
├── introduction/          # 소개 (3)
├── design-tokens/         # 디자인 토큰 (5)
├── primitives/            # Primitives (6)
├── widgets/               # Widgets (6)
├── screens/               # Screens (2)
├── guides/                # 가이드 (5)
└── api-reference/         # API (1)
```

## 주요 특징

- ✅ Mintlify MDX 포맷
- ✅ 다중 프레임워크 예시 (HTML, React, Lit)
- ✅ 완전한 API 레퍼런스
- ✅ 실전 예제 및 튜토리얼
- ✅ 한글 작성
- ✅ Storybook 링크 연결

## 문서 업데이트

1. MDX 파일 수정
2. `main` 브랜치에 커밋 및 푸시
3. Mintlify가 자동으로 재배포 (약 1-2분 소요)

## 참고 자료

- [Mintlify 문서](https://mintlify.com/docs)
- [모노레포 설정](https://www.mintlify.com/docs/deploy/monorepo)
- [Vercel 통합](https://www.mintlify.com/docs/deploy/vercel)
