import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Shield, Info, X, ChevronRight, ArrowLeft, ArrowUpRight, MapPin, Phone, Mail,
  Wrench, PhoneCall, Bot, FolderOpen, PenLine, ClipboardList, Receipt, UserCog,
  LifeBuoy, Users, FileText, Lock, Hourglass,
  Siren, Stethoscope, Droplets, Zap, Flame, Lightbulb, Landmark, ShieldAlert, CloudRain,
  Megaphone, TriangleAlert,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Costanti di versione
// ─────────────────────────────────────────────────────────────
const APP_VERSION = "2.3";
const BUILD_DATE_LABEL = "29/09/2026"; // Data fissa della release
const BRAND = "Studio CAI";
const LOGO_URL = "/logo.jpg";

// Recapiti dello studio
const STUDIO_TEL = "06 7835 9769";
const STUDIO_TEL_LINK = "tel:+390678359769";
const STUDIO_EMAIL = "info@studiocai.it";
const STUDIO_SITO = "https://www.studiocai.it";
const STUDIO_RICEVIMENTO = "Ricevimento in Via Don Rua 39: dal lunedì al giovedì, 10–12 e 15–17";
const SEGNALAZIONI_URL = "https://studio-cai-messenger.vercel.app/";

// ─────────────────────────────────────────────────────────────
// Numeri utili (pagina interna ?servizio=numeri-utili)
// Numeri verificati sui siti ufficiali il 29/09/2026.
// `numero` è quello da comporre, `mostra` quello da leggere.
// ─────────────────────────────────────────────────────────────
const EMERGENZE_PRINCIPALI = [
  { id: "112", nome: "Numero unico emergenze", dettaglio: "Carabinieri, Polizia, Vigili del fuoco, ambulanza", numero: "112", icona: Siren },
];

