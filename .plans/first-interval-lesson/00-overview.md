# Ensimmäinen intervallioppitunti — toteutussuunnitelma

> **Tila:** Ehdotus, ei hyväksytty toteutukseksi
> **Omistaja:** Ei vielä määritelty
> **Päivitetty:** 2026-10-08

## Tavoite ja käyttäjän ongelma

Ensimmäinen oppitunti johdattaa musiikkiteoriaa aloittelevan oppijan intervallien tutkimiseen kuuntelemalla ja kokeilemalla. Käyttäjän pitää ymmärtää intervalli äänten välisenä suhteena, ei irrallisena ulkoa opeteltavana nimenä. Oppitunti vastaa myös kysymykseen ”mitä sitten?”: miten sama suhde auttaa hahmottamaan melodiaa ja myöhemmin rakentamaan sointuja, ja mitä äänen taajuussuhde tarkoittaa.

Oppimissilmukka on **kuule → tee → huomaa → nimeä → sovella**. Oppija saa ensin kuulla ja muuttaa ääniä, huomata niiden välisen eron ja vasta sen jälkeen liittää havaintoon intervallin nimen. Nimi tai kuulotesti ei saa olla oppitunnin ennakkoehto.

Oppitunnin jälkeen oppija osaa:

- kuvata intervallin kahden sävelkorkeuden suhteena;
- erottaa saman sävelluokan ja oktaavirekisterin toisistaan;
- tutkia priimiä, oktaavia ja puhdasta kvinttiä kuulemalla ja kellotaululla;
- siirtää aloitussäveltä ja huomata, että valittu intervallisuhde säilyy;
- nimetä, mihin intervallien tunnistaminen voi auttaa melodiaa hahmotettaessa, ja nähdä terssin myöhempänä siltana sointuihin;
- halutessaan avata myöhemmin tarjottavan, erillisen selityksen puolisävelaskelista ja taajuussuhteista.

## Laajuus ja rajaukset

### Ensimmäiseen prototyyppiin ehdotetaan

- Yksi ohjattu, etenemiseltään selkeä oppitunti, joka alkaa kuuntelusta ja kokeilusta.
- Priimin (sama äänenkorkeus), oktaavin ja puhtaan kvintin tutkiminen. Oppitunti käsittelee ensimmäisessä versiossa ylöspäin suuntautuvia suhteita; alaspäiset intervallit voidaan lisätä myöhemmin.
- 12-sävelisen tasavireisen kellotaulun kaltainen SVG-visualisointi, joka näyttää sävelluokan/askelmäärän mutta erottaa äänen oktaavirekisterin käyttöliittymässä.
- Selaimessa tuotetut sävelet, aloittaminen vain käyttäjän eleestä, sekä toisto-, pysäytys- ja uudelleenkuuntelukontrollit.
- Transponointikokeilu: aloitussäveltä vaihdetaan, mutta valittu intervalliaskelten suhde säilyy.
- Myöhemmän vaiheen sisältöehdotus: pieni ja suuri terssi, kvartti ja muut intervallit. Terssin yhteys duurin/mollin kaltaisiin kolmikkoihin esitellään vasta intervallihavainnon jälkeen; sointujen teoria ei kuulu ensimmäiseen oppituntiin.
- Erillinen valinnainen matematiikkakerros vasta kokemuksellisen opetuksen jälkeen.

### Ei kuulu ensimmäiseen prototyyppiin

- Sointuasteet, kvinttiympyrä tai rytmiharjoitukset.
- Käyttäjätilit, palvelin/backend, verkko-API, tietokantatallennus tai oppimistulosten pysyvä tallennus.
- Ulkoiset äänitiedostot tai äänikirjastopaketti oletusratkaisuna.
- Pakolliset kuunteluun perustuvat kokeet ennen opettavaa tutkimisvaihetta.
- Kattava diatonisen kirjoitusasun, enharmonisten sävelten tai muiden viritysjärjestelmien opetus ensimmäisellä oppitunnilla.

## Nykyinen repositorio

