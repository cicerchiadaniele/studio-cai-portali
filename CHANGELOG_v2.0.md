# Changelog – Portale servizi online

## v2.3 – 29/09/2026

- L'assistente virtuale si chiama Claudio: titolo del riquadro in cima, invito nella pagina iniziale e riquadro "Non sai chi chiamare?" in Numeri utili.

## v2.2 – 29/09/2026

- Numeri utili attivo: pagina interna (`?servizio=numeri-utili`, si apre nella stessa scheda) con numeri da toccare per chiamare.
  - Emergenze: solo il 112, numero unico per Carabinieri, Polizia, Vigili del fuoco e ambulanza, in evidenza su tutta la riga.
  - Il tuo condominio: telefono ed email dello studio, pulsante "Guasto nelle parti comuni?" che apre Segnalazioni; rimando all'avviso "Numeri utili" affisso nel palazzo per le ditte del singolo condominio.
  - Salute e sicurezza: guardia medica 116 117, Guardia di Finanza 117.
  - Guasti ad acqua, luce e gas (24 ore su 24, gratuiti): guasti acqua e fognature Acea 800 130 335, guasti energia elettrica Acea (rete Areti) 800 130 336, illuminazione pubblica Acea 800 006 677, pronto intervento gas Italgas 800 900 999 (odore di gas, fughe, tubazioni o contatore danneggiati), con avviso di sicurezza per l'odore di gas.
  - Roma Capitale e Regione Lazio: Chiamaroma 06 0606, Polizia Locale Roma Capitale 06 67691, Protezione Civile Lazio 803 555.
- Numeri utili: nella scheda dello studio gli orari di ricevimento; riquadro "Non sai chi chiamare?" che apre l'assistente virtuale; ogni numero ha l'etichetta "Chiama …" per i lettori di schermo.
- Home: Assistente virtuale in evidenza in cima ("Inizia da qui"), con la nuova descrizione (documenti, rate e saldi, assemblee e deleghe, guasti e numeri utili); la categoria Assistenza ora contiene Segnalazioni e Numeri utili.
- Descrizione della pagina (anteprima nei motori di ricerca e nei messaggi) aggiornata con assistente virtuale e numeri utili.
- Pannello "Come funziona" aggiornato (non ci sono più servizi "In arrivo"; la pagina "in allestimento" resta nel codice per usi futuri).

## v2.1 – 29/09/2026

- Assistente virtuale attivo: il pulsante apre https://studio-cai-chatbot.vercel.app/ (accesso con codice via email, riservato ai condòmini registrati).

## v2.0 – 26/09/2026

Riscrittura completa in React con la grafica delle webapp Studio CAI (allineamento del 23/09/2026).

### Grafica
- Bordeaux Studio CAI #8B1538 (prima #800020), font Fraunces (titoli) e Manrope (testo), sfondo "carta" con texture leggera.
- Header fisso con logo, "Studio CAI", badge versione e sottotitolo "Portale servizi online"; pannello informativo apribile dall'icona "i".
- Recapiti dello studio in una riga sopra il piè di pagina; piè di pagina comune (© Studio CAI, versione, data di ultimo aggiornamento).
- Testi con la sola iniziale maiuscola, senza emoji.
- iPhone e iPad: eventuali campi a 16 px (niente zoom al tocco).

### Organizzazione
- Servizi raggruppati per categoria: Assistenza, Assemblee e documenti, Moduli e dichiarazioni, Area riservata (in fondo, più discreta).

### Nuovi pulsanti
- Delega online per l'assemblea → https://studio-cai-deleghe.vercel.app
- Numeri utili → pagina interna "Servizio in allestimento".
- Assistente virtuale → pagina interna "Servizio in allestimento".

### Invariato
- Indirizzi di Portale condominiale, Segnalazioni, Anagrafe, Detrazioni fiscali e Portieri.
- Apertura dei servizi in una nuova scheda.

## v1.0 – febbraio 2025

Prima versione in HTML semplice con cinque servizi.
