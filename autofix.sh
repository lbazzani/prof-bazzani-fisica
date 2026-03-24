#!/bin/bash
# autofix.sh — Loop: test site with Puppeteer → fix with Claude CLI → repeat
#
# Usage: ./autofix.sh [max_iterations]
#
# Runs Puppeteer tests, feeds errors/warnings/improvements to Claude CLI
# for automatic fixing. Loops until the site is clean or max iterations reached.

set -euo pipefail

MAX_ITER=${1:-10}
ITER=0
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Max characters of report to send to Claude (avoid blowing up context)
MAX_REPORT_CHARS=12000

echo "══════════════════════════════════════════════"
echo "  🔄 AUTOFIX LOOP — max $MAX_ITER iterations"
echo "══════════════════════════════════════════════"
echo ""

while [ $ITER -lt $MAX_ITER ]; do
    ITER=$((ITER + 1))
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Iteration $ITER / $MAX_ITER"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Run Puppeteer test
    echo "🧪 Running tests..."
    TEST_OUTPUT=$(node "$SCRIPT_DIR/test-site.mjs" 2>&1) || true

    echo "$TEST_OUTPUT"
    echo ""

    # Check if clean
    if echo "$TEST_OUTPUT" | grep -q "ALL TESTS PASSED"; then
        echo ""
        echo "══════════════════════════════════════════════"
        echo "  ✅ SITE IS PERFECT! (after $ITER iteration(s))"
        echo "══════════════════════════════════════════════"
        exit 0
    fi

    # Extract just the report (ERROR/WARN/IMPROVE lines + summary)
    REPORT=$(echo "$TEST_OUTPUT" | sed -n '/TEST REPORT/,/═══════════════════════════════════════════════════/p' | head -200)

    # Extract vector source separately (may be very large)
    VECTOR_SRC=$(echo "$TEST_OUTPUT" | sed -n '/VECTOR.*PHYSICS REVIEW/,/═══════════════════════════════════════════════════/p' | head -80)

    if [ -z "$REPORT" ]; then
        echo "⚠️  Could not parse test output. Retrying..."
        continue
    fi

    # Count issue types
    N_ERRORS=$(echo "$REPORT" | grep -c '\[ERROR\]' || true)
    N_WARNS=$(echo "$REPORT" | grep -c '\[WARN\]' || true)
    N_IMPROVE=$(echo "$REPORT" | grep -c '\[IMPROVE\]' || true)

    echo "📊 Found: $N_ERRORS errors, $N_WARNS warnings, $N_IMPROVE improvements"
    echo ""

    # === PHASE 1: Fix errors first (if any) ===
    if [ "$N_ERRORS" -gt 0 ]; then
        echo "🔴 Phase 1: Fixing $N_ERRORS ERRORS..."
        ERROR_LINES=$(echo "$REPORT" | grep '\[ERROR\]')

        PROMPT="Sei l'assistente per il sito 'Il Prof Bazzani' (app di fisica per ragazzi di 14 anni).
I test Puppeteer hanno trovato questi ERRORI. Fixali TUTTI. Sono bug reali.

ERRORI DA FIXARE:
$ERROR_LINES

REGOLE:
- Fixa solo gli errori elencati sopra, non toccare altro
- I file sono in app/ — modifica solo quelli
- NON aggiungere file o dipendenze
- Se un errore è un JS error in una pagina specifica, leggi il file corrispondente e fixa il bug

Procedi senza chiedere conferma."

        claude --dangerously-skip-permissions -p "$PROMPT" --max-turns 20
        echo ""
        sleep 1

        # Re-test after fixing errors before moving to warnings
        echo "🔄 Re-testing after error fixes..."
        TEST_OUTPUT=$(node "$SCRIPT_DIR/test-site.mjs" 2>&1) || true
        if echo "$TEST_OUTPUT" | grep -q "ALL TESTS PASSED"; then
            echo "✅ SITE IS PERFECT! (after $ITER iteration(s))"
            exit 0
        fi
        REPORT=$(echo "$TEST_OUTPUT" | sed -n '/TEST REPORT/,/═══════════════════════════════════════════════════/p' | head -200)
        VECTOR_SRC=$(echo "$TEST_OUTPUT" | sed -n '/VECTOR.*PHYSICS REVIEW/,/═══════════════════════════════════════════════════/p' | head -80)
        N_WARNS=$(echo "$REPORT" | grep -c '\[WARN\]' || true)
        N_IMPROVE=$(echo "$REPORT" | grep -c '\[IMPROVE\]' || true)
    fi

    # === PHASE 2: Fix warnings ===
    if [ "$N_WARNS" -gt 0 ]; then
        echo "🟡 Phase 2: Fixing $N_WARNS WARNINGS..."
        WARN_LINES=$(echo "$REPORT" | grep '\[WARN\]')

        PROMPT="Sei l'assistente per il sito 'Il Prof Bazzani' (app di fisica per ragazzi di 14 anni).
