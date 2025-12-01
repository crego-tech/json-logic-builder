# Publishing Guide

## Prerequisites

Before publishing, make sure you have:

1. ✅ npm account with access to the `@crego` organization
2. ✅ Verified email address on npm
3. ✅ Package built successfully
4. ✅ All tests passing (if applicable)

## Step-by-Step Publishing

### 1. Login to npm

If you haven't already logged in:

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### 2. Verify Organization Access

Check that you have access to the @crego organization:

```bash
npm org ls crego
```

Or check your organizations:

```bash
npm org ls
```

If you don't have access to the @crego organization, you'll need to:
- Be invited by an organization admin, OR
- Create the organization if it doesn't exist

### 3. Build the Package

Make sure the package is built:

```bash
cd /Users/rajankur/Documents/Projects/c/json-logic-builder
pnpm build
```

This will also copy the styles.css to the dist folder.

### 4. Test the Package Locally (Optional but Recommended)

Before publishing, test the package locally:

```bash
# In the package directory
pnpm link --global

# In your test project
pnpm link --global @crego/json-logic-builder
```

Test that it works correctly in your application.

### 5. Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This shows you exactly what files will be included in the package.

### 6. Publish to npm

**For the first time (version 1.0.0):**

```bash
npm publish
```

**Important Notes:**
- The `publishConfig.access: "public"` in package.json ensures the scoped package is public
- The `prepublishOnly` script will automatically run `pnpm build` before publishing
- If you get an error about the organization not existing, you may need to create it first

### 7. Verify Publication

After publishing, verify the package is live:

```bash
npm view @crego/json-logic-builder
```

Visit the npm page:
```
https://www.npmjs.com/package/@crego/json-logic-builder
```

### 8. Install in Your Project

Now you can install it in any project:

```bash
pnpm add @crego/json-logic-builder
# or
npm install @crego/json-logic-builder
```

## Publishing Updates

For subsequent versions:

### 1. Update Version

Use npm version commands:

```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major
```

Or manually edit `package.json` and update the version.

### 2. Update CHANGELOG.md

Document your changes in CHANGELOG.md.

### 3. Commit Changes

```bash
git add .
git commit -m "chore: bump version to x.x.x"
git push
```

### 4. Publish

```bash
npm publish
```

## Troubleshooting

### Error: "You do not have permission to publish"

**Solution:** Make sure you:
1. Are logged in: `npm whoami`
2. Have access to @crego organization
3. The package name is available

### Error: "Package name already exists"

**Solution:**
- If someone else owns `@crego/json-logic-builder`, you'll need to choose a different name
- Check: `npm view @crego/json-logic-builder`

### Error: "You must verify your email"

**Solution:**
1. Check your email for verification link from npm
2. Or request a new one: `npm profile get`

### Publishing to a Private Registry

If you want to publish to a private registry instead of public npm:

**Option 1: Using .npmrc**

Create a `.npmrc` file in the package directory:

```
@crego:registry=https://your-registry-url.com/
//your-registry-url.com/:_authToken=${NPM_TOKEN}
```

**Option 2: Using package.json**

Update `package.json`:

```json
{
  "publishConfig": {
    "registry": "https://your-registry-url.com/"
  }
}
```

## Quick Commands Reference

```bash
# Login
npm login

# Check logged in user
npm whoami

# Build package
pnpm build

# Test what will be published
npm pack --dry-run

# Publish
npm publish

# Publish with tag (e.g., beta)
npm publish --tag beta

# View published package
npm view @crego/json-logic-builder

# Unpublish (only within 72 hours)
npm unpublish @crego/json-logic-builder@1.0.0
```

## Post-Publishing Checklist

After successful publication:

- [ ] Verify package on npmjs.com
- [ ] Test installation in a new project
- [ ] Update README badges (if applicable)
- [ ] Create a GitHub release (if using GitHub)
- [ ] Announce the release (if applicable)
- [ ] Update documentation site (if applicable)

## Security

### Enable 2FA (Recommended)

Enable two-factor authentication for your npm account:

```bash
npm profile enable-2fa auth-and-writes
```

This adds an extra layer of security when publishing packages.

---

## Ready to Publish?

Run these commands in order:

```bash
cd /Users/rajankur/Documents/Projects/c/json-logic-builder

# 1. Make sure you're logged in
npm whoami

# 2. Build the package
pnpm build

# 3. Verify package contents
npm pack --dry-run

# 4. Publish!
npm publish

# 5. Verify
npm view @crego/json-logic-builder
```

Good luck! 🚀
