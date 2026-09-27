'use client'
import {useEffect} from 'react'
export default function Experience(){
 useEffect(()=>{
  const root=document.documentElement;
  const move=e=>{root.style.setProperty('--mx',e.clientX+'px');root.style.setProperty('--my',e.clientY+'px');root.style.setProperty('--px',((e.clientX/innerWidth)-.5).toFixed(3));root.style.setProperty('--py',((e.clientY/innerHeight)-.5).toFixed(3));root.style.setProperty('--cx',e.clientX+'px');root.style.setProperty('--cy',e.clientY+'px')};
  const els=[...document.querySelectorAll('section,.pillar,.newsCard,.show,.giveawayCard,.partnerHero,.end')]; els.forEach(el=>el.classList.add('reveal')); const cards=[...document.querySelectorAll('.pillar,.newsCard,.show,.giveawayCard')]; const tilt=e=>{const el=e.currentTarget,r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--rx',(-y*3).toFixed(2)+'deg');el.style.setProperty('--ry',(x*4).toFixed(2)+'deg')}; const untilt=e=>{e.currentTarget.style.removeProperty('--rx');e.currentTarget.style.removeProperty('--ry')}; cards.forEach(el=>{el.addEventListener('pointermove',tilt);el.addEventListener('pointerleave',untilt)});
  const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('revealVisible');io.unobserve(x.target)}}),{threshold:.1,rootMargin:'0px 0px -6%'});els.forEach(el=>io.observe(el));
  const scroll=()=>{const p=Math.min(1,scrollY/(document.documentElement.scrollHeight-innerHeight||1));root.style.setProperty('--progress',p);root.style.setProperty('--sy',scrollY+'px');root.style.setProperty('--scrollShift',(p*100).toFixed(2)+'%')};
  addEventListener('pointermove',move,{passive:true});addEventListener('scroll',scroll,{passive:true});scroll();
  return()=>{removeEventListener('pointermove',move);removeEventListener('scroll',scroll);io.disconnect();cards.forEach(el=>{el.removeEventListener('pointermove',tilt);el.removeEventListener('pointerleave',untilt)})}
 },[]);return <><div className="bgExperience" aria-hidden="true"><i/><i/><i/><b/><span/></div><div className="scrollProgress" aria-hidden="true"/></>;
}