I test Puppeteer hanno trovato questi WARNING. Fixali tutti.

WARNING DA FIXARE:
$WARN_LINES

REGOLE:
- I file sono in app/ — modifica solo quelli
- NON rompere nulla che funziona
- Se un warning riguarda canvas vuoto o animazioni, leggi il file JS corrispondente
- Se un warning riguarda la navigazione o il glossario, controlla app.js e glossario.js

Procedi senza chiedere conferma."

        claude --dangerously-skip-permissions -p "$PROMPT" --max-turns 20
        echo ""
        sleep 1
    fi

    # === PHASE 3: Improvements (graphics, animations, pedagogy, vectors) ===
    if [ "$N_IMPROVE" -gt 0 ]; then
        echo "💡 Phase 3: Implementing improvements ($N_IMPROVE suggestions)..."

        # Take max 15 improvements per iteration to keep focused
        IMPROVE_LINES=$(echo "$REPORT" | grep '\[IMPROVE\]' | head -15)

        # Truncate vector source to keep prompt manageable
        VECTOR_SECTION=""
        if [ -n "$VECTOR_SRC" ]; then
            VECTOR_SECTION="
═══ CODICE SORGENTE VETTORI (per verifica fisica) ═══
$VECTOR_SRC"
        fi

        PROMPT="Sei l'assistente per il sito 'Il Prof Bazzani' — app di fisica per ragazzi di 14 anni.
I test hanno suggerito questi miglioramenti. Valutali e implementa quelli che hanno senso.

MIGLIORAMENTI SUGGERITI:
$IMPROVE_LINES
$VECTOR_SECTION

═══ LINEE GUIDA ═══

GRAFICA:
- Mobile first (375px). I ragazzi usano il telefono
- Spaziature coerenti (8/16/24/32px), colori pastello, contrasto buono
- Touch target ≥48px su mobile, line-height ≥1.5
- Border-radius e transizioni CSS uniformi

ANIMAZIONI:
- Fluide (no flicker), colorate (colori diversi per forze diverse)
- Etichette leggibili, scalano bene mobile↔desktop
- Progressive: ogni step aggiunge al precedente

DIREZIONE VETTORI (coordinate canvas: Y+ = basso):
- Peso (P): SEMPRE verso il basso
- Py (perpendicolare al piano): VERSO la superficie (schiaccia contro il piano)
- Px (parallela al piano): GIÙ lungo il pendio
- Reazione Normale (N): FUORI dalla superficie (opposta a Py)
- Tensione (T): SU per il piano inclinato
- Attrito: opposto alla tendenza di moto

CONTENUTI (target 14 anni):
- Linguaggio quotidiano, tono attivo ('calcoliamo' non 'viene calcolato')
- Frasi corte (max 25-30 parole), step max 300-400 chars
- Analogie concrete (sport, videogiochi, vita quotidiana)
- Domande retoriche per stimolare curiosità
- Termini scientifici cliccabili (glossario), dati evidenziati (highlight)
- Prima spiegazione a parole, POI la formula

REGOLE:
- I file sono in app/ — modifica solo quelli
- NON rompere nulla che funziona
- NON aggiungere file o dipendenze
- Implementa max 10-12 miglioramenti per non sovraccaricare

Procedi senza chiedere conferma."

        claude --dangerously-skip-permissions -p "$PROMPT" --max-turns 25
        echo ""
        sleep 1
    fi

    echo "✏️  Iteration $ITER complete. Re-testing..."
    echo ""
done

echo ""
echo "══════════════════════════════════════════════"
echo "  ⏰ Max iterations ($MAX_ITER) reached."
echo "  Run again if more fixes are needed."
echo "══════════════════════════════════════════════"

# Run one final test to show status
echo ""
echo "📋 Final test results:"
node "$SCRIPT_DIR/test-site.mjs" 2>&1 || true
