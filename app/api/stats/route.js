export const dynamic='force-dynamic'
export async function GET(){let discord=null;try{const r=await fetch('https://discord.com/api/v10/invites/3yWX2qTUZ?with_counts=true',{cache:'no-store'});const j=await r.json();discord=j.approximate_member_count??null}catch{}return Response.json({discord,tiktok:null},{headers:{'Cache-Control':'no-store, max-age=0'}})}
