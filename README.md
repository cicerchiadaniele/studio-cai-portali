# Studio CAI – Portale servizi online v2.0

Pagina unica che raccoglie tutti i servizi online dello studio per i condòmini. Sostituisce il vecchio aggregatore in HTML semplice (PortaleServizi 1.0, febbraio 2025).

Versione 2.0 del 26/09/2026 (vedi `CHANGELOG_v2.0.md`).

## Servizi e categorie

| Categoria | Servizio | Indirizzo |
|---|---|---|
| Assistenza | Segnalazioni guasti e interventi | https://studio-cai-messenger.vercel.app/ |
| Assistenza | Numeri utili | in arrivo – `?servizio=numeri-utili` |
| Assistenza | Assistente virtuale | in arrivo – `?servizio=assistente` |
| Assemblee e documenti | Portale condominiale | https://studiocai2.cedhousesuite.it/index.php |
| Assemblee e documenti | Delega online per l'assemblea | https://studio-cai-deleghe.vercel.app |
| Moduli e dichiarazioni | Anagrafe condominiale | https://studio-cai-anagrafe.vercel.app/ |
| Moduli e dichiarazioni | Detrazioni fiscali | https://studio-cai-detrazioni.vercel.app/ |
| Area riservata | Portieri e dipendenti | https://studio-cai-portieri.vercel.app/ |

Ogni servizio attivo si apre in una nuova scheda. I servizi "In arrivo" aprono la pagina interna "Servizio in allestimento" con i recapiti dello studio e il pulsante per tornare ai servizi (nessun deploy separato: la vecchia app "In costruzione" non serve più).

## Modifiche frequenti (tutte in `src/App.js`)

- **Attivare un servizio in arrivo**: nell'elenco `CATEGORIE` togliere `presto: true` e aggiungere `url: "https://..."`. Per l'assistente virtuale l'indirizzo sarà `https://studio-cai-chatbot.vercel.app`.
- **Aggiungere un servizio**: copiare un blocco `{ id, titolo, descrizione, icona, url }` nella categoria giusta (icone da lucide-react).
- **Versione e data nel piè di pagina**: costanti `APP_VERSION` e `BUILD_DATE_LABEL`.
- **Recapiti**: costanti `STUDIO_TEL`, `STUDIO_EMAIL`.

Con un numero dispari di servizi in una categoria, l'ultimo occupa tutta la riga su computer, così la griglia resta ordinata.

## Pubblicazione su Vercel

Stesso progetto Vercel del vecchio aggregatore, così l'indirizzo non cambia:

1. Sostituire su GitHub il contenuto del repository dell'aggregatore con tutti i file di questa cartella (il vecchio `index.html` in radice va eliminato).
2. In Vercel > Settings > Build & Deployment: Framework Preset **Create React App** (prima era "Other", perché il sito era HTML semplice). Build command `npm run build`, Output directory `build`.
3. Redeploy.

Il `package-lock.json` non è incluso: Vercel lo genera installando le dipendenze.

## Sviluppo

```bash
npm install
npm start        # anteprima locale
npm run build    # cartella build/ da pubblicare
```

Stack: React 18 (CRA), Tailwind CSS 3, Framer Motion, Lucide React. Grafica comune alle webapp dello studio: bordeaux #8B1538, Fraunces e Manrope, sfondo carta #fbf8f4. Logo in `public/logo.jpg`, lo stesso delle altre webapp.
