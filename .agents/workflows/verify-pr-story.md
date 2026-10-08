---
description: Fact-check and quality review for Pull Request Stories
---

# PR Storyn tarkistus

Suorita tarkistus aina PR Storyn luonnin tai olennaisen päivityksen jälkeen.

## 1. Faktantarkistus

- Vertaa Storya aktiivisen worktreen muutoksiin ja diffiin. Varmista, että jokainen tiedostoluettelon rivi vastaa muutosta ja että kaikki pyynnön kannalta olennaiset muuttuneet tiedostot mainitaan.
- Varmista, ettei Story väitä keskeneräistä tai tulevaan muutokseen kuuluvaa ominaisuutta valmiiksi.
- Tarkista väitteet suoraan toteutuksesta ja säilytä erotetusti automaattinen testaus, selaintestaus ja muut manuaaliset havainnot.
- Älä lisää paikkamerkkien tilalle keksittyjä tuloksia, suorituskykylukuja tai kattavuusprosentteja.

## 2. Kaaviot

- Kaavion pitää ratkaista todellinen ymmärrettävyysongelma; pienissä korjauksissa 0 kaaviota on usein paras.
- Käytä kokonaisuudessaan 0–3 kaaviota. Yli kolmea ei käytetä.
- Valitse vain muutosta kuvaava tyyppi, esimerkiksi `flowchart`, `sequenceDiagram` tai `stateDiagram-v2`.
- Tarkista Mermaid-syntaksi ja lainaa erikoismerkkejä sisältävät solmut ja viestit.

## 3. Sisällön laatu

- Selitä käyttäjäongelma, ratkaisun perustelu ja olennaiset kompromissit elävällä mutta täsmällisellä teknisellä kielellä.
- Poista geneerinen myyntipuhe, täytesisältö, toisto ja mallipohjasta jääneet käyttämättömät osiot.
- Varmista, että testikomennot todella vastaavat repossa määriteltyjä skriptejä tai tehtäviä ja että raportoidut tulokset ovat ajosta.
- Sisällytä manuaaliseen tarkistuslistaan vain toimet, jotka on oikeasti tehty; merkitse ehdotetut mutta ajamattomat tarkistukset selvästi suunnitelmiksi.
- Tarkista suhteellisten Markdown-linkkien polut sekä otsikoiden ja taulukoiden eheys.

## 4. Tietoturvahuomiot

Jos muutos koskee epäluotettua syötettä, selaimen tallennustilaa, authia, verkkoa, arkaluonteista dataa tai riippuvuuksia, varmista, että soveltuva security review on tehty tai että syy sen tarpeettomuuteen on selvä. Älä muuta auditoinnin puuttumista nollalöydökseksi.
