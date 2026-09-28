const SITE=process.env.NEXT_PUBLIC_SITE_URL||'https://nexora-website-puce-eta.vercel.app'

export default function ArticleJsonLd({headline,description,datePublished,path,image}){
  const data={
    '@context':'https://schema.org',
    '@type':'NewsArticle',
    headline,
    description,
    datePublished,
    dateModified:datePublished,
    mainEntityOfPage:`${SITE}${path}`,
    url:`${SITE}${path}`,
    image:image?[image]:undefined,
    author:{'@type':'Organization',name:'NEXORA',url:SITE},
    publisher:{'@type':'Organization',name:'NEXORA',url:SITE,logo:{'@type':'ImageObject',url:`${SITE}/nexora-logo.png`}}
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>
}
