# 🎉 Automated Publishing Setup Complete!

Your `@crego/json-logic-builder` package is now fully configured for **automated publishing via GitHub Actions**!

## ✅ What's Been Set Up

### 1. GitHub Actions Workflows

Three automated workflows are now configured:

**📋 CI Workflow** (`.github/workflows/ci.yml`)
- Runs on every push to `main`/`develop`
- Runs on every pull request
- Tests on Node.js 18 and 20
- Builds package and verifies artifacts

**🚀 Release Workflow** (`.github/workflows/release.yml`)
- Triggers when you push a version tag (e.g., `v1.0.1`)
- Automatically builds and publishes to npm
- Creates GitHub Release
- **This is the recommended way to publish**

**📦 Manual Publish Workflow** (`.github/workflows/publish.yml`)
- Can be triggered manually from GitHub UI
- Also runs when you create a GitHub Release
- Backup option for publishing

### 2. Helper Scripts Added to package.json

```json
{
  "scripts": {
    "release:patch": "npm version patch && git push --follow-tags",
    "release:minor": "npm version minor && git push --follow-tags",
    "release:major": "npm version major && git push --follow-tags",
    "pack:check": "npm pack --dry-run"
  }
}
```

### 3. Documentation Created

- **QUICK_START.md** - Get started in 3 steps
- **GITHUB_ACTIONS_SETUP.md** - Complete setup guide
- **PUBLISHING.md** - Manual publishing guide (backup)

---

## 🚀 How to Publish (Easy!)

### First Time Setup (Do Once)

1. **Create GitHub Repository**
   ```bash
   # Create repo on GitHub: https://github.com/organizations/crego/repositories/new
   # Name it: json-logic-builder
   ```

2. **Push Code to GitHub**
   ```bash
   git remote add origin https://github.com/crego/json-logic-builder.git
   git push -u origin main
   ```

3. **Add npm Granular Access Token to GitHub**
   - Get token: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Generate new **"Granular Access Token"** (Classic tokens deprecated Dec 9, 2025)
   - Grant **Read and write** permissions to `@crego/json-logic-builder` package
   - Add to GitHub: https://github.com/crego/json-logic-builder/settings/secrets/actions
   - Secret name: `NPM_TOKEN`

### Every Time You Want to Publish

**For bug fixes:**
```bash
pnpm release:patch  # 1.0.0 → 1.0.1
```

**For new features:**
```bash
pnpm release:minor  # 1.0.0 → 1.1.0
```

**For breaking changes:**
```bash
pnpm release:major  # 1.0.0 → 2.0.0
```

**That's it!** GitHub Actions will:
1. ✅ Build the package
2. ✅ Create a GitHub Release
3. ✅ Publish to npm
4. ✅ All automatically!

---

## 📊 What Happens When You Run `pnpm release:patch`

```
┌─────────────────────────────────────┐
│ 1. Version bumped in package.json   │
│    (e.g., 1.0.0 → 1.0.1)           │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│ 2. Git commit created                │
│    "chore: bump version to 1.0.1"   │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│ 3. Git tag created (v1.0.1)         │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│ 4. Push to GitHub                    │
│    (commit + tag)                    │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│ 5. GitHub Actions Triggered          │
│    "Release" workflow starts         │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│ 6. Package Built                     │
│    - dist/index.js                   │
│    - dist/index.mjs                  │
│    - dist/styles.css                 │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│ 7. GitHub Release Created            │
│    - Tag: v1.0.1                     │
│    - Release notes from CHANGELOG    │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│ 8. Published to npm! 🎉              │
│    @crego/json-logic-builder@1.0.1  │
└─────────────────────────────────────┘
```

---

## 🎯 Quick Reference

### Check what will be published
```bash
pnpm pack:check
```

### View workflow status
```bash
# Go to: https://github.com/crego/json-logic-builder/actions
```

### Verify published version
```bash
npm view @crego/json-logic-builder
```

### View on npm
```
https://www.npmjs.com/package/@crego/json-logic-builder
```

---

## 📁 Project Structure

```
json-logic-builder/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Continuous Integration
│       ├── release.yml     # Auto-publish on tags ⭐
│       └── publish.yml     # Manual publishing
├── src/                    # Source code
├── dist/                   # Built files (generated)
├── package.json            # With release scripts
├── QUICK_START.md         # Start here! ⭐
├── GITHUB_ACTIONS_SETUP.md # Detailed setup guide
└── PUBLISHING.md          # Manual publishing (backup)
```

---

## 🎓 Typical Development Workflow

### Making Changes
```bash
# 1. Create feature branch
git checkout -b feature/new-thing

# 2. Make changes
# ... edit files ...

# 3. Commit
git add .
git commit -m "feat: add new thing"

# 4. Push and create PR
git push origin feature/new-thing
# Create PR on GitHub → CI runs automatically

# 5. Merge PR (after CI passes)
```

### Publishing
```bash
# 1. Switch to main and pull
git checkout main
git pull

# 2. Update CHANGELOG.md
# Document your changes

# 3. Release!
pnpm release:patch

# 4. Watch GitHub Actions
# https://github.com/crego/json-logic-builder/actions

# 5. Verify on npm
npm view @crego/json-logic-builder
```

---

## 🆘 Troubleshooting

### Workflow fails with "NPM_TOKEN not found"
→ Add the secret in GitHub Settings → Secrets → Actions

### "You do not have permission to publish"
→ Check npm token has write permissions
→ Verify access to @crego organization

### "Package version already exists"
→ You already published this version
→ Run release script again to bump version

### Build fails
→ Check Actions tab for detailed logs
→ Ensure all dependencies are in package.json

---

## ✨ Benefits of This Setup

✅ **Automated** - No manual publishing steps
✅ **Consistent** - Same process every time
✅ **Safe** - CI checks before publishing
✅ **Traceable** - GitHub Releases for every version
✅ **Fast** - One command to publish
✅ **Reliable** - No "works on my machine" issues

---

## 🎉 Ready to Publish Your First Version?

1. **Read** [QUICK_START.md](./QUICK_START.md)
2. **Setup** GitHub repo and npm token
3. **Run** `pnpm release:patch`
4. **Celebrate!** 🎊

---

**Package:** `@crego/json-logic-builder`
**Status:** ✅ Ready for automated publishing
**Next Step:** See [QUICK_START.md](./QUICK_START.md)

Happy publishing! 🚀
