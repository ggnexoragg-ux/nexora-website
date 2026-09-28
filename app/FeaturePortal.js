export default function FeaturePortal(){
  return <a
    href="/discover"
    aria-label="Explore NEXORA's new sections"
    style={{
      position:'fixed',
      right:'18px',
      bottom:'18px',
      zIndex:9998,
      display:'inline-flex',
      alignItems:'center',
      gap:'10px',
      padding:'12px 16px',
      border:'1px solid rgba(255,255,255,.18)',
      borderRadius:'999px',
      background:'rgba(11,7,17,.88)',
      backdropFilter:'blur(14px)',
      WebkitBackdropFilter:'blur(14px)',
      color:'#fff',
      fontSize:'12px',
      fontWeight:800,
      letterSpacing:'.12em',
      textDecoration:'none',
      boxShadow:'0 12px 40px rgba(0,0,0,.35)'
    }}
  >
    <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#a855f7',boxShadow:'0 0 16px #a855f7'}}/>
    EXPLORE NEXORA
    <span aria-hidden="true">→</span>
  </a>
}
