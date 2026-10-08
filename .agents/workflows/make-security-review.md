---
description: Focused security review workflow for browser-first application changes
---

# Tietoturvakatselmointi

Tee rajattu katselmointi, kun muutos lisää tai muuttaa luottamusrajoja tai käsittelee epäluotettua dataa. Esimerkkejä: HTML/Markdown-renderöinti ja parserit, URL-parametrit, selaimen tallennustila, autentikointi, API-/verkko-operaatiot, arkaluonteiset tiedot ja uudet riippuvuudet. Pelkkä yleinen huoli tietoturvasta ei korvaa koodiin perustuvaa tarkastelua.

## 1. Rajaa tarkastus

- Tarkista aktiivinen branch, työpuu ja tarkasteltava diff.
- Tunnista hyökkääjän hallittavissa olevat syötteet, niiden validointi ja kaikki kohdat, joissa niitä käytetään tai renderöidään.
- Selaimessa arvioi tarvittaessa XSS/DOM-injektio, vaaralliset HTML-rajapinnat, avoimet uudelleenohjaukset, URL:n luotettavuus, paikallisen tallennustilan luottamus, arkaluonteisen datan säilytys sekä verkon CORS-/credential-käyttäytyminen.
- Jos palvelin-, auth- tai tietokantakerros on myöhemmin olemassa, arvioi vain muutoksen koskettamat kerrokset ja niiden tosiasialliset rajat.

## 2. Käytä saatavilla olevia tarkistuksia

- Tarkista riippuvuuksien nimet ja versiot olemassa olevasta lockfile-/manifestitiedostosta ja käytä projektin määrittämää auditointityökalua tai CI-tarkistusta, jos sellainen on.
- Käytä repossa määriteltyä Taskfile-tehtävää vain, kun sellainen todella on olemassa. Muussa tapauksessa käytä manifestien tai CI:n määrittämiä tarkistuksia.
- Älä vaadi tai raportoi Go-spesifisiä työkaluja selaimessa toimivalle projektille. Älä väitä tarkistusta suoritetuksi, jos työkalua ei ollut saatavilla tai komentoa ei ajettu.
- Erota lähdekoodin katselmointi työkalupohjaisesta skannauksesta ja kerro tarkastelun rajoitukset.

## 3. Raportoi havainnot

Käytä `.security_audits/templates/SECURITY_AUDIT_TEMPLATE.md`-pohjaa, jos auditointiraportti kuuluu tehtävän laajuuteen tai projektin käytäntöön. Muussa tapauksessa raportoi olennaiset löydökset PR Storyssa tai katselmoinnin vastauksessa.

Jokaisen löydöksen tulee sisältää todennettava tiedosto/rivi, hyökkäyspolku tai vaikutus, vakavuus ja korjausehdotus. Älä nimeä teoreettista huolta haavoittuvuudeksi ilman uskottavaa polkua. Älä täytä CVSS-vektoria tai väitä nollaa löydöstä ilman riittävää näyttöä. Kriittiset ja korkeat löydökset tulee korjata tai käsitellä ennen yhdistämistä; dokumentoi matalampien havaintojen tila.

## 4. Varmista korjaukset

Tarkista korjattu koodi uudelleen ja suorita asiaankuuluvat saatavilla olevat testit/skannaukset. Päivitä löydöksen tila ja todellinen varmennustulos. Älä kirjoita PR Storyyn korjaamattomia haavoittuvuuksia ikään kuin ne olisi jo korjattu.
