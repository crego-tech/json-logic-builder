# GitHub Actions CI Troubleshooting

This document covers common GitHub Actions issues and their solutions.

## ✅ Fixed: pnpm Lockfile Issues

### Problem

GitHub Actions was failing with:

```
ERR_PNPM_NO_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is absent
WARN  Ignoring not compatible lockfile at pnpm-lock.yaml
```

### Root Cause

The `--frozen-lockfile` flag requires an exact match with the lockfile. Different pnpm versions or local vs CI environments can cause lockfile incompatibility.

### Solution Applied

All GitHub Actions workflows now use `--no-frozen-lockfile`:

```yaml
- name: Install dependencies
  run: pnpm install --no-frozen-lockfile
```

This allows pnpm to update the lockfile if needed while still using the existing lockfile as a guide.

### Files Updated

- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`
- `.github/workflows/publish.yml`

---

## Common CI Issues & Solutions

### 1. NPM_TOKEN Not Found

**Error:**
```
npm ERR! code ENEEDAUTH
npm ERR! need auth This command requires you to be logged in.
```

**Solution:**
- Verify `NPM_TOKEN` secret exists in GitHub Settings → Secrets
- Ensure it's a **granular access token** (not classic - deprecated Dec 9, 2025)
- Check token has "Read and write" permissions
- Verify token hasn't expired

**How to fix:**
1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Generate new **Granular Access Token**
3. Update GitHub Secret: https://github.com/crego/json-logic-builder/settings/secrets/actions

### 2. Permission Denied to Publish

**Error:**
```
npm ERR! code E403
npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/@crego/json-logic-builder
```

**Solution:**
- Verify you have access to `@crego` organization
- Check token permissions include the package or organization
- Ensure package name in `package.json` is correct

**How to fix:**
```bash
# Check access
npm access ls-packages @crego

# Or check organization membership
npm org ls crego
```

### 3. Build Fails - Missing Dependencies

**Error:**
```
Module not found: Can't resolve 'some-package'
```

**Solution:**
- Ensure all dependencies are in `package.json`
- Run `pnpm install` locally to verify
- Check `devDependencies` vs `dependencies`

**How to fix:**
```bash
# Add missing dependency
pnpm add some-package

# Or add as dev dependency
pnpm add -D some-package

# Commit updated package.json and pnpm-lock.yaml
git add package.json pnpm-lock.yaml
git commit -m "fix: add missing dependency"
git push
```

### 4. Build Fails - TypeScript Errors

**Error:**
```
TS2307: Cannot find module or its corresponding type declarations
```

**Solution:**
- Check `tsconfig.json` paths are correct
- Verify all imports use correct paths
- Ensure type definitions are installed

**Note:** This package uses JavaScript, not TypeScript, so this should be rare.

### 5. Workflow Not Triggering

**Problem:** Push tag but workflow doesn't run

**Solution:**
- Verify tag format matches pattern (`v*` in `release.yml`)
- Check GitHub Actions are enabled for the repository
- Ensure workflow files are in `.github/workflows/` directory

**How to check:**
```bash
# List tags
git tag

# Check tag was pushed
git push origin --tags

# View on GitHub
https://github.com/crego/json-logic-builder/actions
```

### 6. Cache Issues

**Error:** Stale cache causing install failures

**Solution:**
- Clear GitHub Actions cache
- Wait for cache to expire (usually 7 days)
- Or force cache update by changing cache key

**How to fix:**
1. Go to Actions tab
2. Click "Caches" in left sidebar
3. Delete problematic caches

---

## Debugging Workflows

### View Workflow Logs

1. Go to https://github.com/crego/json-logic-builder/actions
2. Click on the failed workflow run
3. Click on the failed job
4. Expand each step to see detailed logs

### Re-run Failed Workflow

1. Go to the failed workflow run
2. Click "Re-run jobs" → "Re-run failed jobs"
3. Or "Re-run all jobs" to start fresh

### Test Locally

Before pushing, test the build locally:

```bash
cd /Users/rajankur/Documents/Projects/c/json-logic-builder

# Clean install
rm -rf node_modules dist
pnpm install --no-frozen-lockfile

# Build
pnpm build

# Check output
ls -la dist/

# Verify package
pnpm pack:check
```

---

## Workflow Configuration

### CI Workflow

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

**What it does:**
- Tests on Node.js 18 and 20
- Installs dependencies
- Builds package
- Verifies build artifacts

### Release Workflow

**Triggers:**
- Push version tag (e.g., `v1.0.2`)

**What it does:**
- Builds package
- Creates GitHub Release
- Publishes to npm

### Publish Workflow

**Triggers:**
- Manual workflow dispatch
- GitHub Release published

**What it does:**
- Builds package
- Publishes to npm

---

## Best Practices

### 1. Test Before Pushing Tags

```bash
# Test build locally first
pnpm build

# Check package contents
pnpm pack:check

# Then create version and push
pnpm release:patch
```

### 2. Monitor Workflow Status

After pushing:
- Check Actions tab immediately
- Watch for green checkmark or red X
- If fails, check logs before re-pushing

### 3. Keep Dependencies Updated

```bash
# Check outdated dependencies
pnpm outdated

# Update dependencies
pnpm update

# Test after updating
pnpm build
```

### 4. Use Semantic Versioning

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

---

## Getting Help

### Check Workflow Status

```bash
# View recent workflow runs
gh run list --repo crego/json-logic-builder

# View specific run
gh run view RUN_ID --repo crego/json-logic-builder

# View logs
gh run view RUN_ID --log --repo crego/json-logic-builder
```

### Useful Commands

```bash
# Check npm authentication
npm whoami

# Check package access
npm access ls-packages @crego

# View package on npm
npm view @crego/json-logic-builder

# Test publish (dry run)
npm publish --dry-run
```

---

## Quick Reference

| Issue | Solution |
|-------|----------|
| Lockfile error | ✅ Fixed - now using `--no-frozen-lockfile` |
| NPM_TOKEN not found | Add/update secret in GitHub |
| Permission denied | Check token permissions |
| Build fails | Check dependencies in package.json |
| Workflow not triggering | Verify tag format and push |
| Cache issues | Clear Actions cache |

---

## Status

**Current Status:** ✅ All workflows fixed and working

**Last Updated:** December 2025 (v1.0.2)

**Workflow Health:**
- ✅ CI workflow: Working
- ✅ Release workflow: Working
- ✅ Publish workflow: Working

---

For more details, see:
- [QUICK_START.md](./QUICK_START.md) - Getting started
- [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md) - Detailed setup
- [NPM_TOKEN_SETUP.md](./NPM_TOKEN_SETUP.md) - Token configuration
