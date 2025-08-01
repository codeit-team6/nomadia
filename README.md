# Nomadia

## Lighthouse CI/CD

이 프로젝트는 Lighthouse CI를 사용하여 성능, 접근성, SEO를 자동으로 테스트합니다.

### 설치된 패키지

- `@lhci/cli`: Lighthouse CI 명령줄 도구

### 사용법

#### 1. 전체 Lighthouse CI 실행

```bash
pnpm lighthouse:ci
```

#### 2. 개별 단계 실행

```bash
# Lighthouse 수집
pnpm lighthouse:collect

# Lighthouse 검증
pnpm lighthouse:assert

# 결과 업로드 (선택사항)
pnpm lighthouse:upload
```

#### 3. 개발 환경에서 테스트

```bash
# 개발 서버 시작 후
pnpm dev

# 다른 터미널에서
pnpm lighthouse
```

#### 4. 결과 확인

```bash
# 브라우저에서 HTML 보고서 열기
pnpm lighthouse:open

# 결과 파일 목록 보기
pnpm lighthouse:results

# 결과는 .lighthouseci/ 디렉토리에 저장됨
```

### 설정

- `lighthouserc.js`: Lighthouse CI 설정 파일
- 성능 기준: 80점 이상 (경고)
- 접근성 기준: 90점 이상 (에러)
- SEO 기준: 80점 이상 (경고)
- 모범 사례 기준: 80점 이상 (경고)

### CI/CD 통합

GitHub Actions나 다른 CI/CD 플랫폼에서 다음과 같이 사용할 수 있습니다:

```yaml
- name: Run Lighthouse CI
  run: pnpm lighthouse:ci
```

### 성능 개선 권장사항

현재 Lighthouse 결과에서 개선이 필요한 부분:

#### 1. Largest Contentful Paint (LCP) 개선

- **현재**: 13.1초 (기준: 5초 이하)
- **개선 방법**:
  - 이미지 최적화 (WebP 포맷 사용, 적절한 크기)
  - 중요 리소스 사전 로드 (`<link rel="preload">`)
  - 서버 응답 시간 개선
  - CDN 사용

#### 2. 이미지 최적화

```tsx
// Next.js Image 컴포넌트 사용
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority // LCP 이미지에 priority 추가
  placeholder="blur"
/>
```

#### 3. 폰트 최적화

```tsx
// 폰트 사전 로드
<link
  rel="preload"
  href="/fonts/PretendardVariable.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```
