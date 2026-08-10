// Vercel serverless function: proxies place search to Google Places API (New)
// so the API key never reaches the browser.
//
// Setup: create a Google Cloud project, enable "Places API (New)", create an
// API key restricted to server IPs / no referrer restriction (since this is
// a server-to-server call), and set it as GOOGLE_PLACES_API_KEY in your
// Vercel project's environment variables.

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    res.status(501).json({
      error: 'GOOGLE_PLACES_API_KEY is not configured on the server yet.',
      results: []
    });
    return;
  }

  const { q, city } = req.query;
  if (!q || q.trim().length < 2) {
    res.status(200).json({ results: [] });
    return;
  }

  const textQuery = city ? `${q} in ${city}` : q;

  try {
    const googleRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': [
          'places.id',
          'places.displayName',
          'places.formattedAddress',
          'places.location',
          'places.priceLevel',
          'places.primaryType'
        ].join(',')
      },
      body: JSON.stringify({ textQuery, maxResultCount: 8 })
    });

    if (!googleRes.ok) {
      const text = await googleRes.text();
      res.status(googleRes.status).json({ error: text, results: [] });
      return;
    }

    const data = await googleRes.json();
    const results = (data.places || []).map((place) => ({
      googlePlaceId: place.id,
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      lat: place.location?.latitude ?? null,
      lng: place.location?.longitude ?? null,
      priceLevel: place.priceLevel || null,
      primaryType: place.primaryType || null
    }));

    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({ error: String(err), results: [] });
  }
}
