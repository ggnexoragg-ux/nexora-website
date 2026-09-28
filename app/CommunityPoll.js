'use client'
import {useEffect,useState} from 'react'

const options=['COMPETITIVE MULTIPLAYER','CO-OP WITH FRIENDS','SINGLE-PLAYER STORY','SANDBOX / SURVIVAL']

export default function CommunityPoll(){
  const [vote,setVote]=useState('')
  useEffect(()=>{try{setVote(localStorage.getItem('nxr-poll-playstyle')||'')}catch{}},[])
  const choose=(option)=>{setVote(option);try{localStorage.setItem('nxr-poll-playstyle',option)}catch{}}
  return <section className="hubPoll" aria-labelledby="community-poll-title">
    <div className="hubSectionHead"><small>NXR // COMMUNITY PULSE</small><h2 id="community-poll-title">WHAT DO YOU PLAY<br/><span>MOST?</span></h2><p>A tiny community check-in. Your choice is stored only on this device for now — no account, tracking profile or fake global numbers.</p></div>
    <div className="hubPollOptions">{options.map((option,i)=><button key={option} className={vote===option?'selected':''} onClick={()=>choose(option)}><b>0{i+1}</b><span>{option}</span><i>{vote===option?'✓':'→'}</i></button>)}</div>
    {vote&&<div className="hubPollSaved">VOTE SAVED // {vote}</div>}
  </section>
}
