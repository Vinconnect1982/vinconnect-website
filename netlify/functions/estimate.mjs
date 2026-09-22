export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  try {
    const { address, base } = await req.json();
    if (!address || typeof base !== 'number') return Response.json({ error: 'Invalid request' }, { status: 400 });
    const key = Netlify.env.get('GOOGLE_MAPS_SERVER_KEY');
    if (!key) return Response.json({ error: 'Server routing key not configured' }, { status: 503 });

    // Cranbourne is intentionally kept server-side so the public calculator only receives the final figure.
    const origin = 'Cranbourne VIC 3977, Australia';
    const r = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'routes.distanceMeters'
      },
      body: JSON.stringify({
        origin: { address: origin },
        destination: { address },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_UNAWARE'
      })
    });
    if (!r.ok) return Response.json({ error: 'Route check failed' }, { status: 502 });
    const data = await r.json();
    const km = (data.routes?.[0]?.distanceMeters || 0) / 1000;
    if (!km) return Response.json({ error: 'Distance unavailable' }, { status: 502 });

    // Internal pricing rule. Do not expose this value or calculation in the browser UI.
    const chargeable = Math.max(0, km - 30);
    const travel = Math.ceil(chargeable / 5) * 100;
    const total = Math.round(base + travel);
    return Response.json({ total });
  } catch (e) {
    return Response.json({ error: 'Estimate failed' }, { status: 500 });
  }
};
