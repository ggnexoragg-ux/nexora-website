'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_ROLES = [
  { id: 'killer', label: 'Killer', emoji: '🔪', count: 2, min: 1 },
  { id: 'detective', label: 'Detective', emoji: '🕵️', count: 1, min: 0 },
  { id: 'doctor', label: 'Doctor', emoji: '🩺', count: 1, min: 0 },
  { id: 'lover', label: 'Lover', emoji: '❤️', count: 1, min: 0 },
  { id: 'kamikaze', label: 'Kamikaze', emoji: '💣', count: 1, min: 0 },
  { id: 'madness', label: 'Madness', emoji: '🌀', count: 1, min: 0 },
]

const DEMO_PLAYERS = ['Alex', 'Batz', 'Nick', 'Maria', 'Theo']

function randomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export default function PalermoClient() {
  const [screen, setScreen] = useState('home')
  const [name, setName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [joinMode, setJoinMode] = useState('player')
  const [isHost, setIsHost] = useState(false)
  const [ready, setReady] = useState(false)
  const [maxPlayers, setMaxPlayers] = useState(10)
  const [maxSpectators, setMaxSpectators] = useState(4)
  const [roles, setRoles] = useState(DEFAULT_ROLES)
  const [countdown, setCountdown] = useState(null)
  const [myRole, setMyRole] = useState(null)
  const [phase, setPhase] = useState('night')
  const [round, setRound] = useState(1)
  const [discussion, setDiscussion] = useState(180)
  const [vote, setVote] = useState('')
  const [micState, setMicState] = useState('idle')
  const [micError, setMicError] = useState('')
  const [muted, setMuted] = useState(false)
  const [killerMessage, setKillerMessage] = useState('')
  const [killerChat, setKillerChat] = useState([{ author: 'Killer 2', text: 'Who are we targeting?' }])
  const streamRef = useRef(null)

  const players = useMemo(() => {
    const self = { name: name || 'You', ready, self: true, alive: true }
    const extras = DEMO_PLAYERS.slice(0, clamp(maxPlayers - 1, 2, DEMO_PLAYERS.length)).map((n, i) => ({
      name: n,
      ready: i !== 2,
      self: false,
      alive: true
    }))
    return [self, ...extras]
  }, [name, ready, maxPlayers])

  const totalRoleSlots = roles.reduce((sum, role) => sum + role.count, 0)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (discussion <= 0 || phase !== 'day') return
    const t = setInterval(() => setDiscussion(v => Math.max(0, v - 1)), 1000)
    return () => clearInterval(t)
  }, [phase, discussion])

  function enterLobby(host) {
    if (!name.trim()) return
    setIsHost(host)
    setRoomCode(host ? randomCode() : joinCode.trim().toUpperCase())
    setScreen('lobby')
  }

  function changeRole(id, delta) {
    setRoles(current => current.map(role => role.id === id
      ? { ...role, count: clamp(role.count + delta, role.min, 4) }
      : role
    ))
  }

  function startGame() {
    if (!ready) return
    setCountdown(5)
    let value = 5
    const timer = setInterval(() => {
      value -= 1
      setCountdown(value)
      if (value <= 0) {
        clearInterval(timer)
        const pool = roles.flatMap(role => Array(role.count).fill(role))
        const citizen = { id: 'citizen', label: 'Citizen', emoji: '👤' }
        while (pool.length < players.length) pool.push(citizen)
        setMyRole(pool[Math.floor(Math.random() * pool.length)] || citizen)
        setScreen('role')
        setCountdown(null)
      }
    }, 1000)
  }

  async function requestMic() {
    setMicError('')
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicState('unsupported')
      setMicError('This browser does not support microphone access here.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      streamRef.current = stream
      setMicState('granted')
      setMuted(false)
    } catch (error) {
      setMicState('denied')
      setMicError(error?.name === 'NotAllowedError'
        ? 'Microphone permission was denied. You can enable it from your browser site settings.'
        : 'Microphone access could not be started.')
    }
  }

  function toggleMute() {
    const stream = streamRef.current
    if (!stream) return
    const next = !muted
    stream.getAudioTracks().forEach(track => { track.enabled = !next })
    setMuted(next)
  }

  function sendKillerMessage(e) {
    e.preventDefault()
    const text = killerMessage.trim()
    if (!text) return
    setKillerChat(items => [...items, { author: name || 'You', text }])
    setKillerMessage('')
  }

  function nextPhase() {
    if (phase === 'night') {
      setPhase('day')
      setDiscussion(180)
    } else {
      setPhase('vote')
    }
  }

  function finishVote() {
    setPhase('night')
    setRound(r => r + 1)
    setVote('')
  }

  const timerText = `${String(Math.floor(discussion / 60)).padStart(2, '0')}:${String(discussion % 60).padStart(2, '0')}`

  return (
    <main className="palermoShell">
      <div className="palermoNoise" />
      <header className="palermoTop">
        <a href="/" className="palermoBrand">NEXORA <span>// PALERMO</span></a>
        <div className="palermoBadge">BROWSER MVP</div>
      </header>

      {screen === 'home' && (
        <section className="palermoHero">
          <div className="palermoEyebrow">SOCIAL DEDUCTION // NO DOWNLOAD</div>
          <h1>PALERMO<br/><span>ONLINE.</span></h1>
          <p>Enter a name, create a private room or join with a code, then lie convincingly.</p>
          <div className="palermoEntry card">
            <label>DISPLAY NAME</label>
            <input value={name} onChange={e => setName(e.target.value)} maxLength={18} placeholder="e.g. Soul" />
            <div className="palermoActions">
              <button className="primary" onClick={() => enterLobby(true)} disabled={!name.trim()}>CREATE ROOM</button>
              <button onClick={() => setScreen('join')} disabled={!name.trim()}>JOIN ROOM</button>
            </div>
          </div>
          <div className="featureStrip">
            <span>NO ACCOUNT</span><span>ROOM CODES</span><span>ROLE REVEAL</span><span>VOICE READY</span><span>VOTING</span>
          </div>
        </section>
      )}

      {screen === 'join' && (
        <section className="palermoPanelWrap">
          <button className="backBtn" onClick={() => setScreen('home')}>← BACK</button>
          <div className="card joinCard">
            <div className="palermoEyebrow">JOIN PRIVATE ROOM</div>
            <h2>ENTER CODE</h2>
            <input className="codeInput" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} maxLength={8} placeholder="X7K9Q" />
            <div className="modeSwitch">
              <button className={joinMode === 'player' ? 'active' : ''} onClick={() => setJoinMode('player')}>PLAYER</button>
              <button className={joinMode === 'spectator' ? 'active' : ''} onClick={() => setJoinMode('spectator')}>SPECTATOR</button>
            </div>
            <button className="primary wide" disabled={!joinCode.trim()} onClick={() => enterLobby(false)}>JOIN {joinMode.toUpperCase()}</button>
          </div>
        </section>
      )}

      {screen === 'lobby' && (
        <section className="lobbyWrap">
          <div className="lobbyHead">
            <div>
              <div className="palermoEyebrow">PRIVATE ROOM</div>
              <h2>ROOM <span>{roomCode}</span></h2>
            </div>
            <button className="copyCode" onClick={() => navigator.clipboard?.writeText(roomCode)}>COPY CODE</button>
          </div>

          <div className="lobbyGrid">
            <div className="card playersCard">
              <div className="cardTitle"><span>PLAYERS</span><b>{players.length}/{maxPlayers}</b></div>
              <div className="playerList">
                {players.map((player, i) => (
                  <div className="playerRow" key={player.name + i}>
                    <span className="avatar">{player.name.slice(0,1).toUpperCase()}</span>
                    <strong>{player.name}{player.self ? ' (YOU)' : ''}</strong>
                    <i className={player.ready ? 'readyDot on' : 'readyDot'} />
                    <small>{player.ready ? 'READY' : 'NOT READY'}</small>
                  </div>
                ))}
              </div>
              <button className={ready ? 'readyButton active' : 'readyButton'} onClick={() => setReady(v => !v)}>
                {ready ? '✓ READY' : 'MARK READY'}
              </button>
            </div>

            <div className="card settingsCard">
              <div className="cardTitle"><span>{isHost ? 'HOST SETTINGS' : 'ROOM SETTINGS'}</span><b>{isHost ? 'HOST' : 'GUEST'}</b></div>
              <div className="settingsRow">
                <label>MAX PLAYERS <b>{maxPlayers}</b></label>
                <input disabled={!isHost} type="range" min="4" max="16" value={maxPlayers} onChange={e => setMaxPlayers(Number(e.target.value))} />
              </div>
              <div className="settingsRow">
                <label>MAX SPECTATORS <b>{maxSpectators}</b></label>
                <input disabled={!isHost} type="range" min="0" max="10" value={maxSpectators} onChange={e => setMaxSpectators(Number(e.target.value))} />
              </div>
              <div className="roleConfig">
                {roles.map(role => (
                  <div className="roleConfigRow" key={role.id}>
                    <span>{role.emoji} {role.label}</span>
                    <div>
                      <button disabled={!isHost || role.count <= role.min} onClick={() => changeRole(role.id, -1)}>−</button>
                      <b>{role.count}</b>
                      <button disabled={!isHost || role.count >= 4} onClick={() => changeRole(role.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="roleTotal">SPECIAL ROLE SLOTS <b>{totalRoleSlots}</b></div>
            </div>
          </div>

          <div className="card micCard">
            <div>
              <div className="cardTitle"><span>VOICE CHAT</span><b>{micState === 'granted' ? 'MIC READY' : 'OPTIONAL'}</b></div>
              <p>The browser will ask for microphone permission. No camera is requested.</p>
              {micError && <small className="errorText">{micError}</small>}
            </div>
            <div className="micActions">
              {micState !== 'granted'
                ? <button onClick={requestMic}>ENABLE MICROPHONE</button>
                : <button className={muted ? 'danger' : 'primary'} onClick={toggleMute}>{muted ? 'UNMUTE' : 'MUTE MIC'}</button>}
            </div>
          </div>

          <div className="lobbyFooter">
            <span>{joinMode === 'spectator' ? 'SPECTATOR MODE' : 'PLAYER MODE'} • {maxSpectators} SPECTATOR SLOTS</span>
            {isHost
              ? <button className="primary startBtn" disabled={!ready || countdown !== null} onClick={startGame}>{countdown !== null ? `STARTING IN ${countdown}` : 'START GAME'}</button>
              : <button className="primary startBtn" disabled>WAITING FOR HOST</button>}
          </div>
        </section>
      )}

      {screen === 'role' && myRole && (
        <section className="roleRevealWrap">
          <div className="roleReveal card">
            <div className="palermoEyebrow">THIS SCREEN IS PRIVATE</div>
            <div className="roleEmoji">{myRole.emoji}</div>
            <small>YOUR ROLE</small>
            <h2>{myRole.label.toUpperCase()}</h2>
            <p>{myRole.id === 'killer'
              ? 'Work with the other killer. During the night, agree on one target.'
              : myRole.id === 'detective'
              ? 'Investigate one player during the night and use the information carefully.'
              : myRole.id === 'doctor'
              ? 'Protect one player each night. You may be the difference between life and death.'
              : myRole.id === 'lover'
              ? 'Your fate is linked to another player. Choose your loyalties carefully.'
              : myRole.id === 'kamikaze'
              ? 'Your elimination can trigger a dangerous consequence.'
              : myRole.id === 'madness'
              ? 'Your win condition does not follow the ordinary rules.'
              : 'Find the killers, survive, and vote carefully.'}</p>
            <button className="primary wide" onClick={() => setScreen('game')}>I UNDERSTAND — ENTER GAME</button>
          </div>
        </section>
      )}

      {screen === 'game' && (
        <section className="gameWrap">
          <div className="gameTop">
            <div><small>ROOM {roomCode}</small><h2>ROUND {round}</h2></div>
            <div className={`phasePill ${phase}`}>{phase === 'night' ? '🌙 NIGHT' : phase === 'day' ? '☀️ DAY' : '🗳️ VOTING'}</div>
          </div>

          <div className="gameGrid">
            <div className="card phaseCard">
              {phase === 'night' && (
                <>
                  <div className="bigIcon">🌙</div>
                  <h3>THE CITY IS SLEEPING</h3>
                  <p>Special roles perform their actions. Ordinary citizens wait for morning.</p>
                  {myRole?.id === 'killer' && (
                    <div className="targetGrid">
                      {players.filter(p => !p.self).map(p => <button key={p.name}>{p.name}</button>)}
                    </div>
                  )}
                  {isHost && <button className="primary wide" onClick={nextPhase}>RESOLVE NIGHT</button>}
                </>
              )}

              {phase === 'day' && (
                <>
                  <div className="bigIcon">☀️</div>
                  <h3>DISCUSSION</h3>
                  <div className="discussionTimer">{timerText}</div>
                  <p>All living players may speak. Discuss what happened and decide who looks suspicious.</p>
                  {isHost && <button className="primary wide" onClick={nextPhase}>START VOTE</button>}
                </>
              )}

              {phase === 'vote' && (
                <>
                  <div className="bigIcon">🗳️</div>
                  <h3>CAST YOUR VOTE</h3>
                  <div className="voteList">
                    {players.filter(p => !p.self).map(p => (
                      <button className={vote === p.name ? 'selected' : ''} onClick={() => setVote(p.name)} key={p.name}>{p.name}</button>
                    ))}
                    <button className={vote === 'skip' ? 'selected' : ''} onClick={() => setVote('skip')}>SKIP VOTE</button>
                  </div>
                  <button className="primary wide" disabled={!vote} onClick={finishVote}>LOCK VOTE</button>
                </>
              )}
            </div>

            <div className="sideStack">
              <div className="card miniRole">
                <small>YOUR ROLE</small>
                <strong>{myRole?.emoji} {myRole?.label}</strong>
                <span>ALIVE</span>
              </div>

              <div className="card voiceBox">
                <div className="cardTitle"><span>VOICE</span><b>{micState === 'granted' ? (muted ? 'MUTED' : 'LIVE') : 'OFF'}</b></div>
                {micState !== 'granted'
                  ? <button onClick={requestMic}>ENABLE MIC</button>
                  : <button onClick={toggleMute}>{muted ? 'UNMUTE' : 'MUTE'}</button>}
                <p>{phase === 'night' ? 'Night rules can automatically mute public voice.' : 'Living players may speak during discussion.'}</p>
              </div>

              {myRole?.id === 'killer' && (
                <div className="card killerBox">
                  <div className="cardTitle"><span>KILLER CHAT</span><b>PRIVATE</b></div>
                  <div className="killerMessages">
                    {killerChat.map((m, i) => <p key={i}><b>{m.author}:</b> {m.text}</p>)}
                  </div>
                  <form onSubmit={sendKillerMessage}>
                    <input value={killerMessage} onChange={e => setKillerMessage(e.target.value)} placeholder="Message your teammate..." />
                    <button>SEND</button>
                  </form>
                </div>
              )}
            </div>
          </div>

          <div className="prototypeNotice">
            MVP UI is live. Cross-device room synchronization and real peer-to-peer voice are the next backend layer.
          </div>
        </section>
      )}
    </main>
  )
}
