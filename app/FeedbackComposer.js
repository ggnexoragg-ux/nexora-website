'use client'
import {useState} from 'react'

const DISCORD='https://discord.gg/3yWX2qTUZ'
const categories=['WEBSITE','COMMUNITY','CONTENT','GIVEAWAYS','OTHER']

export default function FeedbackComposer(){
  const [category,setCategory]=useState('WEBSITE')
  const [message,setMessage]=useState('')
  const [copied,setCopied]=useState(false)
  const formatted=`NEXORA FEEDBACK // ${category}\n${message.trim()}`
  const copy=async()=>{if(!message.trim())return;try{await navigator.clipboard.writeText(formatted);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{}}
  return <div className="feedbackComposer">
    <div className="feedbackCats" role="group" aria-label="Feedback category">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'active':''}>{c}</button>)}</div>
    <label htmlFor="feedback-message">YOUR IDEA / FEEDBACK</label>
    <textarea id="feedback-message" value={message} onChange={e=>setMessage(e.target.value)} maxLength={700} placeholder="Tell us what you would change, add or improve..."/>
    <div className="feedbackMeta"><span>{message.length}/700</span><span>Nothing is sent automatically.</span></div>
    <div className="feedbackActions"><button disabled={!message.trim()} onClick={copy}>{copied?'COPIED ✓':'COPY FEEDBACK'}</button><a href={DISCORD} target="_blank" rel="noreferrer">OPEN DISCORD ↗</a></div>
    <p className="feedbackNote">Copy your formatted feedback, then paste it into the NEXORA Discord. Later we can connect this page to a real submission backend if you want.</p>
  </div>
}
