export const metadata={title:'Creators | NEXORA',description:'NEXORA community creator hub for streamers and content creators.'}

const slots=[
  ['STREAMERS','Twitch / YouTube','Community streamers can be featured here with their channel and game focus.'],
  ['SHORT-FORM CREATORS','TikTok / Reels / Shorts','A place for clips, edits and gaming creators from the community.'],
  ['COMMUNITY PICKS','Rotating spotlight','A future rotating spotlight for members doing something worth sharing.']
]

export default function Creators(){return <main className="systemPage"><nav className="hubNav"><a href="/discover">← DISCOVER</a><b>CREATORS // COMMUNITY</b></nav><header className="systemHero"><small>NXR // CREATORS</small><h1>CREATE.<br/><span>GET SEEN.</span></h1><p>This hub is ready for NEXORA community creators. We are keeping it honest for now instead of inventing profiles before submissions are opened.</p></header><section className="achievementGrid">{slots.map(([title,tag,desc],i)=><article key={title}><b>0{i+1}</b><small>{tag}</small><h2>{title}</h2><p>{desc}</p></article>)}</section><section className="hubPoll"><div className="hubSectionHead"><small>NXR // CREATOR ACCESS</small><h2>WANT TO BE<br/><span>FEATURED?</span></h2><p>Creator submissions can be opened through Discord later. Until then, this page acts as the permanent home for the program.</p></div><a className="cta" href="https://discord.gg/3yWX2qTUZ" target="_blank" rel="noreferrer">JOIN NEXORA <span>↗</span></a></section></main>}
