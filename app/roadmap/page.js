export const metadata={title:'Roadmap | NEXORA',description:'See what NEXORA has shipped, what is being improved and what is planned next.'}

const shipped=['Discover hub','Events, creator and release hubs','News explorer and article extras','Giveaway hub','Local XP and achievements','Nox room and site interactions','PWA / offline support','Community feedback flow','RSS news feed','Organization structured data and SEO foundations'];
const improving=['Creator hub content','Events calendar details','Release calendar coverage','Internal linking and article structured data','Mobile and accessibility polish'];
const planned=['Analytics and Search Console','Creator submissions','Community event scheduling','Newsletter signup','Custom domain after registration'];

function Column({title,items,code}){return <article><b>{code}</b><small>{title}</small><h2>{title}</h2>{items.map(item=><p key={item}>→ {item}</p>)}</article>}

export default function Roadmap(){return <main className="systemPage"><nav className="hubNav"><a href="/discover">← DISCOVER</a><b>ROADMAP // PUBLIC</b></nav><header className="systemHero"><small>NXR // ROADMAP</small><h1>BUILDING<br/><span>IN PUBLIC.</span></h1><p>A simple view of what NEXORA has already shipped, what is being tightened up, and what comes later. No fake dates or promises.</p></header><section className="achievementGrid"><Column code="01" title="SHIPPED" items={shipped}/><Column code="02" title="IMPROVING" items={improving}/><Column code="03" title="PLANNED" items={planned}/></section></main>}
