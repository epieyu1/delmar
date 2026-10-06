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
4. Before a requested push, check `gh auth status` and `git config --get credential.helper` without printing credentials. A configured helper is not proof that it has a usable credential; the push result determines that. Any missing-credential error must go through step 7 before ending the task. Do not assume the user must repeat an instruction already given in the conversation.
5. Create a concise commit on the current branch. Do not amend, reset, rebase, or force-push unless the user explicitly asks.
6. Push the current branch to its configured upstream after the user has authorized the push. If the sandbox blocks `.git` writes or network access, retry that exact Git operation with the required escalation and a specific justification. Never change the remote or use force-push to work around an error.
7. Recover from an HTTPS username/password prompt in this order:
   - Prefer an existing `gh auth` session or working Git credential helper.
   - If the user has already authorized using a GitHub token from the clipboard, that authorization persists across turns. After the ordinary push reports missing credentials, use the clipboard procedure immediately; do not stop at the first authentication error or ask the user to authenticate again.
   - Use a one-time `GIT_ASKPASS` script in `/private/tmp`. It must return the GitHub username for the username prompt and read the token with `pbpaste` only when Git asks for the password. Set `GIT_TERMINAL_PROMPT=0` for that push, remove the script with a shell `trap`, and never print, capture, log, save, or place the token in command arguments, an environment variable, or a project file. Do not run `pbpaste` directly in a visible terminal output.
   - If no prior clipboard authorization exists, do not read the clipboard; ask the user to authenticate. If the authorized clipboard is empty or the authenticated push still fails, stop and report the exact non-secret error without exposing the token.

Safe macOS askpass pattern (run only after prior user authorization; the token is read
from the clipboard only when Git invokes the password branch):

```sh
ASKPASS_FILE="$(mktemp /private/tmp/delmar-git-askpass.XXXXXX)"
trap 'rm -f "$ASKPASS_FILE"' EXIT
cat > "$ASKPASS_FILE" <<'EOF'
#!/bin/sh
case "$1" in
  *Username*) printf '%s\n' 'epieyu1' ;;
  *Password*) /usr/bin/pbpaste ;;
  *) exit 1 ;;
esac
EOF
chmod 700 "$ASKPASS_FILE"
GIT_ASKPASS="$ASKPASS_FILE" GIT_TERMINAL_PROMPT=0 git push
```

The one-time script is deleted when the shell exits. If the clipboard is empty, do not
retry with another credential source unless the user authorizes it.
8. Verify the resulting commit, upstream state, and working tree. Report the commit hash and whether the push succeeded. A successful push does not by itself confirm a separate deployment completed.

Keep the user informed about authentication or remote errors without including secrets in the update.
