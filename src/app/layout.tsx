import type { Metadata } from 'next';
import localFont from 'next/font/local';
const manrope=localFont({src:'./fonts/manrope.woff2',variable:'--font-manrope',display:'swap'});
import { Navigation, Footer } from '@/components/navigation';
import { MotionObserver } from '@/components/motion';
import { business } from '@/data/site';
import './globals.css';
const description='Epoxy Topalović, Vitez, BiH. Epoksidni i poliuretanski podovi, hidroizolacije te priprema i sanacija podloge. Preciznost u svakom sloju.';
export const metadata:Metadata={...(process.env.NEXT_PUBLIC_SITE_URL?{metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL)}:{}),title:{default:'EPOXY TOPALOVIĆ — Podovi koji ostavljaju dojam',template:'%s | EPOXY TOPALOVIĆ'},description,openGraph:{title:'EPOXY TOPALOVIĆ',description,locale:'bs_BA',type:'website',images:[{url:'/images/hero.webp',width:1672,height:941,alt:'Epoxy Topalović — konceptualna vizualizacija poda'}]},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bs" className={manrope.variable}><body><a className="skip-link" href="#main">Preskoči na sadržaj</a><Navigation/><main id="main">{children}</main><Footer/><MotionObserver/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'HomeAndConstructionBusiness',name:business.name,telephone:'+38763335359',email:business.email,address:{'@type':'PostalAddress',addressLocality:'Vitez',addressCountry:'BA'},areaServed:'Bosna i Hercegovina',hasOfferCatalog:{'@type':'OfferCatalog',name:'Podni sustavi i priprema podloge'}})}}/></body></html>}
