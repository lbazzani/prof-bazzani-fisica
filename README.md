# 🤓 Il Prof Bazzani — Fisica facile

App web interattiva per spiegare la fisica passo per passo a studenti di prima superiore, con animazioni, formule renderizzate e un linguaggio semplice.

**🌐 [prof.bazzani.info](https://prof.bazzani.info)**

## Cosa c'è dentro

### ✏️ Esercizi svolti
Tre problemi della verifica spiegati passo per passo con animazioni su canvas:
- **Il carro attrezzi** — piano inclinato, forza peso, tensione e reazione normale
- **La scala a pioli** — equilibrio con il muro, momenti delle forze
- **Il biliardo** — impulso, conservazione della quantità di moto e urti

### 📚 Teoria
Otto lezioni animate che coprono i concetti fondamentali:
1. La notazione scientifica
2. I vettori: le basi
3. Le tre leggi di Newton
4. Le forze e l'equilibrio
5. Il diagramma di corpo libero
6. Il piano inclinato
7. I momenti delle forze
8. Impulso e quantità di moto

### 📖 Glossario
Dizionario interattivo con oltre 30 termini di fisica, cercabile e integrato nelle spiegazioni.

## Stack

HTML, CSS e JavaScript vanilla — nessun framework, nessun build step. Le formule sono renderizzate con [KaTeX](https://katex.org/), le animazioni disegnate su canvas.

## Deploy

Il sito è servito da nginx su un server Ubuntu. Per pubblicare una nuova versione:

```bash
./deploy.sh
```

Lo script usa `rsync` per copiare la cartella `app/` sul server via SSH.

## Target

Studenti di **prima superiore** (14 anni). Le spiegazioni privilegiano l'intuizione fisica e le analogie con la vita quotidiana, evitando formalismi eccessivi.

## Licenza

Questo progetto è a scopo didattico.
