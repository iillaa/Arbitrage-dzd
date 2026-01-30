# Arbitrage DZD - Android APK Build Guide

📱 **Application d'arbitrage DZD/USD/EUR** avec build automatique via GitHub Actions

## 🚀 Quick Start

### Option 1: Build via GitHub Actions (Recommended)

1. **Update your files:**
   - Replace `.github/workflows/build-apk.yml` with the new version
      - Replace `package.json` with updated dependencies
         - Replace `app.json` with improved configuration

         2. **Commit and push:**
            ```bash
               git add .
                  git commit -m "fix: Update build configuration for native Android"
                     git push origin main
                        ```

                        3. **Download APK:**
                           - Go to GitHub Actions tab
                              - Wait for build to complete (5-10 minutes)
                                 - Download artifact: `arbitrage-app-debug`

                                 ### Option 2: Manual Trigger

                                 1. Go to your repository on GitHub
                                 2. Click "Actions" tab
                                 3. Select "Build Android APK" workflow
                                 4. Click "Run workflow" → "Run workflow"

                                 ---

                                 ## 📋 Files Updated

                                 ### 1. `.github/workflows/build-apk.yml`
                                 **Changes:**
                                 - ✅ Updated to use Node 18, Java 17
                                 - ✅ Added Android SDK setup
                                 - ✅ Fixed Gradle version to 8.2
                                 - ✅ Added AGP 8.1.4
                                 - ✅ Improved error logging
                                 - ✅ Uses `npm ci --legacy-peer-deps`

                                 ### 2. `package.json`
                                 **Changes:**
                                 - ✅ Expo SDK updated to ~51.0.28
                                 - ✅ React Native updated to 0.74.5
                                 - ✅ AsyncStorage updated to 1.23.1
                                 - ✅ Better version compatibility

                                 ### 3. `app.json`
                                 **Changes:**
                                 - ✅ Added explicit SDK versions
                                 - ✅ Added build properties plugin
                                 - ✅ Set compileSdkVersion to 34

                                 ---

                                 ## 🔧 Troubleshooting

                                 ### Build Fails with "Gradle Error"

                                 **Check GitHub Actions logs for:**
                                 ```
                                 FAILURE: Build failed with an exception
                                 ```

                                 **Solution:**
                                 1. The workflow now forces Gradle 8.2
                                 2. Ensures AGP 8.1.4 compatibility
                                 3. If still fails, check full logs in Actions tab

                                 ### Build Fails with "Dependency Error"

                                 **Error message like:**
                                 ```
                                 ERESOLVE unable to resolve dependency tree
                                 ```

                                 **Solution:**
                                 - Updated `package.json` uses compatible versions
                                 - Workflow uses `npm ci --legacy-peer-deps`

                                 ### Build Succeeds but APK Doesn't Install

                                 **Possible causes:**
                                 1. Package name conflict
                                 2. Architecture mismatch
                                 3. Minimum Android version

                                 **Solution:**
                                 - APK is built for Android 5.0+ (API 21+)
                                 - Universal APK supports all architectures
                                 - Check device compatibility

                                 ---

                                 ## 📱 Testing the APK

                                 ### On Physical Device:

                                 1. **Download APK** from GitHub Actions artifacts
                                 2. **Enable Unknown Sources:**
                                    - Settings → Security → Unknown sources
                                    3. **Install APK** using file manager
                                    4. **Run app** from launcher

                                    ### Features to Test:

                                    - ✅ Enter USD/EUR prices
                                    - ✅ Enter Wise conversion rates
                                    - ✅ Calculate arbitrage
                                    - ✅ View results
                                    - ✅ Settings persistence (AsyncStorage)

                                    ---

                                    ## 🏗️ Project Structure

                                    ```
                                    arbitrage-dzd/
                                    ├── .github/
                                    │   └── workflows/
                                    │       └── build-apk.yml          # GitHub Actions workflow
                                    ├── src/
                                    │   ├── components/
                                    │   │   ├── AppInput.js            # Input component
                                    │   │   └── ResultCard.js          # Results display
                                    │   ├── screens/
                                    │   │   └── HomeScreen.js          # Main screen
                                    │   └── utils/
                                    │       ├── calculations.js        # Arbitrage logic
                                    │       └── storage.js             # AsyncStorage helpers
                                    ├── App.js                         # Entry point
                                    ├── app.json                       # Expo configuration
                                    ├── package.json                   # Dependencies
                                    └── .gitignore                     # Ignored files
                                    ```

                                    ---

                                    ## 🔍 What Gets Built

                                    The workflow creates:
                                    - **Debug APK**: Unsigned, for testing
                                    - **Size**: ~20-30 MB
                                    - **Architecture**: Universal (armeabi-v7a, arm64-v8a, x86, x86_64)
                                    - **Min Android**: 5.0 (API 21)
                                    - **Target Android**: 14 (API 34)

                                    ---

                                    ## 🎯 Next Steps

                                    ### For Production Release:

                                    1. **Create Release Keystore:**
                                       ```bash
                                          keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore \
                                               -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
                                                  ```

                                                  2. **Add to GitHub Secrets:**
                                                     - `ANDROID_KEYSTORE_BASE64`
                                                        - `ANDROID_KEYSTORE_PASSWORD`
                                                           - `ANDROID_KEY_ALIAS`
                                                              - `ANDROID_KEY_PASSWORD`

                                                              3. **Update workflow** to sign APK

                                                              4. **Change to `assembleRelease`**

                                                              ---

                                                              ## ⚙️ Advanced Configuration

                                                              ### Custom Build Variants

                                                              Edit `app.json`:
                                                              ```json
                                                              {
                                                                "expo": {
                                                                    "android": {
                                                                          "buildTypes": {
                                                                                  "debug": {},
                                                                                          "release": {
                                                                                                    "minifyEnabled": true,
                                                                                                              "shrinkResources": true
                                                                                                                      }
                                                                                                                            }
                                                                                                                                }
                                                                                                                                  }
                                                                                                                                  }
                                                                                                                                  ```

                                                                                                                                  ### Reduce APK Size

                                                                                                                                  1. Enable Hermes engine (already default)
                                                                                                                                  2. Enable ProGuard in release builds
                                                                                                                                  3. Use APK splits per architecture

                                                                                                                                  ---

                                                                                                                                  ## 📞 Support

                                                                                                                                  If build still fails:

                                                                                                                                  1. **Check the full logs** in GitHub Actions
                                                                                                                                  2. **Copy the error message** (not just the first line)
                                                                                                                                  3. **Share relevant logs** from:
                                                                                                                                     - "Build Debug APK" step
                                                                                                                                        - "Expo Prebuild" step

                                                                                                                                        Common error patterns:
                                                                                                                                        - `Task :app:mergeDebugResources FAILED` → Resource issue
                                                                                                                                        - `Execution failed for task ':app:compileDebug` → Code compilation issue
                                                                                                                                        - `Could not resolve` → Dependency issue

                                                                                                                                        ---

                                                                                                                                        ## 📄 License

                                                                                                                                        MIT License - See LICENSE file for details

                                                                                                                                        ---

                                                                                                                                        ## 👨‍💻 Author

                                                                                                                                        **Kib Ali**
                                                                                                                                        - Application: Arbitrage DZD Calculator
                                                                                                                                        - Version: 1.0.0
                                                                                                                                        - Platform: Android (Native via Expo)