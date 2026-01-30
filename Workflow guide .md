# 📱 Android Development Workflow (No Local Build Required)

## Your Setup
- ✅ Code on Android device (Termux + Code Server)
- ✅ Push to GitHub
- ✅ GitHub Actions builds APK
- ✅ Download and test APK on your device

---

## 🚀 Step-by-Step: Update Your Project

### Step 1: Update Files in Your Repository

Using your code editor (Code Server), replace these 3 files:

#### 1. Replace `.github/workflows/build-apk.yml`
Copy the content from `build-apk.yml` I provided

#### 2. Replace `package.json`
Copy the content from `package.json` I provided

#### 3. Replace `app.json`
Copy the content from `app.json` I provided

---

### Step 2: Commit and Push to GitHub

In Termux, run:

```bash
# Navigate to your project
cd ~/arbitrage-dzd  # or wherever your project is

# Add all changes
git add .

# Commit
git commit -m "fix: Update build configuration for GitHub Actions"

# Push to GitHub
git push origin main
```

---

### Step 3: Monitor GitHub Actions Build

#### Option A: Via GitHub Mobile App
1. Open GitHub app on your phone
2. Go to your repository
3. Tap "Actions" tab
4. Watch the build progress (takes ~5-10 minutes)

#### Option B: Via Browser
1. Open GitHub.com in browser
2. Go to your repository
3. Click "Actions" tab
4. Click on the running workflow

---

### Step 4: Download the APK

Once build completes (green checkmark ✓):

1. Click on the completed workflow run
2. Scroll down to "Artifacts" section
3. Download: `arbitrage-app-debug.zip`
4. Extract the APK file
5. Install on your device

---

## 📝 Daily Workflow

### When You Make Code Changes:

```bash
# 1. Edit your files in Code Server
# 2. Test logic (if possible)
# 3. Commit and push

git add .
git commit -m "feat: Add new feature"
git push origin main

# 4. GitHub Actions automatically builds
# 5. Download new APK from Actions tab
```

---

## ⚡ Quick Commands Reference

### Check Git Status
```bash
git status
```

### View Recent Commits
```bash
git log --oneline -5
```

### Push Changes
```bash
git add .
git commit -m "your message here"
git push origin main
```

### Pull Latest Changes (if editing from multiple devices)
```bash
git pull origin main
```

---

## 🐛 If Build Fails

### Step 1: Check the Error
1. Go to Actions tab on GitHub
2. Click the failed run (red X)
3. Click on the failed step
4. Look for error message

### Step 2: Common Error Patterns

#### Error: "npm ERR! code ERESOLVE"
**Fix:** Already handled by `--legacy-peer-deps` in workflow

#### Error: "Gradle build failed"
**Fix:** Already handled by Gradle version lock in workflow

#### Error: "Task assembleDebug FAILED"
**Look for:** Specific error in logs
- Syntax error in your JS code?
- Missing dependency?

### Step 3: Fix and Re-push
```bash
# Fix the issue in your code
git add .
git commit -m "fix: Resolve build error"
git push origin main
```

---

## 🎯 Testing Without Building

### Test Your Logic Locally

You can test JavaScript logic without building:

```bash
# In Termux
cd ~/arbitrage-dzd

# Install dependencies
npm install

# Run Node REPL
node

# Then in Node:
const { calculateArbitrage } = require('./src/utils/calculations.js');

// Test calculation
const result = calculateArbitrage({
  pUsdDzd: '245',
  pEurDzd: '282',
  eurOfferAmount: '100',
  wiseConvert: '100',
  wiseReceive: '115.34',
  fee: '0'
});

console.log(result);
```

---

## 📋 Checklist Before Each Push

- [ ] Code changes saved
- [ ] No obvious syntax errors
- [ ] Tested logic if possible
- [ ] Commit message is clear
- [ ] Pushed to `main` branch
- [ ] Check Actions tab for build status

---

## 💡 Pro Tips

### 1. Use Meaningful Commit Messages
```bash
# Good
git commit -m "feat: Add fee calculation"
git commit -m "fix: Correct USD conversion formula"
git commit -m "style: Improve input layout"

# Not so good
git commit -m "update"
git commit -m "fix bug"
```

### 2. Check Build Status Before Next Change
Wait for the build to finish before making more changes

### 3. Download APKs Regularly
Test each version on your device to catch issues early

### 4. Keep Old APKs
Name them: `arbitrage-v1.0.apk`, `arbitrage-v1.1.apk`, etc.

---

## 🔄 Typical Development Cycle

```
1. Edit code in Code Server on Android
   ↓
2. Save files
   ↓
3. git add . && git commit -m "message" && git push
   ↓
4. GitHub Actions builds APK (5-10 min)
   ↓
5. Download APK from Actions artifacts
   ↓
6. Install and test on your device
   ↓
7. Find issues? Go back to step 1
```

---

## 📦 What Gets Built

Each successful build creates:
- **File:** `arbitrage-app-debug.zip`
- **Contains:** `app-debug.apk`
- **Size:** ~20-30 MB
- **Valid for:** All Android 5.0+ devices

---

## 🆘 Emergency: Build Always Fails?

### Last Resort Option: Use Expo EAS

If GitHub Actions keeps failing, you can use Expo's build service:

```bash
# In Termux
npm install -g eas-cli

# Login to Expo (free account)
eas login

# Configure
eas build:configure

# Build (free tier: limited builds per month)
eas build --platform android --profile preview
```

This is more reliable but requires an Expo account and has monthly limits on free tier.

---

## 📞 Need Help?

When asking for help, provide:
1. ✅ Link to your GitHub Actions run
2. ✅ Screenshot of error message
3. ✅ Which step failed (e.g., "Build Debug APK")
4. ✅ Any recent changes you made

---

## ✅ You're All Set!

Your workflow is now:
1. **Code** → 2. **Push** → 3. **Wait** → 4. **Download** → 5. **Test**

No local Android SDK, no Gradle, no complex setup needed! 🎉