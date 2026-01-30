# 🚀 Quick Reference Card - Git Commands

## Copy-Paste Ready Commands

### 📤 Push Changes to GitHub (Build Automatically)
```bash
git add .
git commit -m "update: Your change description here"
git push origin main
```

### 📥 Get Latest Code from GitHub
```bash
git pull origin main
```

### 👀 Check What Changed
```bash
git status
git diff
```

### 📜 View Recent Commits
```bash
git log --oneline -10
```

### 🔙 Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### 🗑️ Discard All Local Changes
```bash
git reset --hard HEAD
```

---

## 🎯 Common Scenarios

### Scenario 1: You Made Changes, Ready to Build
```bash
cd ~/arbitrage-dzd
git add .
git commit -m "feat: Added new calculation feature"
git push origin main
# → Go to GitHub Actions to see build
```

### Scenario 2: You Want to Try Something Risky
```bash
# Create a test branch
git checkout -b test-feature

# Make changes, test locally
# ...

# If it works, merge to main:
git checkout main
git merge test-feature
git push origin main

# If it doesn't work, just delete the branch:
git checkout main
git branch -D test-feature
```

### Scenario 3: Build Failed, Need to Fix
```bash
# View the error on GitHub Actions
# Fix the code in Code Server
# Then:
git add .
git commit -m "fix: Resolve build error"
git push origin main
```

### Scenario 4: Forgot What You Changed
```bash
git status              # See which files changed
git diff src/file.js    # See exact changes in a file
```

### Scenario 5: Want to Go Back to Previous Version
```bash
# See all commits
git log --oneline

# Go back to specific commit (replace COMMIT_ID)
git checkout COMMIT_ID

# Go back to latest
git checkout main
```

---

## 📱 Mobile-Friendly Git Workflow

### Using Termux:

```bash
# Setup (first time only)
cd ~
cd arbitrage-dzd  # your project folder

# Every time you make changes:
git add . && git commit -m "update" && git push origin main
```

### Using GitHub Mobile App:
1. Open GitHub app
2. Your repository → Actions
3. See build progress
4. Download APK when done

---

## ⚡ Super Quick Commands

### One-Liner: Add, Commit, Push
```bash
git add . && git commit -m "update" && git push
```

### One-Liner: See Build Status in Browser
```bash
termux-open-url "https://github.com/YOUR_USERNAME/arbitrage-dzd/actions"
```

### One-Liner: Pull, Edit, Push
```bash
git pull && nano file.js && git add . && git commit -m "fix" && git push
```

---

## 🐛 Troubleshooting Git Issues

### Issue: "Permission denied (publickey)"
```bash
# Generate SSH key (if not done)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH Keys → New SSH key
```

### Issue: "Your branch is behind"
```bash
git pull origin main
# Resolve any conflicts if needed
git push origin main
```

### Issue: "Cannot push" / "Rejected"
```bash
# Force push (careful!)
git push -f origin main
```

### Issue: Messed Everything Up
```bash
# Nuclear option: Reset to last GitHub version
git fetch origin
git reset --hard origin/main
```

---

## 📚 Commit Message Guide

### Format
```
type: Short description

Longer explanation if needed
```

### Types
- `feat:` New feature
- `fix:` Bug fix
- `style:` UI/styling changes
- `refactor:` Code restructuring
- `docs:` Documentation changes
- `test:` Adding tests
- `chore:` Maintenance tasks

### Examples
```bash
git commit -m "feat: Add break-even calculator"
git commit -m "fix: Correct USD to DZD conversion"
git commit -m "style: Improve button colors"
git commit -m "refactor: Simplify calculation logic"
```

---

## 🔐 GitHub Token for HTTPS (If Needed)

If using HTTPS instead of SSH:

### Create Personal Access Token
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Select `repo` scope
5. Copy token

### Use Token as Password
```bash
git push origin main
# Username: your_github_username
# Password: paste_your_token_here
```

### Save Token (Don't Type Each Time)
```bash
git config --global credential.helper store
# Next time you push, it will save the token
```

---

## 💾 Save These Commands

Copy this file to your device for quick reference:

```bash
# View this file anytime
cat QUICK-REFERENCE.md

# Or open in editor
nano QUICK-REFERENCE.md
```

---

## 🎓 Learning Resources

- Git basics: https://git-scm.com/book/en/v2
- GitHub Actions: https://docs.github.com/en/actions
- Expo docs: https://docs.expo.dev

---

## ✨ Pro Tips

1. **Commit often** - Small commits are easier to track
2. **Pull before push** - Avoid conflicts
3. **Test locally first** - If possible
4. **Use branches** - For experimental features
5. **Write clear commits** - Your future self will thank you

---

Made for mobile developers who code on Android devices 📱