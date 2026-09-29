import { NextResponse } from 'next/server';

const PLATFORM_NAMES = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];
const MAX_PAGES = 3;

function platformNames(game) {
  const names = (game.parent_platforms || []).map(item => item.platform?.name || '');
  return PLATFORM_NAMES.filter(platform => names.some(name => name.toLowerCase().includes(platform.toLowerCase())));
}

export async function GET(request) {
  const month = new URL(request.url).searchParams.get('month');
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month || '')) {
    return NextResponse.json({ error: 'Choose a valid month.' }, { status: 400 });
  }
  const [year, number] = month.split('-').map(Number);
  const current = new Date();
  const requestedIndex = year * 12 + number - 1;
  const currentIndex = current.getUTCFullYear() * 12 + current.getUTCMonth();
  if (requestedIndex < currentIndex - 1 || requestedIndex > currentIndex + 23) {
    return NextResponse.json({ error: 'This month is outside the available calendar.' }, { status: 400 });
  }
  const key = process.env.RAWG_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'The release feed is being connected. Please check back soon.' }, { status: 503 });
  }
  const lastDay = new Date(Date.UTC(year, number, 0)).getUTCDate();
  const base = new URL('https://api.rawg.io/api/games');
  base.searchParams.set('key', key);
  base.searchParams.set('dates', `${month}-01,${month}-${String(lastDay).padStart(2, '0')}`);
  base.searchParams.set('ordering', 'released');
  base.searchParams.set('page_size', '40');
  try {
    const games = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
      base.searchParams.set('page', String(page));
      const response = await fetch(base, { next: { revalidate: 21600 } });
      if (!response.ok) throw new Error(`RAWG status ${response.status}`);
      const payload = await response.json();
      if (!Array.isArray(payload.results)) throw new Error('Unexpected release data');
      games.push(...payload.results);
      if (!payload.next) break;
    }
    const result = games.filter(game => game.released?.startsWith(month) && game.name && platformNames(game).length)
      .map(game => ({
        id: game.id,
        name: game.name,
        date: game.released,
        platforms: platformNames(game),
        image: typeof game.background_image === 'string' && game.background_image.startsWith('https://') ? game.background_image : null,
        url: `https://rawg.io/games/${encodeURIComponent(game.slug || String(game.id))}`,
      }));
    return NextResponse.json({ games: result, truncated: games.length === MAX_PAGES * 40 }, {
      headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600' },
    });
  } catch (error) {
    console.error('Release feed unavailable:', error.message);
    return NextResponse.json({ error: 'Release dates could not be loaded. Please try again later.' }, { status: 502 });
  }
}
