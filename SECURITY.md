# Security Policy

## Overview

Transio is committed to ensuring the security and privacy of our users. This document outlines our security practices and how to report vulnerabilities.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Features

### Client-Side Security
- **No Data Collection**: All transformations happen locally in your browser
- **No External Requests**: No analytics, tracking, or external API calls (except optional Saxon server)
- **Local Storage Only**: Data persists in browser storage (IndexedDB via Spark KV)
- **Content Security**: All assets bundled and integrity-checked

### Server-Side Security (Optional Saxon-HE Server)
- **Local Only**: Server runs on localhost by default
- **CORS Protected**: Only accepts requests from configured origins
- **No Logging**: No transformation data is logged
- **Timeout Protection**: Request timeout limits prevent abuse
- **Input Validation**: All inputs sanitized and validated

### Desktop App Security
- **Sandboxed**: Electron runs in sandboxed mode
- **CSP Enabled**: Content Security Policy prevents XSS
- **Auto-Updates**: Secure update mechanism with signature verification
- **No Network Access**: Works completely offline

## Known Security Considerations

### 1. Saxon-JS Browser Limitations
- Saxon-JS (for XSLT 2.0/3.0) may have performance issues with very large files (>10MB)
- Recommendation: Use desktop app with Saxon-HE server for large files

### 2. File System Access API
- Only available in Chromium browsers
- Requires explicit user permission for each folder
- Permissions are not persistent across sessions

### 3. Optional Server Component
- Saxon-HE server is optional and runs locally
- If exposed publicly, ensure proper firewall rules
- API key authentication available for production use

## Reporting Security Vulnerabilities

We take security seriously. If you discover a vulnerability:

### Private Disclosure (Preferred)
1. **Email**: Create an issue at [github.com/bluesover/transio.org/issues](https://github.com/bluesover/transio.org/issues) marked as "Security"
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline
- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Based on severity (Critical: 7 days, High: 30 days, Medium: 90 days)

### Public Disclosure
- We follow coordinated disclosure
- Fixes released before public announcement
- Credit given to reporter (if desired)

## Security Best Practices for Users

### Web App
1. Use HTTPS version: https://transio.org
2. Keep browser updated
3. Clear browser data regularly if handling sensitive XML
4. Don't paste untrusted XSLT code

### Desktop App
1. Download only from official GitHub releases
2. Verify checksums before installation
3. Keep app updated (auto-updates enabled)
4. Run Saxon server locally only

### Saxon Server
1. Never expose publicly without authentication
2. Use API key if deploying on network
3. Keep dependencies updated: `npm update` in server directory
4. Monitor logs for unusual activity

## Dependency Security

### Automated Checks
- **Dependabot**: Weekly scans for npm vulnerabilities
- **GitHub Actions**: Monthly security updates
- **npm audit**: Run on every build

### Manual Audits
Run security audit:
```bash
npm audit
npm audit fix
```

### Critical Dependencies
- **React 19**: Latest stable, security patches applied
- **Saxon-JS 2.7**: Official Saxonica release, Mozilla Public License
- **Electron 28**: LTS version with security updates

## License Compliance

All dependencies are checked for license compatibility:
- ✅ MIT, Apache 2.0, MPL 2.0 - Approved
- ✅ BSD, ISC - Approved
- ❌ GPL, AGPL - Not used (to avoid copyleft requirements)

See [LICENSE](./LICENSE) for full details.

## Third-Party Services

### Cloudflare Pages (Web Hosting)
- **What**: Static site hosting
- **Data**: No user data collected
- **Privacy**: [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/)

### GitHub (Repository & Releases)
- **What**: Code hosting, desktop app releases
- **Data**: Repository metadata only
- **Privacy**: [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement)

## Privacy Policy

### Data We DON'T Collect
- ❌ No analytics or tracking
- ❌ No cookies
- ❌ No user accounts
- ❌ No XML/XSLT content logging
- ❌ No error reporting to external services

### Data That Stays Local
- ✅ XML/XSLT content (browser storage)
- ✅ Version history (browser storage)
- ✅ User preferences (browser storage)
- ✅ Activity logs (browser storage, optional)

### Optional Features
- **Saxon Server**: If enabled, transformations sent to localhost only
- **Project Folders**: File system access requires explicit permission

## Compliance

### GDPR Compliance
- No personal data collected
- No data processing required
- No data retention policies needed
- Users have full control over local data

### CCPA Compliance
- No personal information collected
- No sale of data
- No third-party data sharing

## Security Updates

Subscribe to security updates:
1. **Watch Repository**: Click "Watch" → "Custom" → "Security alerts"
2. **RSS Feed**: GitHub releases feed
3. **Email**: Star the repository for release notifications

## Contact

- **Security Issues**: [Create Security Issue](https://github.com/bluesover/transio.org/issues/new?labels=security)
- **General Questions**: [GitHub Discussions](https://github.com/bluesover/transio.org/discussions)
- **Project Website**: [transio.org](https://transio.org)

## Acknowledgments

We thank the security researchers and community members who help keep Transio secure.

---

**Last Updated**: December 2024  
**Version**: 1.0.0
