import ReleaseCalendar from './ReleaseCalendar';
import './releases.css';

export const metadata = {
  title: 'Game Release Calendar | NEXORA',
  description: 'Explore upcoming PC, PlayStation, Xbox and Nintendo game release dates, refreshed automatically.',
};

export default function Releases() {
  return <main className="systemPage releasePage">
    <nav className="hubNav"><a href="/discover">← DISCOVER</a><b>RELEASES // CALENDAR</b></nav>
    <header className="systemHero"><small>NXR // RELEASES</small><h1>WHAT'S<br/><span>DROPPING NEXT.</span></h1><p>Explore upcoming games by month and platform. Dates can change, so check the game's listing before making plans.</p></header>
    <ReleaseCalendar />
  </main>;
}
