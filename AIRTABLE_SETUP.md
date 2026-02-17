# Airtable Setup Guide for FIGHT CVMP Waitlist

## Step 1: Create Your Airtable Base

1. Go to [Airtable.com](https://airtable.com) and sign in (or create a free account)
2. Click **"Add a base"** → **"Start from scratch"**
3. Name your base: `FIGHT CVMP CRM`

## Step 2: Create the Waitlist Table

1. In your new base, rename the default table to: **`Waitlist`**
2. Create the following fields (columns):

| Field Name | Field Type | Notes |
|------------|------------|-------|
| Full Name | Single line text | Primary field (already exists) |
| Email | Email | For contact |
| Phone | Phone number | Optional field |
| Joined Date | Date | When they joined |
| Source | Single line text | Where they came from |

### How to Add Fields:
- Click the **"+"** icon next to the last column
- Select the field type
- Name the field exactly as shown above

## Step 3: Get Your Airtable Credentials

### A) Get Your Personal Access Token (API Key)

1. Click your **profile picture** (top-right corner)
2. Go to **"Developer hub"**
3. Click **"Personal access tokens"**
4. Click **"Create new token"**
5. Name it: `FIGHT CVMP Waitlist`
6. Under **Scopes**, select:
   - `data.records:read`
   - `data.records:write`
7. Under **Access**, select your `FIGHT CVMP CRM` base
8. Click **"Create token"**
9. **Copy the token** (you'll only see it once!)
10. Save it somewhere safe

### B) Get Your Base ID

1. Go to [Airtable API Documentation](https://airtable.com/api)
2. Select your **`FIGHT CVMP CRM`** base
3. Your Base ID is shown in the URL and in the intro section
   - It starts with `app` (e.g., `appXXXXXXXXXXXXXX`)
4. Copy this ID

## Step 4: Update Your Landing Page

1. Open `index.html`
2. Find this section (around line 493):

```javascript
const AIRTABLE_CONFIG = {
    apiKey: 'YOUR_AIRTABLE_API_KEY', // Replace with your Personal Access Token
    baseId: 'YOUR_BASE_ID', // Replace with your Base ID (starts with 'app')
    tableName: 'Waitlist' // Should match your table name exactly
};
```

3. Replace:
   - `YOUR_AIRTABLE_API_KEY` with your Personal Access Token
   - `YOUR_BASE_ID` with your Base ID
   - Keep `tableName: 'Waitlist'` as is (unless you named your table differently)

### Example (with fake credentials):
```javascript
const AIRTABLE_CONFIG = {
    apiKey: 'patXXXXXXXXXXXXXXXX.xxxxxxxxxxxxxxxxxxxxxxx',
    baseId: 'appXXXXXXXXXXXXXXX',
    tableName: 'Waitlist'
};
```

## Step 5: Test Your Form

1. Open `index.html` in a browser
2. Click **"Join the Private Waitlist"**
3. Fill in the form:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Phone: `(555) 123-4567` (optional)
4. Click **"Join Waitlist"**
5. Check your Airtable base - you should see a new record!

## Troubleshooting

### "Network error" or Form Not Working

**Check 1: CORS Issue**
- Airtable API works from the browser, but some browsers may block it
- **Solution**: Deploy to a live server (GitHub Pages, Netlify, Vercel)
- Local files (`file://`) may have CORS restrictions

**Check 2: API Key & Base ID**
- Make sure you copied them correctly (no extra spaces)
- API key should start with `pat`
- Base ID should start with `app`

**Check 3: Table Name**
- Must match exactly (case-sensitive)
- Default: `Waitlist`

**Check 4: Token Permissions**
- Go back to Developer Hub → Personal Access Tokens
- Make sure the token has:
  - `data.records:read`
  - `data.records:write`
  - Access to your base

### Form Submits But No Data in Airtable

1. Open **Browser Console** (F12 → Console tab)
2. Look for error messages
3. Common issues:
   - Field names don't match (case-sensitive)
   - Missing required permissions on token
   - Base ID is incorrect

### Success Message Doesn't Show

- Check browser console for JavaScript errors
- Make sure all field names in the code match your Airtable exactly

## Security Note

⚠️ **IMPORTANT**: Your API key is visible in the HTML source code.

**For production use**, you should:
1. Create a backend API endpoint (using n8n, Zapier, Make, or custom server)
2. Send form data to your endpoint
3. Have the endpoint communicate with Airtable (keeping your API key secret)

**For MVP/testing**, the current setup works fine if you're okay with the API key being visible.

## Alternative: Using n8n Webhook (More Secure)

If you want to keep your API key private:

1. Create an n8n workflow with a Webhook trigger
2. Add an Airtable node to insert the data
3. Replace the Airtable API call in `index.html` with a simple fetch to your n8n webhook URL
4. Your API key stays on the server side

Let me know if you need help setting this up!

## Optional: Add More Fields

You can add fields like:
- **Status** (Single select): `New`, `Contacted`, `Converted`
- **Notes** (Long text): For internal notes
- **Tags** (Multiple select): `Founder`, `VIP`, etc.
- **Referral Source** (Single line text): Track where they heard about you

Just add them to your Airtable table - they won't break the form!
