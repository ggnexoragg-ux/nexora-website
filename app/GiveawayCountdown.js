'use client'
import {useEffect,useState} from 'react'
const END=new Date('2026-10-08T13:30:00+03:00').getTime()
export default function GiveawayCountdown(){const[left,setLeft]=useState(Math.max(0,END-Date.now()));useEffect(()=>{const t=setInterval(()=>setLeft(Math.max(0,END-Date.now())),1000);return()=>clearInterval(t)},[]);const d=Math.floor(left/86400000),h=Math.floor(left%86400000/3600000),m=Math.floor(left%3600000/60000),s=Math.floor(left%60000/1000);return <div className="giveCountdown"><small>{left?'GIVEAWAY ENDS IN':'GIVEAWAY ENDED'}</small>{left>0&&<div><b>{String(d).padStart(2,'0')}<i>D</i></b><b>{String(h).padStart(2,'0')}<i>H</i></b><b>{String(m).padStart(2,'0')}<i>M</i></b><b>{String(s).padStart(2,'0')}<i>S</i></b></div>}</div>}
