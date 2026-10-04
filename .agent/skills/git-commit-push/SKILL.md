---
name: git-commit-push
description: Review, commit, and push authorized changes in the Del Mar repository. Use when the user asks to publish project changes; do not push for ordinary coding tasks.
---

# Commit and push project changes

Use this skill when the user explicitly asks to commit and/or push changes to `https://github.com/epieyu1/delmar.git`.

## Workflow

1. Inspect the branch, upstream, remotes, working tree, staged changes, and untracked files. Confirm `origin` is the expected repository. Sanitize remote output before displaying it; never expose embedded credentials.
2. Review the full staged and unstaged diff. Stage only the changes the user authorized for this release. Exclude unrelated edits, secrets, `.DS_Store`, build output, and other local-only files. If unrelated work is mixed in and cannot be cleanly isolated, ask before committing it.
3. Run `git diff --cached --check` and review the staged file list and summary. Do not run application tests unless the user asks.
4. Create a concise commit on the current branch. Do not amend, reset, rebase, or force-push unless the user explicitly asks.
5. For authentication, prefer the configured Git credential helper or an existing `gh auth` session. Never print, log, commit, or place tokens in command arguments, environment dumps, or project files. If the user says a GitHub token is in the clipboard and no saved credential is available, pass the clipboard contents directly through a pipe to the configured secure credential helper; do not capture or display the token. Stop if the clipboard is empty or authentication still fails.
6. Push the current branch to its configured upstream after the user has authorized the push. If the sandbox blocks `.git` writes or network access, retry the exact Git operation with the required escalation and a specific justification. Never change the remote or use force-push to work around an error.
7. Verify the resulting commit, upstream state, and working tree. Report the commit hash and whether the push succeeded. A successful push does not by itself confirm a separate deployment completed.

Keep the user informed about authentication or remote errors without including secrets in the update.
