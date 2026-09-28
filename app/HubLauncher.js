'use client'
import {useState} from 'react'

const links=[
  ['/discover','DISCOVER'],
  ['/releases','RELEASES'],
  ['/events','EVENTS'],
  ['/creators','CREATORS'],
  ['/feedback','FEEDBACK'],
  ['/roadmap','ROADMAP'],
  ['/achievements','ACHIEVEMENTS']
]

export default function HubLauncher(){
  const [open,setOpen]=useState(false)
  return <div className={`hubLauncher ${open?'isOpen':''}`}>
    <button className="hubLauncherToggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="nexora-discover-menu">
      <span>NXR // DISCOVER</span><b>{open?'×':'+'}</b>
    </button>
    <div className="hubLauncherMenu" id="nexora-discover-menu" aria-hidden={!open}>
      <small>EXPLORE NEXORA</small>
      {links.map(([href,label],i)=><a href={href} key={href}><b>{String(i+1).padStart(2,'0')}</b><span>{label}</span><i>↗</i></a>)}
    </div>
  </div>
}
