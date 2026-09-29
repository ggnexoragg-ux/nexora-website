'use client';

import { useEffect, useMemo, useState } from 'react';
import './live-news.css';

const categories = ['ALL', 'GAMING', 'TECH'];
const dateLabel = value => new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));

export default function LiveNewsFeed({ compact = false }) {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/live-news', { signal: controller.signal })
      .then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Headlines unavailable.'); return data; })
      .then(data => { setArticles(data.articles); setLoading(false); setError(''); })
      .catch(err => { if (err.name !== 'AbortError') { setLoading(false); setError('Headlines are temporarily unavailable.'); } });
    return () => controller.abort();
  }, [retry]);
  const filtered = useMemo(() => category === 'ALL' ? articles : articles.filter(article => article.category === category), [articles, category]);
  const balanced = category === 'ALL' && compact ? [...filtered.filter(article => article.category === 'GAMING').slice(0, 4), ...filtered.filter(article => article.category === 'TECH').slice(0, 4)].sort((a, b) => b.date.localeCompare(a.date)) : filtered;
  const visible = compact ? balanced.slice(0, 8) : balanced;
  return <div className="liveNews" aria-live="polite">
    <div className="liveNewsBar"><div role="group" aria-label="Filter external headlines">{categories.map(name => <button type="button" key={name} aria-pressed={category === name} className={category === name ? 'active' : ''} onClick={() => setCategory(name)}>{name === 'ALL' ? 'ALL STORIES' : name}</button>)}</div><span>REFRESHES AUTOMATICALLY</span></div>
    {loading ? <p className="liveNewsMessage">Loading the latest headlines…</p> : error ? <div className="liveNewsMessage">{error} <button type="button" onClick={() => { setLoading(true); setRetry(value => value + 1); }}>Try again</button></div> : visible.length ? <div className="liveNewsGrid">{visible.map(article => <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer" className="liveNewsCard"><div className="liveNewsMeta"><span>{article.category}</span><time dateTime={article.date}>{dateLabel(article.date)}</time></div><h3>{article.title}</h3><div className="liveNewsFoot"><span>{article.source}</span><b>READ AT SOURCE ↗</b></div></a>)}</div> : <p className="liveNewsMessage">No headlines in this category right now.</p>}
    <p className="liveNewsAttribution">Headlines link to their original publishers. NEXORA does not publish these articles.</p>
  </div>;
}
