# Resolving Git Push Conflict

## The Problem
Your local branch has commits that the remote doesn't have, AND the remote has commits you don't have locally. You need to pull the remote changes first, then push.

## Solution Steps

### Step 1: Authenticate with GitHub

You need to authenticate. Choose one method:

#### Option A: Use GitHub Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` permissions
3. Copy the token

Then when you run git commands, use the token as your password:
```bash
git pull --rebase origin main
# Username: your-github-username
# Password: paste-your-token-here
```

#### Option B: Set up SSH Keys

1. Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Add to ssh-agent:
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

3. Copy public key:
```bash
cat ~/.ssh/id_ed25519.pub
```

4. Add to GitHub: Settings → SSH and GPG keys → New SSH key

5. Change remote to SSH:
```bash
git remote set-url origin git@github.com:Cliffy21/jn-parts.git
```

### Step 2: Pull Remote Changes

Once authenticated, pull with rebase to integrate remote changes:

```bash
git pull --rebase origin main
```

This will:
- Fetch remote changes
- Rebase your local commits on top of remote commits
- Resolve any conflicts if they occur

### Step 3: Resolve Conflicts (if any)

If there are conflicts:
1. Git will show which files have conflicts
2. Open those files and look for conflict markers: `<<<<<<<`, `=======`, `>>>>>>>`
3. Edit to resolve conflicts
4. Stage resolved files: `git add <file>`
5. Continue rebase: `git rebase --continue`

### Step 4: Push Your Changes

After successfully pulling:

```bash
git push origin main
```

## Quick Command Sequence

```bash
# 1. Make sure all local changes are committed
git add .
git commit -m "Your commit message"

# 2. Pull with rebase (will prompt for auth)
git pull --rebase origin main

# 3. Push your changes
git push origin main
```

## Alternative: Force Push (⚠️ Use with Caution)

If you're sure you want to overwrite remote changes:

```bash
git push --force origin main
```

**WARNING**: Only use this if you're certain you want to overwrite remote changes. This can cause issues for other collaborators.

## Need Help?

If you continue having authentication issues, you may need to:
1. Set up Git credential helper
2. Use GitHub CLI (`gh auth login`)
3. Check your GitHub account permissions



