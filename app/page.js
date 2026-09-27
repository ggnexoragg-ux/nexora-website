const DISCORD='https://discord.gg/3yWX2qTUZ';
const TIKTOK='https://www.tiktok.com/@nex0ra.gg';
const DUBBY='https://www.dubby.gg/';
const features=[
  ['01','FIND YOUR SQUAD','Meet players, build squads and stop queueing alone.'],
  ['02','STAY FOR THE CHAOS','Talk games, share clips, hang out and become part of the community.'],
  ['03','DISCOVER MORE','Fast gaming news, recommendations, giveaways and community events.']
];
export default function Home(){
  return <main>
    <div className="grid-bg"/><div className="orb orb1"/><div className="orb orb2"/>
    <nav className="nav"><div className="wrap navin">
      <a className="brand" href="#top"><img src="/nexora-logo.png" alt="NEXORA logo"/><span>NEXORA</span></a>
      <div className="links"><a href="#community">Community</a><a href="#content">Content</a><a href="#giveaways">Giveaways</a><a href="#partners">Partners</a><a className="btn primary navcta" href={DISCORD} target="_blank" rel="noreferrer">JOIN DISCORD</a></div>
    </div></nav>

    <div className="wrap" id="top">
      <header className="hero">
        <div className="hero-copy">
          <div className="status"><i/> GLOBAL GAMING COMMUNITY</div>
          <h1>PLAY.<br/>CONNECT.<br/><span>BELONG.</span></h1>
          <p>NEXORA brings gamers together. Find teammates, discover games, catch the news, enter giveaways — or just hang out.</p>
          <div className="actions"><a className="btn primary" href={DISCORD} target="_blank" rel="noreferrer">JOIN THE DISCORD <b>↗</b></a><a className="btn ghost" href={TIKTOK} target="_blank" rel="noreferrer">WATCH @NEX0RA.GG</a></div>
          <div className="hero-meta"><span>BASED IN GREECE</span><span>•</span><span>BUILT FOR EVERYONE</span></div>
        </div>
        <div className="hero-art"><div className="nox-ring"/><div className="nox-label">MEET NOX <span>↘</span></div><img src="/nox.png" alt="Nox, NEXORA mascot"/></div>
      </header>

      <section id="community">
        <div className="section-head"><div><div className="kicker">01 / THE COMMUNITY</div><h2>YOUR NEXT <span>SQUAD</span><br/>STARTS HERE.</h2></div><p className="lead">Not another dead server. NEXORA is being built around the people inside it.</p></div>
        <div className="grid3">{features.map(([n,t,d])=><article className="card" key={n}><div className="cardtop"><span>{n}</span><b>↗</b></div><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section id="content">
        <div className="kicker">02 / ON YOUR FEED</div><h2>GAMING CONTENT.<br/><span>NO FILLER.</span></h2>
        <div className="feature">
          <article className="bigcard news"><div className="tag">NEWS</div><div><h3>THE STORIES YOU<br/>ACTUALLY CARE ABOUT.</h3><p>Fast gaming updates, releases and stories you may have missed.</p></div></article>
          <article className="bigcard noxcard"><img src="/nox.png" alt="Nox"/><div className="tag">NOX</div><div><h3>HE HAS OPINIONS.</h3><p>Reviews, Gaming Court, recommendations, memes and whatever we put him through next.</p></div></article>
        </div>
        <div className="center"><a className="textlink" href={TIKTOK} target="_blank" rel="noreferrer">SEE WHAT WE'RE POSTING ON TIKTOK ↗</a></div>
      </section>

      <section id="giveaways" className="giveaway">
        <div className="givecopy"><div className="kicker">03 / GIVEAWAYS & EVENTS</div><h2>GOOD THINGS<br/><span>HAPPEN HERE.</span></h2><p>Game giveaways, community milestones and events happen inside NEXORA. Be there for the next one.</p><a className="btn primary" href={DISCORD} target="_blank" rel="noreferrer">DON'T MISS THE NEXT DROP →</a></div>
        <div className="ticket"><div className="ticket-label">NEXORA COMMUNITY PASS</div><div className="ticket-mark">N</div><div className="ticket-bottom"><span>PLAYER // 001</span><span>ACCESS: GRANTED</span></div></div>
      </section>

      <section id="partners">
        <div className="kicker">04 / PARTNERS</div><h2>POWERING THE<br/><span>NEXT SESSION.</span></h2>
        <div className="partner"><div><div className="partnername">NEXORA <i>×</i> DUBBY</div><p>Our official energy partner. Use the NEXORA community code at checkout and support us while saving on your order.</p><a className="textlink" href={DUBBY} target="_blank" rel="noreferrer">VISIT DUBBY ↗</a></div><div className="discount"><small>YOUR CODE</small><strong>NEXORADUBBY</strong><span>10% OFF</span></div></div>
      </section>

      <section className="finalcta">
        <img src="/nexora-logo.png" alt="NEXORA"/>
        <div className="kicker">YOU MADE IT THIS FAR.</div><h2>SO... YOU<br/><span>JOINING?</span></h2><p>Come say hi. Nox probably won't.</p><a className="btn primary jumbo" href={DISCORD} target="_blank" rel="noreferrer">ENTER NEXORA →</a>
      </section>
    </div>

    <footer className="footer"><div className="wrap footerrow"><a className="brand" href="#top"><img src="/nexora-logo.png" alt=""/><span>NEXORA</span></a><div className="socials"><a href={DISCORD} target="_blank" rel="noreferrer">DISCORD</a><a href={TIKTOK} target="_blank" rel="noreferrer">TIKTOK</a></div><div className="tiny">© 2026 NEXORA // GAMING, TOGETHER.</div></div></footer>
  </main>
}