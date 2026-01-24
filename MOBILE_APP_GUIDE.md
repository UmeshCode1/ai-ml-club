# 📱 AIML CLUB - Mobile App (APK) Guide

This guide explains how to generate a shareable **.apk file** for the AIML Club website (`aimlclub.tech`) so you can distribute it via WhatsApp, Telegram, or Email.

---

## 🚀 Phase 1: Generating the APK (Standard Method)

We have already configured the website as a **Progressive Web App (PWA)**. You can now use a professional wrapper to turn it into an APK.

1. **Open PWABuilder**: Visit [pwabuilder.com](https://www.pwabuilder.com/)
2. **Analyze URL**: Enter `https://aimlclub.tech` and click **Start**.
3. **Check Score**: You should see a high score because the Manifest, Icons, and Theme Colors are already set up.
4. **Generate for Android**:
    * Click **"Package for Stores"**.
    * Choose **Android**.
    * Click **Generate Package**.
5. **Download**: You will receive a ZIP file.
    * **The File you need**: Look for the `.apk` file (usually in the `android` folder of the zip).

---

## 📤 Phase 2: How to Share

Once you have the `.apk` file:

1. **WhatsApp**: Simply attach the `.apk` file as a "Document" in any chat.
2. **Installation**: When someone clicks it, they may need to "Allow installation from unknown sources" (since it's not from the Play Store yet).
3. **Zero Maintenance**: The best part? Whenever we update the website, the App updates **automatically**. You don't need to send a new APK for every code change!

---

## 🛠️ Technical Identity (For the APK)

If the tool asks for these, here is what I've configured:
* **Package ID**: `tech.aimlclub.app`
* **App Name**: `AIML Club`
* **Theme Color**: `#D4FF00` (Neon Lime)
* **Background**: `#050505` (Deep Black)

---

## 🌟 Pro Tip: The "No-Download" way

You can also tell people to just visit `aimlclub.tech` in Chrome and click **"Add to Home Screen"**. It installs the exact same app without needing a large file download!
