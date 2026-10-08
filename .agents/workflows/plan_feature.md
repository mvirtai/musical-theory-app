---
description: Feature planning workflow for the browser-first music-theory application
---

# Uuden ominaisuuden suunnittelutyönkulku

Tee tämä suunnittelutyö ennen ominaisuuden sovelluskoodin muuttamista. Suunnitelman pitää perustua nykyisen repositorion rakenteeseen; tyhjä tai alkuvaiheessa oleva repo ei ole peruste keksiä teknistä pinoa tai palvelinarkkitehtuuria.

## 1. Tutki nykyinen tilanne

- Tarkista työpuu ja repositorion ohjeet sekä etsi ominaisuuteen liittyvät olemassa olevat näkymät, komponentit, tyypit, testit ja dokumentaatio.
- Tunnista käytössä olevat React-, TypeScript-, React Compiler-, pakettimanageri-, tyyli-, testaus- ja CI-määritykset niiden todellisista tiedostoista.
- Selvitä, mitä selaimen API-rajapintoja, URL-tilaa, tallennustilaa tai ulkoisia palveluita ominaisuus tarvitsee.
- Älä lisää tietokantaa, API:a, Go-palvelinta tai muuta backend-osaa oletusarvoisesti. Perustele ne erikseen vain, jos vaatimus niitä todella edellyttää.

## 2. Kirjoita rajattu suunnitelma

Kuvaa seuraavat asiat:

1. **Tavoite ja käyttäjäongelma:** nykyinen kitka, kohdekäyttäjä ja haluttu tulos.
2. **Laajuus:** mitä tehdään ja mitä ei tehdä.
3. **Nykytilan havainnot:** tiedostot ja olemassa olevat käytännöt, joihin toteutus liittyy.
4. **Ehdotettu ratkaisu:** keskeiset komponentit, tilan omistajuus, käyttöliittymäkäytös ja mahdolliset selainrajapinnat.
5. **Vaihtoehdot ja riskit:** vähintään merkitykselliset vaihtoehdot ja valinnan peruste.
6. **React 19.2 / Compiler -tarkistus:** johdettu tila renderöinnissä, ei effectejä tilan synkronointiin, ulkoiselle selaintilalle tarvittaessa `useSyncExternalStore`, ja sopiviin async-lomakkeisiin React Actions / `useActionState`.
7. **Varmennus:** todellisiin repossa määriteltyihin komentoihin perustuvat automaatti- ja manuaalitarkistukset. Merkitse vielä määrittelemättömät testit tai komennot avoimiksi.

Luo suunnitelmatiedosto vain, jos repossa on siihen sovittu polku tai käyttäjä pyytää sitä. Älä linkitä tai kopioi suunnitelmia yksityiseen ulkoiseen repositorioon.

## 3. Hyväksyntä ennen toteutusta

Esittele suunnitelma ja odota kehittäjän hyväksyntää ennen sovelluskoodin muuttamista. Suunnitteludokumentaatioon rajatut muutokset eivät itsessään oikeuta koodin tai framework-scaffoldin luomiseen.

## 4. Toteutuksen seuranta

Hyväksynnän jälkeen tarkenna suunnitelmaa tarvittaessa toteutuksen todellisten löydösten mukaan. Käytä tehtävälistaa vain projektin tai istunnon olemassa olevassa käytännössä; älä lisää seurantatiedostoja ilman tarvetta.
