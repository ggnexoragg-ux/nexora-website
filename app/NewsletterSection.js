import NewsletterSignup from './NewsletterSignup'

export default function NewsletterSection(){
  return <section id="newsletter" className="newsletterSection">
    <div className="wrap newsletterGrid">
      <div className="newsletterCopy">
        <div className="sectionLabel"><div className="sectionNum">7</div><div className="eyebrow">NEXORA // NEWSLETTER</div></div>
        <h2>DON'T MISS<br/><span>THE NEXT DROP.</span></h2>
        <p>Get the important NEXORA updates without having to chase every platform. We’ll use the newsletter for new gaming stories, giveaways, community events, server announcements and major website changes.</p>
        <div className="newsletterTags"><span>GAMING NEWS</span><span>GIVEAWAYS</span><span>EVENTS</span><span>SERVER UPDATES</span><span>WEBSITE CHANGES</span></div>
      </div>
      <div className="newsletterPanel">
        <small>NXR // INBOX ACCESS</small>
        <h3>ONE EMAIL.<br/>THE STUFF WORTH KNOWING.</h3>
        <p>Join the NEXORA update list. We’ll keep it useful, occasional and easy to leave whenever you want.</p>
        <NewsletterSignup/>
      </div>
    </div>
  </section>
}
