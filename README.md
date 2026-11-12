# MungTangE 뭉탱이 2.0

**복잡한 스킬 실행기 대신, 프롬프트 하나로 디자인 → 개발 → 검증까지.**

**[SKILLS.md 핵심 프롬프트](SKILLS.md)** · [스킬 설치용 SKILL.md](skills/mungtange/SKILL.md) · [실전 심화 가이드](skills/mungtange/references/DEEP-INTEGRATION.md)

MungTangE는 웹디자인·프론트엔드·UX에 집중한 **프롬프트 중심 Agent Skill**입니다. AI가 작업을 이해하고 필요한 전문가 관점을 골라서 실제 구현과 검증을 한 흐름으로 수행하도록 설계했습니다.

> **필수 설치 없음. 필수 API 없음. 필수 CLI 없음. 추가 JSON 보고서 없음.**  
> 오직 [SKILLS.md](SKILLS.md)를 AI의 프로젝트 지침이나 대화에 전달하면 됩니다. 실제 파일 수정·브라우저 검사·코드 실행은 사용 중인 AI의 도구 권한에 따라 달라집니다.

## 이렇게 쓰세요

**1. [SKILLS.md](SKILLS.md)의 전체 내용을 열어 AI 에이전트의 지침으로 전달하세요.**

Codex, Claude Code, OpenCode, Copilot, Gemini, ChatGPT 등에서 프롬프트 지침으로 사용할 수 있습니다. 각 도구가 `SKILLS.md`를 자동 인식한다고 가정하지 마세요. 프로젝트 지침 파일에 내용을 붙여넣거나 읽을 파일로 명시하세요. 이 저장소의 [AGENTS.md](AGENTS.md)는 루트 SKILLS.md를 명시적으로 가리킵니다.

**2. 평범하게 작업을 요청하세요.**

~~~text
내 기존 Next.js 프로젝트를 분석해서 학교 커뮤니티 대시보드를
새롭게 디자인하고 실제 코드로 구현해줘.
모바일·키보드·로딩·에러 상태까지 검증하고 문제가 있으면 수정해줘.
~~~

**3. MungTangE가 프롬프트만으로 실행 절차를 결정합니다.**

~~~text
요청 분석
    ↓
전문가 관점 선택 (UX · 디자인 · 프론트엔드 · QA 등)
    ↓
BRIEF → EXPLORE → DESIGN → BUILD → VERIFY → DELIVER
    ↓
실패 시 원인 분석 → 수정 → 재검증
    ↓
실제 결과물 + 검증 증거 + 남은 문제
~~~

CLI·외부 모델 호출·서브에이전트가 없어도 지침 자체는 작동합니다. **실제 하위 에이전트가 있는 도구에서는 필요할 때만** 독립 작업으로 분리합니다. 도구가 없으면 제공 가능한 결과를 직접 만들고 실행하지 못한 검사는 명확히 표시합니다.

## 포함된 기능

| 영역 | 프롬프트의 행동 지침 |
| --- | --- |
| Design | 제품에 맞는 스타일, 타이포·컬러·레이아웃·반응형 설계 |
| UX | 사용자 여정, 접근성, 입력·로딩·오류·완료 상태 |
| Frontend | 기존 프로젝트 분석, 작은 수직 기능 단위 구현, 회귀 방지 |
| Web QA | 키보드·반응형·스크린샷·성능·보안 검증 **(도구가 있을 때 실제 실행)** |
| Skills | 과제에 맞는 참조 방법 선택, 출처·라이선스·보안 확인 |
| Model Output | 증거 기반 완료 보고, 거짓 통과 방지, 실패 시 원인 분석 |
| Orchestration | 의존성·파일 소유권 관리, 필요할 경우에만 병렬 실행 |
| Delivery | 변경 파일·검증 내용·한계·승인 단계 정리 |

