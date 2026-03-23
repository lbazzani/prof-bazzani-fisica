// ===== Glossario Scientifico — Il Prof Bazzani =====

const Glossario = (() => {

    // ===== DIZIONARIO DEI TERMINI =====
    const termini = {
        // --- Meccanica base ---
        'forza': {
            termine: 'Forza',
            simbolo: 'F',
            definizione: 'Una forza è una grandezza che può <b>cambiare lo stato di moto</b> di un oggetto (accelerarlo, frenarlo, deviarlo) o <b>deformarlo</b>. Le forze sono vettori: hanno un\'intensità (quanto è forte), una direzione (dove punta) e un verso (in che senso va).',
            formula: 'F = m \\cdot a',
            formulaDesc: 'Seconda legge di Newton: la forza è uguale alla massa per l\'accelerazione.',
            vediAnche: ['peso', 'newton', 'vettore']
        },
        'massa': {
            termine: 'Massa',
            simbolo: 'm',
            definizione: 'La massa misura <b>quanta materia</b> c\'è in un oggetto. Non cambia mai: la tua massa è la stessa sulla Terra, sulla Luna o nello spazio. Si misura in <b>chilogrammi (kg)</b>.',
            extra: '<b>Non confondere massa e peso!</b> La massa è una proprietà dell\'oggetto; il peso è la forza con cui la gravità lo attira.',
            vediAnche: ['peso', 'kilogrammo']
        },
        'peso': {
            termine: 'Peso (forza peso)',
            simbolo: 'P',
            definizione: 'Il peso è la <b>forza di gravità</b> che la Terra esercita su un oggetto. Punta sempre <b>verticalmente verso il basso</b>. Dipende dalla massa dell\'oggetto e dall\'accelerazione di gravità del pianeta.',
            formula: 'P = m \\cdot g',
            formulaDesc: 'dove g = 9,8 m/s² sulla Terra.',
            extra: 'Un oggetto di 1 kg pesa circa 9,8 N sulla Terra, ma solo 1,6 N sulla Luna!',
            vediAnche: ['forza', 'massa', 'gravita', 'newton']
        },
        'gravita': {
            termine: 'Accelerazione di gravità',
            simbolo: 'g',
            definizione: 'È l\'accelerazione con cui la Terra attira tutti gli oggetti verso il suo centro. Sul nostro pianeta vale circa <b>9,8 m/s²</b> (spesso arrotondata a 10). Significa che un oggetto in caduta libera aumenta la sua velocità di 9,8 m/s ogni secondo.',
            extra: 'Varia leggermente in base a dove ti trovi: ai poli è un po\' più grande, all\'equatore un po\' più piccola.',
            vediAnche: ['peso', 'forza']
        },
        'equilibrio': {
            termine: 'Equilibrio statico',
            definizione: 'Un oggetto è in <b>equilibrio statico</b> quando è fermo e la <b>somma di tutte le forze</b> che agiscono su di esso è zero. Nessuna forza "vince" sulle altre: si bilanciano perfettamente.',
            formula: '\\sum \\vec{F} = 0',
            formulaDesc: 'La somma vettoriale di tutte le forze è il vettore nullo.',
            extra: '<b>Attenzione:</b> equilibrio non significa che non ci sono forze! Ci sono, ma si annullano a vicenda.',
            vediAnche: ['forza', 'diagramma-corpo-libero']
        },
        'diagramma-corpo-libero': {
            termine: 'Diagramma di corpo libero',
            definizione: 'È un disegno semplificato in cui si <b>isola un oggetto</b> e si rappresentano <b>solo le forze</b> che agiscono su di esso, come frecce (vettori). È il primo passo per risolvere qualsiasi problema di meccanica.',
            extra: '<b>Come si fa:</b> 1) Disegna l\'oggetto da solo. 2) Per ogni contatto (corda, superficie, ecc.) disegna la forza corrispondente. 3) Aggiungi il peso verso il basso. 4) Controlla di non aver dimenticato nulla!',
            vediAnche: ['forza', 'equilibrio']
        },

        // --- Piano inclinato ---
        'componente': {
            termine: 'Componente di un vettore',
            definizione: 'Ogni vettore (es. una forza) può essere "spezzato" in due parti perpendicolari tra loro, chiamate <b>componenti</b>. Su un piano inclinato, si scompone il peso in una componente parallela al piano e una perpendicolare.',
            extra: '<b>Perché conviene?</b> Perché lungo ciascuna direzione possiamo scrivere un\'equazione di equilibrio indipendente, rendendo il problema molto più semplice!',
            vediAnche: ['vettore', 'seno-coseno']
        },
        'seno-coseno': {
            termine: 'Seno e Coseno',
            simbolo: 'sin, cos',
            definizione: 'Sono funzioni trigonometriche che legano un <b>angolo</b> di un triangolo rettangolo ai rapporti tra i suoi lati. In un triangolo rettangolo con angolo &alpha;:<br><br>&bull; <b>sin &alpha;</b> = cateto opposto / ipotenusa<br>&bull; <b>cos &alpha;</b> = cateto adiacente / ipotenusa',
            extra: '<b>Valori da ricordare:</b><table class="term-table"><tr><th>&alpha;</th><th>sin &alpha;</th><th>cos &alpha;</th></tr><tr><td>0°</td><td>0</td><td>1</td></tr><tr><td>30°</td><td>0,5</td><td>0,866</td></tr><tr><td>45°</td><td>0,707</td><td>0,707</td></tr><tr><td>60°</td><td>0,866</td><td>0,5</td></tr><tr><td>90°</td><td>1</td><td>0</td></tr></table>',
            vediAnche: ['componente', 'triangolo-rettangolo']
        },
        'tensione': {
            termine: 'Tensione',
            simbolo: 'T',
            definizione: 'La tensione è la <b>forza trasmessa da una fune, cavo o corda</b> quando viene tirata. Agisce sempre <b>lungo la direzione della fune</b>, tirandola verso entrambe le estremità. Una fune ideale (senza massa, inestensibile) trasmette la stessa tensione in tutti i suoi punti.',
            vediAnche: ['forza', 'equilibrio']
        },
        'reazione-normale': {
            termine: 'Reazione normale',
            simbolo: 'N',
            definizione: 'Quando un oggetto è appoggiato su una superficie, la superficie esercita una forza di reazione che <b>impedisce all\'oggetto di attraversarla</b>. Questa forza è sempre <b>perpendicolare (normale) alla superficie</b>.',
            extra: 'Se il pavimento è orizzontale, N è verticale. Se la superficie è inclinata, anche N è inclinata!',
            vediAnche: ['forza', 'equilibrio', 'attrito']
        },
        'notazione-scientifica': {
            termine: 'Notazione scientifica',
            definizione: 'Un modo compatto per scrivere numeri molto grandi o molto piccoli, come <b>a &times; 10<sup>n</sup></b> dove a è un numero tra 1 e 10.',
            extra: '<b>Esempi:</b><table class="term-table"><tr><th>Numero</th><th>Notazione scientifica</th></tr><tr><td>20 580</td><td>2,058 &times; 10<sup>4</sup></td></tr><tr><td>0,00085</td><td>8,5 &times; 10<sup>-4</sup></td></tr><tr><td>159,25</td><td>1,5925 &times; 10<sup>2</sup></td></tr></table>',
            vediAnche: []
        },

        // --- Scala / Momenti ---
        'momento': {
            termine: 'Momento di una forza (torque)',
            simbolo: 'M',
            definizione: 'Il momento misura la tendenza di una forza a far <b>ruotare</b> un oggetto attorno a un punto (il perno). Dipende da due cose: quanto è forte la forza e quanto è lontana dal perno.',
            formula: 'M = F \\cdot b',
            formulaDesc: 'dove b è il braccio (distanza perpendicolare tra la linea d\'azione della forza e il perno).',
            extra: 'Un momento positivo fa ruotare in senso antiorario, uno negativo in senso orario (o viceversa, dipende dalla convenzione).',
            vediAnche: ['braccio', 'perno', 'equilibrio']
        },
        'braccio': {
            termine: 'Braccio di una forza',
            simbolo: 'b',
            definizione: 'Il braccio è la <b>distanza perpendicolare</b> tra il <b>perno</b> (punto di rotazione) e la <b>linea d\'azione</b> della forza. Non è la distanza dal punto di applicazione, ma la distanza perpendicolare!',
            extra: '<b>Trucco:</b> se una forza passa esattamente per il perno, il suo braccio è zero e non genera momento. Per questo scegliamo il perno in modo furbo!',
            vediAnche: ['momento', 'perno']
        },
        'perno': {
            termine: 'Perno (punto di rotazione)',
            definizione: 'Il perno è il punto attorno al quale un oggetto può <b>ruotare</b>. Nei problemi di equilibrio, possiamo scegliere <b>qualsiasi punto</b> come perno per calcolare i momenti &mdash; il risultato non cambia.',
            extra: '<b>Trucco furbo:</b> conviene scegliere il perno nel punto dove passano più forze incognite, così quelle forze hanno braccio zero e spariscono dal bilancio dei momenti!',
            vediAnche: ['momento', 'braccio']
        },
        'baricentro': {
            termine: 'Baricentro (centro di massa)',
            definizione: 'È il punto in cui si può immaginare <b>concentrata tutta la massa</b> di un oggetto. Per un oggetto uniforme (stessa densità ovunque), il baricentro è nel suo <b>centro geometrico</b>. La forza peso agisce sempre sul baricentro.',
            extra: 'Per una scala uniforme, il baricentro è esattamente a metà. Per un oggetto asimmetrico (es. una mazza da baseball) è più vicino alla parte pesante.',
            vediAnche: ['peso', 'massa']
        },
        'attrito': {
            termine: 'Attrito',
            simbolo: 'F_a',
            definizione: 'L\'attrito è una forza che si oppone al <b>movimento relativo</b> tra due superfici a contatto. È parallelo alla superficie e opposto alla direzione in cui l\'oggetto tenderebbe a scivolare.',
            extra: '<b>Attrito statico:</b> impedisce all\'oggetto di iniziare a muoversi (es. il piede della scala sul pavimento).<br><b>Attrito dinamico:</b> rallenta un oggetto che sta già scivolando.<br><b>Superficie liscia:</b> nel gergo fisico significa "senza attrito".',
            vediAnche: ['forza', 'reazione-normale']
        },

        // --- Biliardo / Urti ---
        'impulso': {
            termine: 'Impulso',
            simbolo: 'I',
            definizione: 'L\'impulso è la <b>"spinta totale"</b> che una forza dà a un oggetto in un certo intervallo di tempo. Anche una forza brevissima ma intensa (come il colpo di una stecca) può dare un impulso significativo.',
            formula: 'I = F \\cdot \\Delta t',
            formulaDesc: 'Impulso = Forza &times; tempo di contatto.',
            extra: '<b>Collegamento fondamentale:</b> l\'impulso è uguale alla variazione della quantità di moto: I = &Delta;p. Se l\'oggetto parte da fermo: I = m &middot; v.',
            vediAnche: ['quantita-di-moto', 'forza', 'newton-secondo']
        },
        'quantita-di-moto': {
            termine: 'Quantità di moto',
            simbolo: 'p',
            definizione: 'La quantità di moto misura quanto è "difficile fermare" un oggetto in movimento. Dipende dalla <b>massa</b> e dalla <b>velocità</b>. Un camion lento può avere la stessa quantità di moto di una pallottola veloce!',
            formula: '\\vec{p} = m \\cdot \\vec{v}',
            formulaDesc: 'È un vettore: ha la stessa direzione e verso della velocità.',
            vediAnche: ['conservazione-qdm', 'impulso', 'velocita']
        },
        'conservazione-qdm': {
            termine: 'Conservazione della quantità di moto',
            definizione: 'In un <b>sistema isolato</b> (nessuna forza esterna), la quantità di moto totale <b>non cambia mai</b>. Quello che c\'era prima di un urto deve esserci anche dopo, in ogni direzione.',
            formula: '\\sum \\vec{p}_{\\text{prima}} = \\sum \\vec{p}_{\\text{dopo}}',
            extra: '<b>Attenzione:</b> si conserva <b>separatamente</b> lungo ogni asse (x e y). Se prima dell\'urto non c\'era moto lungo y, dopo non ci può essere quantità di moto netta lungo y!',
            vediAnche: ['quantita-di-moto', 'urto']
        },
        'urto': {
            termine: 'Urto (collisione)',
            definizione: 'Un urto è un\'<b>interazione breve e intensa</b> tra due o più oggetti. Durante l\'urto, le forze interne sono enormi ma durano pochissimo. La quantità di moto totale si conserva sempre.',
            extra: '<b>Urto elastico:</b> si conserva anche l\'energia cinetica (es. palle da biliardo ideali).<br><b>Urto anelastico:</b> parte dell\'energia si perde in calore, suono, deformazione.',
            vediAnche: ['conservazione-qdm', 'impulso']
        },
        'velocita': {
            termine: 'Velocità',
            simbolo: 'v',
            definizione: 'La velocità indica <b>quanto velocemente</b> e <b>in quale direzione</b> si muove un oggetto. È un vettore: ha modulo (intensità), direzione e verso.',
            formula: 'v = \\frac{\\Delta s}{\\Delta t}',
            formulaDesc: 'Velocità = spazio percorso / tempo impiegato.',
            vediAnche: ['metro-secondo']
        },

        // --- Matematica ---
        'pitagora': {
            termine: 'Teorema di Pitagora',
            definizione: 'In un <b>triangolo rettangolo</b>, il quadrato dell\'ipotenusa (il lato più lungo, opposto all\'angolo retto) è uguale alla somma dei quadrati dei due cateti.',
            formula: 'c^2 = a^2 + b^2',
            formulaDesc: 'dove c è l\'ipotenusa e a, b sono i cateti.',
            extra: '<b>Utile per trovare un lato mancante:</b><br>&bull; Se conosci i due cateti: c = &radic;(a&sup2; + b&sup2;)<br>&bull; Se conosci l\'ipotenusa e un cateto: b = &radic;(c&sup2; &minus; a&sup2;)',
            vediAnche: ['triangolo-rettangolo']
        },
        'vettore': {
            termine: 'Vettore',
            definizione: 'Un vettore è una grandezza che ha <b>tre caratteristiche</b>: intensità (modulo), direzione e verso. Si rappresenta con una freccia. Esempi: forza, velocità, quantità di moto.',
            extra: '<b>Scalare vs vettore:</b> la temperatura è uno scalare (solo un numero). La forza è un vettore (numero + direzione). Puoi scomporre un vettore in componenti lungo assi perpendicolari.',
            vediAnche: ['componente', 'forza']
        },
        'triangolo-rettangolo': {
            termine: 'Triangolo rettangolo',
            definizione: 'Un triangolo che ha un <b>angolo di 90°</b> (angolo retto). I due lati che formano l\'angolo retto si chiamano <b>cateti</b>, il lato opposto (il più lungo) si chiama <b>ipotenusa</b>.',
            extra: 'I triangoli rettangoli sono fondamentali in fisica perché permettono di usare seno, coseno e il teorema di Pitagora per scomporre forze e velocità.',
            vediAnche: ['pitagora', 'seno-coseno']
        },

        // --- Unità di misura ---
        'newton': {
            termine: 'Newton (unità di misura)',
            simbolo: 'N',
            definizione: 'Il <b>Newton</b> è l\'unità di misura della forza nel Sistema Internazionale. Un Newton è la forza necessaria per dare a una massa di 1 kg un\'accelerazione di 1 m/s².',
            extra: '<b>Per avere un\'idea:</b><table class="term-table"><tr><th>Forza</th><th>Esempio</th></tr><tr><td>0,1 N</td><td>Premere un tasto della tastiera</td></tr><tr><td>1 N</td><td>Reggere una mela</td></tr><tr><td>10 N</td><td>Reggere una bottiglia d\'acqua piena</td></tr><tr><td>50 N</td><td>Stringere forte una mano</td></tr><tr><td>700 N</td><td>Peso di una persona (~70 kg)</td></tr><tr><td>20 000 N</td><td>Peso di un\'auto</td></tr></table>',
            vediAnche: ['forza', 'peso']
        },
        'kilogrammo': {
            termine: 'Chilogrammo (unità di massa)',
            simbolo: 'kg',
            definizione: 'Il <b>chilogrammo</b> è l\'unità di misura della massa nel Sistema Internazionale.',
            extra: '<b>Multipli e sottomultipli:</b><table class="term-table"><tr><th>Unità</th><th>Simbolo</th><th>Equivalenza</th><th>Esempio</th></tr><tr><td>Tonnellata</td><td>t</td><td>1000 kg</td><td>Un\'auto</td></tr><tr><td>Chilogrammo</td><td>kg</td><td>1 kg</td><td>Una bottiglia d\'acqua</td></tr><tr><td>Grammo</td><td>g</td><td>0,001 kg</td><td>Una graffetta</td></tr><tr><td>Milligrammo</td><td>mg</td><td>0,000001 kg</td><td>Un granello di sabbia</td></tr></table>',
            vediAnche: ['massa']
        },
        'metro': {
            termine: 'Metro (unità di lunghezza)',
            simbolo: 'm',
            definizione: 'Il <b>metro</b> è l\'unità di misura della lunghezza nel Sistema Internazionale.',
            extra: '<b>Multipli e sottomultipli:</b><table class="term-table"><tr><th>Unità</th><th>Simbolo</th><th>Equivalenza</th><th>Esempio</th></tr><tr><td>Chilometro</td><td>km</td><td>1000 m</td><td>~12 minuti a piedi</td></tr><tr><td>Metro</td><td>m</td><td>1 m</td><td>Una porta</td></tr><tr><td>Centimetro</td><td>cm</td><td>0,01 m</td><td>Larghezza di un dito</td></tr><tr><td>Millimetro</td><td>mm</td><td>0,001 m</td><td>Spessore di una moneta</td></tr></table>',
            vediAnche: []
        },
        'secondo': {
            termine: 'Secondo (unità di tempo)',
            simbolo: 's',
            definizione: 'Il <b>secondo</b> è l\'unità di misura del tempo nel Sistema Internazionale.',
            extra: '<b>Multipli e sottomultipli:</b><table class="term-table"><tr><th>Unità</th><th>Simbolo</th><th>Equivalenza</th><th>Esempio</th></tr><tr><td>Minuto</td><td>min</td><td>60 s</td><td>&mdash;</td></tr><tr><td>Secondo</td><td>s</td><td>1 s</td><td>Un battito cardiaco</td></tr><tr><td>Millisecondo</td><td>ms</td><td>0,001 s</td><td>Un colpo di stecca</td></tr><tr><td>Microsecondo</td><td>&mu;s</td><td>0,000001 s</td><td>Un flash elettronico</td></tr></table><br><b>Conversione:</b> per passare da ms a s, dividi per 1000. Es: 0,85 ms = 0,85 / 1000 = 0,00085 s.',
            vediAnche: []
        },
        'metro-secondo': {
            termine: 'Metro al secondo (unità di velocità)',
            simbolo: 'm/s',
            definizione: 'Il <b>m/s</b> è l\'unità di misura della velocità: indica quanti metri percorre un oggetto in un secondo.',
            extra: '<b>Per avere un\'idea:</b><table class="term-table"><tr><th>Velocità</th><th>Esempio</th></tr><tr><td>0,5 m/s</td><td>Palla da biliardo dopo l\'urto</td></tr><tr><td>1,4 m/s</td><td>Camminata tranquilla</td></tr><tr><td>5 m/s</td><td>Corsa / bicicletta</td></tr><tr><td>14 m/s</td><td>Auto in città (50 km/h)</td></tr><tr><td>28 m/s</td><td>Auto in autostrada (100 km/h)</td></tr><tr><td>340 m/s</td><td>Velocità del suono</td></tr></table><br><b>Conversione:</b> per passare da km/h a m/s, dividi per 3,6.',
            vediAnche: ['velocita']
        },
        'newton-secondo': {
            termine: 'Newton per secondo (unità di impulso)',
            simbolo: 'N\u00B7s',
            definizione: 'Il <b>N&middot;s</b> (Newton per secondo) è l\'unità di misura dell\'impulso e della quantità di moto. Indica il prodotto di una forza per il tempo durante cui agisce.',
            extra: '<b>Equivalenza:</b> 1 N&middot;s = 1 kg&middot;m/s (sono la stessa cosa, scritta in modo diverso!).<br>Un impulso di 0,6375 N&middot;s significa che una forza ha agito "per un totale" equivalente a 0,6375 Newton per un secondo.',
            vediAnche: ['impulso', 'quantita-di-moto']
        },
        'newton-metro': {
            termine: 'Newton per metro (unità di momento)',
            simbolo: 'N\u00B7m',
            definizione: 'Il <b>N&middot;m</b> (Newton per metro) è l\'unità di misura del momento di una forza. Indica il prodotto di una forza per la distanza (braccio) dal perno.',
            extra: '<b>Esempio:</b> una forza di 10 N applicata a 2 m dal perno genera un momento di 20 N&middot;m. La stessa forza a 1 m genera solo 10 N&middot;m.',
            vediAnche: ['momento', 'braccio']
        }
    };

    // ===== CALLOUT INLINE =====
    let activeCallout = null;

    function showCallout(termKey) {
        closeCallout();
        const term = termini[termKey];
        if (!term) return;

        const callout = document.createElement('div');
        callout.className = 'term-callout';
        callout.innerHTML = buildTermHTML(term, termKey, true);
        activeCallout = callout;

        // Inserisci sotto l'explanation container
        const container = document.querySelector('.explanation-container');
        container.parentNode.insertBefore(callout, container.nextSibling);

        // Render KaTeX nella formula
        renderFormulas(callout);

        // Click handler sui "vedi anche"
        callout.querySelectorAll('.term-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showCallout(link.dataset.term);
            });
        });

        // Chiudi con X
        callout.querySelector('.callout-close').addEventListener('click', closeCallout);

        // Animazione
        requestAnimationFrame(() => callout.classList.add('visible'));

        // Scroll al callout su mobile
        if (window.innerWidth <= 600) {
            setTimeout(() => callout.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }
    }

    function closeCallout() {
        if (activeCallout) {
            activeCallout.classList.remove('visible');
            setTimeout(() => { if (activeCallout) { activeCallout.remove(); activeCallout = null; } }, 200);
        }
    }

    // Chiudi callout cliccando fuori
    document.addEventListener('click', (e) => {
        if (activeCallout && !activeCallout.contains(e.target) && !e.target.classList.contains('term')) {
            closeCallout();
        }
    });

    // ===== MODALE GLOSSARIO =====
    function openModal() {
        const modal = document.getElementById('glossario-modal');
        const body = document.getElementById('glossario-body');

        // Genera lista termini ordinata
        const sorted = Object.entries(termini).sort((a, b) => a[1].termine.localeCompare(b[1].termine, 'it'));
        body.innerHTML = sorted.map(([key, term]) =>
            `<div class="glossario-item" data-key="${key}">
                <button class="glossario-item-header">
                    <span class="glossario-item-title">${term.termine}</span>
                    ${term.simbolo ? `<span class="glossario-item-symbol">${term.simbolo}</span>` : ''}
                    <span class="glossario-chevron">&#9660;</span>
                </button>
                <div class="glossario-item-body">${buildTermHTML(term, key, false)}</div>
            </div>`
        ).join('');

        // Accordion click
        body.querySelectorAll('.glossario-item-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const wasOpen = item.classList.contains('open');
                // Chiudi tutti
                body.querySelectorAll('.glossario-item.open').forEach(i => i.classList.remove('open'));
                if (!wasOpen) item.classList.add('open');
                // Render KaTeX quando apri
                if (!wasOpen) renderFormulas(item.querySelector('.glossario-item-body'));
            });
        });

        // "Vedi anche" link dentro il modale
        body.querySelectorAll('.term-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetKey = link.dataset.term;
                // Chiudi tutti, apri il target
                body.querySelectorAll('.glossario-item.open').forEach(i => i.classList.remove('open'));
                const targetItem = body.querySelector(`.glossario-item[data-key="${targetKey}"]`);
                if (targetItem) {
                    targetItem.classList.add('open');
                    renderFormulas(targetItem.querySelector('.glossario-item-body'));
                    targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Focus sulla ricerca
        setTimeout(() => document.getElementById('glossario-search').focus(), 200);
    }

    function closeModal() {
        document.getElementById('glossario-modal').classList.remove('open');
        document.body.style.overflow = '';
    }

    function filterGlossario(query) {
        const q = query.toLowerCase().trim();
        document.querySelectorAll('.glossario-item').forEach(item => {
            const key = item.dataset.key;
            const term = termini[key];
            const match = !q || term.termine.toLowerCase().includes(q) ||
                          term.definizione.toLowerCase().includes(q) ||
                          (term.simbolo && term.simbolo.toLowerCase().includes(q));
            item.style.display = match ? '' : 'none';
        });
    }

    // ===== UTILITÀ =====
    function buildTermHTML(term, key, isCallout) {
        let html = '';
        if (isCallout) {
            html += `<div class="callout-header"><span class="callout-icon">&#128214;</span> <b>${term.termine}</b>${term.simbolo ? ` <span class="callout-symbol">(${term.simbolo})</span>` : ''}<button class="callout-close" aria-label="Chiudi">&times;</button></div>`;
        }
        html += `<div class="term-definition">${term.definizione}</div>`;
        if (term.formula) {
            html += `<div class="term-formula" data-formula="${term.formula.replace(/"/g, '&quot;')}">${term.formulaDesc || ''}</div>`;
        }
        if (term.extra) {
            html += `<div class="term-extra">${term.extra}</div>`;
        }
        if (term.vediAnche && term.vediAnche.length > 0) {
            const links = term.vediAnche
                .filter(k => termini[k])
                .map(k => `<a href="#" class="term-link" data-term="${k}">${termini[k].termine}</a>`)
                .join(', ');
            if (links) html += `<div class="term-see-also">Vedi anche: ${links}</div>`;
        }
        return html;
    }

    function renderFormulas(container) {
        if (!container || typeof katex === 'undefined') return;
        container.querySelectorAll('.term-formula[data-formula]').forEach(el => {
            if (el.dataset.rendered) return;
            const desc = el.innerHTML;
            try {
                const formulaSpan = document.createElement('span');
                katex.render(el.dataset.formula, formulaSpan, { displayMode: false, throwOnError: false });
                el.innerHTML = formulaSpan.outerHTML + (desc ? `<br><span class="term-formula-desc">${desc}</span>` : '');
            } catch(e) {
                el.textContent = el.dataset.formula;
            }
            el.dataset.rendered = '1';
        });
    }

    // ===== INIT =====
    function init() {
        // Bottone glossario nell'header
        const btn = document.getElementById('btn-glossario');
        if (btn) btn.addEventListener('click', openModal);

        // Chiusura modale
        const closeBtn = document.getElementById('glossario-close');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        // Click fuori dal modale
        const modal = document.getElementById('glossario-modal');
        if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        // Ricerca
        const search = document.getElementById('glossario-search');
        if (search) search.addEventListener('input', (e) => filterGlossario(e.target.value));

        // ESC chiude
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { closeModal(); closeCallout(); }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return { showCallout, closeCallout, openModal, closeModal };
})();
