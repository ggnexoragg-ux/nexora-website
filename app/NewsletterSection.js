export default function NewsletterSection(){
  return <section id="newsletter" className="newsletterSection">
    <div className="wrap newsletterGrid">
      <div className="newsletterCopy">
        <div className="sectionLabel"><div className="sectionNum">7</div><div className="eyebrow">NEXORA // NEWSLETTER</div></div>
        <h2>DON'T MISS<br/><span>THE NEXT DROP.</span></h2>
        <p>We’re building a NEXORA newsletter for gaming stories, giveaways, community events, server announcements and major website updates.</p>
        <div className="newsletterTags"><span>GAMING NEWS</span><span>GIVEAWAYS</span><span>EVENTS</span><span>SERVER UPDATES</span><span>WEBSITE CHANGES</span></div>
      </div>
      <div className="newsletterPanel">
        <small>NXR // INBOX ACCESS</small>
        <h3>COMING SOON.</h3>
        <p>The NEXORA newsletter isn’t accepting signups yet. We’ll open it once our email system is fully ready.</p>
        <div className="newsletterStatus" role="status" aria-live="polite">NEWSLETTER SIGNUPS // COMING SOON</div>
      </div>
    </div>
  </section>
}
