# MungTangE — 작은 진입점, 필요한 만큼의 전문성

**웹 디자인 → 실제 구현 → 근거 기반 검증을 위한 프롬프트 중심 Agent Skill.**

[메인 SKILL.md](skills/mungtange/SKILL.md) · [루트 SKILLS.md (자동 생성)](SKILLS.md) · [GitHub Pages 카탈로그](https://duioolllll.github.io/MungTangE/)

MungTangE는 별도 모델 실행기나 CLI가 아닌 **AI의 디자인·프론트엔드 작업 방식을 안내하는 프롬프트**야. 짧은 메인 `SKILL.md`가 요청을 분류하고 핵심 원칙과 6단계 흐름을 적용해. 더 깊은 디자인·품질·보안·작업 분배 규칙은 **필요할 때만** `references/`에서 읽도록 설계했어.

## 한 번만 읽고 시작

메인 프롬프트만 복사하거나 AI에게 `SKILLS.md`를 읽어 달라고 지시해. 핵심 흐름은 **그 파일만으로도** 적용할 수 있어. 전문 문서는 설치된 스킬 폴더 안에 함께 있으며 관련 작업에서만 참고해.

선택적으로 표준 Agent Skills 설치기를 사용할 수 있어.

~~~bash
npx skills add Duioolllll/MungTangE --skill mungtange
~~~

**이것은 선택 사항이야.** 설치된 `skills/mungtange/` 폴더에는 메인 `SKILL.md`와 `references/`가 포함돼. Node.js, JSON 보고서, 별도 모델 API, 외부 스킬 카탈로그는 프롬프트 실행에 필요하지 않아.

### 실제 사용 요청 예시

~~~text
내 React 대시보드를 분석하고, 모바일에서도 잘 작동하도록 리디자인해줘.
필요한 컴포넌트를 구현하고, 키보드·로딩·오류 상태를 검증해.
검사하지 못한 항목은 NOT RUN이라고 표시해.
~~~

AI는 다음과 같이 진행하도록 안내받아.

~~~text
BRIEF → EXPLORE → DESIGN → BUILD → VERIFY → DELIVER
                ↖ 원인 분석 및 재검증 ↗
~~~

UI 생성·리디자인·참조 화면 구현·UI 감사를 중심으로 설계됐어. **백엔드 전용 요청이나 일반 코드 리뷰에 무차별로 트리거하지 않도록** description을 제한했어.

## Progressive disclosure: 필요할 때만 읽는 자료

| 작업 | 문서 |
| --- | --- |
| 디자인 방향, 토큰, 인터랙션 | [DESIGN.md](skills/mungtange/references/DESIGN.md) |
| 랜딩 페이지, 대시보드, 디자인 시스템, Figma, UI 감사 | [PLAYBOOKS.md](skills/mungtange/references/PLAYBOOKS.md) |
| 큰 작업의 단계·의존성 | [PIPELINE.md](skills/mungtange/references/PIPELINE.md) |
| 접근성, 테스트, 성능, 릴리스 차단 기준 | [QUALITY.md](skills/mungtange/references/QUALITY.md) |
| 실제 서브에이전트 도구가 있을 때만 | [ORCHESTRATION.md](skills/mungtange/references/ORCHESTRATION.md) |
| 위험한 소스·외부 작업·라이선스 | [SECURITY.md](skills/mungtange/references/SECURITY.md) |
| 변경·증거·한계 보고 | [OUTPUT.md](skills/mungtange/references/OUTPUT.md) |

AI가 실제로 코드를 수정하거나 브라우저에서 테스트하려면 **사용 중인 도구의 기능과 권한**이 필요해. 프롬프트가 그 능력을 새로 만들어주는 것은 아니야. 미실행 검사는 완료했다고 주장하지 않도록 해.

## 루트 SKILLS.md는 생성된 산출물

**수정해야 하는 유일한 원본은 `skills/mungtange/SKILL.md`야.** 루트 `SKILLS.md`는 관련 문서 링크만 저장소 상대 경로로 바꿔서 자동 생성해. 따라서 두 파일을 수동으로 따로 관리하지 않아.

~~~bash
npm run build:skill   # 원본에서 루트 파일 갱신
npm run check:skill   # CI에서 원본/산출물 불일치 검사
npm run verify        # 기존 Node 테스트 + 카탈로그 + 스킬 검증
~~~

## 기존 기능과의 관계

깃허브 카탈로그에는 디자인 100개, 모델·출력 100개, 웹 100개의 **외부 출처 메타데이터**가 있어. 이 목록은 선택적 탐색 자료이며, 설치된 `SKILL.md`가 자동으로 불러오거나 실행하지 않아. 각 원본의 안전성·품질·라이선스가 검수됐다는 주장도 아니야.

과거 버전의 `mungtange` Node CLI는 호환성을 위해 남아 있지만 **프롬프트에는 필요하지 않아**. CLI를 의도적으로 쓰는 경우에만 [기존 CLI 전용 문서](docs/LEGACY-CLI.md)를 참고해. 이 모드의 `.mungtange/` 파일과 JSON 보고서 요구 사항을 프롬프트 모드에 적용하면 안 돼.

[기여 가이드](CONTRIBUTING.md) · [보안 정책](SECURITY.md) · [설계 개요](docs/ARCHITECTURE.md) · [라이선스](LICENSE)
