import CommunityPoll from '../CommunityPoll'

const cards=[
  ['/news','NEWSWIRE','Gaming and tech stories from NEXORA.'],
  ['/releases','RELEASES','Upcoming confirmed game releases and related NEXORA coverage.'],
  ['/events','EVENTS','Community nights, giveaways and future events.'],
  ['/creators','CREATORS','A home for NEXORA community creators.'],
  ['/giveaways','GIVEAWAYS','Active drops and giveaway history.'],
  ['/roadmap','ROADMAP','See what is live, being improved and planned.'],
  ['/achievements','ACHIEVEMENTS','Explore the site and unlock local achievements.']
]

export const metadata={title:'Discover | NEXORA',description:'Explore NEXORA news, releases, events, creators, giveaways, roadmap and community features.'}

export default function Discover(){return <main className="systemPage"><nav className="hubNav"><a href="/">← NEXORA</a><b>DISCOVER // HUB</b></nav><header className="systemHero"><small>NXR // DISCOVER</small><h1>YOUR <span>HUB.</span></h1><p>Everything worth exploring around NEXORA, collected in one place.</p></header><section className="achievementGrid">{cards.map(([href,title,desc],i)=><a href={href} key={href} style={{textDecoration:'none',color:'inherit'}}><article><b>{String(i+1).padStart(2,'0')}</b><small>OPEN MODULE</small><h2>{title}</h2><p>{desc}</p></article></a>)}</section><CommunityPoll/></main>}
