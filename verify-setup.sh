#!/bin/bash

# Arbitrage DZD - Build Verification Script
# This script checks if all necessary files are present and properly configured

echo "🔍 Verifying Arbitrage DZD Build Configuration..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to check file existence
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1"
        return 0
    else
        echo -e "${RED}✗${NC} Missing: $1"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# Function to check directory
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1/"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} Missing: $1/ (will be created)"
        WARNINGS=$((WARNINGS + 1))
        return 1
    fi
}

# Check essential files
echo "📁 Checking Essential Files..."
check_file "package.json"
check_file "app.json"
check_file "App.js"
check_file ".gitignore"
check_file ".github/workflows/build-apk.yml"
echo ""

# Check source files
echo "📂 Checking Source Files..."
check_dir "src"
check_dir "src/components"
check_dir "src/screens"
check_dir "src/utils"
check_file "src/components/AppInput.js"
check_file "src/components/ResultCard.js"
check_file "src/screens/HomeScreen.js"
check_file "src/utils/calculations.js"
check_file "src/utils/storage.js"
echo ""

# Check package.json content
echo "📦 Checking package.json Configuration..."
if [ -f "package.json" ]; then
    # Check for Expo
    if grep -q '"expo"' package.json; then
        echo -e "${GREEN}✓${NC} Expo dependency found"
    else
        echo -e "${RED}✗${NC} Expo dependency missing"
        ERRORS=$((ERRORS + 1))
    fi
    
    # Check for React Native
    if grep -q '"react-native"' package.json; then
        echo -e "${GREEN}✓${NC} React Native dependency found"
    else
        echo -e "${RED}✗${NC} React Native dependency missing"
        ERRORS=$((ERRORS + 1))
    fi
    
    # Check for AsyncStorage
    if grep -q '@react-native-async-storage/async-storage' package.json; then
        echo -e "${GREEN}✓${NC} AsyncStorage dependency found"
    else
        echo -e "${RED}✗${NC} AsyncStorage dependency missing"
        ERRORS=$((ERRORS + 1))
    fi
fi
echo ""

# Check app.json content
echo "⚙️ Checking app.json Configuration..."
if [ -f "app.json" ]; then
    # Check for Android package
    if grep -q '"package"' app.json; then
        PACKAGE=$(grep -o '"package"[[:space:]]*:[[:space:]]*"[^"]*"' app.json | cut -d'"' -f4)
        echo -e "${GREEN}✓${NC} Android package: $PACKAGE"
    else
        echo -e "${RED}✗${NC} Android package not configured"
        ERRORS=$((ERRORS + 1))
    fi
    
    # Check for version
    if grep -q '"version"' app.json; then
        VERSION=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' app.json | head -1 | cut -d'"' -f4)
        echo -e "${GREEN}✓${NC} App version: $VERSION"
    else
        echo -e "${YELLOW}⚠${NC} Version not set"
        WARNINGS=$((WARNINGS + 1))
    fi
fi
echo ""

# Check .gitignore
echo "🚫 Checking .gitignore..."
if [ -f ".gitignore" ]; then
    if grep -q "node_modules" .gitignore; then
        echo -e "${GREEN}✓${NC} node_modules/ ignored"
    else
        echo -e "${YELLOW}⚠${NC} node_modules/ should be ignored"
        WARNINGS=$((WARNINGS + 1))
    fi
    
    if grep -q "android" .gitignore; then
        echo -e "${GREEN}✓${NC} android/ ignored (correct for prebuild)"
    else
        echo -e "${YELLOW}⚠${NC} android/ should be ignored"
        WARNINGS=$((WARNINGS + 1))
    fi
fi
echo ""

# Check GitHub workflow
echo "🔧 Checking GitHub Actions Workflow..."
if [ -f ".github/workflows/build-apk.yml" ]; then
    if grep -q "expo prebuild" .github/workflows/build-apk.yml; then
        echo -e "${GREEN}✓${NC} Expo prebuild step found"
    else
        echo -e "${RED}✗${NC} Expo prebuild step missing"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "assembleDebug" .github/workflows/build-apk.yml; then
        echo -e "${GREEN}✓${NC} assembleDebug step found"
    else
        echo -e "${RED}✗${NC} assembleDebug step missing"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "upload-artifact" .github/workflows/build-apk.yml; then
        echo -e "${GREEN}✓${NC} Artifact upload configured"
    else
        echo -e "${YELLOW}⚠${NC} Artifact upload not configured"
        WARNINGS=$((WARNINGS + 1))
    fi
fi
echo ""

# Summary
echo "═══════════════════════════════════════"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo "Your project is ready for GitHub Actions build."
else
    echo -e "Summary:"
    if [ $ERRORS -gt 0 ]; then
        echo -e "${RED}  ✗ Errors: $ERRORS${NC}"
    fi
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}  ⚠ Warnings: $WARNINGS${NC}"
    fi
    
    if [ $ERRORS -gt 0 ]; then
        echo ""
        echo "❌ Please fix errors before building."
    else
        echo ""
        echo -e "${YELLOW}⚠${NC} Warnings detected, but build might still work."
    fi
fi
echo "═══════════════════════════════════════"
echo ""

# Additional recommendations
echo "💡 Recommendations:"
echo "  1. Run: npm install"
echo "  2. Test locally: npx expo prebuild --platform android"
echo "  3. Commit changes: git add . && git commit -m 'fix: Update build config'"
echo "  4. Push to GitHub: git push origin main"
echo "  5. Check Actions tab for build progress"
echo ""

exit $ERRORS