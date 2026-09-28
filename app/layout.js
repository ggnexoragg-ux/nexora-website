import './globals.css'
import './sections.css'
import './audit-fixes.css'
import './newsletter.css'
import SiteSystems from './SiteSystems'

const SITE_URL=process.env.NEXT_PUBLIC_SITE_URL||'https://nexora-website-puce-eta.vercel.app'
const organizationJsonLd={
  '@context':'https://schema.org',
  '@type':'Organization',
  name:'NEXORA',
  url:SITE_URL,
  logo:`${SITE_URL}/nexora-logo.png`,
  description:'A global gaming community for teammates, gaming and tech news, giveaways and good times.',
  sameAs:['https://www.tiktok.com/@nex0ra.gg','https://discord.gg/3yWX2qTUZ']
}

export const metadata={metadataBase:new URL(SITE_URL),title:'NEXORA — Gaming, Together.',description:'A global gaming community for teammates, gaming and tech news, giveaways and good times.',openGraph:{title:'NEXORA — Gaming, Together.',description:'Find teammates. Stay updated. Join giveaways. Welcome to NEXORA.',url:'/',siteName:'NEXORA',images:['/nexora-logo.png'],type:'website'},twitter:{card:'summary_large_image',title:'NEXORA — Gaming, Together.',description:'A global gaming community.'},icons:{icon:'/nexora-logo.png'},manifest:'/manifest.webmanifest',themeColor:'#0b0711',alternates:{types:{'application/rss+xml':'/rss.xml'}}}

export default function RootLayout({children}){return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationJsonLd)}}/><SiteSystems/>{children}</body></html>}
