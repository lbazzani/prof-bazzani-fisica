// ===== Glossario Scientifico — Il Prof Bazzani =====

const Glossario = (() => {

    // ===== DIZIONARIO DEI TERMINI =====
    const termini = {
        // --- Meccanica base ---
        'forza': {
            termine: 'Forza',
            simbolo: 'F',
            categoria: 'Meccanica',
            definizione: 'Una forza è una grandezza che può <b>cambiare lo stato di moto</b> di un oggetto (accelerarlo, frenarlo, deviarlo) o <b>deformarlo</b>. Le forze sono vettori: hanno un\'intensità (quanto è forte), una direzione (dove punta) e un verso (in che senso va).',
            formula: 'F = m \\cdot a',
            formulaDesc: 'Seconda legge di Newton: la forza è uguale alla massa per l\'accelerazione.',
            vediAnche: ['peso', 'newton', 'vettore']
        },
        'massa': {
            termine: 'Massa',
            simbolo: 'm',
            categoria: 'Meccanica',
            definizione: 'La massa misura <b>quanta materia</b> c\'è in un oggetto. Non cambia mai: la tua massa è la stessa sulla Terra, sulla Luna o nello spazio. Si misura in <b>chilogrammi (kg)</b>.',
            extra: '<b>Non confondere massa e peso!</b> La massa è una proprietà dell\'oggetto; il peso è la forza con cui la gravità lo attira.',
            vediAnche: ['peso', 'kilogrammo']
        },
        'peso': {
            termine: 'Peso (forza peso)',
            simbolo: 'P',
            categoria: 'Meccanica',
            definizione: 'Il peso è la <b>forza di gravità</b> che la Terra esercita su un oggetto. Punta sempre <b>verticalmente verso il basso</b>. Dipende dalla massa dell\'oggetto e dall\'accelerazione di gravità del pianeta.',
            formula: 'P = m \\cdot g',
            formulaDesc: 'dove g = 9,8 m/s² sulla Terra.',
            extra: 'Un oggetto di 1 kg pesa circa 9,8 N sulla Terra, ma solo 1,6 N sulla Luna!',
            vediAnche: ['forza', 'massa', 'gravita', 'newton']
        },
        'gravita': {
            termine: 'Accelerazione di gravità',
            simbolo: 'g',
            categoria: 'Cinematica',
            definizione: 'È l\'accelerazione con cui la Terra attira tutti gli oggetti verso il suo centro. Sul nostro pianeta vale circa <b>9,8 m/s²</b> (spesso arrotondata a 10). Significa che un oggetto in caduta libera aumenta la sua velocità di 9,8 m/s ogni secondo.',
            extra: 'Varia leggermente in base a dove ti trovi: ai poli è un po\' più grande, all\'equatore un po\' più piccola.',
            vediAnche: ['peso', 'forza']
        },
        'equilibrio': {
            termine: 'Equilibrio statico',
            categoria: 'Meccanica',
            definizione: 'Un oggetto è in <b>equilibrio statico</b> quando è fermo e la <b>somma di tutte le forze</b> che agiscono su di esso è zero. Nessuna forza "vince" sulle altre: si bilanciano perfettamente.',
            formula: '\\sum \\vec{F} = 0',
            formulaDesc: 'La somma vettoriale di tutte le forze è il vettore nullo.',
            extra: '<b>Attenzione:</b> equilibrio non significa che non ci sono forze! Ci sono, ma si annullano a vicenda.',
            vediAnche: ['forza', 'diagramma-corpo-libero']
        },
        'diagramma-corpo-libero': {
            termine: 'Diagramma di corpo libero',
            categoria: 'Meccanica',
            definizione: 'È un disegno semplificato in cui si <b>isola un oggetto</b> e si rappresentano <b>solo le forze</b> che agiscono su di esso, come frecce (vettori). È il primo passo per risolvere qualsiasi problema di meccanica.',
            extra: '<b>Come si fa:</b> 1) Disegna l\'oggetto da solo. 2) Per ogni contatto (corda, superficie, ecc.) disegna la forza corrispondente. 3) Aggiungi il peso verso il basso. 4) Controlla di non aver dimenticato nulla!',
            vediAnche: ['forza', 'equilibrio']
        },

        // --- Piano inclinato ---
        'componente': {
            termine: 'Componente di un vettore',
            categoria: 'Vettori e componenti',
            definizione: 'Ogni vettore (es. una forza) può essere "spezzato" in due parti perpendicolari tra loro, chiamate <b>componenti</b>. Su un piano inclinato, si scompone il peso in una componente parallela al piano e una perpendicolare.',
            extra: '<b>Perché conviene?</b> Perché lungo ciascuna direzione possiamo scrivere un\'equazione di equilibrio indipendente, rendendo il problema molto più semplice!',
            vediAnche: ['vettore', 'seno-coseno']
        },
        'seno-coseno': {
            termine: 'Seno e Coseno',
            simbolo: 'sin, cos',
            categoria: 'Vettori e componenti',
            definizione: 'Sono funzioni trigonometriche che legano un <b>angolo</b> di un triangolo rettangolo ai rapporti tra i suoi lati. In un triangolo rettangolo con angolo &alpha;:<br><br>&bull; <b>sin &alpha;</b> = cateto opposto / ipotenusa<br>&bull; <b>cos &alpha;</b> = cateto adiacente / ipotenusa',
            extra: '<b>Valori da ricordare:</b><table class="term-table"><tr><th>&alpha;</th><th>sin &alpha;</th><th>cos &alpha;</th></tr><tr><td>0°</td><td>0</td><td>1</td></tr><tr><td>30°</td><td>0,5</td><td>0,866</td></tr><tr><td>45°</td><td>0,707</td><td>0,707</td></tr><tr><td>60°</td><td>0,866</td><td>0,5</td></tr><tr><td>90°</td><td>1</td><td>0</td></tr></table>',
            vediAnche: ['componente', 'triangolo-rettangolo']
        },
        'tensione': {
            termine: 'Tensione',
            simbolo: 'T',
            categoria: 'Meccanica',
            definizione: 'La tensione è la <b>forza trasmessa da una fune, cavo o corda</b> quando viene tirata. Agisce sempre <b>lungo la direzione della fune</b>, tirandola verso entrambe le estremità. Una fune ideale (senza massa, inestensibile) trasmette la stessa tensione in tutti i suoi punti.',
            vediAnche: ['forza', 'equilibrio']
        },
        'reazione-normale': {
            termine: 'Reazione normale',
            simbolo: 'N',
            categoria: 'Meccanica',
            definizione: 'Quando un oggetto è appoggiato su una superficie, la superficie esercita una forza di reazione che <b>impedisce all\'oggetto di attraversarla</b>. Questa forza è sempre <b>perpendicolare (normale) alla superficie</b>.',
            extra: 'Se il pavimento è orizzontale, N è verticale. Se la superficie è inclinata, anche N è inclinata!',
            vediAnche: ['forza', 'equilibrio', 'attrito']
        },
        'notazione-scientifica': {
            termine: 'Notazione scientifica',
            categoria: 'Matematica',
            definizione: 'Un modo compatto per scrivere numeri molto grandi o molto piccoli, come <b>a &times; 10<sup>n</sup></b> dove a è un numero tra 1 e 10.',
            extra: '<b>Esempi:</b><table class="term-table"><tr><th>Numero</th><th>Notazione scientifica</th></tr><tr><td>20 580</td><td>2,058 &times; 10<sup>4</sup></td></tr><tr><td>0,00085</td><td>8,5 &times; 10<sup>-4</sup></td></tr><tr><td>159,25</td><td>1,5925 &times; 10<sup>2</sup></td></tr></table>',
            vediAnche: []
        },

        // --- Scala / Momenti ---
        'momento': {
            termine: 'Momento di una forza (torque)',
            simbolo: 'M',
            categoria: 'Momenti',
            definizione: 'Il momento misura la tendenza di una forza a far <b>ruotare</b> un oggetto attorno a un punto (il perno). Dipende da due cose: quanto è forte la forza e quanto è lontana dal perno.',
            formula: 'M = F \\cdot b',
            formulaDesc: 'dove b è il braccio (distanza perpendicolare tra la linea d\'azione della forza e il perno).',
            extra: 'Un momento positivo fa ruotare in senso antiorario, uno negativo in senso orario (o viceversa, dipende dalla convenzione).',
            vediAnche: ['braccio', 'perno', 'equilibrio']
        },
        'braccio': {
            termine: 'Braccio di una forza',
            simbolo: 'b',
            categoria: 'Momenti',
            definizione: 'Il braccio è la <b>distanza perpendicolare</b> tra il <b>perno</b> (punto di rotazione) e la <b>linea d\'azione</b> della forza. Non è la distanza dal punto di applicazione, ma la distanza perpendicolare!',
            extra: '<b>Trucco:</b> se una forza passa esattamente per il perno, il suo braccio è zero e non genera momento. Per questo scegliamo il perno in modo furbo!',
            vediAnche: ['momento', 'perno']
        },
        'perno': {
            termine: 'Perno (punto di rotazione)',
            categoria: 'Momenti',
            definizione: 'Il perno è il punto attorno al quale un oggetto può <b>ruotare</b>. Nei problemi di equilibrio, possiamo scegliere <b>qualsiasi punto</b> come perno per calcolare i momenti &mdash; il risultato non cambia.',
            extra: '<b>Trucco furbo:</b> conviene scegliere il perno nel punto dove passano più forze incognite, così quelle forze hanno braccio zero e spariscono dal bilancio dei momenti!',
            vediAnche: ['momento', 'braccio']
        },
        'baricentro': {
            termine: 'Baricentro (centro di massa)',
            categoria: 'Meccanica',
            definizione: 'È il punto in cui si può immaginare <b>concentrata tutta la massa</b> di un oggetto. Per un oggetto uniforme (stessa densità ovunque), il baricentro è nel suo <b>centro geometrico</b>. La forza peso agisce sempre sul baricentro.',
            extra: 'Per una scala uniforme, il baricentro è esattamente a metà. Per un oggetto asimmetrico (es. una mazza da baseball) è più vicino alla parte pesante.',
            vediAnche: ['peso', 'massa']
        },
        'attrito': {
            termine: 'Attrito',
            simbolo: 'F_a',
            categoria: 'Meccanica',
            definizione: 'L\'attrito è una forza che si oppone al <b>movimento relativo</b> tra due superfici a contatto. È parallelo alla superficie e opposto alla direzione in cui l\'oggetto tenderebbe a scivolare.',
            extra: '<b>Attrito statico:</b> impedisce all\'oggetto di iniziare a muoversi (es. il piede della scala sul pavimento).<br><b>Attrito dinamico:</b> rallenta un oggetto che sta già scivolando.<br><b>Superficie liscia:</b> nel gergo fisico significa "senza attrito".',
            vediAnche: ['forza', 'reazione-normale']
        },

        // --- Biliardo / Urti ---
        'impulso': {
            termine: 'Impulso',
            simbolo: 'I',
            categoria: 'Impulso e urti',
            definizione: 'L\'impulso è la <b>"spinta totale"</b> che una forza dà a un oggetto in un certo intervallo di tempo. Anche una forza brevissima ma intensa (come il colpo di una stecca) può dare un impulso significativo.',
            formula: 'I = F \\cdot \\Delta t',
            formulaDesc: 'Impulso = Forza &times; tempo di contatto.',
            extra: '<b>Collegamento fondamentale:</b> l\'impulso è uguale alla variazione della quantità di moto: I = &Delta;p. Se l\'oggetto parte da fermo: I = m &middot; v.',
            vediAnche: ['quantita-di-moto', 'forza', 'newton-secondo']
        },
        'quantita-di-moto': {
            termine: 'Quantità di moto',
            simbolo: 'p',
            categoria: 'Impulso e urti',
            definizione: 'La quantità di moto misura quanto è "difficile fermare" un oggetto in movimento. Dipende dalla <b>massa</b> e dalla <b>velocità</b>. Un camion lento può avere la stessa quantità di moto di una pallottola veloce!',
            formula: '\\vec{p} = m \\cdot \\vec{v}',
            formulaDesc: 'È un vettore: ha la stessa direzione e verso della velocità.',
            vediAnche: ['conservazione-qdm', 'impulso', 'velocita']
        },
        'conservazione-qdm': {
            termine: 'Conservazione della quantità di moto',
            categoria: 'Impulso e urti',
            definizione: 'In un <b>sistema isolato</b> (nessuna forza esterna), la quantità di moto totale <b>non cambia mai</b>. Quello che c\'era prima di un urto deve esserci anche dopo, in ogni direzione.',
            formula: '\\sum \\vec{p}_{\\text{prima}} = \\sum \\vec{p}_{\\text{dopo}}',
            extra: '<b>Attenzione:</b> si conserva <b>separatamente</b> lungo ogni asse (x e y). Se prima dell\'urto non c\'era moto lungo y, dopo non ci può essere quantità di moto netta lungo y!',
            vediAnche: ['quantita-di-moto', 'urto']
        },
        'urto': {
            termine: 'Urto (collisione)',
            categoria: 'Impulso e urti',
            definizione: 'Un urto è un\'<b>interazione breve e intensa</b> tra due o più oggetti. Durante l\'urto, le forze interne sono enormi ma durano pochissimo. La quantità di moto totale si conserva sempre.',
            extra: '<b>Urto elastico:</b> si conserva anche l\'energia cinetica (es. palle da biliardo ideali).<br><b>Urto anelastico:</b> parte dell\'energia si perde in calore, suono, deformazione.',
            vediAnche: ['conservazione-qdm', 'impulso']
        },
        'velocita': {
            termine: 'Velocità',
            simbolo: 'v',
            categoria: 'Cinematica',
            definizione: 'La velocità indica <b>quanto velocemente</b> e <b>in quale direzione</b> si muove un oggetto. È un vettore: ha modulo (intensità), direzione e verso.',
            formula: 'v = \\frac{\\Delta s}{\\Delta t}',
            formulaDesc: 'Velocità = spazio percorso / tempo impiegato.',
            vediAnche: ['metro-secondo']
        },

        // --- Matematica ---
        'pitagora': {
            termine: 'Teorema di Pitagora',
            categoria: 'Matematica',
            definizione: 'In un <b>triangolo rettangolo</b>, il quadrato dell\'ipotenusa (il lato più lungo, opposto all\'angolo retto) è uguale alla somma dei quadrati dei due cateti.',
            formula: 'c^2 = a^2 + b^2',
            formulaDesc: 'dove c è l\'ipotenusa e a, b sono i cateti.',
            extra: '<b>Utile per trovare un lato mancante:</b><br>&bull; Se conosci i due cateti: c = &radic;(a&sup2; + b&sup2;)<br>&bull; Se conosci l\'ipotenusa e un cateto: b = &radic;(c&sup2; &minus; a&sup2;)',
            vediAnche: ['triangolo-rettangolo']
        },
        'vettore': {
            termine: 'Vettore',
            categoria: 'Vettori e componenti',
            definizione: 'Un vettore è una grandezza che ha <b>tre caratteristiche</b>: intensità (modulo), direzione e verso. Si rappresenta con una freccia. Esempi: forza, velocità, quantità di moto.',
            extra: '<b>Scalare vs vettore:</b> la temperatura è uno scalare (solo un numero). La forza è un vettore (numero + direzione). Puoi scomporre un vettore in componenti lungo assi perpendicolari.',
            vediAnche: ['componente', 'forza']
        },
        'triangolo-rettangolo': {
            termine: 'Triangolo rettangolo',
            categoria: 'Matematica',
            definizione: 'Un triangolo che ha un <b>angolo di 90°</b> (angolo retto). I due lati che formano l\'angolo retto si chiamano <b>cateti</b>, il lato opposto (il più lungo) si chiama <b>ipotenusa</b>.',
            extra: 'I triangoli rettangoli sono fondamentali in fisica perché permettono di usare seno, coseno e il teorema di Pitagora per scomporre forze e velocità.',
            vediAnche: ['pitagora', 'seno-coseno']
        },

        // --- Unità di misura ---
        'newton': {
            termine: 'Newton (unità di misura)',
            simbolo: 'N',
            categoria: 'Unità di misura',
            definizione: 'Il <b>Newton</b> è l\'unità di misura della forza nel Sistema Internazionale. Un Newton è la forza necessaria per dare a una massa di 1 kg un\'accelerazione di 1 m/s².',
            extra: '<b>Per avere un\'idea:</b><table class="term-table"><tr><th>Forza</th><th>Esempio</th></tr><tr><td>0,1 N</td><td>Premere un tasto della tastiera</td></tr><tr><td>1 N</td><td>Reggere una mela</td></tr><tr><td>10 N</td><td>Reggere una bottiglia d\'acqua piena</td></tr><tr><td>50 N</td><td>Stringere forte una mano</td></tr><tr><td>700 N</td><td>Peso di una persona (~70 kg)</td></tr><tr><td>20 000 N</td><td>Peso di un\'auto</td></tr></table>',
            vediAnche: ['forza', 'peso']
        },
        'kilogrammo': {
            termine: 'Chilogrammo (unità di massa)',
            simbolo: 'kg',
            categoria: 'Unità di misura',
            definizione: 'Il <b>chilogrammo</b> è l\'unità di misura della massa nel Sistema Internazionale.',
            extra: '<b>Multipli e sottomultipli:</b><table class="term-table"><tr><th>Unità</th><th>Simbolo</th><th>Equivalenza</th><th>Esempio</th></tr><tr><td>Tonnellata</td><td>t</td><td>1000 kg</td><td>Un\'auto</td></tr><tr><td>Chilogrammo</td><td>kg</td><td>1 kg</td><td>Una bottiglia d\'acqua</td></tr><tr><td>Grammo</td><td>g</td><td>0,001 kg</td><td>Una graffetta</td></tr><tr><td>Milligrammo</td><td>mg</td><td>0,000001 kg</td><td>Un granello di sabbia</td></tr></table>',
            vediAnche: ['massa']
        },
        'metro': {
            termine: 'Metro (unità di lunghezza)',
            simbolo: 'm',
            categoria: 'Unità di misura',
            definizione: 'Il <b>metro</b> è l\'unità di misura della lunghezza nel Sistema Internazionale.',
            extra: '<b>Multipli e sottomultipli:</b><table class="term-table"><tr><th>Unità</th><th>Simbolo</th><th>Equivalenza</th><th>Esempio</th></tr><tr><td>Chilometro</td><td>km</td><td>1000 m</td><td>~12 minuti a piedi</td></tr><tr><td>Metro</td><td>m</td><td>1 m</td><td>Una porta</td></tr><tr><td>Centimetro</td><td>cm</td><td>0,01 m</td><td>Larghezza di un dito</td></tr><tr><td>Millimetro</td><td>mm</td><td>0,001 m</td><td>Spessore di una moneta</td></tr></table>',
            vediAnche: []
        },
        'secondo': {
            termine: 'Secondo (unità di tempo)',
            simbolo: 's',
            categoria: 'Unità di misura',
            definizione: 'Il <b>secondo</b> è l\'unità di misura del tempo nel Sistema Internazionale.',
            extra: '<b>Multipli e sottomultipli:</b><table class="term-table"><tr><th>Unità</th><th>Simbolo</th><th>Equivalenza</th><th>Esempio</th></tr><tr><td>Minuto</td><td>min</td><td>60 s</td><td>&mdash;</td></tr><tr><td>Secondo</td><td>s</td><td>1 s</td><td>Un battito cardiaco</td></tr><tr><td>Millisecondo</td><td>ms</td><td>0,001 s</td><td>Un colpo di stecca</td></tr><tr><td>Microsecondo</td><td>&mu;s</td><td>0,000001 s</td><td>Un flash elettronico</td></tr></table><br><b>Conversione:</b> per passare da ms a s, dividi per 1000. Es: 0,85 ms = 0,85 / 1000 = 0,00085 s.',
            vediAnche: []
        },
        'metro-secondo': {
            termine: 'Metro al secondo (unità di velocità)',
            simbolo: 'm/s',
            categoria: 'Unità di misura',
            definizione: 'Il <b>m/s</b> è l\'unità di misura della velocità: indica quanti metri percorre un oggetto in un secondo.',
            extra: '<b>Per avere un\'idea:</b><table class="term-table"><tr><th>Velocità</th><th>Esempio</th></tr><tr><td>0,5 m/s</td><td>Palla da biliardo dopo l\'urto</td></tr><tr><td>1,4 m/s</td><td>Camminata tranquilla</td></tr><tr><td>5 m/s</td><td>Corsa / bicicletta</td></tr><tr><td>14 m/s</td><td>Auto in città (50 km/h)</td></tr><tr><td>28 m/s</td><td>Auto in autostrada (100 km/h)</td></tr><tr><td>340 m/s</td><td>Velocità del suono</td></tr></table><br><b>Conversione:</b> per passare da km/h a m/s, dividi per 3,6.',
            vediAnche: ['velocita']
        },
        'newton-secondo': {
            termine: 'Newton per secondo (unità di impulso)',
            simbolo: 'N\u00B7s',
            categoria: 'Unità di misura',
            definizione: 'Il <b>N&middot;s</b> (Newton per secondo) è l\'unità di misura dell\'impulso e della quantità di moto. Indica il prodotto di una forza per il tempo durante cui agisce.',
            extra: '<b>Equivalenza:</b> 1 N&middot;s = 1 kg&middot;m/s (sono la stessa cosa, scritta in modo diverso!).<br>Un impulso di 0,6375 N&middot;s significa che una forza ha agito "per un totale" equivalente a 0,6375 Newton per un secondo.',
            vediAnche: ['impulso', 'quantita-di-moto']
        },
        'newton-metro': {
            termine: 'Newton per metro (unità di momento)',
            simbolo: 'N\u00B7m',
            categoria: 'Unità di misura',
            definizione: 'Il <b>N&middot;m</b> (Newton per metro) è l\'unità di misura del momento di una forza. Indica il prodotto di una forza per la distanza (braccio) dal perno.',
            extra: '<b>Esempio:</b> una forza di 10 N applicata a 2 m dal perno genera un momento di 20 N&middot;m. La stessa forza a 1 m genera solo 10 N&middot;m.',
            vediAnche: ['momento', 'braccio']
        },

        // --- Nuovi termini ---
        'accelerazione': {
            termine: 'Accelerazione',
            simbolo: 'a',
            categoria: 'Meccanica',
            definizione: 'L\'accelerazione indica <b>quanto velocemente cambia la velocità</b> di un oggetto. Se un\'auto passa da 0 a 100 km/h, ha subìto un\'accelerazione. Può essere positiva (l\'oggetto accelera) o negativa (l\'oggetto frena).',
            formula: 'a = \\frac{F}{m} = \\frac{\\Delta v}{\\Delta t}',
            formulaDesc: 'Accelerazione = forza / massa, oppure variazione di velocità / tempo.',
            extra: '<b>Unità di misura:</b> m/s² (metri al secondo quadrato). Significa che ogni secondo la velocità cambia di tot m/s.',
            vediAnche: ['forza', 'massa', 'velocita']
        },
        'inerzia': {
            termine: 'Inerzia',
            categoria: 'Meccanica',
            definizione: 'L\'inerzia è la proprietà della materia di <b>resistere ai cambiamenti del proprio stato di moto</b>. Un oggetto fermo tende a restare fermo; un oggetto in movimento tende a continuare a muoversi in linea retta. È il concetto alla base della <b>prima legge di Newton</b>.',
            extra: '<b>Esempio quotidiano:</b> quando un autobus frena di colpo, tu continui a muoverti in avanti per inerzia. Più un oggetto è massiccio, più è difficile cambiare il suo stato di moto.',
            vediAnche: ['forza', 'massa', 'equilibrio']
        },
        'risultante': {
            termine: 'Forza risultante',
            simbolo: 'R',
            categoria: 'Meccanica',
            definizione: 'La risultante è la <b>singola forza</b> che produce lo stesso effetto di tutte le forze che agiscono insieme su un oggetto. Si ottiene facendo la <b>somma vettoriale</b> di tutte le forze.',
            formula: '\\vec{R} = \\sum \\vec{F}_i',
            formulaDesc: 'La risultante è la somma vettoriale di tutte le forze.',
            extra: '<b>Se la risultante è zero</b>, l\'oggetto è in equilibrio (non accelera). Se è diversa da zero, l\'oggetto accelera nella direzione della risultante.',
            vediAnche: ['forza', 'vettore', 'equilibrio']
        },
        'energia-cinetica': {
            termine: 'Energia cinetica',
            simbolo: 'Ec',
            categoria: 'Energia',
            definizione: 'L\'energia cinetica è l\'<b>energia che un oggetto possiede perché si muove</b>. Più un oggetto è pesante o più va veloce, più energia cinetica ha. Dipende dalla massa e dal <b>quadrato</b> della velocità.',
            formula: 'E_c = \\frac{1}{2} m v^2',
            formulaDesc: 'Energia cinetica = metà della massa per la velocità al quadrato.',
            extra: '<b>Unità di misura:</b> Joule (J). Raddoppiando la velocità, l\'energia cinetica diventa <b>quattro volte</b> più grande!',
            vediAnche: ['massa', 'velocita', 'energia-potenziale', 'joule']
        },
        'energia-potenziale': {
            termine: 'Energia potenziale gravitazionale',
            simbolo: 'Ep',
            categoria: 'Energia',
            definizione: 'L\'energia potenziale gravitazionale è l\'<b>energia che un oggetto possiede per via della sua posizione</b> (altezza) rispetto al suolo. Più un oggetto è in alto e più è pesante, più energia potenziale ha.',
            formula: 'E_p = m g h',
            formulaDesc: 'Energia potenziale = massa × accelerazione di gravità × altezza.',
            extra: '<b>Unità di misura:</b> Joule (J). Quando l\'oggetto cade, l\'energia potenziale si trasforma in energia cinetica.',
            vediAnche: ['energia-cinetica', 'gravita', 'massa']
        },
        'lavoro': {
            termine: 'Lavoro',
            simbolo: 'L',
            categoria: 'Energia',
            definizione: 'Il lavoro è l\'<b>energia trasferita</b> a un oggetto quando una forza lo sposta. Se la forza e lo spostamento sono nella stessa direzione, il lavoro è positivo; se sono opposti, è negativo.',
            formula: 'L = F \\cdot d \\cdot \\cos \\theta',
            formulaDesc: 'Lavoro = forza × spostamento × coseno dell\'angolo tra forza e spostamento.',
            extra: '<b>Unità di misura:</b> Joule (J) = Newton × metro. Se spingi un oggetto di 10 N per 3 m nella stessa direzione: L = 10 × 3 = 30 J.',
            vediAnche: ['forza', 'energia-cinetica']
        },
        'joule': {
            termine: 'Joule',
            simbolo: 'J',
            categoria: 'Unità di misura',
            definizione: 'Il <b>Joule</b> è l\'unità di misura dell\'energia e del lavoro nel Sistema Internazionale. Un Joule è l\'energia necessaria per spostare un oggetto di 1 metro applicando una forza di 1 Newton.',
            formula: '1 \\text{ J} = 1 \\text{ N} \\cdot \\text{m} = 1 \\text{ kg} \\cdot \\text{m}^2 / \\text{s}^2',
            formulaDesc: '1 Joule = 1 Newton per metro = 1 kg·m²/s².',
            extra: '<b>Per avere un\'idea:</b> sollevare una mela (100 g) di 1 metro richiede circa 1 J.',
            vediAnche: ['newton', 'energia-cinetica', 'energia-potenziale']
        },
        'conservazione-energia': {
            termine: 'Conservazione dell\'energia meccanica',
            categoria: 'Energia',
            definizione: 'In un sistema <b>senza attrito</b>, l\'energia meccanica totale (somma di energia cinetica e potenziale) si <b>conserva</b>: non si crea e non si distrugge, ma si trasforma da una forma all\'altra.',
            formula: 'E_p + E_c = \\text{costante}',
            formulaDesc: 'L\'energia potenziale più l\'energia cinetica resta sempre uguale.',
            extra: '<b>Esempio:</b> una palla che cade perde energia potenziale, ma guadagna altrettanta energia cinetica. La somma totale non cambia!',
            vediAnche: ['energia-cinetica', 'energia-potenziale']
        },
        'sistema-isolato': {
            termine: 'Sistema isolato',
            categoria: 'Impulso e urti',
            definizione: 'Un sistema isolato è un insieme di oggetti su cui <b>non agiscono forze esterne</b> (o le forze esterne si annullano). In un sistema isolato, la <b>quantità di moto totale si conserva</b>.',
            extra: '<b>Esempio:</b> due palle da biliardo che si scontrano formano (circa) un sistema isolato durante l\'urto, perché le forze tra di loro sono molto più grandi dell\'attrito col tavolo.',
            vediAnche: ['forza', 'quantita-di-moto', 'conservazione-qdm']
        },
        'scalare': {
            termine: 'Grandezza scalare',
            categoria: 'Vettori e componenti',
            definizione: 'Una grandezza scalare è una quantità fisica descritta <b>solo da un numero</b> (e dalla sua unità di misura). Non ha direzione né verso. Esempi: massa, temperatura, tempo, energia.',
            extra: '<b>Scalare vs vettore:</b> la massa (5 kg) è uno scalare &mdash; basta un numero. La forza (10 N verso destra) è un vettore &mdash; serve anche una direzione e un verso.',
            vediAnche: ['vettore', 'massa']
        },
        'ordine-di-grandezza': {
            termine: 'Ordine di grandezza',
            categoria: 'Matematica',
            definizione: 'L\'ordine di grandezza di un numero è la <b>potenza di 10 più vicina</b> a quel numero. Serve per fare stime rapide e per capire se un risultato "ha senso" o se abbiamo sbagliato qualcosa di grosso.',
            extra: '<b>Esempi:</b><table class="term-table"><tr><th>Numero</th><th>Ordine di grandezza</th></tr><tr><td>8</td><td>10<sup>1</sup></td></tr><tr><td>350</td><td>10<sup>2</sup> (oppure 10<sup>3</sup>)</td></tr><tr><td>70 000</td><td>10<sup>5</sup></td></tr><tr><td>0,003</td><td>10<sup>-3</sup></td></tr></table><b>Regola pratica:</b> scrivi il numero in notazione scientifica. L\'esponente è (circa) l\'ordine di grandezza.',
            vediAnche: ['notazione-scientifica']
        }
    };

    // ===== ANALYTICS HELPER =====
    const track = (event, params) => { if (typeof gtag === 'function') gtag('event', event, params); };

    // ===== TERM MODAL (replaces inline callout) =====
    let termModalEl = null;
    const termNavStack = []; // stack of termKeys for back navigation

    function injectTermModal() {
        if (document.getElementById('term-modal')) return;
        const modal = document.createElement('div');
        modal.className = 'term-modal';
        modal.id = 'term-modal';
        modal.innerHTML =
            '<div class="term-modal-backdrop"></div>' +
            '<div class="term-modal-panel">' +
                '<div class="term-modal-header">' +
                    '<button class="term-modal-back" id="term-modal-back" aria-label="Indietro" style="display:none">&#8592;</button>' +
                    '<span class="term-modal-title" id="term-modal-title"></span>' +
                    '<button class="term-modal-close" id="term-modal-close" aria-label="Chiudi">&times;</button>' +
                '</div>' +
                '<div class="term-modal-breadcrumb" id="term-modal-breadcrumb"></div>' +
                '<div class="term-modal-body" id="term-modal-body"></div>' +
            '</div>';
        document.body.appendChild(modal);
        termModalEl = modal;

        // Close handlers
        modal.querySelector('.term-modal-backdrop').addEventListener('click', closeCallout);
        document.getElementById('term-modal-close').addEventListener('click', closeCallout);
        document.getElementById('term-modal-back').addEventListener('click', termGoBack);
    }

    function showCallout(termKey) {
        const term = termini[termKey];
        if (!term) return;
        track('glossary_term', { term_key: termKey, term_name: term.termine });

        if (!termModalEl) injectTermModal();

        // Push to nav stack (avoid duplicates at top)
        if (termNavStack.length === 0 || termNavStack[termNavStack.length - 1] !== termKey) {
            termNavStack.push(termKey);
        }

        renderTermModal(termKey);
        termModalEl.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function renderTermModal(termKey) {
        const term = termini[termKey];
        if (!term) return;

        const title = document.getElementById('term-modal-title');
        const body = document.getElementById('term-modal-body');
        const backBtn = document.getElementById('term-modal-back');
        const breadcrumb = document.getElementById('term-modal-breadcrumb');

        // Title
        title.textContent = term.termine + (term.simbolo ? ` (${term.simbolo})` : '');

        // Back button
        backBtn.style.display = termNavStack.length > 1 ? '' : 'none';

        // Breadcrumb trail
        if (termNavStack.length > 1) {
            breadcrumb.innerHTML = termNavStack.map((key, i) => {
                const t = termini[key];
                if (!t) return '';
                const isLast = i === termNavStack.length - 1;
                if (isLast) return `<span class="term-crumb-current">${t.termine}</span>`;
                return `<a href="#" class="term-crumb-link" data-crumb-idx="${i}">${t.termine}</a>`;
            }).join(' <span class="term-crumb-sep">›</span> ');
            breadcrumb.style.display = '';

            // Breadcrumb click handlers
            breadcrumb.querySelectorAll('.term-crumb-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const idx = parseInt(link.dataset.crumbIdx);
                    // Pop stack back to this index
                    termNavStack.length = idx + 1;
                    renderTermModal(termNavStack[idx]);
                });
            });
        } else {
            breadcrumb.innerHTML = '';
            breadcrumb.style.display = 'none';
        }

        // Body content
        let html = `<div class="term-definition">${term.definizione}</div>`;
        if (term.formula) {
            html += `<div class="term-formula" data-formula="${term.formula.replace(/"/g, '&quot;')}">${term.formulaDesc || ''}</div>`;
        }
        if (term.extra) {
            html += `<div class="term-extra">${term.extra}</div>`;
        }
        if (term.vediAnche && term.vediAnche.length > 0) {
            const links = term.vediAnche
                .filter(k => termini[k])
                .map(k => `<a href="#" class="term-link term-modal-link" data-term="${k}">${termini[k].termine}</a>`)
                .join('');
            html += `<div class="term-see-also-grid">${links}</div>`;
        }
        body.innerHTML = html;

        // Render KaTeX
        renderFormulas(body);

        // "Vedi anche" click → navigate deeper
        body.querySelectorAll('.term-modal-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showCallout(link.dataset.term);
            });
        });

        // Animate body content
        body.style.animation = 'none';
        body.offsetHeight; // trigger reflow
        body.style.animation = 'termSlideIn 0.2s ease';
    }

    function termGoBack() {
        if (termNavStack.length <= 1) return;
        termNavStack.pop();
        renderTermModal(termNavStack[termNavStack.length - 1]);
    }

    function closeCallout() {
        if (termModalEl) {
            termModalEl.classList.remove('open');
            document.body.style.overflow = '';
            termNavStack.length = 0;
        }
    }

    // ===== CATEGORY CONFIG =====
    const categoryOrder = [
        { key: 'Meccanica',              icon: '\u{1F4AA}' },
        { key: 'Vettori e componenti',   icon: '\u{27A1}\uFE0F' },
        { key: 'Cinematica',             icon: '\u{1F3C3}' },
        { key: 'Momenti',                icon: '\u{1F504}' },
        { key: 'Impulso e urti',         icon: '\u{1F4A5}' },
        { key: 'Energia',                icon: '\u{26A1}' },
        { key: 'Matematica',             icon: '\u{1F4D0}' },
        { key: 'Unità di misura',        icon: '\u{1F4CF}' }
    ];

    function renderTermItem(key, term) {
        return `<div class="glossario-item" data-key="${key}">
                <button class="glossario-item-header">
                    <span class="glossario-item-title">${term.termine}</span>
                    ${term.simbolo ? `<span class="glossario-item-symbol">${term.simbolo}</span>` : ''}
                    <span class="glossario-chevron">&#9660;</span>
                </button>
                <div class="glossario-item-body">${buildTermHTML(term, key, false)}</div>
            </div>`;
    }

    function renderCategorized() {
        // Group terms by category
        const groups = {};
        Object.entries(termini).forEach(([key, term]) => {
            const cat = term.categoria || 'Altro';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push([key, term]);
        });
        // Sort terms within each group alphabetically
        Object.values(groups).forEach(arr => arr.sort((a, b) => a[1].termine.localeCompare(b[1].termine, 'it')));

        let html = '';
        categoryOrder.forEach(({ key: cat, icon }) => {
            if (!groups[cat] || groups[cat].length === 0) return;
            html += `<div class="glossario-cat">
                <h4 class="glossario-cat-title">${icon} ${cat}</h4>
                ${groups[cat].map(([k, t]) => renderTermItem(k, t)).join('')}
            </div>`;
            delete groups[cat];
        });
        // Any remaining categories not in the predefined order
        Object.entries(groups).forEach(([cat, entries]) => {
            if (entries.length === 0) return;
            html += `<div class="glossario-cat">
                <h4 class="glossario-cat-title">${cat}</h4>
                ${entries.map(([k, t]) => renderTermItem(k, t)).join('')}
            </div>`;
        });
        return html;
    }

    function renderFlat() {
        const sorted = Object.entries(termini).sort((a, b) => a[1].termine.localeCompare(b[1].termine, 'it'));
        return sorted.map(([key, term]) => renderTermItem(key, term)).join('');
    }

    // ===== MODALE GLOSSARIO =====
    function openModal() {
        track('glossary_open', {});
        const modal = document.getElementById('glossario-modal');
        const body = document.getElementById('glossario-body');

        // Render categorized view by default
        body.innerHTML = renderCategorized();

        setupBodyListeners(body);

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Focus sulla ricerca
        setTimeout(() => document.getElementById('glossario-search').focus(), 200);
    }

    function setupBodyListeners(body) {
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
    }

    function closeModal() {
        document.getElementById('glossario-modal').classList.remove('open');
        document.body.style.overflow = '';
    }

    function filterGlossario(query) {
        const q = query.toLowerCase().trim();
        const body = document.getElementById('glossario-body');

        if (!q) {
            // No search: show categorized view
            body.innerHTML = renderCategorized();
            setupBodyListeners(body);
            return;
        }

        // Search active: show flat filtered results
        body.innerHTML = renderFlat();
        setupBodyListeners(body);

        body.querySelectorAll('.glossario-item').forEach(item => {
            const key = item.dataset.key;
            const term = termini[key];
            const match = term.termine.toLowerCase().includes(q) ||
                          term.definizione.toLowerCase().includes(q) ||
                          (term.simbolo && term.simbolo.toLowerCase().includes(q)) ||
                          (term.extra && term.extra.toLowerCase().includes(q)) ||
                          (term.formulaDesc && term.formulaDesc.toLowerCase().includes(q));
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

    // ===== INJECT MODAL HTML =====
    function injectModal() {
        // Avoid duplicates if called twice
        if (document.getElementById('glossario-modal')) return;

        const modal = document.createElement('div');
        modal.className = 'glossario-modal';
        modal.id = 'glossario-modal';
        modal.innerHTML =
            '<div class="glossario-panel">' +
                '<div class="glossario-header">' +
                    '<h2>\u{1F4D6} Glossario</h2>' +
                    '<button class="glossario-close" id="glossario-close" aria-label="Chiudi">&times;</button>' +
                '</div>' +
                '<div class="glossario-search-box">' +
                    '<input type="text" id="glossario-search" placeholder="Cerca un termine..." autocomplete="off">' +
                '</div>' +
                '<div class="glossario-body" id="glossario-body"></div>' +
            '</div>';
        document.body.appendChild(modal);
    }

    // ===== INIT =====
    function init() {
        // Inject modal HTML into the page
        injectModal();
        injectTermModal();

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
