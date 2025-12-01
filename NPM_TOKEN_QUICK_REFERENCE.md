# npm Token Quick Reference

## ⚠️ Important: Classic Tokens Deprecated

**Classic npm tokens will be revoked on December 9, 2025**

Use **Granular Access Tokens** instead!

---

## Quick Setup (3 Minutes)

### 1. Generate Token

```
1. Visit: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click: "Generate New Token" → "Granular Access Token"
3. Configure:
   ✓ Name: github-actions-json-logic-builder
   ✓ Expiration: 365 days
   ✓ Packages: @crego/json-logic-builder (or "All packages" for first publish)
   ✓ Permissions: Read and write
4. Click: "Generate token"
5. Copy token immediately!
```

### 2. Add to GitHub

```
1. Go to: https://github.com/crego/json-logic-builder/settings/secrets/actions
2. Click: "New repository secret"
3. Name: NPM_TOKEN
4. Value: [paste your token]
5. Click: "Add secret"
```

### 3. Done!

```bash
pnpm release:patch
# GitHub Actions will publish automatically
```

---

## Comparison: Classic vs Granular

| Feature | Classic Token | Granular Token |
|---------|--------------|----------------|
| **Status** | ❌ Deprecated Dec 9, 2025 | ✅ Current standard |
| **Security** | All packages access | Package-specific |
| **Expiration** | No expiration option | Max 1 year |
| **Permissions** | All or nothing | Fine-grained |
| **For CI/CD** | ❌ Don't use | ✅ Use this |

---

## Token Permissions Needed

For publishing `@crego/json-logic-builder`:

✅ **Read** - Check existing versions
✅ **Write** - Publish new versions
❌ **Delete** - Not needed

---

## Troubleshooting

### Token doesn't work?
→ Check "Read and write" permissions are set
→ Verify token hasn't expired
→ Ensure scoped to correct package

### Can't select package?
→ For first publish, use "All packages"
→ After first publish, update to package-specific

### Token expired?
→ Generate new token
→ Update NPM_TOKEN in GitHub Secrets
→ Set calendar reminder for next renewal

---

## Security Tips

✅ **DO**
- Use granular access tokens
- Set package-specific scopes
- Set expiration (max 1 year)
- Store only in GitHub Secrets
- Rotate tokens regularly

❌ **DON'T**
- Use classic tokens (deprecated!)
- Share tokens between projects
- Commit tokens to code
- Use overly broad permissions

---

## Need More Details?

See: [NPM_TOKEN_SETUP.md](./NPM_TOKEN_SETUP.md) for complete guide

---

**Package:** `@crego/json-logic-builder`
**Last Updated:** December 2025
**Token Type:** Granular Access Token ✅
