# MungTangE

웹 인터페이스를 설계하고 구현할 때 사용하는 Agent Skill입니다. 기획부터 디자인, 코드 수정, 검증까지 일관된 작업 순서를 제공합니다.

기본 사용에는 별도 실행기나 API 키가 필요하지 않습니다. `SKILLS.md`를 에이전트에 전달하거나 Agent Skills 형식으로 설치하면 됩니다.

[작업 지침](SKILLS.md) · [설치용 스킬](skills/mungtange/SKILL.md) · [브랜드 디자인](skills/mungtange/references/BRAND-DIRECTION.md) · [3D·모션 가이드](skills/mungtange/references/MOTION-3D.md)

## 시작하기

```bash
npx skills add Duioolllll/MungTangE --skill mungtange
```

또는 [SKILLS.md](SKILLS.md)를 프로젝트 지침에 추가해도 됩니다. 에이전트마다 지침 파일을 읽는 방식은 다르므로 자동 인식 여부는 사용하는 도구에서 확인하세요.

예를 들어 다음처럼 요청할 수 있습니다.

```text
현재 프로젝트를 분석하고 랜딩페이지를 다시 설계해줘.
제품 특성이 드러나는 시안 3개를 비교한 뒤 하나를 구현하고,
1440·768·390px 화면을 확인해서 발견한 문제를 수정해줘.
```

코드 수정, 브라우저 실행, 스크린샷 캡처는 에이전트가 실제로 사용할 수 있는 도구와 권한에 따라 달라집니다.

## 작업 흐름

| 단계 | 하는 일 |
| --- | --- |
| BRIEF | 사용자, 목표, 기존 코드, 제약과 완료 조건 파악 |
| EXPLORE | 기존 구조와 참고 자료 조사, 구현 방향 비교 |
| DESIGN | 정보 구조, 화면 구성, 타이포그래피, 브랜드 규칙 결정 |
| BUILD | 기존 동작을 유지하면서 실제 코드 구현 |
| VERIFY | 반응형, 상호작용, 접근성, 오류와 시각적 결함 확인 |
| DELIVER | 변경 파일, 실행한 검사, 남은 문제 정리 |

작은 수정은 필요한 단계만 간단히 수행합니다. 새 페이지나 큰 개편에서는 비교·검증에 더 많은 시간을 씁니다. 검사를 실행하지 못했다면 통과한 것으로 취급하지 않습니다.

## 디자인 기준

### 프로젝트에 맞는 정체성

디자인을 시작하기 전에 프로젝트의 코드, 문서, 작업 결과물, 글과 사용자에게 제공된 정보를 살핍니다. 여기서 확인한 특징을 화면의 콘텐츠 순서, 시각적 요소, 타이포그래피와 상호작용에 연결합니다.

개인 블로그라면 이름과 사진을 다른 개발자로 바꿨을 때도 그대로 자연스러운지 확인합니다. 주요 콘텐츠나 시각적 표현을 바꿀 필요가 없다면 그 사이트만의 개성이 부족한 것입니다.

### 시안 비교

방향이 정해지지 않은 디자인 작업에서는 서로 다른 3개 구성을 비교할 수 있습니다. 색만 바꾼 시안이 아니라 첫 화면의 구조, 문장과 콘텐츠 순서, 타이포그래피, 근거 자료, 모바일 배치를 함께 비교합니다.

설명으로 작성한 3개 방향과 실제 구현·캡처한 3개 화면은 구분합니다. 이미 방향이 정해졌다면 불필요하게 다시 경쟁시키지 않습니다.

### 화면 검증

기본 확인 폭은 **1440px, 768px, 390px**입니다. 가로 넘침뿐 아니라 작은 보조 텍스트, 줄 간격, 버튼 접근성, 로딩·오류 상태를 확인합니다. 화면 캡처 후 발견한 문제를 수정하고 같은 조건에서 다시 확인하는 방식입니다.

[브랜드 디자인 가이드](skills/mungtange/references/BRAND-DIRECTION.md) · [화면 검증 가이드](skills/mungtange/references/VISUAL-LOOP.md)

## 3D와 모션

3D가 필요하다는 이유만으로 무거운 WebGL 장면부터 만들지는 않습니다. CSS·SVG·GSAP·이미지 시퀀스·Three.js·React Three Fiber·WebGPU 중 요구사항에 맞는 방식을 선택합니다.

