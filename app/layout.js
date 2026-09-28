import './globals.css'
import './sections.css'
import SiteSystems from './SiteSystems'
const SITE_URL=process.env.NEXT_PUBLIC_SITE_URL||'https://nexora-website-puce-eta.vercel.app'
export const metadata={metadataBase:new URL(SITE_URL),title:{default:'NEXORA — Gaming, Together.',template:'%s | NEXORA'},description:'A global gaming community for teammates, gaming and tech news, giveaways and good times.',openGraph:{title:'NEXORA — Gaming, Together.',description:'Find teammates. Stay updated. Join giveaways. Welcome to NEXORA.',url:'/',siteName:'NEXORA',images:['/nexora-logo.png'],type:'website'},twitter:{card:'summary_large_image',title:'NEXORA — Gaming, Together.',description:'A global gaming community.'},icons:{icon:'/nexora-logo.png'},manifest:'/manifest.webmanifest',themeColor:'#0b0711'}
export default function RootLayout({children}){return <html lang="en"><body><SiteSystems/>{children}</body></html>}