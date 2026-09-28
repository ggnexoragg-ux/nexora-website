const SITE=process.env.NEXT_PUBLIC_SITE_URL||'https://nexora-website-puce-eta.vercel.app'

const items=[
  {slug:'hytale-15000-gobliterator-challenge',title:'Hytale Creator Puts $15,000 on Gobliterator Boss Challenge',date:'2026-09-28T00:00:00Z',description:'Hytale founder Simon Collins-Laflamme is offering $15,000 to the first streamer who defeats the Gobliterator under a brutal set of rules.'},
  {slug:'persona-3-reload-mitsuru-figure',title:'Persona 3 Reload Mitsuru Kirijo Figure Revealed',date:'2026-09-27T00:00:00Z',description:'AMAKUNI has revealed a new 1/7-scale Mitsuru Kirijo figure based on Persona 3 Reload, with release planned for 2027.'},
  {slug:'iphone-18-pro-face-id-restart-fix',title:'Apple Preparing Fix for iPhone 18 Pro Face ID Restart Bug',date:'2026-09-25T00:00:00Z',description:'Apple says a software update is coming to address an iPhone 18 Pro Face ID bug that can freeze and restart affected devices.'},
  {slug:'rtx-30-smooth-motion-mod',title:'Mod Brings NVIDIA Smooth Motion to RTX 30 Series GPUs',date:'2026-09-24T00:00:00Z',description:'Community projects are enabling NVIDIA Smooth Motion on RTX 30-series Ampere GPUs, bringing driver-level frame interpolation to unsupported hardware.'}
]

const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;')

export function GET(){
  const body=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>NEXORA Newswire</title><link>${SITE}/news</link><description>Gaming and tech news from NEXORA.</description><language>en</language>${items.map(item=>`<item><title>${esc(item.title)}</title><link>${SITE}/news/${item.slug}</link><guid>${SITE}/news/${item.slug}</guid><pubDate>${new Date(item.date).toUTCString()}</pubDate><description>${esc(item.description)}</description></item>`).join('')}</channel></rss>`
  return new Response(body,{headers:{'Content-Type':'application/rss+xml; charset=utf-8','Cache-Control':'public, max-age=900'}})
}
