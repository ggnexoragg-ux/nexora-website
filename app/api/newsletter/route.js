import {NextResponse} from 'next/server'

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request){
  try{
    const {email}=await request.json()
    const normalized=String(email||'').trim().toLowerCase()
    if(!emailPattern.test(normalized))return NextResponse.json({error:'Enter a valid email address.'},{status:400})

    const apiKey=process.env.RESEND_API_KEY
    if(!apiKey)return NextResponse.json({error:'Newsletter signup is being activated. No email was stored — please try again shortly.'},{status:503})

    const response=await fetch('https://api.resend.com/contacts',{
      method:'POST',
      headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
      body:JSON.stringify({email:normalized,unsubscribed:false}),
      cache:'no-store'
    })

    if(response.ok)return NextResponse.json({ok:true})

    const data=await response.json().catch(()=>({}))
    const text=JSON.stringify(data).toLowerCase()
    if(response.status===409||text.includes('already')||text.includes('exist'))return NextResponse.json({ok:true})

    console.error('Newsletter signup failed',response.status,data)
    return NextResponse.json({error:'Could not subscribe right now. Please try again later.'},{status:502})
  }catch(error){
    console.error('Newsletter route error',error)
    return NextResponse.json({error:'Could not subscribe right now. Please try again later.'},{status:500})
  }
}