const SEZIONI_NUMERI = [
  {
    id: "sanita",
    titolo: "Salute e sicurezza",
    nota: "Quando non c'è un'emergenza immediata.",
    voci: [
      { id: "116117", nome: "Guardia medica", dettaglio: "Cure mediche non urgenti", numero: "116117", mostra: "116 117", icona: Stethoscope },
      { id: "117", nome: "Guardia di Finanza", dettaglio: "Pronto intervento", numero: "117", icona: ShieldAlert },
    ],
  },
  {
    id: "reti",
    titolo: "Guasti ad acqua, luce e gas",
    nota: "Guasti alla rete pubblica o al contatore. Numeri verdi gratuiti, attivi 24 ore su 24.",
    voci: [
      { id: "acea-acqua", nome: "Acqua e fognature", dettaglio: "Acea Ato 2 · tieni pronti il CAP e la matricola del contatore", numero: "800130335", mostra: "800 130 335", icona: Droplets },
      { id: "acea-luce", nome: "Energia elettrica", dettaglio: "Acea, rete Areti · tasto 1, tieni pronto il codice POD della bolletta", numero: "800130336", mostra: "800 130 336", icona: Zap },
      { id: "acea-lampioni", nome: "Illuminazione pubblica", dettaglio: "Acea, rete Areti · lampioni spenti o guasti in strada", numero: "800006677", mostra: "800 006 677", icona: Lightbulb },
      { id: "italgas", nome: "Pronto intervento gas", dettaglio: "Italgas · odore di gas, fughe, tubazioni o contatore danneggiati", numero: "800900999", mostra: "800 900 999", icona: Flame },
    ],
    avviso: "Se senti odore di gas: non accendere luci e non toccare interruttori, campanelli o fiamme; apri le finestre, chiudi il rubinetto del contatore, esci e chiama da fuori.",
  },
  {
    id: "roma",
    titolo: "Roma Capitale e Regione Lazio",
    nota: "Informazioni, viabilità ed eventi meteo.",
    voci: [
      { id: "060606", nome: "Chiamaroma", dettaglio: "Informazioni e servizi del Comune di Roma", numero: "060606", mostra: "06 0606", icona: Landmark },
      { id: "polizia-locale", nome: "Polizia Locale Roma Capitale", dettaglio: "Centrale operativa", numero: "0667691", mostra: "06 67691", icona: Megaphone },
      { id: "protezione-civile", nome: "Protezione Civile Regione Lazio", dettaglio: "Sala operativa regionale", numero: "803555", mostra: "803 555", icona: CloudRain },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Servizi, per categoria.
// Per attivare un servizio "in arrivo": togliere `presto: true`
// e sostituire `url` con l'indirizzo definitivo.
// ─────────────────────────────────────────────────────────────
const CATEGORIE = [
  {
    id: "assistenza",
    titolo: "Assistenza",
    descrizione: "Guasti e numeri da chiamare",
    icona: LifeBuoy,
    servizi: [
      {
        id: "segnalazioni",
        titolo: "Segnalazioni guasti e interventi",
        descrizione: "Segnala un guasto o un intervento da fare nelle parti comuni del condominio.",
        icona: Wrench,
        url: SEGNALAZIONI_URL,
      },
      {
        id: "numeri-utili",
        titolo: "Numeri utili",
        descrizione: "Studio, emergenze, guasti ad acqua, luce e gas e servizi di Roma Capitale: tocchi e chiami.",
        icona: PhoneCall,
        interna: true,
      },
    ],
  },
  {
    id: "assemblee",
    titolo: "Assemblee e documenti",
    descrizione: "Documenti del condominio e partecipazione all'assemblea",
    icona: Users,
    servizi: [
      {
        id: "portale",
        titolo: "Portale condominiale",
        descrizione: "Accedi con le tue credenziali per consultare documenti e informazioni del condominio.",
        icona: FolderOpen,
        url: "https://studiocai2.cedhousesuite.it/index.php",
      },
      {
        id: "deleghe",
        titolo: "Delega online per l'assemblea",
        descrizione: "Delega una persona di fiducia: compili, firmi con il dito e ricevi subito la ricevuta.",
        icona: PenLine,
        url: "https://studio-cai-deleghe.vercel.app",
      },
    ],
  },
  {
    id: "moduli",
    titolo: "Moduli e dichiarazioni",
    descrizione: "Dati da comunicare allo studio",
    icona: FileText,
    servizi: [
      {
        id: "anagrafe",
        titolo: "Anagrafe condominiale",
        descrizione: "Comunica o aggiorna i tuoi dati per il registro di anagrafe condominiale.",
        icona: ClipboardList,
        url: "https://studio-cai-anagrafe.vercel.app/",
      },
      {
        id: "detrazioni",
        titolo: "Detrazioni fiscali",
        descrizione: "Dichiarazione per le aliquote differenziate sull'abitazione principale.",
        icona: Receipt,
        url: "https://studio-cai-detrazioni.vercel.app/",
      },
    ],
  },
];

// Assistente virtuale: in evidenza in cima alla pagina
const ASSISTENTE = {
  id: "assistente",
  titolo: "Claudio, l'assistente virtuale",
  descrizione: "Chiedi qualsiasi cosa sul tuo condominio: documenti, rate e saldi, assemblee e deleghe, guasti e numeri utili. Ti risponde subito e ti porta al servizio giusto, a qualsiasi ora.",
  icona: Bot,
  url: "https://studio-cai-chatbot.vercel.app/",
};

const AREA_RISERVATA = {
  id: "portieri",
  titolo: "Portieri e dipendenti",
  descrizione: "Accesso riservato al personale dei condomini",
  icona: UserCog,
  url: "https://studio-cai-portieri.vercel.app/",
};

const TUTTI = [ASSISTENTE, ...CATEGORIE.flatMap((c) => c.servizi), AREA_RISERVATA];

// Pagine interne (Numeri utili) e pagina "in allestimento": ?servizio=<id>
const leggiServizio = () => {
  try {
    const id = new URLSearchParams(window.location.search).get("servizio");
    return TUTTI.find((s) => s.id === id && (s.presto || s.interna)) || null;
  } catch {
    return null;
  }
};

const cn = (...c) => c.filter(Boolean).join(" ");

// ─────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [inArrivo, setInArrivo] = useState(leggiServizio);

  useEffect(() => {
    const onPop = () => setInArrivo(leggiServizio());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const apriInArrivo = (servizio) => {
    window.history.pushState({ presto: true }, "", `?servizio=${servizio.id}`);
    setInArrivo(servizio);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tornaAiServizi = () => {
    if (window.history.state && window.history.state.presto) {
      window.history.back();
    } else {
      window.history.replaceState(null, "", window.location.pathname);
      setInArrivo(null);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-paper bg-noise text-neutral-900">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-brand/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-neutral-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white ring-1 ring-neutral-200 shadow-soft flex items-center justify-center">
                <img src={LOGO_URL} alt="logo" className="w-full h-full object-contain p-1"
                  onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand ring-2 ring-white flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display font-semibold text-xl sm:text-2xl text-neutral-900 truncate">{BRAND}</h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white tracking-wider">v{APP_VERSION}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">Portale servizi online</p>
            </div>
            <button onClick={() => setShowInfo(!showInfo)} className="p-2.5 rounded-xl hover:bg-neutral-100 active:bg-neutral-200 transition-colors" aria-label="Informazioni">
              <Info className="w-5 h-5 text-neutral-600" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showInfo && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="relative z-10 bg-gradient-to-b from-brand/8 to-brand/4 border-b border-brand/20 overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-start gap-3 text-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand/12 flex items-center justify-center"><Info className="w-5 h-5 text-brand-dark" /></div>
              <div className="flex-1 text-neutral-600">
                <p className="font-semibold text-brand-deep mb-1">Come funziona</p>
                Scegli il servizio che ti serve: si apre in una nuova scheda del browser, così questa pagina resta a portata di mano
                (i Numeri utili si aprono direttamente qui). Per qualsiasi dubbio scrivi a{" "}
                <a href={`mailto:${STUDIO_EMAIL}`} className="font-semibold text-brand-dark underline decoration-brand/30 underline-offset-2">{STUDIO_EMAIL}</a>{" "}
                o chiama lo {STUDIO_TEL}.
              </div>
              <button onClick={() => setShowInfo(false)} className="p-1.5 hover:bg-brand/12 rounded-lg" aria-label="Chiudi"><X className="w-4 h-4 text-brand-dark" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-10">
        <AnimatePresence mode="wait">
          {inArrivo ? (
            inArrivo.interna
              ? <PaginaNumeriUtili key="numeri" onIndietro={tornaAiServizi} />
              : <PaginaInArrivo key="presto" servizio={inArrivo} onIndietro={tornaAiServizi} />
          ) : (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {/* Hero */}
              <section className="pt-8 sm:pt-12 pb-6 sm:pb-8">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
                  <h2 className="font-display text-3xl sm:text-5xl font-semibold text-neutral-900 leading-[1.05] tracking-tight">
                    Di cosa hai <em className="not-italic text-brand">bisogno</em>?
                  </h2>
                  <p className="mt-4 text-neutral-600 text-base sm:text-lg">
                    Tutti i servizi online dello studio per i condòmini, in un unico posto. Se non sai da dove partire, chiedi a Claudio, l'assistente virtuale.
                  </p>
                </motion.div>
              </section>

              {/* Assistente virtuale in evidenza */}
              <CardAssistente />

              {/* Categorie */}
              <div className="space-y-8 sm:space-y-10 mt-8 sm:mt-10">
                {CATEGORIE.map((cat, i) => (
                  <Categoria key={cat.id} categoria={cat} indice={i} onInArrivo={apriInArrivo} />
                ))}

                {/* Area riservata */}
                <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 + CATEGORIE.length * 0.08 }}
                  className="pt-2">
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <Lock className="w-3.5 h-3.5 text-neutral-400" />
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Area riservata</h3>
                  </div>
                  <a href={AREA_RISERVATA.url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl bg-white/60 backdrop-blur ring-1 ring-neutral-200 px-4 py-3 hover:bg-white hover:ring-neutral-300 transition-all">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center">
                      <AREA_RISERVATA.icona className="w-[18px] h-[18px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-neutral-800">{AREA_RISERVATA.titolo}</p>
                      <p className="text-xs text-neutral-500">{AREA_RISERVATA.descrizione}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
                  </a>
                </motion.section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Recapiti dello studio */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 -mb-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-neutral-500 text-center">
        <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 flex-shrink-0" />Via Don Rua 39, Roma</span>
        <span aria-hidden="true">·</span>
        <a href={STUDIO_TEL_LINK} className="inline-flex items-center gap-1 hover:text-brand"><Phone className="w-3 h-3" />{STUDIO_TEL}</a>
        <span aria-hidden="true">·</span>
        <a href={`mailto:${STUDIO_EMAIL}`} className="inline-flex items-center gap-1 hover:text-brand"><Mail className="w-3 h-3" />{STUDIO_EMAIL}</a>
      </div>

      {/* Footer */}
      <footer className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white/70 backdrop-blur rounded-2xl ring-1 ring-neutral-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-neutral-600 text-center sm:text-left">
              <Building2 className="w-4 h-4 text-brand" />
              <span>© {new Date().getFullYear()} <span className="font-semibold text-neutral-800">{BRAND}</span> — Tutti i diritti riservati</span>
            </div>
            <div className="text-center sm:text-right text-xs text-neutral-500 tabular-nums">
              <span className="font-mono font-semibold text-neutral-700">v{APP_VERSION}</span>
              <span className="mx-2">·</span>
              Ultimo aggiornamento: <span className="font-semibold text-neutral-700">{BUILD_DATE_LABEL}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Componenti
// ─────────────────────────────────────────────────────────────
function CardAssistente() {
  const Icona = ASSISTENTE.icona;
  return (
    <motion.a href={ASSISTENTE.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
      className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-lift ring-1 ring-brand-deep/40 p-5 sm:p-7 hover:-translate-y-0.5 active:translate-y-0 transition-transform">
      <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 ring-1 ring-white/25 flex items-center justify-center">
          <Icona className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Inizia da qui</p>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">{ASSISTENTE.titolo}</h3>
          <p className="mt-2 text-sm sm:text-base text-white/85 leading-snug">{ASSISTENTE.descrizione}</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white text-brand font-semibold text-sm px-4 py-2.5 shadow-soft group-hover:bg-white/95">
            Fai una domanda <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function Categoria({ categoria, indice, onInArrivo }) {
  const Icona = categoria.icona;
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 + indice * 0.08 }}>
      <header className="flex items-center gap-3 mb-3 sm:mb-4 px-1">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center ring-1 ring-brand/20">
          <Icona className="w-[18px] h-[18px]" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-lg sm:text-xl text-neutral-900 leading-tight">{categoria.titolo}</h3>
          <p className="text-xs sm:text-sm text-neutral-500">{categoria.descrizione}</p>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categoria.servizi.map((s, i, arr) => (
          <div key={s.id} className={cn("flex", arr.length % 2 === 1 && i === arr.length - 1 && "sm:col-span-2")}>
            <CardServizio servizio={s} onInArrivo={onInArrivo} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function CardServizio({ servizio, onInArrivo }) {
  const Icona = servizio.icona;
  const presto = !!servizio.presto;

  const contenuto = (
    <>
      <div className={cn(
        "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
        presto ? "bg-neutral-100 text-neutral-500" : "bg-brand text-white shadow-[0_6px_16px_-6px_rgba(139,21,56,0.55)]"
      )}>
        <Icona className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <p className={cn("font-semibold leading-snug", presto ? "text-neutral-700" : "text-neutral-900")}>{servizio.titolo}</p>
          {presto && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 ring-1 ring-amber-200">
              In arrivo
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-neutral-600 leading-snug">{servizio.descrizione}</p>
      </div>
      <ChevronRight className={cn(
        "flex-shrink-0 w-5 h-5 self-center transition-transform",
        presto ? "text-neutral-300" : "text-brand/60 group-hover:translate-x-0.5 group-hover:text-brand"
      )} />
    </>
  );

  const classi = cn(
    "group w-full text-left flex items-start gap-3.5 rounded-2xl p-4 sm:p-5 ring-1 transition-all duration-200",
    presto
      ? "bg-white/60 ring-neutral-200 hover:bg-white"
      : "bg-white ring-neutral-200 shadow-soft hover:shadow-lift hover:ring-brand/30 hover:-translate-y-0.5 active:translate-y-0"
  );

  if (presto || servizio.interna) {
    return <button type="button" onClick={() => onInArrivo(servizio)} className={classi}>{contenuto}</button>;
  }
  return (
    <a href={servizio.url} target="_blank" rel="noopener noreferrer" className={classi}>{contenuto}</a>
  );
}

function PaginaInArrivo({ servizio, onIndietro }) {
  const Icona = servizio.icona;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
      className="pt-8 sm:pt-12">
      <button onClick={onIndietro} className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-brand mb-5">
        <ArrowLeft className="w-4 h-4" /> Tutti i servizi
      </button>

      <div className="bg-white rounded-3xl ring-1 ring-neutral-200 shadow-lift overflow-hidden">
        <div className="bg-gradient-to-br from-brand to-brand-deep px-5 sm:px-8 py-6 sm:py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 ring-1 ring-white/25 flex items-center justify-center">
              <Icona className="w-7 h-7" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Servizio in allestimento</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">{servizio.titolo}</h2>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-8 py-6 sm:py-8">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-amber-50 ring-1 ring-amber-200 flex items-center justify-center">
              <Hourglass className="w-[18px] h-[18px] text-amber-700" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Il servizio sarà attivo a breve</p>
              <p className="mt-1 text-sm text-neutral-600">{servizio.descrizione}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-neutral-50 ring-1 ring-neutral-200 p-4">
            <p className="text-sm text-neutral-700 font-semibold mb-2">Nel frattempo puoi contattare lo studio</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a href={STUDIO_TEL_LINK} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white ring-1 ring-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 hover:ring-brand/30 hover:text-brand transition-colors">
                <Phone className="w-4 h-4" /> {STUDIO_TEL}
              </a>
              <a href={`mailto:${STUDIO_EMAIL}`} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white ring-1 ring-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 hover:ring-brand/30 hover:text-brand transition-colors">
                <Mail className="w-4 h-4" /> {STUDIO_EMAIL}
              </a>
            </div>
          </div>

          <button onClick={onIndietro}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-3.5 transition-colors shadow-[0_10px_24px_-10px_rgba(139,21,56,0.6)]">
            <ArrowLeft className="w-4 h-4" /> Torna ai servizi
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-neutral-500">
        Per il sito dello studio: <a href={STUDIO_SITO} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-brand">www.studiocai.it</a>
      </p>
    </motion.div>
  );
}

function PaginaNumeriUtili({ onIndietro }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
      className="pt-8 sm:pt-12">
      <button onClick={onIndietro} className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-brand mb-5">
        <ArrowLeft className="w-4 h-4" /> Tutti i servizi
      </button>

      {/* Testata */}
      <div className="bg-gradient-to-br from-brand to-brand-deep rounded-3xl px-5 sm:px-8 py-6 sm:py-8 text-white shadow-lift">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/15 ring-1 ring-white/25 flex items-center justify-center">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Assistenza</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">Numeri utili</h2>
            <p className="mt-1 text-sm text-white/80">Tocca un numero per chiamare.</p>
          </div>
        </div>
      </div>

      {/* Emergenze */}
      <section className="mt-6">
        <TitoloSezione titolo="Emergenze" nota="Pericolo immediato per persone o cose." />
        <div className="grid grid-cols-1 gap-3">
          {EMERGENZE_PRINCIPALI.map((v) => {
            const Icona = v.icona;
            return (
              <a key={v.id} href={`tel:${v.numero}`} aria-label={`Chiama ${v.nome}: ${v.numero}`}
                className="group rounded-2xl bg-white ring-1 ring-brand/25 shadow-soft hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0 transition-all p-4 sm:p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 flex items-center justify-center">
                    <Icona className="w-5 h-5" />
                  </div>
                  <Phone className="w-4 h-4 text-brand/50 group-hover:text-brand transition-colors" />
                </div>
                <p className="mt-3 font-display font-semibold text-4xl sm:text-5xl text-brand leading-none tabular-nums">{v.numero}</p>
                <p className="mt-2 font-semibold text-sm text-neutral-900 leading-snug">{v.nome}</p>
                <p className="mt-0.5 text-xs text-neutral-500 leading-snug">{v.dettaglio}</p>
              </a>
            );
          })}
        </div>
      </section>

      {/* Il tuo condominio */}
      <section className="mt-8">
        <TitoloSezione titolo="Il tuo condominio" nota="Amministrazione e guasti nelle parti comuni." />
        <div className="space-y-3">
          <div className="rounded-2xl bg-white ring-1 ring-neutral-200 shadow-soft p-4 sm:p-5">
            <div className="flex items-start gap-3.5">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand text-white flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(139,21,56,0.55)]">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-900">{BRAND}</p>
                <p className="text-sm text-neutral-600">Amministrazione del condominio</p>
                <p className="mt-1 text-xs text-neutral-500 leading-snug">{STUDIO_RICEVIMENTO}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a href={STUDIO_TEL_LINK} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-dark text-white px-4 py-3 text-sm font-semibold transition-colors">
                <Phone className="w-4 h-4" /> {STUDIO_TEL}
              </a>
              <a href={`mailto:${STUDIO_EMAIL}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white ring-1 ring-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 hover:ring-brand/30 hover:text-brand transition-colors">
                <Mail className="w-4 h-4" /> {STUDIO_EMAIL}
              </a>
            </div>
          </div>

          <a href={SEGNALAZIONI_URL} target="_blank" rel="noopener noreferrer"
            className="group flex items-start gap-3.5 rounded-2xl bg-white ring-1 ring-neutral-200 shadow-soft hover:shadow-lift hover:ring-brand/30 hover:-translate-y-0.5 active:translate-y-0 transition-all p-4 sm:p-5">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900 leading-snug">Guasto nelle parti comuni?</p>
              <p className="mt-1 text-sm text-neutral-600 leading-snug">
                Ascensore, luci delle scale, cancello, perdite, fognature: segnalalo online e la richiesta arriva alla ditta che segue il tuo condominio.
              </p>
            </div>
            <ChevronRight className="flex-shrink-0 w-5 h-5 self-center text-brand/60 group-hover:translate-x-0.5 group-hover:text-brand transition-transform" />
          </a>

          <p className="px-1 text-xs text-neutral-500 leading-relaxed">
            I recapiti delle ditte di manutenzione del tuo condominio sono sull'avviso "Numeri utili" affisso nel palazzo.
          </p>

          <a href={ASSISTENTE.url} target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl bg-brand/[0.04] ring-1 ring-brand/15 hover:bg-brand/[0.07] transition-colors px-4 py-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
              <Bot className="w-[18px] h-[18px]" />
            </div>
            <p className="flex-1 min-w-0 text-sm text-neutral-700 leading-snug">
              <span className="font-semibold text-neutral-900">Non sai chi chiamare?</span> Chiedi a Claudio, l'assistente virtuale: ti indica il numero giusto e lo chiami con un tocco.
            </p>
            <ArrowUpRight className="flex-shrink-0 w-4 h-4 text-brand/60 group-hover:text-brand" />
          </a>
        </div>
      </section>

      {/* Altre sezioni */}
      {SEZIONI_NUMERI.map((sez) => (
        <section key={sez.id} className="mt-8">
          <TitoloSezione titolo={sez.titolo} nota={sez.nota} />
          <div className="rounded-2xl bg-white ring-1 ring-neutral-200 shadow-soft divide-y divide-neutral-100 overflow-hidden">
            {sez.voci.map((v) => <RigaNumero key={v.id} voce={v} />)}
          </div>
          {sez.avviso && (
            <div className="mt-3 flex items-start gap-3 rounded-2xl bg-amber-50 ring-1 ring-amber-200 p-4">
              <TriangleAlert className="flex-shrink-0 w-5 h-5 text-amber-700 mt-0.5" />
              <p className="text-sm text-amber-900 leading-snug">{sez.avviso}</p>
            </div>
          )}
        </section>
      ))}

      <button onClick={onIndietro}
        className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white ring-1 ring-neutral-200 hover:ring-brand/30 hover:text-brand text-neutral-800 font-semibold px-5 py-3.5 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Torna ai servizi
      </button>
    </motion.div>
  );
}

function TitoloSezione({ titolo, nota }) {
  return (
    <header className="mb-3 px-1">
      <h3 className="font-display font-semibold text-lg sm:text-xl text-neutral-900 leading-tight">{titolo}</h3>
      {nota && <p className="text-xs sm:text-sm text-neutral-500">{nota}</p>}
    </header>
  );
}

function RigaNumero({ voce }) {
  const Icona = voce.icona;
  const numero = (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/8 ring-1 ring-brand/15 px-3 py-1.5 text-sm font-bold text-brand tabular-nums whitespace-nowrap">
      <Phone className="w-3.5 h-3.5" /> {voce.mostra || voce.numero}
    </span>
  );
  return (
    <a href={`tel:${voce.numero}`} aria-label={`Chiama ${voce.nome}: ${voce.mostra || voce.numero}`} className="group flex items-start sm:items-center gap-3.5 px-4 sm:px-5 py-3.5 hover:bg-brand/[0.03] active:bg-brand/[0.06] transition-colors">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neutral-100 text-neutral-600 group-hover:bg-brand/10 group-hover:text-brand flex items-center justify-center transition-colors">
        <Icona className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm sm:text-base text-neutral-900 leading-snug">{voce.nome}</p>
        <p className="text-xs sm:text-sm text-neutral-500 leading-snug">{voce.dettaglio}</p>
        <div className="mt-2 sm:hidden">{numero}</div>
      </div>
      <div className="hidden sm:block flex-shrink-0">{numero}</div>
    </a>
  );
}