3D 장면을 구현할 때는 프로젝트의 정체성을 반영하는 소재와 공간 구성, 카메라와 시간축, 실제 사용할 에셋, 모바일 배치, 정지 화면 대안을 먼저 정합니다. 구현 후에는 주요 스크롤 구간과 역방향 이동, 키보드·터치 조작, `prefers-reduced-motion`, 로딩 실패와 리소스 정리를 확인합니다.

3D·모션 관련 **100개 SKILL.md 원문**을 수집해 SHA와 원본 경로, 구현·검증 단서를 기록했습니다. 이 가운데 **12개 원문**은 구현 가이드 작성에 사용하도록 별도로 자세히 검토했습니다. 100개 전체에 대한 독립적인 품질·라이선스 심사가 끝났다는 의미는 아닙니다.

[3D·모션 작업 가이드](skills/mungtange/references/MOTION-3D.md) · [100개 출처 인덱스](skills/mungtange/references/motion/ROUTER.md) · [조사 기록](research/motion-100-analysis.json)

## 참고 자료

디자인, 모델 출력, 웹 개발 분야의 기존 스킬 **300개**도 출처와 SHA를 기준으로 정리해 두었습니다. 원문의 구조와 적용 단서를 추출한 자료이며, 300개를 모두 직접 실행하거나 전문가 검토한 결과는 아닙니다.

| 문서 | 내용 |
| --- | --- |
| [DEEP-INTEGRATION.md](skills/mungtange/references/DEEP-INTEGRATION.md) | 선별한 주요 디자인·개발 스킬의 적용 방식 |
| [BRAND-DIRECTION.md](skills/mungtange/references/BRAND-DIRECTION.md) | 시안 비교와 브랜드 정체성 설계 |
| [VISUAL-LOOP.md](skills/mungtange/references/VISUAL-LOOP.md) | 화면 캡처, 결함 수정, 재검증 |
| [MOTION-3D.md](skills/mungtange/references/MOTION-3D.md) | 3D 장면, 애니메이션, 성능·접근성 |
| [지식 인덱스](skills/mungtange/references/knowledge/ROUTER.md) | 기존 300개 스킬의 원본 위치와 요약 |
| [출처 검증 기록](docs/SOURCE-AUDIT.md) | 수집·검증 범위와 한계 |

참고 문서는 작업에 필요한 것만 선택해서 읽도록 구성했습니다. 원본 스킬의 코드를 무조건 복사하거나 실행하지 않습니다.

## 개발과 테스트

Node.js 20 이상이 필요합니다. 일반적인 스킬 사용에는 Node.js가 필수는 아닙니다.

```bash
npm run verify                       # 기본 테스트, 스킬 동기화·카탈로그 검사
npm run brand:validate               # 브랜드 방향 예제의 구조 검사
node scripts/verify-motion-sources.mjs  # 3D·모션 100개 출처 기록 검사
```

브라우저 캡처 기능은 별도로 Playwright와 Chromium을 설치한 환경에서 실행합니다.

```bash
npm run visual:smoke                  # 반응형 캡처·비교 도구 테스트
npm run motion:smoke                  # 스크롤 구간·reduced-motion 캡처 테스트
```

직접 만든 페이지를 캡처하는 예시입니다.

```bash
node scripts/motion-capture.mjs \
  --url http://127.0.0.1:3000 \
  --out .visual-review/motion \
  --selector '#scene'
```

이 스크립트들은 **저장소 전체를 체크아웃했을 때** 사용할 수 있는 개발용 도구입니다. `npx skills add`는 루트의 `scripts/`까지 설치하지 않습니다. 캡처와 자동 측정은 문제를 찾는 데 도움을 주지만, 디자인 완성도나 실제 GPU 성능을 대신 평가하지는 않습니다.

## 기여

기본 지침은 루트 [SKILLS.md](SKILLS.md)에서 관리합니다. 수정 후 `npm run sync:skill`을 실행하면 설치용 `SKILL.md`가 갱신됩니다. 새로운 참고 자료는 원본 링크, 버전 또는 SHA, 적용 조건과 검증 범위를 함께 남겨 주세요.

[기여 가이드](CONTRIBUTING.md) · [보안 정책](SECURITY.md) · [라이선스](LICENSE)
