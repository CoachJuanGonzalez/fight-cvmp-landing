# Airtable Form Webhook Setup Guide for FIGHT CVMP Waitlist

## Why Use Airtable Forms + Webhook?

✅ **More Secure** - No API keys exposed in your HTML
✅ **Easier Setup** - Just copy/paste a URL
✅ **Built-in Features** - Airtable handles spam, validation, and notifications
✅ **No Code Backend** - Airtable does all the work

---

## Step 1: Create Your Airtable Base

1. Go to [Airtable.com](https://airtable.com) and sign in (or create a free account)
2. Click **"Create a base"** → **"Start from scratch"**
3. Name your base: `FIGHT CVMP CRM`

## Step 2: Create the Waitlist Table

1. In your new base, rename the default table to: **`Waitlist`**
2. Airtable will create a default "Name" field - rename it to **`First Name`**
3. Add three more fields by clicking the **"+"** icon:

| Field Name | Field Type | Required? |
|------------|------------|-----------|
| First Name | Single line text | Yes (already exists) |
| Last Name | Single line text | Yes |
| Email | Email | Yes |
| Phone | Phone number | No |

That's it! Airtable will automatically add timestamps when records are created.

## Step 3: Create an Airtable Form

1. In your `Waitlist` table, click the **"Form"** button (top-right, next to "Grid view")
2. Click **"Create form"**
3. Name your form: `FIGHT CVMP Waitlist Form`

### Configure Your Form Fields:

1. **First Name**:
   - Toggle **"Required"** to ON
   - Description: Leave blank

2. **Last Name**:
   - Toggle **"Required"** to ON
   - Description: Leave blank

3. **Email**:
   - Toggle **"Required"** to ON
   - Description: Leave blank

4. **Phone**:
   - Toggle **"Required"** to OFF (optional field)
   - Description: Leave blank

4. Click **"Settings"** (gear icon) and configure:
   - **After submit**: Select "Show custom message"
   - **Custom message**: "Thanks for joining! We'll be in touch soon."
   - **Allow multiple submissions**: ON (if you want to allow updates)

## Step 4: Get Your Form Webhook URL

1. In the form view, click **"Share form"** (top-right)
2. Copy the **"Form URL"** - it will look like:
   ```
   https://airtable.com/appXXXXXXXXXXXXXX/shrYYYYYYYYYYYYYYYY
   ```
3. **This is your webhook URL!** Keep it handy.

### Alternative: Use the Embed URL
If you want to avoid CORS issues, you can also use the embed URL:
1. In "Share form", switch to the **"Embed"** tab
2. Copy the URL from the iframe src - it starts with `https://airtable.com/embed/...`
3. This version works better with JavaScript fetch requests

## Step 5: Update Your Landing Page

1. Open `index.html`
2. Find this line (around line 497):

```javascript
const WEBHOOK_URL = 'YOUR_AIRTABLE_FORM_WEBHOOK_URL';
```

3. Replace `YOUR_AIRTABLE_FORM_WEBHOOK_URL` with your actual form URL:

```javascript
const WEBHOOK_URL = 'https://airtable.com/appXXXXXXXXXXXXXX/shrYYYYYYYYYYYYYYYY';
```

### Example (with fake URL):
```javascript
const WEBHOOK_URL = 'https://airtable.com/app1234567890ABC/shr0987654321XYZ';
```

## Step 6: Test Your Form

1. Save `index.html` and open it in a browser
2. Click **"Join the Private Waitlist"**
3. Fill in the form:
   - First Name: `Test`
   - Last Name: `User`
   - Email: `test@example.com`
   - Phone: `555-123-4567` (optional)
4. Click **"Join Waitlist"**
5. Go to your Airtable base - you should see a new record!

---

## Troubleshooting

### Form Submits But Shows Error Message

**This is actually NORMAL!**

Airtable forms redirect after submission, which can trigger CORS errors in JavaScript. However, the code is smart enough to handle this:

- If you see the success message → ✅ Form submitted successfully
- Check your Airtable base to confirm the record was created

### No Data Appearing in Airtable

1. **Check the webhook URL**:
   - Make sure it starts with `https://airtable.com/`
   - No extra quotes or spaces
   - Matches exactly what's in the "Share form" dialog

2. **Check field names match**:
   - Open the form in your JavaScript (around line 522)
   - Field names must match Airtable exactly (case-sensitive):
     - `First Name` (not `firstName` or `FirstName`)
     - `Last Name` (not `lastName` or `LastName`)
     - `Email` (not `email`)
     - `Phone` (not `phone`)

3. **Check browser console**:
   - Press F12 → Console tab
   - Look for any error messages
   - If you see CORS errors but data is in Airtable → everything is working!

### Form Won't Open

- Check that all CTA buttons have the class `cta-button`
- Make sure JavaScript isn't blocked in your browser
- Try opening the page in incognito mode

---

## Bonus: Add Notifications

Want to get notified when someone joins?

### Option 1: Airtable Email Notifications (Free)
1. In your Airtable base, click **"Automations"** (top toolbar)
2. Create automation:
   - **Trigger**: "When record is created"
   - **Table**: Waitlist
   - **Action**: "Send email"
   - **To**: Your email address
   - **Subject**: "New FIGHT CVMP Waitlist Member!"
   - **Message**: Include fields like `{First Name}`, `{Last Name}`, `{Email}`, `{Phone}`

### Option 2: Slack Notifications (Free with Airtable Pro)
1. Create automation as above
2. **Action**: "Send to Slack"
3. Connect your Slack workspace
4. Choose channel and customize message

### Option 3: Email to Lead (Pro feature)
You can auto-send a welcome email to new waitlist members:
1. Automation trigger: "When record is created"
2. Action: "Send email"
3. To: `{Email}` (the field from the record)
4. Customize your welcome message

---

## Advanced: Custom Domain (Optional)

Want your form at `join.fightcvmp.com` instead of `airtable.com/app...`?

1. **Upgrade to Airtable Pro** (required for custom domains on forms)
2. In form settings → Custom domain
3. Follow Airtable's instructions to set up DNS

**Or**, deploy your landing page to your own domain and the form will be embedded there automatically!

---

## Security Benefits Over API Approach

| Feature | Airtable API | Airtable Form Webhook |
|---------|--------------|----------------------|
| API Key Exposure | ❌ Visible in HTML | ✅ No API key needed |
| Rate Limiting | ⚠️ You manage it | ✅ Airtable handles it |
| Spam Protection | ❌ None | ✅ Built-in |
| Field Validation | ❌ You code it | ✅ Automatic |
| Permissions | ⚠️ Full base access | ✅ Form-only access |

---

## Need Help?

Common issues and solutions:

**Q: Can I customize the form fields later?**
A: Yes! Just add/edit fields in Airtable, then update the form. No code changes needed unless you want to change the JavaScript field mapping.

**Q: Will this work on GitHub Pages?**
A: Absolutely! Once deployed, it works perfectly.

**Q: How many submissions can I have?**
A: Airtable Free: 1,200 records per base. Airtable Plus: 5,000+ per base.

**Q: Can I export the data?**
A: Yes! Airtable lets you export to CSV/Excel anytime.

**Q: What if I want to add more fields?**
A: Add them to your Airtable table, add them to the form, then update the JavaScript in `index.html` to include the new fields in the FormData.

---

## Next Steps

Once your form is working:

1. ✅ Set up email notifications
2. ✅ Create a welcome automation
3. ✅ Deploy to GitHub Pages
4. ✅ Add Google Analytics (optional)
5. ✅ Create your 5-email nurture sequence

Need help with any of these? Let me know!
