export const metadata={title:'Streamers | NEXORA',description:'Meet and discover streamers from the NEXORA community.'}

const slots=[
  ['LIVE NOW','Twitch / YouTube Live','A dedicated space for NEXORA streamers who are currently live or regularly streaming.'],
  ['COMMUNITY STREAMERS','Member spotlight','Streamer profiles can include their main games, schedule and channel links.'],
  ['FEATURED STREAMER','Rotating spotlight','A future rotating feature for one NEXORA streamer at a time.']
]

export default function Streamers(){return <main className="systemPage"><nav className="hubNav"><a href="/discover">← DISCOVER</a><b>STREAMERS // COMMUNITY</b></nav><header className="systemHero"><small>NXR // STREAMERS</small><h1>LIVE.<br/><span>TOGETHER.</span></h1><p>This page is only for NEXORA streamers, so live creators do not get mixed together with news, events or short-form creators.</p></header><section className="achievementGrid">{slots.map(([title,tag,desc],i)=><article key={title}><b>0{i+1}</b><small>{tag}</small><h2>{title}</h2><p>{desc}</p></article>)}</section><section className="hubPoll"><div className="hubSectionHead"><small>NXR // STREAMER ACCESS</small><h2>STREAM WITH<br/><span>NEXORA.</span></h2><p>Streamer submissions and profile details can be added through Discord later. This page stays dedicated only to live-streaming members.</p></div><a className="cta" href="https://discord.gg/3yWX2qTUZ" target="_blank" rel="noreferrer">JOIN NEXORA <span>↗</span></a></section></main>}
