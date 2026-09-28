export const metadata={title:'Creators | NEXORA',description:'NEXORA community hub for short-form creators, editors and gaming content makers.'}

const slots=[
  ['SHORT-FORM CREATORS','TikTok / Reels / Shorts','A dedicated home for clips, edits and short-form gaming creators from the community.'],
  ['VIDEO CREATORS','YouTube / Video','Long-form videos, guides, reviews and community-made gaming content can be featured here.'],
  ['COMMUNITY PICKS','Rotating spotlight','A future rotating spotlight for creators doing something worth sharing.']
]

export default function Creators(){return <main className="systemPage"><nav className="hubNav"><a href="/discover">← DISCOVER</a><b>CREATORS // CONTENT</b></nav><header className="systemHero"><small>NXR // CREATORS</small><h1>CREATE.<br/><span>GET SEEN.</span></h1><p>This page is dedicated to NEXORA content creators, editors and video makers. Streamers now have their own separate page so the two do not get mixed together.</p></header><section className="achievementGrid">{slots.map(([title,tag,desc],i)=><article key={title}><b>0{i+1}</b><small>{tag}</small><h2>{title}</h2><p>{desc}</p></article>)}</section><section className="hubPoll"><div className="hubSectionHead"><small>NXR // CREATOR ACCESS</small><h2>WANT TO BE<br/><span>FEATURED?</span></h2><p>Creator submissions can be opened through Discord later. This page stays focused only on content creators.</p></div><a className="cta" href="https://discord.gg/3yWX2qTUZ" target="_blank" rel="noreferrer">JOIN NEXORA <span>↗</span></a></section></main>}
