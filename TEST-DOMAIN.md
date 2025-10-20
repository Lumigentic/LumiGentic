# Domain Testing Guide

## Test Your DNS Configuration

After configuring your GoDaddy DNS, wait 30-60 minutes, then test:

### Online DNS Checkers:
1. **DNSChecker.org**: https://dnschecker.org
   - Enter your domain
   - Check if it resolves worldwide

2. **WhatsMyDNS**: https://whatsmydns.net
   - Enter your domain
   - See propagation status globally

### Command Line Tests:

#### Test Root Domain:
```bash
nslookup yourdomain.com
# or
dig yourdomain.com
```

#### Test WWW Subdomain:
```bash
nslookup www.yourdomain.com
# or
dig www.yourdomain.com
```

### Expected Results:

**For root domain (yourdomain.com):**
- Should show A record pointing to: 76.76.21.21 (Vercel) or your hosting IP

**For www subdomain (www.yourdomain.com):**
- Should show CNAME pointing to: cname.vercel-dns.com or your hosting CNAME

## Troubleshooting

### If domain doesn't work after 2 hours:
1. Double-check DNS records in GoDaddy
2. Verify no conflicting records exist
3. Check domain isn't parked or forwarding is disabled
4. Clear your browser cache
5. Try incognito/private browsing mode

## Next Steps After DNS Works:

1. Add domain in Vercel/Netlify dashboard
2. Enable SSL certificate (automatic in most platforms)
3. Set up automatic deployments from GitHub
4. Test both http://yourdomain.com and https://yourdomain.com
5. Test both root domain and www subdomain
