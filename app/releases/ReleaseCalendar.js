'use client';

import { useEffect, useMemo, useState } from 'react';

const platforms = ['All', 'PC', 'PlayStation', 'Xbox', 'Nintendo'];
const monthKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
const monthDate = key => { const [year, month] = key.split('-').map(Number); return new Date(year, month - 1, 1); };
const dateLabel = value => new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));

export default function ReleaseCalendar({ compact = false }) {
  const [month, setMonth] = useState(() => monthKey(new Date()));
  const [platform, setPlatform] = useState('All');
  const [search, setSearch] = useState('');
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [truncated, setTruncated] = useState(false);
  const [retry, setRetry] = useState(0);
  const todayIndex = useMemo(() => { const now = new Date(); return now.getFullYear() * 12 + now.getMonth(); }, []);
  const monthIndex = monthDate(month).getFullYear() * 12 + monthDate(month).getMonth();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/releases?month=${month}`, { signal: controller.signal })
      .then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Release dates could not be loaded.'); return data; })
      .then(data => { setGames(data.games); setTruncated(data.truncated); setError(''); setLoading(false); })
      .catch(err => { if (err.name !== 'AbortError') { setGames([]); setError(err.message); setLoading(false); } });
    return () => controller.abort();
  }, [month, retry]);

  function changeMonth(step) {
    const next = monthDate(month);
    next.setMonth(next.getMonth() + step);
    setLoading(true);
    setMonth(monthKey(next));
  }

  const visible = games.filter(game => (platform === 'All' || game.platforms.includes(platform)) && game.name.toLowerCase().includes(search.trim().toLowerCase()));
  const displayed = compact ? visible.slice(0, 8) : visible;
  const groups = displayed.reduce((result, game) => { (result[game.date] ||= []).push(game); return result; }, {});

  return <section className="releaseCalendar" aria-label="Game release calendar">
    <div className="releaseToolbar">
      <div className="releaseMonth"><button type="button" onClick={() => changeMonth(-1)} disabled={monthIndex <= todayIndex - 1} aria-label="Previous month">‹</button><h2>{new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(monthDate(month))}</h2><button type="button" onClick={() => changeMonth(1)} disabled={monthIndex >= todayIndex + 23} aria-label="Next month">›</button></div>
      <label className="releaseSearch"><span className="srOnly">Search games</span><input type="search" placeholder="Search games" value={search} onChange={event => setSearch(event.target.value)} /></label>
    </div>
    <div className="releasePlatforms" role="group" aria-label="Filter by platform">{platforms.map(name => <button type="button" key={name} className={platform === name ? 'active' : ''} aria-pressed={platform === name} onClick={() => setPlatform(name)}>{name}</button>)}</div>
    <div className="releaseResults" aria-live="polite" aria-busy={loading}>
      {loading ? <p className="releaseMessage">Loading release dates…</p> : error ? <div className="releaseMessage"><p>{error}</p><button type="button" onClick={() => { setLoading(true); setRetry(value => value + 1); }}>Try again</button></div> : visible.length === 0 ? <p className="releaseMessage">No games found for this month and filter.</p> : Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)).map(([date, entries]) => <div className="releaseDay" key={date}><div className="releaseDate"><strong>{dateLabel(date)}</strong><span>{new Intl.DateTimeFormat('en', { weekday: 'long', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`))}</span></div><div className="releaseCards">{entries.map(game => <a className="releaseCard" key={game.id} href={game.url} target="_blank" rel="noopener noreferrer"><div className="releaseCover">{game.image ? <img src={game.image} alt="" loading="lazy" /> : <span>NXR</span>}</div><div className="releaseInfo"><h3>{game.name}</h3><p>{game.platforms.join(' · ')}</p></div><span className="releaseExternal" aria-hidden="true">↗</span></a>)}</div></div>)}
      {!loading && !error && truncated && <p className="releaseNote">Showing the first 120 listed games this month.</p>}
      {!loading && !error && compact && visible.length > displayed.length && <p className="releaseNote">Showing 8 of {visible.length} listed games. <a href="/releases">View the full month</a></p>}
    </div>
    <p className="releaseCredit">Release data and images from <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer">RAWG</a>. Dates and platform availability may change.</p>
  </section>;
}
