# GitHub Pages deployment runbook

## Prerequisites

- Repository: `Duioolllll/MungTangE`, default branch `main`.
- A maintainer must go to **Settings → Pages → Build and deployment → Source → GitHub Actions**.
- Repository Actions must be enabled. No deployment secrets, external hosting, npm publish token or domain are needed for the default URL.
- Intended URL: https://duioolllll.github.io/MungTangE/ . This is a planned endpoint until the first successful deployment is observed.

## Local verification

~~~bash
npm run verify
python3 -m http.server 8080 --directory site
~~~

`build:site` reads only the three local catalog JSON files and writes `site/catalog.json`. It is deterministic and has no network requests. Run the catalog integrity and CLI tests before merging.

## CI behavior

- `.github/workflows/ci.yml` runs on pull requests and pushes to `main`, with read-only permissions.
- It performs syntax/test checks, regenerates the catalog payload, and checks provenance, counts and static site references.
- `.github/workflows/pages.yml` runs on `main` and manual dispatch. Its build job repeats the verification and uploads `site/` as a Pages artifact.
- Only the deployment job has `pages:write` and `id-token:write` and the `github-pages` environment. A PR cannot deploy via this workflow.
- A rejected check must block merger through branch protection, configured by the maintainer.

## First deploy

1. Merge a reviewed PR after checks succeed.
2. Set Pages Source to GitHub Actions if not already configured.
3. Open **Actions → Deploy MungTangE Pages**; trigger `workflow_dispatch` if necessary.
4. Check deployment job success, then open the URL and test filtering, links and clipboard buttons.
5. Confirm mobile widths, keyboard navigation, contrast and correct data counts with real browser evidence.
6. Configure main branch protection: require the CI `verify` job, block force pushes and require PR reviews as appropriate.

## Rollback

Revert the offending commit on `main` and allow Pages to redeploy. Preserve run logs and the previous successful deployment. Do not push directly to generated `site/catalog.json`. For urgent incidents, disable Pages in repository settings; do not pretend that a failed workflow unpublished earlier content.

## Release policy

**Publishing this repository to npm is a separate action.** `npx --yes github:Duioolllll/MungTangE` needs no npm package release. Do not enable automated `npm publish` or trusted publishing until an owner explicitly sets the release policy, verifies package contents and authorizes release.
