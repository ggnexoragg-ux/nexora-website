import CommunityPoll from '../CommunityPoll'

const cards=[
  ['/news','NEWSWIRE','Gaming and tech stories from NEXORA.'],
  ['/streamers','STREAMERS','Meet and discover NEXORA community streamers.'],
  ['/creators','CREATORS','Short-form, video and community content creators.'],
  ['/releases','RELEASES','Upcoming confirmed game releases and related NEXORA coverage.'],
  ['/events','EVENTS','Community nights, tournaments and future events.'],
  ['/giveaways','GIVEAWAYS','Active drops and giveaway history.'],
  ['/feedback','FEEDBACK','Send ideas and suggestions for NEXORA.'],
  ['/roadmap','ROADMAP','See what is live, being improved and planned.'],
  ['/achievements','ACHIEVEMENTS','Explore the site and unlock local achievements.']
]

export const metadata={title:'Discover | NEXORA',description:'Explore dedicated NEXORA pages for news, streamers, creators, releases, events, giveaways, feedback, roadmap and achievements.'}

export default function Discover(){return <main className="systemPage"><nav className="hubNav"><a href="/">← NEXORA</a><b>DISCOVER // DIRECTORY</b></nav><header className="systemHero"><small>NXR // DISCOVER</small><h1>CHOOSE YOUR<br/><span>DESTINATION.</span></h1><p>Every part of NEXORA has its own page. Pick exactly what you want without mixing unrelated sections together.</p></header><section className="achievementGrid">{cards.map(([href,title,desc],i)=><a href={href} key={href} style={{textDecoration:'none',color:'inherit'}}><article><b>{String(i+1).padStart(2,'0')}</b><small>OPEN PAGE</small><h2>{title}</h2><p>{desc}</p></article></a>)}</section><CommunityPoll/></main>}
