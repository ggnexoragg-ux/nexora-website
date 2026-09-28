export const metadata={title:'Events | NEXORA',description:'NEXORA community events, game nights and giveaway moments.'}

const events=[
  ['COMMUNITY GAME NIGHT','Community session','DATE TBA','Discord','Casual community game night. The game and exact time will be announced in Discord.'],
  ['GIVEAWAY DROP','Giveaway','TBA','NEXORA','Future giveaways and winner announcements will appear here as they are confirmed.'],
  ['CREATOR SPOTLIGHT','Community','TBA','NEXORA','A rotating community creator feature once submissions are opened.']
]

export default function Events(){return <main className="systemPage"><nav className="hubNav"><a href="/discover">← DISCOVER</a><b>EVENTS // CALENDAR</b></nav><header className="systemHero"><small>NXR // EVENTS</small><h1>WHAT'S <span>NEXT.</span></h1><p>A clean home for NEXORA game nights, giveaways and community events. Nothing here pretends to be scheduled until it is actually confirmed.</p></header><section className="achievementGrid">{events.map(([title,type,date,where,desc],i)=><article key={title}><b>0{i+1}</b><small>{type} // {date}</small><h2>{title}</h2><p>{desc}</p><p><strong>{where}</strong></p></article>)}</section></main>}