Suunnitelma perustuu `origin/main`-haaran tarkistettuun sisältöön commitissa `e8e9a47` (PR #2:n yhdistämisen jälkeen). Nykyisessä repossa ei ole sovelluskoodia, React-/TypeScript-riippuvuuksia, frontend-scaffoldia, `package.json`- tai muuta pakettimanifestia, `Taskfile.yml`-tiedostoa eikä testirunneria. Myöskään intervalleihin, ääneen tai käyttöliittymään liittyviä komponentteja ei ole. Tässä PR:ssä ei luoda niitä.

Nykyiset, toteutuksen suunnittelua rajaavat käytännöt:

- [Projektin ohjeet](../../.agents/AGENTS.md) määrittävät selainlähtöisen projektin lähtökohdan ja React 19.2 / React Compiler -käytännöt.
- [Ominaisuuden suunnittelutyönkulku](../../.agents/workflows/plan_feature.md) vaatii toteutussuunnitelman esittelyn ja hyväksynnän ennen sovelluskoodin muuttamista.
- [Git/PR-työnkulku](../../.agents/workflows/git_pr_workflow/git_pr_workflow.md) edellyttää olemassa olevien tarkistuskomentojen käyttöä eikä oleta Taskfilea tai testejä.
- [Teknisen suunnitelman malli](../../pr_stories/templates/TECHNICAL_DESIGN.template.md) kattaa nykytilan, kompromissit, React-käytännöt, varmennuksen ja riskit.
- [Markdown-integriteetin tarkistin](../../.github/scripts/check_markdown.py) tarkistaa Markdown-tiedostojen etuosan (front matter) delimitoinnin ja paikallisten linkkien kohteet. [CI](../../.github/workflows/ci.yml) ajaa sen komennolla `python3 .github/scripts/check_markdown.py`.
- Repossa on PR Storyn malli, mutta ei aiempia numeroituja tarinoita. PR #1 ja #2 käyttävät samoja historiassa nähtyjä haaroja; nykyisissä tarinoissa ei ole numerointia, joten tämän PR:n `001` ei törmää aiempaan tarinaan.

## Opetussisällön vaiheistus

| Vaihe | Oppijan toiminta ja huomio | Sisältö / palaute |
|---|---|---|
| 1. Kuule ja kokeile | Kuuntelee aloitussävelen ja toistaa sen; sen jälkeen valitsee saman sävelen, oktaavin tai muun kohdesävelen. | Toisto- ja pysäytyskontrollit ovat aina saatavilla. Ääntä ei käynnistetä näkymän latautuessa. |
| 2. Huomaa suhde | Siirtää kohdetta kellotaululla askel kerrallaan ja kuuntelee aloitus- ja kohdeääntä yhdessä. | Näyttö kertoo muutoksen askelina ja rekisterinä, ei vaadi nimeä. |
| 3. Nimeä tutut tapaukset | Tutkii priimin, oktaavin ja kvintin kokemuksellisen esimerkin jälkeen. | Priimi = sama äänenkorkeus; oktaavi = sama sävelluokka eri rekisterissä; puhdas kvintti = tässä ylöspäin seitsemän puolisävelaskelta. |
| 4. Sovella melodian hahmottamiseen | Siirtää aloitussäveltä ja toistaa saman intervallin uudesta kohdasta. | Aloitus- ja kohdesävel vaihtuvat, mutta suhteellinen askelmäärä säilyy. Tämä havainnollistaa intervallia melodian suhteena, ei kiinteänä sävelparina. |
| 5. Kurkista jatkoon | Saa nähdä, että pieni/suuri terssi ja kvartti tutkitaan myöhemmin. | Terssi johtaa myöhemmin sointujen rakentamisen yhteyteen; sitä ei vaadita nyt. |
| 6. Avaa halutessaan ”Miksi näin?” | Vasta kokeilemisen jälkeen avaa matematiikkaselityksen. | Selittää tasavireisen askeljaon ja taajuussuhteen ilman väitettä, että kaikki musiikki noudattaisi yhtä viritystä. |

Oppimissilmukka näkyy tässä järjestyksessä; soveltaminen palauttaa oppijan uuteen kuunteluun:

```mermaid
flowchart LR
  Hear["Kuule"] --> Do["Tee"] --> Notice["Huomaa"] --> Name["Nimeä"] --> Apply["Sovella"] --> Hear
```

## Kellotaulu ja ääni

### Ehdotettu käyttöliittymä

- SVG-kellotaulu esittää 12 sävelluokan kehää. Aloitusääni merkitään ankkuriksi, ja kohdesävel näytetään suhteellisen askelmäärän kohdalla. Ylös suuntautuvassa esimerkissä eteenpäin siirtyminen osoitetaan myötäpäivään; näkyvä teksti kertoo aina askelten suunnan, joten suunta ei jää pelkän visuaalisen oletuksen varaan.
- Kellotaulu näyttää sävelluokan/puolisävelaskelten määrän, ei taajuutta eikä oktaavirekisteriä. Rekisteri/äänenkorkeus näytetään erillisellä tekstillä ja natiiveilla kontrollilla, esimerkiksi ”A4 → A5, +12 puolisävelaskelta”. Näin priimi ja oktaavi eivät sekoitu kehällä.
- Kaikki olennaiset tehtävät onnistuvat natiiveilla näppäimistö- ja ruudunlukijakäyttöisillä painikkeilla tai valitsimilla: askel alas/ylös, oktaavi alas/ylös, aloitussävelen valinta sekä intervallin kuuntelu. Kellotaulun vetäminen ei ole koskaan ainoa käyttötapa.
- SVG:n jokaisella toiminnallisella kohteella on selkeä saavutettava nimi ja semanttinen rooli; kohdistusjärjestys on looginen, fokuksen ilmaisin näkyvä ja kontrasti riittävä. Kellotaulu ei ole ainoa tapa lukea sijaintia, askelmäärää tai rekisteriä.
- Äänen kuuntelussa on **Toista**, **Pysäytä** ja **Kuuntele uudelleen**. Aloitusäänen ja intervalliparin voi kuunnella erikseen. Oppimistehtävässä ei ole vain-kuunteluun perustuvaa pakollista vastaamista ennen kuin sisältö on opetettu.

### Äänen tuotto

Ehdotetaan selaimen Web Audio APIa ilman ulkoisia äänitiedostoja. Käyttäjän käynnistämä tapahtumankäsittelijä luo tai jatkaa `AudioContext`-kontekstin; renderöinti ei tuota ääntä eikä käynnistä kontekstia automaattisesti. Yksinkertainen oskillaattori ja gain-vaippa riittävät prototyypin selkeisiin säveliin. Toisto voidaan mallintaa lyhyinä, hallitusti vaimennettuina ääni-instantseina; pysäytyksen on hiljennettävä ja siivottava aktiiviset oskillaattorit. Tarkka aaltomuoto, sävelten kesto ja aloitusreferenssi (ehdotus: A4 = 440 Hz) vahvistetaan scaffoldin ja kuunteluarvion yhteydessä.

Selain voi estää äänen ennen käyttäjän elettä. Tätä ei ohiteta automaattisella toistolla: ohjeistetaan käyttäjää aloittamaan ääni kontrollista ja näytetään ymmärrettävä virhe/palaute, jos selain tai laite ei pysty toistamaan ääntä. Soittimen imperatiivinen elinkaari pidetään erillään Reactin renderöinnistä.

## Matematiikka ja musiikillinen tarkkuus

12-tasavireisessä mallissa, kun intervallin nousu on `n` puolisävelaskelta, taajuuksien suhde on

`f_kohde / f_aloitus = 2^(n/12)`.

Siksi 12 puolisävelaskelta on oktaavi ja suhde tasan `2:1`. Seitsemän puolisävelaskelta antaa `2^(7/12) ≈ 1.4983`; puhtaan kvintin yksinkertainen luonnollisten osasävelten suhde on `3:2 = 1.5`. Ero on pieni mutta todellinen. Tasavireisyys jakaa oktaavin yhtä suuriin puolisävelaskeliin, jotta sävelillä voi soittaa eri sävellajeissa samalla virityksellä. Se on historiallisesti ja soitannollisesti hyödyllinen kompromissi, ei ainoa olemassa oleva musiikkijärjestelmä eikä luonnonvastainen järjestelmä. Muiden viritysten suhteet voivat poiketa.

Kellotaulun **pitch-class** kuvaa sävelen paikkaa 12-askeleisessa kierrossa; se ei yksin ilmaise oktaavirekisteriä eikä taajuutta. `0` askelta samalla rekisterillä on priimi/sama sävel, mutta `12` askelta ylempänä on oktaavi, vaikka molemmissa sävelluokka on sama. Taajuussuhde tulee erikseen mallista ja rekisteristä.

Pelkkä kromattinen askelmäärä ei aina ratkaise diatonista kirjoitusasua: esimerkiksi sama tasavireinen etäisyys voidaan nuotintaa eri kirjaimilla ja etumerkeillä. Ensimmäisessä versiossa oppitunti rajataan selvästi nimettyihin ylöspäisiin esimerkkeihin ja näyttää tarvittaessa askelmäärän itsenäisenä faktana; käyttöliittymä ei väitä johtavansa oikeaa diatonista kirjoitusasua askelmäärästä yksin. Mahdollinen tarkempi nuotinkirjoitus vaatii sävelnimet, kirjaimet ja etumerkit erikseen.

Intervalleja ei kuvata muuttumattomina tunnevaikutuksina tai tehtävärooleina. Oppitunti voi kertoa, että intervallit ovat melodian ja sointujen rakennuspalikoita, mutta niiden merkitys riippuu musiikillisesta kontekstista eikä yhtä tunnetta pidä opettaa universaalina sääntönä.

## Ehdotettu tekninen rakenne — vain scaffoldin hyväksymisen jälkeen

Teknologiavalinnan lähtökohta on React 19.2, TypeScript ja React Compiler, koska ne ovat projektin ohjeissa määritelty frontend-linja, eivät nykyisessä sovelluksessa jo käytössä oleva pino. Repossa ei ole build- tai pakettityökalua; Vite on ehdotus React-/TypeScript-scaffoldin kehitys- ja build-työkaluksi, ei nykytilan fakta eikä tässä PR:ssä asennettava riippuvuus. Tarkka package manager, Compiler-integraatio ja CSS-järjestely päätetään ennen sovelluskoodin lisäämistä. Backendia, tallennusta tai ulkoista äänipakettia ei tarvita.

Vasta erikseen hyväksytyn scaffoldin jälkeen voidaan lisätä esimerkiksi seuraavan vastuunjaon moduulit; nämä ovat suunnittelunimiä, eivät olemassa olevia tiedostoja:

- `src/features/interval-lesson/IntervalLesson.tsx` — oppitunnin eteneminen ja johdettu näkymätila.
- `src/features/interval-lesson/IntervalClock.tsx` — SVG-kellotaulu ja sen tekstivastineet.
- `src/features/interval-lesson/AudioControls.tsx` — toisto-, pysäytys- ja uudelleenkuuntelukäyttöliittymä.
- `src/lib/music/intervals.ts` — puhtaat, testattavat puolisävelaskel- ja taajuussuhdefunktiot.
- `src/lib/audio/interval-player.ts` — Web Audio APIa kapseloiva soitin ja elinkaaren siivous.
- Oppitunnin sisältö pidetään datana (esim. erillisessä lesson content -moduulissa), jotta järjestystä ja nimiä voi tarkistaa sekoittamatta niitä soitinlogiikkaan.

React 19.2 / Compiler -käytännöt:

- Johda näytettävä pitch-class, askelmäärä, aktiivinen esimerkki ja tekstit nykyisestä tilasta renderöinnissä; älä tallenna johdettuja arvoja rinnakkaiseksi tilaksi.
- Älä käytä effectiä React-tilan, propien tai selaintilan peilaamiseen. Käyttäjätoiminnot ohjaavat äänen käynnistystä; ulkoisen Web Audio -soittimen alustus ja vapautus voidaan kapseloida imperatiiviseen rajapintaan, jossa siivous on symmetrinen.
- `useSyncExternalStore` otetaan mukaan vain, jos Reactin pitää tilata selaimen ulkoista muuttuvaa tilaa, kuten yhteistä ääni-/laitetilaa; tavalliseen paikalliseen oppituntitilaan sitä ei lisätä.
- React Actions / `useActionState` eivät ole oletuksena tarpeen, koska ensimmäisessä oppitunnissa ei ole asynkronista lomaketta tai palvelinpohjaista lähetystä.
- Annetaan React Compilerin hoitaa normaali memoisaatio. Käsin tehtävä memoisaatio lisätään vain todellisen API-identiteettivaatimuksen tai mitatun tarpeen perusteella.

## Toteutusjärjestys hyväksynnän jälkeen

1. **Hyväksy suunnitelma ja scaffold-päätökset.** Vahvista React-/TypeScript-runko, Vite-ehdotus, package manager, Compiler-asetus, tyyliratkaisu, tukiselaimet ja sävelreferenssi. Älä yhdistä tätä suunnittelu-PR:ää sovelluskoodiksi.
2. **Luo minimi-scaffold.** Lisää hyväksytyt riippuvuudet ja projektin komennot sekä varmista, että tyhjä selainkäyttöliittymä käynnistyy.
3. **Mallinna intervallit.** Lisää puhtaat askelmäärä-, pitch-class-, oktaavi- ja tasavireisen taajuussuhteen apurit sekä näkyvä, rajattu nimeämissääntö.
4. **Rakenna saavutettava kellotaulu ja kontrollit.** Lisää SVG:n rinnalle näppäimistökäyttöiset semanttiset säätimet ja tekstimuotoinen askel-/rekisteritieto.
5. **Lisää ääni ja sen elinkaari.** Toteuta käyttäjän eleestä alkava Web Audio -toisto, pysäytys, uudelleenkuuntelu sekä estettyä toistoa koskeva palaute.
6. **Lisää oppitunnin sisältö.** Toteuta kuule–tee–huomaa–nimeä–sovella-järjestys ja kolme ensimmäistä intervalliesimerkkiä; testaa transponointi oppitunnin läpikulussa.
7. **Varmenna ja tarkista.** Lisää puhtaiden musiikkifunktioiden yksikkötestit valitulla testirunnerilla sekä tarvittavat komponenttitestit. Tee manuaalisesti näppäimistö-, focus-, ääni-, kapea viewport- ja saavutettavuuspuun tarkistukset.

## Esimerkkiharjoituksen läpikäynti

1. Oppija painaa **Kuuntele aloitussävel** ja kuulee esimerkiksi A4:n; ääni syntyy vasta painalluksesta.
2. Oppija valitsee saman sävelluokan samalla rekisterillä. Näyttö kertoo `0 puolisävelaskelta`; oppija kuulee toiston ja nimeää tämän kokemuksen jälkeen priimiksi.
3. Oppija nostaa saman sävelluokan oktaavia ylemmäs. Teksti näyttää `A4 → A5, +12 puolisävelaskelta`; kellotaulun piste on samassa sävelluokassa, mutta rekisteri on muuttunut. Hän kuulee 2:1-suhteisen oktaavin.
4. Oppija kokeilee seitsemää askelta ylemmäs, kuuntelee A4–E5-parin ja näkee askelmäärän ennen kuin käyttöliittymä nimeää esimerkin puhtaaksi kvintiksi.
5. Oppija vaihtaa lähtöäänen esimerkiksi C5:een ja toistaa seitsemän askeleen valinnan. Uusi sävelpari näyttää, että kvinttisuhde ei ollut sidottu aiempaan sävelpariin.
6. Oppija näkee tekstin ”Seuraavaksi: terssi ja soinnun rakentuminen” sekä voi avata matematiikkaselityksen vasta kun sitä tarvitsee. Harjoitus ei vaadi tunnistamaan ääntä ilman visuaalista tai sanallista tukea.

## Vaihtoehdot, riskit ja kompromissit

| Kysymys | Vaihtoehto | Suositus ja peruste |
|---|---|---|
| Build-työkalu puuttuu | Valita myöhemmin muu hyväksytty React-työkalu tai aloittaa Vite-pohjalla. | Ehdota Viteä React-/TypeScript-prototyypille, mutta päätä valinta scaffoldin hyväksynnässä. Tämä PR ei luo scaffoldia. |
| Äänen lähde | Web Audio -oskillaattorit tai ulkoiset äänitiedostot/kirjasto. | Web Audio ilman äänipakettia minimoi riippuvuudet ja mahdollistaa taajuuksien säätämisen; äänenlaatu ja selainrajoitteet on silti kokeiltava. |
| Intervallien nimet | Päätellä nimi askelmäärästä tai rajata ensimmäiset nimet kuratoituihin esimerkkeihin. | Rajaa ylöspäisiin, nimettyihin esimerkkeihin ja näytä askelmäärä erikseen; älä väitä kromattisen etäisyyden yksin ratkaisevan nuotinkirjoitusta. |
| Matematiikka | Aloittaa taajuusluvuista tai tarjota selitys kokemuksen jälkeen. | Aloita kuulemisesta ja kokeilusta; pidä matematiikka valinnaisena, jotta käsitteellinen suhde ei peity kaavaan. |

Keskeisiä riskejä ovat autoplay-rajoitteet ja laite-erot äänessä, priimin ja oktaavin sekoittuminen sävelluokkakellotaululla, virheellinen intervallin kirjoitusasu, liiallinen kognitiivinen kuorma sekä saavutettavuuden jääminen visuaalisen interaktion varaan. Niitä lievennetään käyttäjän aloittamalla toistolla, erillisellä rekisteritiedolla, näkyvällä nimeämissäännöllä, asteittaisella sisällöllä ja natiiveilla kontrolleilla. Tunne- tai roolimerkityksiä ei yleistetä yksittäisen intervallin ominaisuudeksi.

## Varmennus ja avoimet päätökset

Tässä PR:ssä on vain suunnitteludokumentaatio ja sen PR Story; sovelluskoodia ei ole eikä sovellustestejä voi ajaa. Nykyinen repo tarjoaa Markdown-tarkistimen, jota käytetään dokumentaatio-PR:n validointiin. Testirunneria tai testikomentoa ei nimetä ennen kuin scaffold ja testityökalu on valittu.

Toteutusvaiheen automatisoidut tarkistukset täsmennetään scaffoldin jälkeen. Niihin ehdotetaan puhtaiden interval/frequency-apurien testejä: 0/12/7 puolisävelaskeleen rajatapaukset, 12-tasavireen taajuussuhteet, pitch-classin kierto sekä lähtösävelen transponointi. Soveltuvat komponentti- tai integraatiotestit päätetään käytettävissä olevan testipinon perusteella.

Toteutusvaiheen manuaalinen selainvarmennus kattaa näppäimistön ja ruudunlukijan saavutettavat nimet, näkyvän fokuksen, toiminnan ilman vetämistä, aloittamisen ilman autoplayta, toiston/pysäytyksen/uudelleenkuuntelun, 0/12-askeleen rekisterieron, kapean viewportin ja selaimen Accessibility-näkymän. Tukiselaimet ja ruudunlukijayhdistelmä valitaan ennen toteutusta. Näitä tarkistuksia ei ole tehty tässä dokumentaatio-PR:ssä.

Ennen toteutus-PR:ää avoinna ovat scaffoldin ja build-työkalun hyväksyntä, package manager, React Compiler -integraatio, CSS-ratkaisu, testirunneri, tuetut selaimet, aloitustaajuus sekä se, millä nimillä ja nuotinkirjoituksella ensimmäiset esimerkit esitetään.
