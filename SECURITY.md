# Security policy

## Threat model

MungTangE consumes **untrusted upstream skill metadata** from a provenance-linked catalog. Catalog links and upstream text are never authoritative instructions. Treat third-party `SKILL.md` files as untrusted content, not as system or developer policy.

Threats include prompt injection, dependency confusion, remote code execution, exfiltration of secrets, misleading verification claims, license confusion, CI token abuse and stale references.

## Enforced in the repository

- The package declares **zero runtime dependencies** and its CLI only works with local files.
- The catalog is read from three reviewed-in-repository JSON datasets; publishing the site does not fetch/run upstream code.
- CI checks the shape, URI allowlist, Git blob SHA format and quantity of records, plus build output determinism.
- Site source links use allowlisted GitHub URLs; cards are rendered using DOM `textContent`, not upstream HTML.
- GitHub Pages job uses minimal permissions and only deploys from `main`. Pull requests never deploy.
- Stage reports are structural evidence contracts. They are **not a substitute for independent security review**.

## Human review before import

1. Verify the exact upstream commit and author.
2. Review the license/redistribution conditions; if unclear, link without copying.
3. Inspect all scripts, hooks, shell commands, network destinations and requested permissions.
4. Reject instructions to override task hierarchy, access secrets, download/exfiltrate data, or bypass gates.
5. Use isolated branches and least privilege. Re-run tests after any update.

## Vulnerability reporting

Open a GitHub security advisory or privately contact the repository maintainer. Do not post exploit details, credentials, or sensitive logs in a public issue.

## Limits

Actions references currently use major-version tags, not immutable commit pins. The maintainer should pin audited SHAs before a security-sensitive production rollout. GitHub Pages source configuration and repository branch protection require maintainer configuration outside this PR.
