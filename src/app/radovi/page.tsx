import { Gallery } from '@/components/gallery';
import { ContactCTA } from '@/components/shared';
export const metadata={title:'Radovi',description:'Istražite konceptualne primjere epoksidnih i poliuretanskih podova te detalje završnih obrada.'};
export default function Works(){return <><section className="page-heading wrap"><p className="eyebrow">POVRŠINA KAO POTPIS</p><h1>MATERIJALI.<br/><span>MOGUĆNOSTI.</span></h1><div className="heading-description"><p>Inspiracija za vaš sljedeći prostor.</p><p>Galerija AI vizualizacija prikazuje primjere završnih obrada. Fotografije izvedenih radova dodat ćemo kada budu dostupne.</p></div></section><section className="wrap gallery-section" aria-label="Galerija konceptualnih završnih obrada"><Gallery/></section><ContactCTA/></>}
