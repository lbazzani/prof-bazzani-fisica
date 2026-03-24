# Fisica — "Il Prof Bazzani" — App web interattiva

## Obiettivo

App web animata e interattiva per la classe 1G del Convitto: spiegazioni passo-passo di teoria ed esercizi di fisica con animazioni Canvas, glossario scientifico integrato e formule KaTeX.

**Sito live:** https://prof.bazzani.info

## Struttura dell'app

```
app/
├── index.html            ← Landing page con card per teoria ed esercizi
├── esercizi.html         ← Viewer esercizi (accetta ?p=0|1|2)
├── teoria.html           ← Viewer teoria (accetta ?t=0..7)
├── style.css             ← Stili condivisi (palette pastello, responsive)
├── draw.js               ← Draw utilities condivise (arrow, circle, label, ecc.)
├── glossario.js          ← Glossario scientifico (~30 termini + unità di misura)
├── app.js                ← Logica esercizi (navigazione step, animazioni)
├── problemi/
│   ├── problema1.js      ← Piano inclinato (carro attrezzi)
│   ├── problema2.js      ← Scala a pioli (momenti)
│   └── problema3.js      ← Biliardo (impulso e qdm)
└── teoria/
    ├── teoria-app.js     ← Logica teoria (come app.js ma per i temi)
    ├── tema1.js          ← Le forze e l'equilibrio
    ├── tema2.js          ← Il piano inclinato
    ├── tema3.js          ← I momenti delle forze
    ├── tema4.js          ← Impulso e quantità di moto
    ├── tema5.js          ← La notazione scientifica
    ├── tema6.js          ← I vettori: le basi
    ├── tema7.js          ← Il diagramma di corpo libero
    └── tema8.js          ← Le tre leggi di Newton
```

**Ordine di presentazione dei temi nella UI** (definito in `teoria-app.js`):
Tema5 → Tema6 → Tema8 → Tema1 → Tema7 → Tema2 → Tema3 → Tema4

## Contenuto esercizi

I tre problemi originali sono in `/Problemi_testo/*.md`.

- `problema1.md` — Piano inclinato, carro attrezzi, equilibrio
- `problema2.md` — Scala a pioli, equilibrio e momenti
- `problema3.md` — Biliardo, impulso e quantità di moto

## Contenuto teoria (8 lezioni animate)

1. **La notazione scientifica** — Numeri grandi/piccoli, a×10ⁿ, conversioni, operazioni
2. **I vettori: le basi** — Scalari vs vettori, componenti, somma vettoriale
3. **Le tre leggi di Newton** — Inerzia, F=ma, azione-reazione
4. **Le forze e l'equilibrio** — Peso, reazione normale, attrito, equilibrio, DCL
5. **Il diagramma di corpo libero** — Isolare l'oggetto, trovare le forze, scegliere gli assi
6. **Il piano inclinato** — Scomposizione forze, seno/coseno, effetto dell'angolo
7. **I momenti delle forze** — Rotazione, momento, braccio, perno, equilibrio dei momenti
8. **Impulso e quantità di moto** — Quantità di moto, impulso, conservazione, urti

## Target

- Studenti di **prima superiore** (14 anni) — classe 1G del Convitto
- Tono amichevole, analogie concrete, linguaggio quotidiano
- Termini scientifici cliccabili con definizioni nel glossario

## Stack

- HTML/CSS/JS vanilla (no framework, no bundler)
- Canvas 2D per animazioni (con scaling proporzionale via `Draw.S()`)
- KaTeX da CDN per formule LaTeX
- Google Fonts (Nunito) per tipografia
- Cache busting con `?v=timestamp`
- Responsive: tab desktop + dropdown mobile, nav fissa in basso su mobile, canvas adattivo

## Deploy

Il sito è servito da nginx con SSL (Let's Encrypt) su `prof.bazzani.info`.
I file risiedono sul server in `/home/lorenzo/projects/prof.bazzani.info/`.

```bash
./deploy.sh    # rsync app/ → server via SSH (lorenzo_st)
```

## Glossario

~30 voci scientifiche + unità di misura con tabelle di conversione. I termini nel testo sono wrappati con `<span class="term" data-term="KEY">parola</span>` e al click mostrano un callout con definizione, formula e "vedi anche". Accessibile anche dal bottone 📖 nell'header (modale con ricerca e accordion).

## Struttura pedagogica degli esercizi

Ogni esercizio deve seguire questa struttura a 4 fasi:

1. **Concetto chiave** — Primo step. Spiega quale idea teorica serve per risolvere il problema (es. scomposizione del peso sul piano inclinato, momenti delle forze, impulso e conservazione della qdm). Lo studente deve capire COSA serve prima di iniziare a calcolare. Include un'animazione Canvas che illustra il concetto in modo semplice e una formula riassuntiva.

2. **Dati e schema** — Scrivere sempre i dati del problema e disegnare la situazione. "Regola d'oro: scrivi i dati prima di calcolare." Identificare cosa ci viene chiesto.

3. **Ragionamento** — Guidare lo studente passo-passo nel ragionamento fisico: quali forze agiscono, come si scompongono, quale principio applicare. Ogni passaggio logico è uno step separato con animazione.

4. **Calcoli e verifica** — Eseguire i calcoli numerici, esprimere in notazione scientifica quando richiesto, e verificare che il risultato abbia senso fisico (es. equilibrio verificato).

Questa impostazione vale per TUTTI gli esercizi, presenti e futuri: concetto chiave → dati → ragionamento → calcoli.

## Struttura di uno step

```js
{
  title: 'Titolo',
  text: 'HTML con <span class="term" data-term="...">termini</span> e <span class="highlight">dati</span>',
  formula: 'LaTeX string' || null,
  draw(ctx, w, h, p) { /* p: 0→1 animato */ },
  cleanDraw: true,  // opzionale: non disegnare step precedenti
  duration: 1200    // opzionale: durata animazione in ms
}
```
