'use client'
import {useEffect} from 'react'
export default function Experience(){
 useEffect(()=>{
  const root=document.documentElement;
  const move=e=>{root.style.setProperty('--mx',e.clientX+'px');root.style.setProperty('--my',e.clientY+'px');root.style.setProperty('--px',((e.clientX/innerWidth)-.5).toFixed(3));root.style.setProperty('--py',((e.clientY/innerHeight)-.5).toFixed(3))};
  const els=[...document.querySelectorAll('section,.pillar,.newsCard,.show,.giveawayCard,.partnerHero,.end')]; els.forEach(el=>el.classList.add('reveal'));
  const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('revealVisible');io.unobserve(x.target)}}),{threshold:.1,rootMargin:'0px 0px -6%'});els.forEach(el=>io.observe(el));
  const scroll=()=>root.style.setProperty('--progress',Math.min(1,scrollY/(document.documentElement.scrollHeight-innerHeight||1)));
  addEventListener('pointermove',move,{passive:true});addEventListener('scroll',scroll,{passive:true});scroll();
  return()=>{removeEventListener('pointermove',move);removeEventListener('scroll',scroll);io.disconnect()}
 },[]);return <div className="scrollProgress" aria-hidden="true"/>;
}