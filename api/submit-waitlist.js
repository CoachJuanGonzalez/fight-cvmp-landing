// Vercel Serverless Function for Airtable Submission
// API key is stored securely in Vercel environment variables

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { firstName, lastName, email, phone } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email) {
            return res.status(400).json({
                error: 'Missing required fields',
                details: 'First name, last name, and email are required'
            });
        }

        // Get Airtable credentials from environment variables
        const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appzHfJJ3mm9MvOyr';
        const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'CONTACTS';

        if (!AIRTABLE_API_KEY) {
            console.error('AIRTABLE_API_KEY not configured');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Submit to Airtable
        const airtableResponse = await fetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fields: {
                        'first_name': firstName,
                        'last_name': lastName,
                        'email': email,
                        'phone': phone || '',
                        'source': 'fightcvmplandingpage'
                    }
                })
            }
        );

        if (!airtableResponse.ok) {
            const errorData = await airtableResponse.json();
            console.error('Airtable error:', errorData);
            return res.status(airtableResponse.status).json({
                error: 'Failed to submit to Airtable',
                details: errorData
            });
        }

        const data = await airtableResponse.json();

        return res.status(200).json({
            success: true,
            message: 'Successfully added to waitlist',
            recordId: data.id
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
