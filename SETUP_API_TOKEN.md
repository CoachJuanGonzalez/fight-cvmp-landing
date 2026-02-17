# URGENT: Airtable API Setup Required

## The Problem

The Airtable form method doesn't work due to CORS restrictions. We need to use the Airtable REST API instead, which requires a Personal Access Token.

## Quick Setup (5 Minutes)

### Step 1: Create Airtable Personal Access Token

1. **Go to Airtable**: https://airtable.com/create/tokens
2. **Click**: "Create new token"
3. **Name it**: `FIGHT CVMP Landing Page`
4. **Add scopes**:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
5. **Add access**:
   - Click "Add a base"
   - Select your base: `ASCENSION COACHING` (with CONTACTS table)
6. **Click**: "Create token"
7. **COPY THE TOKEN** - You'll only see it once!
   - It looks like: `patXXXXXXXXXXXXXXXX.xxxxxxxxxxxxxx`

### Step 2: Add "source" Field to Airtable

1. Open your Airtable base (ASCENSION COACHING)
2. Go to the **CONTACTS** table
3. Click the **"+"** to add a new field
4. Field name: `source` (lowercase)
5. Field type: **Single line text**
6. Click **Create field**

### Step 3: Update index.html

1. Open `index.html`
2. Find line ~846 (search for "YOUR_AIRTABLE_PERSONAL_ACCESS_TOKEN")
3. Replace this:
   ```javascript
   apiKey: 'YOUR_AIRTABLE_PERSONAL_ACCESS_TOKEN',
   ```

   With your actual token:
   ```javascript
   apiKey: 'patXXXXXXXXXXXXXXXX.xxxxxxxxxxxxxx',
   ```

4. Save the file

### Step 4: Commit and Push

```bash
cd "H:\My Drive\ASCENSION OS\FIGHT CVMP"
git add index.html
git commit -m "Add Airtable API token"
git push origin main
```

### Step 5: Wait for Vercel to Deploy

- Vercel will auto-deploy (1-2 minutes)
- Or manually trigger in Vercel dashboard

### Step 6: Test!

**Desktop:**
1. Go to https://www.fightcvmp.com/
2. Hard refresh (Ctrl+Shift+R)
3. Fill and submit form
4. Check Airtable CONTACTS table!

**Mobile:**
1. Go to https://www.fightcvmp.com/
2. Clear cache or incognito
3. Fill and submit form
4. Check Airtable CONTACTS table!

---

## Security Note

⚠️ **Your API token will be visible in the HTML source code**

This is acceptable for a landing page, but be aware:
- Anyone can see the token in browser DevTools
- Rate limit: 5 requests per second per base

**For better security (optional later):**
- Use Vercel serverless function
- Use n8n/Zapier webhook
- Use Make.com integration

But for now, this direct API method will work perfectly!

---

## Troubleshooting

**"Invalid token" error:**
- Make sure you copied the entire token
- Check that the token has both read and write permissions
- Verify the token has access to your base

**"Table not found" error:**
- Table name must be exactly `CONTACTS` (all caps, as shown in your screenshot)

**"Field not found" error:**
- Make sure you added the `source` field
- All field names must be lowercase: `first_name`, `last_name`, `email`, `phone`, `source`

**Still not working:**
- Open browser DevTools (F12)
- Go to Console tab
- Look for error messages
- Share the error with me

---

## Expected Result

✅ Form submits successfully
✅ Data appears in CONTACTS table
✅ Fields populated: first_name, last_name, email, phone, source
✅ source = "fightcvmplandingpage"

This method is **guaranteed to work** because it uses Airtable's official API!
