# 5-Minute Email Setup (Resend)

This will activate email sending in Feature 5 (Lead Capture)

## Step 1: Create Resend Account (1 minute)

1. Go to https://resend.com
2. Click "Sign Up"
3. Sign up with GitHub or email
4. Verify your email if prompted

## Step 2: Get API Key (1 minute)

1. After login, you'll be on the dashboard
2. Click "API Keys" in left sidebar
3. Click "Create API Key"
4. Name it: `credex-audit-prod`
5. **Copy the API key** (starts with `re_...`)
6. ⚠️ Save it somewhere - you can't see it again!

## Step 3: Add to Vercel (30 seconds)

```bash
cd credex-ai-spend-audit

vercel env add RESEND_API_KEY
# Paste your API key when prompted (re_...)
# Choose: Production, Preview, Development (select all)
```

## Step 4: Verify Domain (Optional but Recommended)

### For Testing (Use Resend's Test Domain)
- Resend gives you a test domain: `onboarding@resend.dev`
- You can send to ANY email address for testing
- Emails will have "via resend.dev" in from address
- **This works immediately - skip to Step 5**

### For Production (Your Own Domain)
1. In Resend dashboard, click "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend shows you:
   - TXT record for verification
   - CNAME records for sending
5. Wait for verification (usually 5-15 minutes)
6. Update the `from` address in `app/api/lead/route.ts`:
   ```typescript
   from: "SpendLens <noreply@yourdomain.com>",
   ```

**For this submission:** Just use the test domain! It works perfectly.

## Step 5: Redeploy (30 seconds)

```bash
vercel --prod --yes
```

## Step 6: Test It! (1 minute)

1. Go to your deployed URL
2. Fill out the audit form
3. Submit
4. Click "📧 Get Full Report"
5. Enter your real email address
6. Check your inbox!

You should receive an email with:
- Subject: "Your AI Spend Audit Results - $X/mo in Savings"
- Professional HTML formatting
- Link to your audit
- Credex branding

## Verification Checklist

- [ ] API key added to Vercel
- [ ] Redeployed
- [ ] Test email received successfully
- [ ] Email looks professional (HTML formatted)
- [ ] Links in email work

## Troubleshooting

**No email received:**
- Check spam folder
- Verify API key is correct
- Check Resend dashboard → "Logs" to see if it was sent
- Make sure you redeployed after adding the env var

**"Failed to send email" error:**
- API key might be wrong
- Check Resend dashboard for error details
- Try generating a new API key

**Email from wrong address:**
- Default is `SpendLens <noreply@spendlens.app>`
- This will fail until domain is verified
- Use `onboarding@resend.dev` for testing
- Or verify your own domain

## Alternative: Use Test Mode

If you want to skip email entirely for testing:
1. The app still works perfectly!
2. Lead is saved to Supabase
3. User sees success message
4. Email just doesn't send (logged as error in console)

The app is designed to work gracefully even if email fails.

---

## Cost

- **Free tier:** 100 emails/day, 3,000/month
- **Perfect for this project**
- Upgrade if you get more traffic

---

**That's it!** Email sending is now active. Total time: ~5 minutes.

## Next Steps

1. Follow QUICK_SETUP_SUPABASE.md for shareable URLs
2. Test the complete flow end-to-end
3. Submit your project!
