import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Shield, Info, X, ChevronRight, ArrowLeft, ArrowUpRight, MapPin, Phone, Mail,
  Wrench, PhoneCall, Bot, FolderOpen, PenLine, ClipboardList, Receipt, UserCog,
  LifeBuoy, Users, FileText, Lock, Hourglass,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Costanti di versione (v2.0)
// ─────────────────────────────────────────────────────────────
const APP_VERSION = "2.1";
const BUILD_DATE_LABEL = "29/09/2026"; // Data fissa della release
const BRAND = "Studio CAI";
const LOGO_URL = "/logo.jpg";

// Recapiti dello studio
const STUDIO_TEL = "06 7835 9769";
const STUDIO_TEL_LINK = "tel:+390678359769";
const STUDIO_EMAIL = "info@studiocai.it";
const STUDIO_SITO = "https://www.studiocai.it";

// ─────────────────────────────────────────────────────────────
// Servizi, per categoria.
// Per attivare un servizio "in arrivo": togliere `presto: true`
// e sostituire `url` con l'indirizzo definitivo.
// ─────────────────────────────────────────────────────────────
const CATEGORIE = [
  {
    id: "assistenza",
    titolo: "Assistenza",
    descrizione: "Guasti, contatti e risposte rapide",
    icona: LifeBuoy,
    servizi: [
      {
        id: "segnalazioni",
        titolo: "Segnalazioni guasti e interventi",
        descrizione: "Segnala un guasto o un intervento da fare nelle parti comuni del condominio.",
        icona: Wrench,
        url: "https://studio-cai-messenger.vercel.app/",
      },
      {
        id: "numeri-utili",
        titolo: "Numeri utili",
        descrizione: "Recapiti dello studio, delle ditte di manutenzione e dei servizi di emergenza.",
        icona: PhoneCall,
        presto: true,
      },
      {
        id: "assistente",
        titolo: "Assistente virtuale",
        descrizione: "Domande su convocazioni, bilanci, riparti e delibere del tuo condominio, a qualsiasi ora.",
        icona: Bot,
        url: "https://studio-cai-chatbot.vercel.app/",
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

const AREA_RISERVATA = {
  id: "portieri",
  titolo: "Portieri e dipendenti",
  descrizione: "Accesso riservato al personale dei condomini",
  icona: UserCog,
  url: "https://studio-cai-portieri.vercel.app/",
};

const TUTTI = [...CATEGORIE.flatMap((c) => c.servizi), AREA_RISERVATA];

// Pagina "in allestimento": ?servizio=<id>
const leggiServizio = () => {
  try {
    const id = new URLSearchParams(window.location.search).get("servizio");
    return TUTTI.find((s) => s.id === id && s.presto) || null;
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
                Scegli il servizio che ti serve: si apre in una nuova scheda del browser, così questa pagina resta a portata di mano.
                I servizi segnati "In arrivo" saranno attivi a breve. Per qualsiasi dubbio scrivi a{" "}
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
            <PaginaInArrivo key="presto" servizio={inArrivo} onIndietro={tornaAiServizi} />
          ) : (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {/* Hero */}
              <section className="pt-8 sm:pt-12 pb-6 sm:pb-8">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
                  <h2 className="font-display text-3xl sm:text-5xl font-semibold text-neutral-900 leading-[1.05] tracking-tight">
                    Di cosa hai <em className="not-italic text-brand">bisogno</em>?
                  </h2>
                  <p className="mt-4 text-neutral-600 text-base sm:text-lg">
                    Tutti i servizi online dello studio per i condòmini, in un unico posto.
                  </p>
                </motion.div>
              </section>

              {/* Categorie */}
              <div className="space-y-8 sm:space-y-10">
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

  if (presto) {
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
