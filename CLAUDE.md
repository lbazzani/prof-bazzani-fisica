# Fisica — "Il Prof Bazzani" — App web interattiva

## Obiettivo

App web animata e interattiva per la classe 1G del Convitto: spiegazioni passo-passo di teoria ed esercizi di fisica con animazioni Canvas, glossario scientifico integrato e formule KaTeX.

## Struttura dell'app (3 pagine)

```
app/
├── home.html             ← Landing page con card per teoria ed esercizi
├── index.html            ← Viewer esercizi (accetta ?p=0|1|2)
├── teoria.html           ← Viewer teoria (accetta ?t=0|1|2|3)
├── style.css             ← Stili condivisi (palette pastello, responsive)
├── draw.js               ← Draw utilities condivise (arrow, circle, label, ecc.)
├── glossario.js          ← Glossario scientifico (~30 termini + unità di misura)
├── app.js                ← Logica esercizi (navigazione step, animazioni)
├── home.js               ← (placeholder, le card sono link diretti)
├── problemi/
│   ├── problema1.js      ← Piano inclinato (carro attrezzi)
│   ├── problema2.js      ← Scala a pioli (momenti)
│   └── problema3.js      ← Biliardo (impulso e qdm)
└── teoria/
    ├── teoria-app.js     ← Logica teoria (come app.js ma per i temi)
    ├── tema1.js          ← Le forze e l'equilibrio
    ├── tema2.js          ← Il piano inclinato
    ├── tema3.js          ← I momenti delle forze
    └── tema4.js          ← Impulso e quantità di moto
```

## Contenuto esercizi

I tre problemi originali sono in `/Problemi_testo/*.md`, trascritti dalle foto in `/Problemi/`.

**IMPORTANTE: In caso di dubbi sul testo o sulle figure, fanno fede le foto originali in `/Problemi/`, non i file markdown.**

- `problema1.md` — Piano inclinato, carro attrezzi, equilibrio
- `problema2.md` — Scala a pioli, equilibrio e momenti
- `problema3.md` — Biliardo, impulso e quantità di moto

## Contenuto teoria (4 lezioni animate)

1. **Le forze e l'equilibrio** — Cos'è una forza, peso, reazione normale, attrito, equilibrio, diagramma corpo libero
2. **Il piano inclinato** — Scomposizione forze, seno/coseno, effetto dell'angolo
3. **I momenti delle forze** — Rotazione, momento, braccio, perno, equilibrio dei momenti
4. **Impulso e quantità di moto** — Quantità di moto, impulso, conservazione, urti, componenti

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
- Responsive: nav fissa in basso su mobile, canvas adattivo

## Glossario

~30 voci scientifiche + unità di misura con tabelle di conversione. I termini nel testo sono wrappati con `<span class="term" data-term="KEY">parola</span>` e al click mostrano un callout con definizione, formula e "vedi anche". Accessibile anche dal bottone 📖 nell'header (modale con ricerca e accordion).

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
