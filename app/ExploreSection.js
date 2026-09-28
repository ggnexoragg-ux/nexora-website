const categories=[
  ['01','GAME RELEASES','Track upcoming games and jump into NEXORA coverage when it lands.','/releases','◫'],
  ['02','COMMUNITY EVENTS','See game nights, community sessions, giveaways and upcoming NEXORA events.','/events','◎'],
  ['03','CREATORS','Discover streamers and creators from around the NEXORA community.','/creators','◉'],
  ['04','FEEDBACK','Send ideas for the website, content, events and the community itself.','/feedback','⌁'],
  ['05','ROADMAP','See what has shipped, what we are improving and what is planned next.','/roadmap','↗'],
  ['06','ACHIEVEMENTS','Explore NEXORA milestones, community progress and things we have unlocked together.','/achievements','✦'],
]

export default function ExploreSection(){
  return <section id="explore" className="wrap community exploreSection">
    <div className="sectionIntro">
      <div>
        <div className="sectionLabel"><div className="sectionNum">6</div><div className="eyebrow">EXPLORE NEXORA</div></div>
        <h2>MORE THAN<br/><span>THE FEED.</span></h2>
      </div>
      <p>The wider NEXORA hub — releases, community events, creators, ideas, our public roadmap and the milestones we hit together.</p>
    </div>
    <div className="pillarGrid">
      {categories.map(([n,t,d,href,icon])=><a className="pillar" href={href} key={href} style={{color:'inherit',textDecoration:'none'}}>
        <div className="pnum">{n}</div><div className="corner">↗</div><div className="pIcon">{icon}</div><h3>{t}</h3><p>{d}</p><div className="line"/>
      </a>)}
    </div>
  </section>
}