// Complete curated recipe catalog for CucinApp
export const INITIAL_RECIPES = [
  // --- Le 8 Ricette da ricette.md ---
  {
    id: 'recipe-risotto-vino-rosso',
    title: 'Risotto al Vino Rosso e Stracciatella (Versione Smart)',
    category: 'Primi',
    prepTime: 5,
    cookTime: 18,
    servings: 4,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo Revisionato',
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
    personalNotes: 'Niente pentolini separati né riduzioni con zucchero: il vino evapora direttamente sul riso caldo tostato a secco. Mantecare a fuoco rigorosamente spento con burro freddissimo.',
    createdAt: new Date('2026-02-01T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-rvr-1', name: 'Riso Carnaroli', amount: 340, unit: 'g' },
      { id: 'ing-rvr-2', name: 'Vino rosso fermo comune in bottiglia (Barbera, Chianti o Bonarda)', amount: 300, unit: 'ml' },
      { id: 'ing-rvr-3', name: 'Brodo leggero bollente (acqua + 1 cucchiaino dado delicato)', amount: 1200, unit: 'ml' },
      { id: 'ing-rvr-4', name: 'Burro freddo da frigorifero (o freezer)', amount: 40, unit: 'g' },
      { id: 'ing-rvr-5', name: 'Parmigiano Reggiano o Grana Padano grattugiato', amount: 45, unit: 'g' },
      { id: 'ing-rvr-6', name: 'Stracciatella fresca a temperatura ambiente', amount: 200, unit: 'g' },
      { id: 'ing-rvr-7', name: 'Pepe nero macinato', amount: 1, unit: 'q.b.' }
    ],
    steps: [
      {
        id: 'step-rvr-1',
        instruction: 'Scalda la casseruola a secco a fiamma medio-alta. Versa il riso Carnaroli e tosta per 2 minuti muovendolo spesso finché i chicchi non sono caldi al tatto.',
        timerMinutes: 2,
        tip: 'Tostatura a secco in pentola unica: niente burro o cipolla all\'inizio per far assorbire al meglio il vino.'
      },
      {
        id: 'step-rvr-2',
        instruction: 'Versa tutto il vino rosso (circa 1 bicchiere e mezzo abbondante) direttamente sul riso caldissimo. Tieni la fiamma vivace e lascia evaporare per 3 minuti finché l\'odore pungente di alcol scompare del tutto.',
        timerMinutes: 3,
        tip: 'Il chicco beve il colore e i profumi concentrandosi senza bisogno di zuccheri aggiunti.'
      },
      {
        id: 'step-rvr-3',
        instruction: 'Abbassa la fiamma a livello medio e aggiungi il brodo caldo 1-2 mestoli per volta, rabboccando quando il precedente si è quasi assorbito. Cuoci per circa 15 minuti senza salare.',
        timerMinutes: 15,
        tip: 'Non aggiungere sale: la sapidità del dado vegetale e del formaggio finale sarà sufficiente.'
      },
      {
        id: 'step-rvr-4',
        instruction: 'Spegni il fuoco, sposta la pentola dal fornello caldo e fai riposare 1 minuto coperto. Unisci il burro freddo e il formaggio grattugiato, mescolando energicamente per creare l\'onda.',
        timerMinutes: 1,
        tip: 'Se serve, aggiungi un cucchiaio di brodo caldo per renderlo fluidissimo e all\'onda.'
      },
      {
        id: 'step-rvr-5',
        instruction: 'Versa nei piatti piani, picchietta sotto il piatto per stendere il riso e adagia al centro una generosa cucchiaiata di stracciatella fresca a crudo e un pizzico di pepe nero.',
        timerMinutes: 0,
        tip: 'Il contrasto caldo/freddo tra il riso e la stracciatella fresca è favoloso!'
      }
    ]
  },
  {
    id: 'recipe-ferrero-rocher-gf',
    title: 'Ferrero Rocher Senza Glutine (Freezer & Tazza)',
    category: 'Dolci',
    prepTime: 15,
    cookTime: 0,
    servings: 12,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo Revisionato',
    imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Metodo espresso senza termometri né temperaggi. Il contrasto termico della pallina gelata fissa il guscio di cioccolato in 60 secondi netti.',
    createdAt: new Date('2026-02-02T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-fr-1', name: 'Crema di nocciole (Nutella o crema spalmabile gluten-free)', amount: 150, unit: 'g' },
      { id: 'ing-fr-2', name: 'Wafer senza glutine (alla vaniglia o al cacao)', amount: 70, unit: 'g' },
      { id: 'ing-fr-3', name: 'Nocciole intere tostate', amount: 12, unit: 'pezzi' },
      { id: 'ing-fr-4', name: 'Cioccolato fondente (o al latte)', amount: 150, unit: 'g' },
      { id: 'ing-fr-5', name: 'Granella di nocciole tostate', amount: 40, unit: 'g' },
      { id: 'ing-fr-6', name: 'Olio di semi (girasole o mais)', amount: 1, unit: 'cucchiaino' }
    ],
    steps: [
      {
        id: 'step-fr-1',
        instruction: 'In una ciotola sbriciola i wafer senza glutine direttamente con le mani a pezzi irregolari (niente mixer per mantenerli croccanti). Unisci la crema di nocciole e mescola con un cucchiaio.',
        timerMinutes: 0,
        tip: 'Evita il mixer altrimenti i wafer si riducono in polvere e perdono il crunch.'
      },
      {
        id: 'step-fr-2',
        instruction: 'Preleva una noce di impasto, inserisci una nocciola intera al centro e modella una pallina tra i palmi delle mani. Disponi le palline su un piatto foderato con carta forno.',
        timerMinutes: 0,
        tip: 'Inumidisci leggermente le mani se l\'impasto risulta troppo appiccicoso.'
      },
      {
        id: 'step-fr-3',
        instruction: 'Metti il piatto con le palline in freezer per 20 minuti: devono diventare ben sode e gelate.',
        timerMinutes: 20,
        tip: 'Questo è il vero trucco che eviterà di dover temperare il cioccolato.'
      },
      {
        id: 'step-fr-4',
        instruction: 'Spezzetta il cioccolato in una tazza capiente e scioglilo al microonde a impulsi di 20-30 secondi. Unisci il cucchiaino di olio di semi e versa nella tazza la granella di nocciole.',
        timerMinutes: 1,
        tip: 'L\'olio di semi rende la glassa fluida, elastica e brillante.'
      },
      {
        id: 'step-fr-5',
        instruction: 'Tira fuori le palline dal freezer. Immergile una alla volta nella tazza aiutandoti con una forchetta, scolale e riappoggiale sulla carta forno. Il cioccolato si solidificherà in circa 60 secondi!',
        timerMinutes: 1,
        tip: 'Grazie al contrasto termico il cioccolato diventa subito croccante come i veri Ferrero Rocher.'
      }
    ]
  },
  {
    id: 'recipe-arancini-gf',
    title: 'Arancini al Ragù Senza Glutine (Anti-Rottura)',
    category: 'Antipasti',
    prepTime: 25,
    cookTime: 8,
    servings: 8,
    difficulty: 'Media',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo Revisionato',
    imageUrl: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Riso freddo di frigorifero e provola asciutta a panetto sono la garanzia anti-apertura in frittura. I corn flakes senza glutine sbriciolati regalano una doratura spettacolare.',
    createdAt: new Date('2026-02-03T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-ar-1', name: 'Riso Carnaroli o Roma', amount: 400, unit: 'g' },
      { id: 'ing-ar-2', name: 'Acqua o brodo vegetale leggero', amount: 850, unit: 'ml' },
      { id: 'ing-ar-3', name: 'Zafferano in polvere (sciolto in poca acqua)', amount: 1, unit: 'bustina' },
      { id: 'ing-ar-4', name: 'Burro', amount: 30, unit: 'g' },
      { id: 'ing-ar-5', name: 'Parmigiano grattugiato', amount: 40, unit: 'g' },
      { id: 'ing-ar-6', name: 'Ragù di carne ristretto, denso e freddo di frigo', amount: 150, unit: 'g' },
      { id: 'ing-ar-7', name: 'Provola dolce a panetto o mozzarella per pizza asciutta a cubetti', amount: 100, unit: 'g' },
      { id: 'ing-ar-8', name: 'Uova intere', amount: 2, unit: 'uova' },
      { id: 'ing-ar-9', name: 'Pangrattato senza glutine', amount: 120, unit: 'g' },
      { id: 'ing-ar-10', name: 'Corn flakes senza glutine sbriciolati a mano', amount: 40, unit: 'g' },
      { id: 'ing-ar-11', name: 'Olio di semi di arachidi per friggere', amount: 500, unit: 'ml' }
    ],
    steps: [
      {
        id: 'step-ar-1',
        instruction: 'Cuoci il riso nel brodo finché il liquido è completamente assorbito. Manteca con burro, parmigiano e zafferano. Stendilo su un vassoio largo e fallo raffreddare completamente in frigorifero per almeno 2 ore (anche tutta la notte).',
        timerMinutes: 120,
        tip: 'L\'amido freddo di frigo si compatta e fa da collante naturale anti-rottura.'
      },
      {
        id: 'step-ar-2',
        instruction: 'Inumidisci le mani. Prendi una porzione di riso freddo (circa 80g), appiattiscila sul palmo formando una conca. Metti al centro un cucchiaino colmo di ragù denso e cubetti di provola asciutta. Sigilla bene formando una sfera solida.',
        timerMinutes: 0,
        tip: 'MAI usare mozzarella fresca acquosa: rilascerebbe vapore facendo esplodere l\'arancino.'
      },
      {
        id: 'step-ar-3',
        instruction: 'Sbatti le uova con un pizzico di sale in un piatto fondo. In un altro piatto mescola il pangrattato senza glutine con i corn flakes sbriciolati. Passa ciascun arancino prima nell\'uovo e poi nella panatura premendo bene.',
        timerMinutes: 0,
        tip: 'I corn flakes donano una croccantezza dorata favolosa senza richiedere pastelle complesse.'
      },
      {
        id: 'step-ar-4',
        instruction: 'Scalda abbondante olio in una pentola alta a circa 170°C. Friggi 2 arancini alla volta completamente immersi per 4-5 minuti fino a doratura croccante uniforme. Scola su carta assorbente e riposa 2 minuti prima di servire.',
        timerMinutes: 5,
        tip: 'Immergendo uno stecchino di legno nell\'olio, quando si formano bollicine vivaci la temperatura è perfetta.'
      }
    ]
  },
  {
    id: 'recipe-carbonara-rustica',
    title: 'Spaghetti alla Carbonara Rustica (Fuori Fuoco)',
    category: 'Primi',
    prepTime: 5,
    cookTime: 10,
    servings: 4,
    difficulty: 'Facile',
    isGlutenFree: false,
    sourceName: 'Ricettario Casalingo Revisionato',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
    personalNotes: 'Solo tuorli d\'uovo (niente albume) per scongiurare l\'effetto frittata. Spostare fisicamente la padella dal piano cottura prima di versare la crema di uova.',
    createdAt: new Date('2026-02-04T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-cr-1', name: 'Spaghetti o spaghettoni', amount: 380, unit: 'g' },
      { id: 'ing-cr-2', name: 'Pancetta tesa (o guanciale) a listarelle di 0,5 cm', amount: 170, unit: 'g' },
      { id: 'ing-cr-3', name: 'Tuorli d\'uovo freschi grandi (NO albume)', amount: 5, unit: 'tuorli' },
      { id: 'ing-cr-4', name: 'Grana Padano o Parmigiano Reggiano grattugiato (o 50% Pecorino)', amount: 75, unit: 'g' },
      { id: 'ing-cr-5', name: 'Pepe nero macinato al momento', amount: 1, unit: 'q.b.' }
    ],
    steps: [
      {
        id: 'step-cr-1',
        instruction: 'Metti la pancetta in una padella a freddo senza olio né burro. Accendi la fiamma a livello medio-basso e lascia sfrigolare per 7 minuti fino a renderla croccante. Togli la pancetta su un piattino, lasciando il grasso fuso in padella.',
        timerMinutes: 7,
        tip: 'La pancetta a freddo rilascia il suo grasso lentamente diventando croccante senza bruciare.'
      },
      {
        id: 'step-cr-2',
        instruction: 'In una ciotola versa i 5 tuorli, il formaggio grattugiato e tanto pepe nero. Sbatti energicamente con una forchetta per 30 secondi fino a ottenere una pasta densa e profumata.',
        timerMinutes: 0,
        tip: 'Niente albume: l\'albume coagula a temperature più basse ed è l\'unico responsabile dell\'effetto frittata.'
      },
      {
        id: 'step-cr-3',
        instruction: 'Cuoci gli spaghetti in abbondante acqua bollente poco salata. Scolali molto al dente, tenendo da parte una tazza di acqua di cottura ricca di amido.',
        timerMinutes: 10,
        tip: 'L\'acqua di cottura è l\'emulsionante fondamentale per la cremina.'
      },
      {
        id: 'step-cr-4',
        instruction: 'Butta la pasta direttamente nella padella col grasso caldo, aggiungi mezzo mestolino d\'acqua di cottura e salta a fiamma viva per 40 secondi per legare l\'amido.',
        timerMinutes: 1,
        tip: 'Questo passaggio lucida gli spaghetti con il grasso saporito.'
      },
      {
        id: 'step-cr-5',
        instruction: 'Spegni il fornello e SPOSTA la padella dal piano cottura caldo. Attendi 30 secondi che il forte sfrigolio si calmi. Versa la crema di tuorli e mescola energicamente con una pinza. Unisci la pancetta croccante e servi subito.',
        timerMinutes: 0,
        tip: 'Il calore residuo della pasta creerà una crema lucida e setosa senza grumi.'
      }
    ]
  },
  {
    id: 'recipe-torta-fondente-panna',
    title: 'Torta Soffice Fondente alla Panna (Anti-Crollo)',
    category: 'Dolci',
    prepTime: 10,
    cookTime: 42,
    servings: 8,
    difficulty: 'Facile',
    isGlutenFree: false,
    sourceName: 'Ricettario Casalingo Revisionato',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Ribilanciata con soli 8g di lievito per evitare il collasso centrale. La panna fresca liquida nell\'impasto dona un\'umidità interna incredibile senza burro.',
    createdAt: new Date('2026-02-05T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-tf-1', name: 'Uova intere a temperatura ambiente', amount: 3, unit: 'uova' },
      { id: 'ing-tf-2', name: 'Zucchero semolato', amount: 160, unit: 'g' },
      { id: 'ing-tf-3', name: 'Panna fresca liquida da montare (non zuccherata)', amount: 200, unit: 'ml' },
      { id: 'ing-tf-4', name: 'Cioccolato fondente da tavola', amount: 70, unit: 'g' },
      { id: 'ing-tf-5', name: 'Farina 00', amount: 150, unit: 'g' },
      { id: 'ing-tf-6', name: 'Fecola di patate o amido di mais', amount: 50, unit: 'g' },
      { id: 'ing-tf-7', name: 'Cacao amaro in polvere', amount: 30, unit: 'g' },
      { id: 'ing-tf-8', name: 'Lievito per dolci (mezza bustina: dosaggio calibrato)', amount: 8, unit: 'g' },
      { id: 'ing-tf-9', name: 'Sale fino', amount: 1, unit: 'pizzico' },
      { id: 'ing-tf-10', name: 'Estratto di vaniglia (o 1 bustina vanillina)', amount: 1, unit: 'cucchiaino' }
    ],
    steps: [
      {
        id: 'step-tf-1',
        instruction: 'Spezzetta il cioccolato fondente in una tazza, aggiungi 2 cucchiai di panna presi dal totale e scalda al microonde a media potenza per 40 secondi. Mescola bene fino a renderlo liscio e fluido, poi lascialo intiepidire.',
        timerMinutes: 1,
        tip: 'Fondere il cioccolato con un po\' di panna evita che bruci al microonde.'
      },
      {
        id: 'step-tf-2',
        instruction: 'In una ciotola monta con le fruste elettriche le uova con lo zucchero, il pizzico di sale e la vaniglia per 4 minuti fino a ottenere un composto chiaro, gonfio e spumoso.',
        timerMinutes: 4,
        tip: 'Montare a lungo le uova incorpora aria e garantisce la sofficità senza eccedere col lievito.'
      },
      {
        id: 'step-tf-3',
        instruction: 'Abbassa la velocità delle fruste al minimo e versa a filo la restante panna liquida e il cioccolato fuso ormai tiepido.',
        timerMinutes: 0,
        tip: 'Usa panna fresca a temperatura ambiente.'
      },
      {
        id: 'step-tf-4',
        instruction: 'Aggiungi la farina, la fecola, il cacao e gli 8g di lievito setacciati. Amalgama a velocità minima per soli 30 secondi, fermandoti non appena le polveri sono incorporate.',
        timerMinutes: 0,
        tip: 'Non lavorare troppo l\'impasto per non sviluppare glutine tenace.'
      },
      {
        id: 'step-tf-5',
        instruction: 'Versa in una tortiera da 22-24 cm imburrata o rivestita con carta forno. Inforna a 160°C in forno statico preriscaldato per 40-42 minuti. Fai la prova stecchino prima di sfornare.',
        timerMinutes: 42,
        tip: 'La temperatura dolce a 160°C cuoce uniformemente senza creare cupole o spaccature.'
      }
    ]
  },
  {
    id: 'recipe-torta-ciocco-gf',
    title: 'Torta al Cioccolato Senza Glutine (Mix Universale)',
    category: 'Dolci',
    prepTime: 10,
    cookTime: 38,
    servings: 8,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo Revisionato',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Basta il comune preparato per dolci del supermercato e 3 uova che donano la maglia proteica naturale. Rimane soffice per giorni senza sbriciolarsi.',
    createdAt: new Date('2026-02-06T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-tc-1', name: 'Uova intere', amount: 3, unit: 'uova' },
      { id: 'ing-tc-2', name: 'Zucchero semolato', amount: 140, unit: 'g' },
      { id: 'ing-tc-3', name: 'Preparato / Mix per dolci senza glutine (Nutrifree, Schär o supermercato)', amount: 150, unit: 'g' },
      { id: 'ing-tc-4', name: 'Cacao amaro senza glutine', amount: 40, unit: 'g' },
      { id: 'ing-tc-5', name: 'Olio di semi (girasole o mais)', amount: 80, unit: 'ml' },
      { id: 'ing-tc-6', name: 'Latte intero (o vegetale / delattosato)', amount: 100, unit: 'ml' },
      { id: 'ing-tc-7', name: 'Lievito per dolci consentito (mezza bustina)', amount: 8, unit: 'g' },
      { id: 'ing-tc-8', name: 'Sale fino', amount: 1, unit: 'pizzico' },
      { id: 'ing-tc-9', name: 'Gocce o pezzetti di cioccolato fondente senza glutine (facoltativi)', amount: 60, unit: 'g' }
    ],
    steps: [
      {
        id: 'step-tc-1',
        instruction: 'In una ciotola monta le 3 uova con lo zucchero e il pizzico di sale per 4 minuti fino a renderle chiare, gonfie e spumose.',
        timerMinutes: 4,
        tip: 'L\'uovo apporta la struttura che nei cereali senza glutine manca naturalmente.'
      },
      {
        id: 'step-tc-2',
        instruction: 'Aggiungi a filo l\'olio di semi e il latte continuando a mescolare con le fruste a bassa velocità.',
        timerMinutes: 0,
        tip: 'L\'olio mantiene la torta morbida anche il giorno successivo.'
      },
      {
        id: 'step-tc-3',
        instruction: 'Incorpora il mix per dolci senza glutine, il cacao amaro e il lievito. Mescola brevemente fino a ottenere una crema liscia. Se gradite, unisci le gocce di cioccolato infarinate leggermente con un pizzico di mix.',
        timerMinutes: 0,
        tip: 'Infarinare le gocce evita che affondino sul fondo della tortiera durante la cottura.'
      },
      {
        id: 'step-tc-4',
        instruction: 'Trasferisci l\'impasto in uno stampo imburrato da 20-22 cm. Cuoci in forno statico preriscaldato a 170°C per 38 minuti. Fai la prova stecchino e lascia raffreddare 10 minuti prima di sformare.',
        timerMinutes: 38,
        tip: 'Controlla la cottura con lo stecchino al centro: deve uscire pulito.'
      }
    ]
  },
  {
    id: 'recipe-panna-cotta-bicchiere',
    title: 'Panna Cotta Setosa alla Vaniglia (Al Bicchiere)',
    category: 'Dolci',
    prepTime: 10,
    cookTime: 5,
    servings: 4,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo Revisionato',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Servita direttamente nei bicchierini per azzerare lo stress da sformatura. Con soli 4g di colla di pesce la consistenza è cremosa e setosa, mai gommosa.',
    createdAt: new Date('2026-02-07T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-pc-1', name: 'Panna fresca liquida', amount: 350, unit: 'ml' },
      { id: 'ing-pc-2', name: 'Latte intero fresco', amount: 200, unit: 'ml' },
      { id: 'ing-pc-3', name: 'Zucchero semolato', amount: 75, unit: 'g' },
      { id: 'ing-pc-4', name: 'Estratto di vaniglia (o 1 bustina di vanillina)', amount: 1, unit: 'fialetta' },
      { id: 'ing-pc-5', name: 'Colla di pesce in fogli (circa 2 fogli standard)', amount: 4, unit: 'g' },
      { id: 'ing-pc-6', name: 'Marmellata o confettura a piacere per guarnire', amount: 4, unit: 'cucchiai' }
    ],
    steps: [
      {
        id: 'step-pc-1',
        instruction: 'Metti i 4g di fogli di gelatina in una tazza con abbondante acqua fredda per 10 minuti a idratarsi.',
        timerMinutes: 10,
        tip: 'Usa sempre acqua molto fredda per non sciogliere la gelatina durante l\'ammollo.'
      },
      {
        id: 'step-pc-2',
        instruction: 'In un pentolino unisci panna, latte, zucchero e la vaniglia. Metti sul fuoco medio-basso e scalda fino a quando vedi le primissime bollicine sui bordi (non deve bollire con forza). Spegni subito.',
        timerMinutes: 5,
        tip: 'Se la panna bolle troppo forte cambia sapore: basta che sia ben calda per sciogliere la gelatina.'
      },
      {
        id: 'step-pc-3',
        instruction: 'Strizza bene i fogli di gelatina tra le mani e tuffali direttamente nel liquido caldo. Mescola bene con una forchetta per 20 secondi fino a completo scioglimento.',
        timerMinutes: 0,
        tip: 'La gelatina si scioglie istantaneamente nel liquido caldo.'
      },
      {
        id: 'step-pc-4',
        instruction: 'Versa il liquido direttamente in 4 bicchieri da acqua carini o coppette. Lascia intiepidire 15 minuti, poi copri e metti in frigorifero per almeno 4 ore (o tutta la notte).',
        timerMinutes: 240,
        tip: 'Zero stress di sformare stampini rotti: nel bicchiere è elegantissima da servire al cucchiaio.'
      },
      {
        id: 'step-pc-5',
        instruction: 'Al momento di servire, metti 4 cucchiai di marmellata in una tazzina e scalda per 10 secondi al microonde: diventerà fluida come un coulis di pasticceria. Colala sulla panna cotta e porta in tavola.',
        timerMinutes: 0,
        tip: 'Il contrasto acidulo di frutti di bosco o lamponi bilancia la dolcezza della vaniglia.'
      }
    ]
  },
  {
    id: 'recipe-fudgy-brownies-gf',
    title: 'Fudgy Brownies Senza Glutine (Crosticina Lucida)',
    category: 'Dolci',
    prepTime: 10,
    cookTime: 22,
    servings: 9,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo Revisionato',
    imageUrl: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
    personalNotes: 'Il segreto della celebre crosticina lucida crepata (crinkly top) è montare bene uova e zucchero per 4 minuti. Cuocere per soli 22 minuti: il cuore deve restare scioglievole!',
    createdAt: new Date('2026-02-08T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-fb-1', name: 'Cioccolato fondente da tavola', amount: 150, unit: 'g' },
      { id: 'ing-fb-2', name: 'Burro comune', amount: 90, unit: 'g' },
      { id: 'ing-fb-3', name: 'Uova intere grandi', amount: 2, unit: 'uova' },
      { id: 'ing-fb-4', name: 'Zucchero semolato', amount: 130, unit: 'g' },
      { id: 'ing-fb-5', name: 'Farina di riso (oppure mix per dolci senza glutine o maizena)', amount: 50, unit: 'g' },
      { id: 'ing-fb-6', name: 'Cacao amaro in polvere', amount: 20, unit: 'g' },
      { id: 'ing-fb-7', name: 'Sale fino (fondamentale per potenziare il cacao)', amount: 1, unit: 'pizzico generoso' },
      { id: 'ing-fb-8', name: 'Noci o nocciole spezzettate grossolanamente (facoltative)', amount: 50, unit: 'g' }
    ],
    steps: [
      {
        id: 'step-fb-1',
        instruction: 'Spezzetta il cioccolato fondente e taglia il burro a tocchetti in una ciotola adatta al microonde. Fai fondere a intervalli di 30 secondi a media potenza, mescolando fino a crema liscia. Lascia intiepidire.',
        timerMinutes: 1,
        tip: 'Fai sempre intervalli brevi per non bruciare il cioccolato fondente.'
      },
      {
        id: 'step-fb-2',
        instruction: 'In una ciotola sbatti le 2 uova con lo zucchero e il pizzico generoso di sale con le fruste elettriche per 4 minuti abbondanti, fino a composto chiaro e spumoso.',
        timerMinutes: 4,
        tip: 'È lo zucchero perfettamente sciolto nelle uova montate che crea la celebre crosticina lucida sottile!'
      },
      {
        id: 'step-fb-3',
        instruction: 'Versa il mix di burro e cioccolato fuso nella montata di uova mescolando delicatamente. Aggiungi la farina di riso e il cacao amaro setacciato, incorporando con una spatola fino a impasto denso e lucido. Se gradite, unisci le noci.',
        timerMinutes: 0,
        tip: 'La farina di riso rende il brownie naturalmente privo di glutine e con una consistenza scioglievole imbattibile.'
      },
      {
        id: 'step-fb-4',
        instruction: 'Fodera una teglia quadrata (circa 20x20 cm) con carta forno e versa l\'impasto livellando la superficie. Inforna a 175°C statico preriscaldato per soli 20-25 minuti. Il centro deve rimanere umido!',
        timerMinutes: 22,
        tip: 'Lo stecchino al centro deve uscire con briciole umide attaccate, MAI asciutto (altrimenti diventa una torta asciutta).'
      },
      {
        id: 'step-fb-5',
        instruction: 'Lascia raffreddare completamente nella teglia per almeno 1 ora prima di tagliare a quadrotti regolari.',
        timerMinutes: 60,
        tip: 'Da freddo il brownie si compatta e raggiunge la consistenza fudgy perfetta.'
      }
    ]
  },

  // --- Le Ricette Classiche Originali ---
  {
    id: 'recipe-carbonara-1',
    title: 'Spaghettoni alla Carbonara Classica Romana',
    category: 'Primi',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Media',
    isGlutenFree: false,
    sourceUrl: 'https://ricette.giallozafferano.it/Spaghetti-alla-Carbonara.html',
    sourceName: 'GialloZafferano',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Non salare troppo l\'acqua perché pecorino e guanciale sono saporiti. Togliere dal fuoco prima di unire le uova.',
    createdAt: new Date('2026-01-10T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-1', name: 'Spaghettoni (o spaghetti n. 5)', amount: 360, unit: 'g' },
      { id: 'ing-2', name: 'Guanciale di maiale di qualità', amount: 160, unit: 'g' },
      { id: 'ing-3', name: 'Tuorli d\'uovo freschi', amount: 4, unit: 'tuorli' },
      { id: 'ing-4', name: 'Uovo intero', amount: 1, unit: 'intero' },
      { id: 'ing-5', name: 'Pecorino Romano DOP grattugiato', amount: 80, unit: 'g' },
      { id: 'ing-6', name: 'Pepe nero in grani da macinare', amount: 1, unit: 'q.b.' },
      { id: 'ing-7', name: 'Sale grosso per l\'acqua', amount: 1, unit: 'q.b.' }
    ],
    steps: [
      {
        id: 'step-1',
        instruction: 'Metti a bollire abbondante acqua per la pasta (poco salata). Taglia il guanciale a listarelle di mezzo centimetro.',
        timerMinutes: 0,
        tip: 'Non usare olio per il guanciale: rilascerà il suo stesso grasso naturale.'
      },
      {
        id: 'step-2',
        instruction: 'Rosola il guanciale a fuoco medio-basso finché diventa dorato e croccante (circa 8 minuti). Scolalo e tienilo al caldo.',
        timerMinutes: 8,
        tip: 'Conserva il grasso fuso nella padella per saltare la pasta.'
      },
      {
        id: 'step-3',
        instruction: 'Mescola tuorli, uovo intero, Pecorino e pepe nero creando la carbocrema densa. Aggiungi un cucchiaio del grasso del guanciale intiepidito.',
        timerMinutes: 0,
        tip: 'Se troppo densa, ammorbidiscila con un goccio di acqua di cottura.'
      },
      {
        id: 'step-4',
        instruction: 'Cuoci gli spaghetti per 10 minuti fino a quando mancano 2 minuti alla cottura al dente.',
        timerMinutes: 10,
        tip: 'Conserva mezza tazza di acqua di cottura prima di scolare.'
      },
      {
        id: 'step-5',
        instruction: 'Scola la pasta direttamente nella padella col grasso a fuoco spento. Salta un minuto con un goccio d\'acqua.',
        timerMinutes: 1,
        tip: 'Attendi 30 secondi prima di unire la crema d\'uovo affinché la padella non sia rovente.'
      },
      {
        id: 'step-6',
        instruction: 'Versa la carbocrema e il guanciale sugli spaghetti. Manteca energicamente fuori dal fuoco e servi subito!',
        timerMinutes: 0,
        tip: 'Servi nei piatti caldi per goderti la massima cremosità.'
      }
    ]
  },
  {
    id: 'recipe-risotto-2',
    title: 'Risotto Cremoso ai Funghi Porcini',
    category: 'Primi',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceUrl: 'https://www.cucchiaio.it/ricetta/risotto-ai-funghi-porcini/',
    sourceName: 'Il Cucchiaio d\'Argento',
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Mantecare a fuoco rigorosamente spento con burro ghiacciato dal freezer per ottenere la classica onda all\'italiana.',
    createdAt: new Date('2026-01-15T14:30:00Z').toISOString(),
    ingredients: [
      { id: 'ing-201', name: 'Riso Carnaroli o Vialone Nano', amount: 320, unit: 'g' },
      { id: 'ing-202', name: 'Funghi Porcini freschi (o 40g secchi)', amount: 350, unit: 'g' },
      { id: 'ing-203', name: 'Brodo vegetale caldo', amount: 1000, unit: 'ml' },
      { id: 'ing-204', name: 'Vino bianco secco', amount: 80, unit: 'ml' },
      { id: 'ing-205', name: 'Scalogno tritato fine', amount: 1, unit: 'pezzo' },
      { id: 'ing-206', name: 'Burro freddo di frigorifero', amount: 50, unit: 'g' },
      { id: 'ing-207', name: 'Parmigiano Reggiano grattugiato', amount: 60, unit: 'g' },
      { id: 'ing-208', name: 'Prezzemolo fresco tritato', amount: 1, unit: 'ciuffo' },
      { id: 'ing-209', name: 'Olio extravergine d\'oliva', amount: 2, unit: 'cucchiai' }
    ],
    steps: [
      {
        id: 'step-201',
        instruction: 'Pulisci i porcini con un panno umido e tagliali a fettine. Saltali 4 minuti in padella con olio e sale.',
        timerMinutes: 4,
        tip: 'Non lavarli sotto l\'acqua corrente per non renderli spugnosi.'
      },
      {
        id: 'step-202',
        instruction: 'Appassire lo scalogno con un filo d\'olio. Aggiungi il riso e tostalo a secco per 3 minuti fino a chicchi traslucidi.',
        timerMinutes: 3,
        tip: 'Tocca il riso con il dorso della mano per verificare il calore.'
      },
      {
        id: 'step-203',
        instruction: 'Sfuma con il vino bianco secco a fiamma vivace ed evapora per 1 minuto.',
        timerMinutes: 1,
        tip: 'Usa vino a temperatura ambiente.'
      },
      {
        id: 'step-204',
        instruction: 'Aggiungi il brodo bollente un mestolo alla volta continuando a mescolare. A metà cottura unisci i porcini trifolati.',
        timerMinutes: 16,
        tip: 'Il riso deve sobbollire dolcemente.'
      },
      {
        id: 'step-205',
        instruction: 'Spegni il fuoco. Aggiungi burro ghiacciato e Parmigiano. Copri 2 minuti, poi manteca energicamente all\'onda.',
        timerMinutes: 2,
        tip: 'Completa con prezzemolo fresco tritato a crudo.'
      }
    ]
  },
  {
    id: 'recipe-tiramisu-3',
    title: 'Tiramisù Tradizionale al Mascarpone',
    category: 'Dolci',
    prepTime: 25,
    cookTime: 0,
    servings: 6,
    difficulty: 'Facile',
    isGlutenFree: false,
    sourceUrl: 'https://ricette.giallozafferano.it/Tiramisu.html',
    sourceName: 'GialloZafferano',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Inzuppare i savoiardi per 1 secondo per lato. Lasciare in frigo almeno 4 ore prima di servire.',
    createdAt: new Date('2026-01-20T17:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-301', name: 'Mascarpone fresco di qualità', amount: 500, unit: 'g' },
      { id: 'ing-302', name: 'Biscotti Savoiardi', amount: 300, unit: 'g' },
      { id: 'ing-303', name: 'Uova freschissime medie', amount: 4, unit: 'uova' },
      { id: 'ing-304', name: 'Zucchero semolato', amount: 100, unit: 'g' },
      { id: 'ing-305', name: 'Caffè espresso della moka', amount: 300, unit: 'ml' },
      { id: 'ing-306', name: 'Cacao amaro in polvere', amount: 2, unit: 'cucchiai' }
    ],
    steps: [
      {
        id: 'step-301',
        instruction: 'Prepara il caffè con la moka e fallo raffreddare a temperatura ambiente.',
        timerMinutes: 0,
        tip: 'Puoi aggiungere un goccio di liquore al caffè o Marsala.'
      },
      {
        id: 'step-302',
        instruction: 'Monta i tuorli con lo zucchero per 5 minuti fino a composto chiaro e spumoso.',
        timerMinutes: 5,
        tip: 'Lavora il mascarpone prima con una forchetta.'
      },
      {
        id: 'step-303',
        instruction: 'Aggiungi il mascarpone ai tuorli a cucchiaiate montando a velocità minima.',
        timerMinutes: 0,
        tip: 'Non montare eccessivamente per non separare il siero.'
      },
      {
        id: 'step-304',
        instruction: 'Monta gli albumi a neve ferma e incorporali delicatamente dal basso verso l\'alto.',
        timerMinutes: 3,
        tip: 'Usa una spatola in silicone.'
      },
      {
        id: 'step-305',
        instruction: 'Inzuppa rapidamente i savoiardi nel caffè e crea il primo strato in pirofila, coprendo con metà crema.',
        timerMinutes: 0,
        tip: '1 secondo per lato basta.'
      },
      {
        id: 'step-306',
        instruction: 'Crea il secondo strato e copri con la restante crema. Fai riposare in frigorifero per almeno 4 ore.',
        timerMinutes: 240,
        tip: 'Spolvera il cacao amaro solo all\'ultimo momento.'
      }
    ]
  },
  {
    id: 'recipe-salmone-4',
    title: 'Trancio di Salmone al Forno con Zucchine e Agrumi',
    category: 'Secondi',
    prepTime: 10,
    cookTime: 18,
    servings: 2,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceUrl: 'https://cucina.corriere.it/ricette/secondi/salmone-al-forno-con-verdure/',
    sourceName: 'Cucina Corriere',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Piatto leggero e veloce. La cottura a 190°C con le fettine di limone sopra mantiene il salmone umido e succoso.',
    createdAt: new Date('2026-01-22T19:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-401', name: 'Filetti di salmone fresco senza spine', amount: 350, unit: 'g' },
      { id: 'ing-402', name: 'Zucchine medie', amount: 2, unit: 'pezzi' },
      { id: 'ing-403', name: 'Limone biologico a fettine', amount: 1, unit: 'pezzo' },
      { id: 'ing-404', name: 'Olio extravergine d\'oliva', amount: 2, unit: 'cucchiai' },
      { id: 'ing-405', name: 'Timo fresco', amount: 2, unit: 'rametti' },
      { id: 'ing-406', name: 'Sale fino e pepe rosa', amount: 1, unit: 'q.b.' }
    ],
    steps: [
      {
        id: 'step-401',
        instruction: 'Preriscalda il forno a 190°C statico e fodera una teglia con carta forno.',
        timerMinutes: 0,
        tip: 'Asciuga i filetti di salmone con carta assorbente.'
      },
      {
        id: 'step-402',
        instruction: 'Taglia le zucchine a rondelle sottili e disponile sulla teglia con olio, sale e pepe.',
        timerMinutes: 0,
        tip: 'Le rondelle sottili cuoceranno nello stesso tempo del salmone.'
      },
      {
        id: 'step-403',
        instruction: 'Adagia i tranci sopra le zucchine, copri ciascuno con 2 fette di limone e timo fresco.',
        timerMinutes: 0,
        tip: 'Il limone protegge la superficie dall\'asciugarsi troppo.'
      },
      {
        id: 'step-404',
        instruction: 'Inforna a 190°C per circa 18 minuti fino a doratura.',
        timerMinutes: 18,
        tip: 'Se gradita una leggera crosticina, aziona il grill negli ultimi 2 minuti.'
      }
    ]
  }
];
