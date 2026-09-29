import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

const sources = [
  { name: 'Gematsu', category: 'GAMING', url: 'https://www.gematsu.com/feed', host: 'www.gematsu.com' },
  { name: 'PlayStation Blog', category: 'GAMING', url: 'https://blog.playstation.com/feed/', host: 'blog.playstation.com' },
  { name: 'Ars Technica', category: 'GAMING', url: 'https://feeds.arstechnica.com/arstechnica/gaming', host: 'arstechnica.com' },
  { name: 'Engadget', category: 'TECH', url: 'https://www.engadget.com/rss.xml', host: 'www.engadget.com' },
  { name: 'Ars Technica', category: 'TECH', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', host: 'arstechnica.com' },
];
const parser = new XMLParser({ ignoreAttributes: true, processEntities: false, trimValues: true });
const asArray = value => Array.isArray(value) ? value : value ? [value] : [];

async function readSource(source) {
  const response = await fetch(source.url, {
    headers: { 'User-Agent': 'NEXORA news links (+https://nexora-website-puce-eta.vercel.app)' },
    next: { revalidate: 1800 },
    signal: AbortSignal.timeout(9000),
  });
  if (!response.ok) throw new Error(`${source.name} feed: ${response.status}`);
  const xml = await response.text();
  if (xml.length > 750000) throw new Error(`${source.name} feed too large`);
  const feed = parser.parse(xml);
  return asArray(feed?.rss?.channel?.item).slice(0, 15).map(item => {
    const title = typeof item.title === 'string' ? item.title.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 190) : '';
    const rawLink = typeof item.link === 'string' ? item.link : '';
    const date = new Date(item.pubDate);
    let url;
    try { url = new URL(rawLink); } catch { return null; }
    if (url.protocol !== 'https:' || ![source.host, `www.${source.host}`].includes(url.hostname) || !title || Number.isNaN(date.getTime()) || date.getTime() > Date.now() + 3600000) return null;
    return { title, url: url.href, date: date.toISOString(), source: source.name, category: source.category };
  }).filter(Boolean).slice(0, 6);
}

export async function GET() {
  const results = await Promise.allSettled(sources.map(readSource));
  const stories = results.flatMap(result => result.status === 'fulfilled' ? result.value : []);
  if (!stories.length) return NextResponse.json({ error: 'Latest headlines are temporarily unavailable.' }, { status: 502 });
  const seen = new Set();
  const unique = stories.filter(story => { if (seen.has(story.url)) return false; seen.add(story.url); return true; });
  const newest = category => unique.filter(story => story.category === category).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12);
  const articles = [...newest('GAMING'), ...newest('TECH')].sort((a, b) => b.date.localeCompare(a.date));
  return NextResponse.json({ articles }, { headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=1800', 'X-Content-Type-Options': 'nosniff' } });
}
