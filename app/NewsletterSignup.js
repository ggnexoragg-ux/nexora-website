'use client'
import {useState} from 'react'

export default function NewsletterSignup(){
  const [email,setEmail]=useState('')
  const [status,setStatus]=useState('idle')
  const [message,setMessage]=useState('')

  const submit=async(e)=>{
    e.preventDefault()
    if(!email.trim())return
    setStatus('loading');setMessage('')
    try{
      const res=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email.trim()})})
      const data=await res.json().catch(()=>({}))
      if(!res.ok)throw new Error(data?.error||'Could not subscribe right now.')
      setStatus('success');setMessage('YOU’RE IN // WATCH YOUR INBOX FOR NEXORA UPDATES.');setEmail('')
    }catch(err){
      setStatus('error');setMessage(err.message||'Could not subscribe right now.')
    }
  }

  return <form className="newsletterForm" onSubmit={submit} noValidate>
    <label htmlFor="newsletter-email">EMAIL ADDRESS</label>
    <div className="newsletterInputRow">
      <input id="newsletter-email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required aria-describedby="newsletter-note"/>
      <button type="submit" disabled={status==='loading'||!email.trim()}>{status==='loading'?'CONNECTING...':'JOIN THE NEWSLETTER →'}</button>
    </div>
    <p id="newsletter-note">Gaming news, giveaways, events, server updates and website changes. No spam. Unsubscribe whenever you want.</p>
    {message&&<div className={`newsletterMessage ${status==='success'?'ok':'err'}`} role="status">{message}</div>}
  </form>
}
