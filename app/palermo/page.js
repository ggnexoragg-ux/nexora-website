import PalermoClient from './PalermoClient'
import './palermo.css'

export const metadata = {
  title: 'Palermo Online — NEXORA',
  description: 'A browser-based social deduction game prototype by NEXORA.'
}

export default function PalermoPage() {
  return <PalermoClient />
}