**노하우의 출처:** 핵심 방법론은 [대표 원문 10개를 직접 살펴보고 정리한 심화 가이드](skills/mungtange/references/DEEP-INTEGRATION.md)에 있어요. 별도로 공개된 300개 링크는 [출처·해시를 자동 검사한 연구 기록](docs/SOURCE-AUDIT.md)으로, 그 자체가 심층 분석이나 품질 인증은 아닙니다.

## 추가 설치는 완전히 선택 사항

기존 Agent Skills 형식의 설치가 편하면 아래 명령어를 사용해도 됩니다.

~~~bash
npx skills add Duioolllll/MungTangE --skill mungtange
~~~

표준 설치기는 `skills/mungtange/SKILL.md`를 읽습니다. 이 파일은 루트 `SKILLS.md`에서 `npm run sync:skill`로 생성되며 **설치 경로에 맞게 링크가 변환**됩니다. 핵심 프롬프트는 단독으로 동작하며, 필요할 때만 `references/DEEP-INTEGRATION.md` 등 소수의 선택형 실전 가이드를 참고합니다. 일반적인 작업에는 추가 로딩이 필요 없습니다. CLI는 필요 없습니다.

기존 `mungtange` Node CLI와 300개 카탈로그는 **호환성·연구 기록을 위한 부수 기능**입니다. 스킬 사용에 필요하지 않으며, [선택 기능 안내](docs/LEGACY.md)에 분리해 두었습니다.

## 한계

프롬프트는 AI의 작업 절차를 강화하지만, 도구 권한을 새로 만들어주지는 않습니다. 브라우저가 없는 AI는 실제 화면을 검증할 수 없고, GitHub 쓰기 권한이 없으면 PR을 만들 수 없습니다. MungTangE는 **하지 않은 검사를 통과했다고 말하지 않도록** 설계되어 있습니다.

## MungTangE Benchmark v1 — 실제 효과 비교

프롬프트의 문구 검사만으로는 AI 성능 향상을 입증할 수 없습니다.
별도 [evals/](evals/README.md)에서 **웹 UI 과제 10개**, **기본 AI/MungTangE 동일 모델 2개 그룹**, **Playwright + axe-core 브라우저 검증**, **5가지 객관적 지표**, **스크린샷 차이와 자동 비교 보고서**를 제공합니다.

~~~bash
npm install
npx playwright install chromium
npm run eval:smoke                               # 테스트 프레임워크 동작 검증만
npm run eval:prepare -- --run trial01            # 10×2 작업공간 생성
npm run eval:run -- --run trial01 --config evals/.runner.local.json  # 실제 AI CLI 필요
npm run eval:score -- --run trial01              # 실제 산출물 비교 보고서
~~~

**주의:** 일반 CI는 실제 유료 AI를 호출하지 않습니다. smoke는 알려진 정상/비정상 UI 샘플로 검사기를 테스트할 뿐, MungTangE 성능 향상 결과가 아닙니다. 사용자가 실제 모델 실행을 연결하기 전에는 **NOT RUN**입니다. 자세한 방법과 편향·비용 설명은 [Benchmark 문서](evals/README.md)에 있습니다.

## 개발 및 기여

기존 CLI·카탈로그·GitHub Pages 기능은 유지됩니다. 프롬프트 수정은 루트 `SKILLS.md`만 편집한 뒤 `npm run sync:skill`로 설치용 사본을 생성합니다. `npm run verify`는 생성 결과·기존 코드·출처 검증 기록을 확인합니다. 원문 재검증은 별도 수동 작업이며, **어휘 매칭 결과를 실전 노하우나 품질 점수로 쓰지 않습니다.** 외부 SKILL.md의 라이선스는 해당 프로젝트에 남아 있으며 MungTangE에 자동 귀속되지 않습니다. [기여 가이드](CONTRIBUTING.md) · [보안 정책](SECURITY.md) · [라이선스](LICENSE).
