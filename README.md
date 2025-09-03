<p align="center">
  <a href="https://nomadia-two.vercel.app/">
  <img width="200" height="200" alt="logo" src="./public/images/icons/logo.svg" />
  </a>
</p>

<div align="center">

# Nomadia : Nomad + Utopia
### 어디서든 '나답게' 머무는 경험을 시작하세요.

**노마디아 (Nomadia)** 는 노마드를 위한 **액티비티 예약 플랫폼**입니다.  
사용자가 직접 체험을 등록하고, 다른 노마드의 체험을 예약하며 경험을 공유할 수 있습니다.

</div>
<p align="center">
배포 링크: https://nomadia-two.vercel.app/
</p>

<div align="center">
<details>
<summary> 👀 Preview Image</summary>

#### 회원가입/로그인

---

#### 메인페이지 캐러셀

#### 메인페이지 리스트

#### 메인페이지 검색

---

#### 마이페이지 내 정보 수정

#### 마이페이지 예약 관리

#### 마이페이지 내 체험 관리

#### 마이페이지 내 예약 현황

---

#### 상세페이지

---

#### 체험 등록

</details>
<br>
</div>

## 주요 기능

- 💻 **체험 등록** - 노마드가 직접 체험을 등록하고 관리
- 📅 **예약 시스템** - 실시간 예약 가능 날짜 확인 및 예약
- 🔍 **스마트 검색** - 카테고리, 지역별 체험 검색
- 👤 **마이페이지** - 예약 내역, 예약 현황, 체험 관리, 프로필 수정

## 기술 스택

### **Core Stack**

| 기술            | 버전                | 설명                                   |
| --------------- | ------------------- | ------------------------------------------- |
| **Next.js**     | 15.3.5 (App Router) | 파일 기반 라우팅, SSR/SSG로 SEO 최적화      |
| **TypeScript**  | 5.x                 | 정적 타입으로 개발 안정성 향상              |
| **React**       | 19.0.0              | 최신 기능(Server Components, Suspense) 활용 |
| **TailwindCSS** | v4 + Turbopack      | 빠른 빌드와 일관된 디자인 시스템            |

### **Data & State Management**

| 기술               | 설명                                           |
| ------------------ | ---------------------------------------------- |
| **TanStack Query** | 서버 상태 캐싱과 동기화로 API 요청 최적화      |
| **Zustand**        | 간단하고 직관적인 클라이언트 상태 관리         |
| **Axios**          | 안정적인 HTTP 클라이언트, 인터셉터로 토큰 관리 |

### **Form & Validation**

| 기술                | 설명                        |
| ------------------- | --------------------------- |
| **React Hook Form** | 성능 최적화된 폼 라이브러리 |
| **Zod**             | TypeScript 기반 스키마 검증 |

### **UI/UX**

| 기술              | 설명                                |
| ----------------- | ----------------------------------- |
| **shadcn/ui**     | 커스터마이징 가능한 컴포넌트 시스템 |
| **Framer Motion** | 부드러운 애니메이션과 인터랙션      |

### **Development & Deployment**

| 기술              | 설명                             |
| ----------------- | -------------------------------- |
| **Vercel**        | Next.js 최적화된 배포 플랫폼     |
| **Husky**         | Git Hook으로 코드 품질 자동 검증 |
| **Lighthouse CI** | 성능 및 접근성 지속적 모니터링   |

## R&R

<table>
  <tr>
    <td>
    <img src="./public/images/icons/nomadia.svg" alt="노마디아" width="200" />
    </td>
    <td>
    <img width="700" alt="지윤" src="https://github.com/user-attachments/assets/5dc9a246-7db3-4770-98e2-1c8ca6500c96" />
    </td>
    <td>
    <img width="700" alt="영현" src="https://github.com/user-attachments/assets/7a783360-154a-4bc8-be12-227523f40734" />
    </td>
    <td>
    <img width="700" alt="준우" alt="image-2" src="https://github.com/user-attachments/assets/a4e25b3d-5dd7-4579-afdf-f7c7721bf352" />
    </td>
    <td>
    <img width="700" alt="동환" alt="image" src="https://github.com/user-attachments/assets/af171698-31e7-4aec-a27f-e91394195e09" />
    </td>
  </tr>
  <tr>
    <th>팀원</th>
    <td><strong>전지윤</strong>(팀장)</td>
    <td><strong>김영현</strong></td>
    <td><strong>김준우</strong></td>
    <td><strong>유동환</strong></td>
  </tr>
  <tr>
    <td><strong>페이지,<br> 기능</strong></td>
    <td>
      - 체험 상세 페이지<br>
      - 404 페이지, 에러 페이지<br>
    <td>
      - 랜딩 페이지 기획 및 구현<br>
      - 메인 페이지<br>
      - 예약 내역 페이지<br>
      - 체험 등록 페이지<br>
    </td>
    <td>
      - 예약 현황 페이지<br>
      - 메인 페이지(체험 검색 기능)<br>
    </td>
    <td>
      - 로그인 페이지<br>
      - 회원가입 페이지<br>  
      - 체험 수정 페이지<br>
      - 마이 페이지<br>
    </td>
  <tr>
    <td><strong>(shared)<br> 공통 컴포넌트, <br> 공통 로직</strong></td>
    <td>
      - Pagination<br>
      - Modal<br>
      - Calendar<br>
      - Infinite Scroll</td></td>
    <td>      
      - Loading Spinner<br>
      - Skeleton<br>
      - Carousel<br>
      - Error Message<br> 
    </td>
    <td>
      - Dropdown<br>
      - Header<br>
      - Footer<br>
    </td>
    <td>- Sidebar</td>
  </tr>
  <tr>
    <td><strong>기타</strong></td>
    <td>- ESLint, Pretter, settings.json 설정<br>- 프로젝트 리디자인</td>
    <td>- 공통 스타일 정의 </td>
    <td>- 데모 영상</td>
    <td>- 배포<br> - 발표</td>
  </tr>
</table>

<br>

## 프로젝트 문서

### 트러블슈팅

| 작성자     | 설명                                                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **전지윤** | [에러 핸들링 (in 앱 라우터)](https://www.notion.so/in-237bbeae3e2b80588e00f306680edaec)                                           |
| **김영현** | [Props Hell 탈출기: Context API로 컴포넌트 최적화](https://www.notion.so/Props-Hell-Context-API-263b2ffc607580b5923cd91b1bd088d4) |
| **김준우** | [커스텀 클래스 사용 시 타이포그래피 우선순위 문제](https://www.notion.so/248bbeae3e2b80adb9b2c8a16d298ea0)                        |
| **유동환** | -                                                                                                                                 |

### UX 개선 사항

| 작성자     | 설명 |
| ---------- | ---- |
| **전지윤** |      |
| **김영현** |      |
| **김준우** |      |
| **유동환** |      |

### Engineering Breakdown

| 작성자     | 설명                                           |
| ---------- | ---------------------------------------------- |
| **전지윤** | 패턴,캐싱 전략,구현 설계에 대한 문서 등 - 링크 |
| **김영현** |                                                |
| **김준우** |                                                |
| **유동환** |                                                |

### TIL

| 작성자     | 설명 |
| ---------- | ---- |
| **전지윤** |      |
| **김영현** |      |
| **김준우** |      |
| **유동환** |      |

### 기타 문서

| 작성자     | 설명                                                       |
| ---------- | ---------------------------------------------------------- |
| **전지윤** | 기타 컨벤션이나, 공통컴포넌트 사용법 문서화 등.. 관련 링크 |
| **김영현** |                                                            |
| **김준우** |                                                            |
| **유동환** |                                                            |
