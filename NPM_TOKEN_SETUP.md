# npm Granular Access Token Setup Guide

> **Important**: npm is deprecating Classic tokens on **December 9, 2025**. This guide shows you how to create the new **Granular Access Tokens** for GitHub Actions.

## Why Granular Access Tokens?

Granular access tokens provide:
- ✅ **Better security** - Scoped to specific packages
- ✅ **Fine-grained permissions** - Read/write control per package
- ✅ **Longer lifespan** - Up to 1 year expiration
- ✅ **Future-proof** - Won't be deprecated like Classic tokens

## Step-by-Step Guide

### 1. Go to npm Token Settings

Visit: https://www.npmjs.com/settings/YOUR_USERNAME/tokens

(Replace `YOUR_USERNAME` with your npm username)

### 2. Generate New Token

Click **"Generate New Token"** → Select **"Granular Access Token"**

### 3. Configure Token Settings

#### Basic Settings

| Setting | Value |
|---------|-------|
| **Token Name** | `github-actions-json-logic-builder` |
| **Expiration** | 365 days (recommended) or custom |

#### Packages and Scopes

Choose one of these options based on your scenario:

**Option A: For First Time Publishing (Recommended)**
- **Type**: Select "All packages" or use organization scope
- **Permissions**: Read and write
- This allows the token to publish the package for the first time

**Option B: For Existing Package (More Secure)**
- **Type**: Select "Select packages"
- **Search**: Type `@crego/json-logic-builder`
- **Select**: Check the package
- **Permissions**: Read and write

#### Organizations (if applicable)

If you're publishing to `@crego` organization:
- Select `@crego` organization
- Grant necessary permissions

### 4. Generate and Copy Token

1. Click **"Generate token"**
2. **Copy the token immediately** - you won't see it again!
3. Store it securely (you'll paste it in GitHub Secrets next)

## Adding Token to GitHub

### Via GitHub Web UI

1. Go to your repository: `https://github.com/crego/json-logic-builder`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Fill in:
   - **Name**: `NPM_TOKEN`
   - **Secret**: Paste your granular access token
5. Click **"Add secret"**

### Via GitHub CLI (Alternative)

```bash
# Make sure you have GitHub CLI installed
gh secret set NPM_TOKEN -b "npm_xxxxxxxxxxxxx" -R crego/json-logic-builder
```

## Token Permissions Overview

For publishing `@crego/json-logic-builder`, your token needs:

| Permission | Required | Why |
|------------|----------|-----|
| **Read** | ✅ Yes | To check existing versions |
| **Write** | ✅ Yes | To publish new versions |
| **Delete** | ❌ No | Not needed for normal publishing |

## Security Best Practices

### ✅ Do

- Use **Granular Access Tokens** (not Classic)
- Set **minimum required permissions** (read + write)
- Use **package-specific** scopes when possible
- Set **reasonable expiration** (1 year max)
- **Rotate tokens** regularly (set calendar reminder)
- Store tokens **only in GitHub Secrets** (never commit to code)

### ❌ Don't

- Don't use Classic tokens (they're being deprecated)
- Don't use "Publish" permission unless needed
- Don't set "No expiration" (not available in granular tokens anyway)
- Don't share tokens between multiple projects
- Don't commit tokens to version control

## Token Expiration Management

### Setting Expiration Reminder

```bash
# Add to your calendar:
# Token: github-actions-json-logic-builder
# Expires: [YOUR_DATE]
# Renew 1 week before expiration
```

### Renewing Token

When your token is about to expire:

1. Generate a new granular access token (same process above)
2. Update the `NPM_TOKEN` secret in GitHub
3. Old token will be automatically invalidated
4. No code changes needed!

## Troubleshooting

### "Unable to authenticate"

**Cause**: Token doesn't have proper permissions

**Solution**:
- Verify token has "Read and write" permissions
- Check token is for correct package/organization
- Ensure token hasn't expired

### "Package not found"

**Cause**: Token scoped to specific package that doesn't exist yet

**Solution**:
- For first publish, use "All packages" or organization-level scope
- After first publish, update to package-specific scope

### "Token expired"

**Cause**: Token exceeded expiration date

**Solution**:
- Generate new token
- Update `NPM_TOKEN` secret in GitHub
- Consider longer expiration next time

## Migration from Classic Tokens

If you currently have a Classic token:

### Before December 9, 2025

1. **Generate granular token** (follow guide above)
2. **Update GitHub Secret** with new token
3. **Test publishing** works with new token
4. **Delete old Classic token** from npm

### What to Update

| Item | Action |
|------|--------|
| GitHub Secret `NPM_TOKEN` | Replace with granular token |
| Workflow files | No changes needed ✅ |
| Code | No changes needed ✅ |

## Verification

After setting up the token, verify it works:

### Test Locally (Optional)

```bash
# Set token temporarily
export NPM_TOKEN="your_granular_token"

# Try authentication
npm whoami --registry https://registry.npmjs.org
```

### Test via GitHub Actions

1. Push a test commit to trigger CI workflow
2. Check Actions tab for workflow success
3. Verify no authentication errors

## Reference Links

- [npm Granular Access Tokens Documentation](https://docs.npmjs.com/creating-and-viewing-access-tokens)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [GitHub Blog: Strengthening npm Security](https://github.blog/changelog/2025-09-29-strengthening-npm-security-important-changes-to-authentication-and-token-management/)

## Quick Commands Reference

```bash
# View your tokens
npm token list

# Revoke a token (use token ID from list)
npm token revoke <token_id>

# Test authentication
npm whoami

# Check package access
npm access ls-packages @crego
```

---

## Summary Checklist

Before publishing:

- [ ] Created granular access token (not Classic)
- [ ] Set expiration to reasonable time (e.g., 365 days)
- [ ] Granted "Read and write" permissions
- [ ] Scoped to `@crego/json-logic-builder` or organization
- [ ] Added as `NPM_TOKEN` secret in GitHub
- [ ] Tested token works (optional)
- [ ] Set calendar reminder for renewal

**You're all set!** Your GitHub Actions will now use the secure granular access token to publish. 🎉
