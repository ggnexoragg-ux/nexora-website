import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
export const metadata={title:'NEXORA — Gaming, Together.',description:'A global gaming community for teammates, content, giveaways and good times.'}
export default function RootLayout({children}){return <html lang="en"><body>{children}<SpeedInsights /></body></html>}
