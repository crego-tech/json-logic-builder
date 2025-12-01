# GitHub Actions Setup Guide

This package includes automated workflows for CI/CD using GitHub Actions.

## 📋 Prerequisites

1. **GitHub Repository**: Create a repository for this package
2. **npm Account**: You need an npm account with access to the `@crego` organization
3. **npm Access Token**: Generate an automation token from npm

## 🔧 Setup Instructions

### Step 1: Create GitHub Repository

```bash
cd /Users/rajankur/Documents/Projects/c/json-logic-builder

# If you haven't set up a remote yet
git remote add origin https://github.com/crego/json-logic-builder.git

# Push your code
git push -u origin main
```

### Step 2: Generate npm Access Token

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token"
3. Select **"Automation"** token type
4. Copy the generated token (you won't see it again!)

### Step 3: Add npm Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm automation token
6. Click **"Add secret"**

## 🚀 Available Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**What it does:**
- Runs on Node.js 18 and 20
- Installs dependencies
- Builds the package
- Verifies build artifacts
- Runs tests (if available)

**File:** `.github/workflows/ci.yml`

### 2. Release Workflow (`release.yml`)

**Triggers:**
- Push a version tag (e.g., `v1.0.0`, `v1.2.3`)

**What it does:**
- Builds the package
- Creates a GitHub Release
- Publishes to npm automatically
- Uses the tag version (removes `v` prefix)

**File:** `.github/workflows/release.yml`

### 3. Manual Publish Workflow (`publish.yml`)

**Triggers:**
- GitHub Release is published
- Manual workflow dispatch (from GitHub UI)

**What it does:**
- Builds the package
- Publishes to npm
- Can be triggered manually with custom version

**File:** `.github/workflows/publish.yml`

## 📦 How to Publish

### Option 1: Using Version Tags (Recommended)

```bash
# Update version in package.json
npm version patch  # 1.0.0 -> 1.0.1
# or
npm version minor  # 1.0.0 -> 1.1.0
# or
npm version major  # 1.0.0 -> 2.0.0

# This creates a commit and tag
git push --follow-tags
```

The GitHub Action will automatically:
1. Build the package
2. Create a GitHub Release
3. Publish to npm

### Option 2: Manual Release

1. Update `package.json` version manually
2. Commit the changes
3. Create and push a tag:

```bash
git add package.json
git commit -m "chore: bump version to 1.0.1"
git tag v1.0.1
git push origin main
git push origin v1.0.1
```

### Option 3: GitHub UI (Manual Trigger)

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **"Publish to npm"** workflow
4. Click **"Run workflow"**
5. Optionally specify a version or leave empty to use package.json version
6. Click **"Run workflow"**

## 🔍 Monitoring Workflows

### View Workflow Runs

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Select a workflow to see its runs
4. Click on a specific run to see details

### Check npm Publication

After successful workflow:

```bash
npm view @crego/json-logic-builder
```

Or visit: https://www.npmjs.com/package/@crego/json-logic-builder

## 🛡️ Security Best Practices

### 1. Protect Main Branch

1. Go to **Settings** → **Branches**
2. Add branch protection rule for `main`:
   - Require pull request reviews
   - Require status checks to pass (CI workflow)
   - Require branches to be up to date

### 2. Use Granular npm Tokens

- Use **Automation** tokens for CI/CD
- Set package-specific permissions if possible
- Rotate tokens periodically

### 3. Enable 2FA on npm

```bash
npm profile enable-2fa auth-and-writes
```

## 🐛 Troubleshooting

### Workflow fails with "You do not have permission to publish"

**Solution:**
- Verify `NPM_TOKEN` secret is set correctly
- Check token has write permissions
- Verify you have access to `@crego` organization

### Workflow fails with "Package already exists"

**Solution:**
- Check if version is already published: `npm view @crego/json-logic-builder versions`
- Bump version in `package.json`
- Create new tag with updated version

### Build artifacts missing

**Solution:**
- The `ci.yml` workflow checks for required files
- Make sure `tsup.config.js` copies `styles.css`
- Check build logs for errors

### Token expired

**Solution:**
- Generate a new automation token from npm
- Update the `NPM_TOKEN` secret in GitHub

## 📝 Workflow Files Overview

```
.github/
└── workflows/
    ├── ci.yml         # Continuous Integration
    ├── release.yml    # Automated release on tags
    └── publish.yml    # Manual/release publishing
```

## 🎯 Recommended Workflow

1. **Development**: Work on feature branches
2. **Pull Request**: Create PR to `main` → CI runs
3. **Merge**: Merge PR after CI passes
4. **Version Bump**: Run `npm version [patch|minor|major]`
5. **Push**: `git push --follow-tags`
6. **Automated**: GitHub Action publishes to npm automatically

## 📊 Example: Complete Release Process

```bash
# 1. Make your changes
git checkout -b feature/new-component
# ... make changes ...
git commit -m "feat: add new component"

# 2. Create pull request and merge (triggers CI)
git push origin feature/new-component
# Create PR on GitHub, wait for CI to pass, merge

# 3. Update main branch
git checkout main
git pull

# 4. Bump version and create tag
npm version patch  # Creates commit and tag

# 5. Push changes and tag
git push --follow-tags

# 6. Wait for GitHub Action to complete
# Check Actions tab on GitHub
# Verify on npm: npm view @crego/json-logic-builder
```

## ✅ Verification Checklist

Before first publish:
- [ ] GitHub repository created
- [ ] `NPM_TOKEN` secret added to GitHub
- [ ] All workflow files committed
- [ ] Main branch protected (recommended)
- [ ] Test CI workflow by creating a PR
- [ ] Ready to create first release tag

---

## 🎉 You're All Set!

Your package is now configured for automated publishing via GitHub Actions!

**Next Steps:**
1. Push your code to GitHub
2. Add the `NPM_TOKEN` secret
3. Create your first release with `npm version patch && git push --follow-tags`
4. Watch the magic happen in the Actions tab! ✨
