---
description: Pull Request lifecycle guidance for the browser-first music-theory application
---

# Git PR -työnkulku

Tämä työnkulku kuvaa ominaisuus- tai korjaushaaran valmistelun, varmistamisen ja PR:n dokumentoinnin. Se ei oleta, että repossa olisi jo `Taskfile.yml`, sovelluskoodi, palvelin tai CI-putki.

## 1. Aloitus ja rajaus

- Tarkista aktiivinen haara, työpuun tila ja projektin omat ohjeet ennen muutoksia.
- Käytä nykyistä worktree-/branch-kontekstia; älä vaihda tai luo haaraa automaattisesti, jos ympäristö on jo valinnut sen.
- Uudessa ominaisuudessa tutki ensin olemassa oleva toteutus ja esitä suunnitelma hyväksyttäväksi ennen sovelluskoodin muuttamista.

## 2. Toteutus ja laadunvarmistus

- Käytä ensin repossa määriteltyjä tarkistus- ja testikomentoja. Jos `Taskfile.yml` sisältää sopivan tehtävän, käytä sitä; älä oleta tehtävän nimeä etukäteen.
- Muussa tapauksessa tarkista pakettimanagerin manifestit, CI-määritykset ja projektin ohjeet ja aja niiden mukaiset komennot.
- Jos sovelluskoodia, testejä tai automaatiota ei vielä ole, kerro tämä äläkä raportoi olemattomia tarkistuksia suoritetuiksi.
- Pidä koodikommentit, docstringit ja kooditiedostojen kommentit englanniksi.

## 3. PR Story

Kun repossa on käytössä `pr_stories/`, luo tai päivitä PR Story soveltuvaa mallia käyttäen. Muussa tapauksessa noudata projektin PR-kuvauskäytäntöä. Tarinan tulee:

- selittää käyttäjäongelma ja ratkaisun perustelut täsmällisesti, ilman myyntipuhetta;
- sisältää toteutuneiden muutosten mukainen tiedostoluettelo;
- erottaa suoritetut automaattitestit selaimessa tai muuten käsin varmennetuista asioista;
- raportoida todelliset tulosteet ja mittarit, ei esimerkkituloksia;
- käyttää vain tarpeellisia kaavioita, yhteensä 0–3.

Tarkista tarina aina sen kirjoittamisen jälkeen työnkulussa [PR Story Review](../verify-pr-story.md) kuvatuilla tavoilla. Päivitä sitä, jos myöhemmät muutokset muuttavat dokumentoituja faktoja.

## 4. Tietoturvakatselmointi

Tee rajattu security review, kun muutos koskee esimerkiksi epäluotetun sisällön renderöintiä/parsimista, selaimen tallennustilaa, autentikointia, verkko- tai API-rajoja, arkaluonteista dataa tai riippuvuuksia. Noudata [Security Review -työnkulkua](../make-security-review.md). Älä väitä skannauksia ajetuiksi, jos repossa ei ole niihin sopivaa työkalua tai niitä ei ajettu.

## 5. Pull Request ja yhdistäminen

- Avaa tai päivitä PR projektin käytössä olevalla menetelmällä. Käytä Taskfile-tehtävää vain, jos se on repossa määritelty; muutoin käytä dokumentoitua GitHub-työnkulkua tai `gh`-komentoa, jos se on käytettävissä.
- Käytä PR Storya kuvauksena vain, jos se on luotu ja tarkistettu.
- Yhdistäminen ja paikallisen haaran siivous ovat kehittäjän tai projektin automaation vastuulla. Älä suorita niitä osana muutostyötä ilman erillistä pyyntöä.
