import FeedbackComposer from '../FeedbackComposer'

export const metadata={title:'Feedback | NEXORA',description:'Send ideas and feedback for the NEXORA website and community.'}

export default function Feedback(){return <main className="systemPage"><nav className="hubNav"><a href="/discover">← DISCOVER</a><b>FEEDBACK // OPEN CHANNEL</b></nav><header className="systemHero"><small>NXR // FEEDBACK</small><h1>YOUR IDEA.<br/><span>OUR NEXT PATCH.</span></h1><p>Tell us what you would improve across the website, content, community or giveaways. Nothing is submitted silently — you stay in control of what you send.</p></header><FeedbackComposer/></main>}
