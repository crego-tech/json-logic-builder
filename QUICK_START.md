# 🚀 Quick Start Guide - Automated Publishing with GitHub Actions

## TL;DR - Fastest Path to Publishing

```bash
# 1. Create GitHub repo and push code
cd /Users/rajankur/Documents/Projects/c/json-logic-builder
git remote add origin https://github.com/crego/json-logic-builder.git
git push -u origin main

# 2. Add NPM_TOKEN to GitHub Secrets
# (See instructions below)

# 3. Release a new version
pnpm release:patch
# Done! GitHub Actions will publish automatically
```

---

## 📋 Complete Setup (First Time Only)

### Step 1: Create GitHub Repository

1. Go to https://github.com/organizations/crego/repositories/new
2. Repository name: `json-logic-builder`
3. Make it **Public** (required for public npm packages)
4. Don't initialize with README (you already have one)
5. Click **Create repository**

### Step 2: Push Your Code to GitHub

```bash
cd /Users/rajankur/Documents/Projects/c/json-logic-builder

# Add GitHub remote
git remote add origin https://github.com/crego/json-logic-builder.git

# Push to GitHub
git push -u origin main
```

### Step 3: Get npm Access Token

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click **"Generate New Token"** → **"Classic Token"**
3. Select **"Automation"** type
4. Copy the token immediately (you won't see it again!)

### Step 4: Add npm Token to GitHub Secrets

1. Go to https://github.com/crego/json-logic-builder/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `NPM_TOKEN`
4. Value: Paste your npm automation token
5. Click **"Add secret"**

---

## ✨ You're Done! Now Publish

### Quick Release Commands

```bash
# For bug fixes (1.0.0 → 1.0.1)
pnpm release:patch

# For new features (1.0.0 → 1.1.0)
pnpm release:minor

# For breaking changes (1.0.0 → 2.0.0)
pnpm release:major
```

These commands will:
1. ✅ Bump the version in package.json
2. ✅ Create a git commit
3. ✅ Create a git tag (e.g., v1.0.1)
4. ✅ Push to GitHub
5. ✅ Trigger GitHub Action
6. ✅ Build the package
7. ✅ Create GitHub Release
8. ✅ Publish to npm automatically

---

## 🔍 Monitor the Release

After running a release command:

1. **Check GitHub Actions**
   - Go to https://github.com/crego/json-logic-builder/actions
   - You'll see the "Release" workflow running
   - Wait for green checkmark ✅

2. **Verify on npm**
   ```bash
   npm view @crego/json-logic-builder
   ```

3. **View GitHub Release**
   - Go to https://github.com/crego/json-logic-builder/releases
   - You'll see the new release created

---

## 📦 What Gets Published

Every release includes:
- ✅ `dist/index.js` (CommonJS)
- ✅ `dist/index.mjs` (ES Module)
- ✅ `dist/styles.css`
- ✅ Source maps
- ✅ README.md
- ✅ LICENSE
- ✅ CHANGELOG.md

---

## 🎯 Typical Workflow

### Making Changes

```bash
# 1. Create a branch for your changes
git checkout -b feature/awesome-new-feature

# 2. Make your changes
# ... edit files ...

# 3. Commit your changes
git add .
git commit -m "feat: add awesome new feature"

# 4. Push branch
git push origin feature/awesome-new-feature

# 5. Create Pull Request on GitHub
# CI will run automatically

# 6. Merge PR after CI passes
```

### Publishing a Release

```bash
# After merging PR, on main branch:
git checkout main
git pull

# Update CHANGELOG.md with your changes
# Then release:
pnpm release:patch  # or minor/major

# That's it! GitHub Actions handles the rest
```

---

## 🆘 Troubleshooting

### "remote: Permission denied"
→ Make sure you have push access to the crego organization

### "NPM_TOKEN not found"
→ Double-check you added the secret in GitHub Settings → Secrets

### "Package already exists"
→ The version is already published. Bump version again.

### Workflow failed
→ Check the Actions tab for error details
→ Common issues:
  - npm token expired
  - Wrong organization permissions
  - Build errors

---

## 📚 Available npm Scripts

```bash
pnpm build          # Build the package
pnpm dev            # Watch mode for development
pnpm pack:check     # Preview what will be published

pnpm release:patch  # 1.0.0 → 1.0.1
pnpm release:minor  # 1.0.0 → 1.1.0
pnpm release:major  # 1.0.0 → 2.0.0
```

---

## 🎉 First Release Checklist

Before your first release:

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] NPM_TOKEN added to GitHub Secrets
- [ ] You have access to @crego npm organization
- [ ] CHANGELOG.md updated
- [ ] All files committed

Then run:
```bash
pnpm release:patch
```

And watch the magic happen! ✨

---

## 📖 More Information

- **Full GitHub Actions Setup**: See [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md)
- **Manual Publishing**: See [PUBLISHING.md](./PUBLISHING.md)
- **Package Documentation**: See [README.md](./README.md)

---

**Ready?** Just run `pnpm release:patch` and you're live! 🚀
