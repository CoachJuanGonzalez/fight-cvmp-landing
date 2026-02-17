# Secure Vercel Setup - Airtable Integration

## ✅ 100% Secure - No API Keys Exposed!

Your Airtable API key will be stored securely in Vercel's environment variables, never visible in the code.

---

## Quick Setup (3 Steps - 5 Minutes)

### Step 1: Create Airtable Personal Access Token

1. **Go to**: https://airtable.com/create/tokens
2. **Click**: "Create new token"
3. **Name**: `FIGHT CVMP Landing Page`
4. **Add scopes**:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
5. **Add access**:
   - Click "Add a base"
   - Select: `ASCENSION COACHING` (the base with CONTACTS table)
6. **Click**: "Create token"
7. **COPY THE TOKEN** - Keep it safe! Looks like: `patXXXXXXXXXXXXXXXX.xxxxxx`

### Step 2: Add "source" Field to Airtable (If Not Already Done)

1. Open your Airtable base: **ASCENSION COACHING**
2. Go to the **CONTACTS** table
3. Click **"+"** to add a new field
4. **Field name**: `source` (lowercase)
5. **Field type**: Single line text
6. **Click**: "Create field"

### Step 3: Add Environment Variable to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click** your project: `fightcvmp` or `fight-cvmp-landing`
3. **Go to**: Settings → Environment Variables
4. **Add New Variable**:
   - **Name**: `AIRTABLE_API_KEY`
   - **Value**: Paste your token from Step 1 (starts with `pat`)
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
5. **Click**: "Save"

6. **Add Second Variable** (optional but recommended):
   - **Name**: `AIRTABLE_BASE_ID`
   - **Value**: `appzHfJJ3mm9MvOyr`
   - **Environments**: ✅ All three
   - **Click**: "Save"

7. **Add Third Variable** (optional):
   - **Name**: `AIRTABLE_TABLE_NAME`
   - **Value**: `CONTACTS`
   - **Environments**: ✅ All three
   - **Click**: "Save"

---

## Deploy & Test

### Automatic Deployment:

Once you push the code to GitHub, Vercel will:
1. Auto-detect the new `/api` folder
2. Deploy the serverless function
3. Environment variables are automatically available
4. Site goes live at: https://www.fightcvmp.com/

**Wait 1-2 minutes for deployment to complete.**

### Test It:

**Desktop:**
1. Go to: https://www.fightcvmp.com/
2. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
3. Click "Join the Private Waitlist"
4. Fill out form and submit
5. **Check Airtable CONTACTS table** → New record should appear!

**Mobile:**
1. Go to: https://www.fightcvmp.com/
2. Use incognito/private mode
3. Click "Join the Private Waitlist"
4. Fill out form and submit
5. **Check Airtable CONTACTS table** → New record should appear!

---

## How It Works (Secure Architecture)

```
User fills form
    ↓
JavaScript calls: /api/submit-waitlist (your Vercel function)
    ↓
Vercel function reads API_KEY from environment variables
    ↓
Vercel function calls Airtable API (secure server-side)
    ↓
Data saved to CONTACTS table
    ↓
Success response sent to user
```

**Security Benefits:**
- ✅ API key never exposed in browser
- ✅ API key never in Git/GitHub
- ✅ API key stored securely in Vercel
- ✅ Only your function can access it
- ✅ Users can't see or steal it

---

## Troubleshooting

### "Server configuration error"
- Check that you added `AIRTABLE_API_KEY` to Vercel environment variables
- Make sure you spelled it exactly: `AIRTABLE_API_KEY` (case-sensitive)
- Check that the token is valid (starts with `pat`)

### "Failed to submit to Airtable"
- Verify your token has write permissions
- Check that the token has access to your base
- Make sure field names match: `first_name`, `last_name`, `email`, `phone`, `source`

### Form submits but no data in Airtable
- Open browser DevTools (F12) → Console tab
- Look for error messages
- Check Network tab to see the API response

### Environment variable not working
- After adding env vars, **redeploy** the project:
  - Go to Vercel dashboard → Deployments
  - Click "..." menu → "Redeploy"

---

## Expected Result

✅ Form submits successfully
✅ Success message appears
✅ Data appears in CONTACTS table with:
   - first_name
   - last_name
   - email
   - phone (if provided)
   - source = "fightcvmplandingpage"

---

## Production Ready!

This setup is:
- ✅ Secure (no exposed API keys)
- ✅ Scalable (handles unlimited traffic)
- ✅ Fast (Vercel edge functions)
- ✅ Reliable (no CORS issues)
- ✅ Professional (industry best practice)

Your landing page is now production-ready and secure! 🚀
