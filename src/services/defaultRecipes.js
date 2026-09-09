// Catalogo ufficiale predefinito per CucinApp (aggiornato e testato)
export const DEFAULT_RECIPES = [
  {
    id: 'recipe-risotto-vino-rosso',
    title: 'Risotto al Vino Rosso e Stracciatella',
    category: 'Primi',
    prepTime: 5,
    cookTime: 18,
    servings: 4,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
    personalNotes: 'Mantecare a fuoco spento con burro freddissimo per ottenere una perfetta onda all\'italiana. Servire con la stracciatella a temperatura ambiente.',
    createdAt: new Date('2026-02-01T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-rvr-1', name: 'Riso Carnaroli', amount: 340, unit: 'g' },
      { id: 'ing-rvr-2', name: 'Vino rosso fermo (Barbera, Chianti o Bonarda) per riduzione', amount: 300, unit: 'ml' },
      { id: 'ing-rvr-3', name: 'Brodo vegetale leggero caldo', amount: 1200, unit: 'ml' },
      { id: 'ing-rvr-4', name: 'Burro freddo da frigorifero', amount: 60, unit: 'g' },
      { id: 'ing-rvr-5', name: 'Parmigiano Reggiano o Grana Padano grattugiato', amount: 45, unit: 'g' },
      { id: 'ing-rvr-6', name: 'Stracciatella fresca', amount: 200, unit: 'g' },
      { id: 'ing-rvr-7', name: 'Sale fino e pepe nero macinato', amount: 1, unit: 'q.b.' }
    ],
    steps: [
      {
        id: 'step-rvr-1',
        instruction: 'In un pentolino a parte fai sobbollire il vino rosso a fiamma dolce per 8-10 minuti finché non si riduce a circa la metà, concentrando profumi e colore.',
        timerMinutes: 8,
        tip: 'La riduzione concentra gli aromi eliminando l\'acidità aggressiva sul chicco.'
      },
      {
        id: 'step-rvr-2',
        instruction: 'Scalda la casseruola a fiamma medio-alta. Versa il riso Carnaroli, aggiungi un pizzico generoso di sale e tosta per 2 minuti a secco muovendolo spesso finché i chicchi non sono caldi al tatto e traslucidi.',
        timerMinutes: 2,
        tip: 'Salare in tostatura insaporisce il cuore del chicco fin da subito.'
      },
      {
        id: 'step-rvr-3',
        instruction: 'Bagna il riso con un primo mestolo di brodo caldo e unisci subito la riduzione di vino rosso. Continua la cottura a fiamma media aggiungendo il brodo caldo 1-2 mestoli per volta per circa 14-15 minuti.',
        timerMinutes: 15,
        tip: 'Aggiungi il brodo caldo gradualmente man mano che si assorbe.'
      },
      {
        id: 'step-rvr-4',
        instruction: 'Spegni il fuoco, sposta la pentola dal fornello caldo e fai riposare 1 minuto coperto. Unisci i 60 g di burro freddo e il formaggio grattugiato, mescolando energicamente per creare l\'onda.',
        timerMinutes: 1,
        tip: 'La mantecatura a fuoco spento con burro freddo garantisce la massima cremosità.'
      },
      {
        id: 'step-rvr-5',
        instruction: 'Versa nei piatti piani, batti leggermente sotto il piatto per stendere il riso e adagia al centro una generosa cucchiaiata di stracciatella e un pizzico di pepe.',
        timerMinutes: 0,
        tip: 'Tira fuori la stracciatella dal frigo 20 minuti prima per evitare lo shock termico con il riso caldo.'
      }
    ]
  },
  {
    id: 'recipe-ferrero-rocher-gf',
    title: 'Ferrero Rocher Senza Glutine',
    category: 'Dolci',
    prepTime: 15,
    cookTime: 0,
    servings: 14,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Il riposo in frigo prima di modellare le palline è il trucco fondamentale per non far appiccicare l\'impasto.',
    createdAt: new Date('2026-02-02T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-fr-1', name: 'Crema di nocciole (Nutella o spalmabile gluten-free)', amount: 150, unit: 'g' },
      { id: 'ing-fr-2', name: 'Wafer senza glutine (alla vaniglia o al cacao)', amount: 70, unit: 'g' },
      { id: 'ing-fr-3', name: 'Nocciole intere tostate', amount: 14, unit: 'pezzi' },
      { id: 'ing-fr-4', name: 'Cioccolato fondente (o al latte)', amount: 150, unit: 'g' },
      { id: 'ing-fr-5', name: 'Granella di nocciole tostate', amount: 40, unit: 'g' },
      { id: 'ing-fr-6', name: 'Olio di semi (girasole o mais)', amount: 1, unit: 'cucchiaino' }
    ],
    steps: [
      {
        id: 'step-fr-1',
        instruction: 'In una ciotola sbriciola i wafer senza glutine a pezzi irregolari con le mani. Unisci la crema di nocciole e mescola con un cucchiaio fino a ottenere un composto omogeneo.',
        timerMinutes: 0,
        tip: 'Sbriciolare i wafer a mano senza ridurli in polvere per mantenere la croccantezza.'
      },
      {
        id: 'step-fr-2',
        instruction: 'Metti la ciotola con l\'impasto in frigorifero per circa 15 minuti affinché rassodi.',
        timerMinutes: 15,
        tip: 'Il freddo rende la Nutella compatta e facilissima da appallottolare senza sporcarsi.'
      },
      {
        id: 'step-fr-3',
        instruction: 'Preleva una noce di impasto, inserisci una nocciola intera al centro e modella una pallina tra i palmi delle mani. Disponi le palline su un piatto con carta forno.',
        timerMinutes: 0,
        tip: 'Modella palline regolari da circa 15-18 grammi.'
      },
      {
        id: 'step-fr-4',
        instruction: 'Metti il piatto con le palline in freezer per 20 minuti: devono diventare ben sode e fredde.',
        timerMinutes: 20,
        tip: 'Il riposo in freezer è fondamentale per far presa rapida sulla copertura calda.'
      },
      {
        id: 'step-fr-5',
        instruction: 'Spezzetta il cioccolato in una tazza. Scioglilo al microonde a impulsi di 20-30 secondi mescolando bene. Unisci il cucchiaino di olio di semi e la granella di nocciole.',
        timerMinutes: 1,
        tip: 'L\'olio di semi rende la glassa lucida, fluida ed elastica.'
      },
      {
        id: 'step-fr-6',
        instruction: 'Tira fuori le palline dal freezer. Immergi una pallina per volta aiutandoti con una forchetta, scolala dal cioccolato in eccesso e riappoggiala sulla carta forno. Il cioccolato solidificherà in un minuto.',
        timerMinutes: 1,
        tip: 'Grazie allo shock termico con le palline gelate, la glassa farà presa istantanea.'
      }
    ]
  },
  {
    id: 'recipe-arancini-gf',
    title: 'Arancini al Ragù Senza Glutine',
    category: 'Antipasti',
    prepTime: 25,
    cookTime: 8,
    servings: 16,
    difficulty: 'Media',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'La pastella di acqua e farina di riso (la "lega") crea una corazza perfetta che non si rompe in frittura.',
    createdAt: new Date('2026-02-03T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-ar-1', name: 'Riso Carnaroli', amount: 400, unit: 'g' },
      { id: 'ing-ar-2', name: 'Acqua o brodo vegetale leggero (rapporto 2.5:1)', amount: 1000, unit: 'ml' },
      { id: 'ing-ar-3', name: 'Zafferano in polvere (sciolto in poca acqua)', amount: 1, unit: 'bustina' },
      { id: 'ing-ar-4', name: 'Burro', amount: 40, unit: 'g' },
      { id: 'ing-ar-5', name: 'Parmigiano grattugiato', amount: 40, unit: 'g' },
      { id: 'ing-ar-6', name: 'Ragù di carne ristretto, denso e freddo di frigo', amount: 160, unit: 'g' },
      { id: 'ing-ar-7', name: 'Provola dolce o mozzarella per pizza asciutta a cubetti', amount: 110, unit: 'g' },
      { id: 'ing-ar-8', name: 'Farina di riso o amido (per la pastella)', amount: 120, unit: 'g' },
      { id: 'ing-ar-9', name: 'Acqua fredda (per la pastella)', amount: 190, unit: 'ml' },
      { id: 'ing-ar-10', name: 'Pangrattato senza glutine', amount: 150, unit: 'g' },
      { id: 'ing-ar-11', name: 'Corn flakes senza glutine sbriciolati', amount: 40, unit: 'g' },
      { id: 'ing-ar-12', name: 'Olio di semi di arachidi per friggere', amount: 600, unit: 'ml' }
    ],
    steps: [
      {
        id: 'step-ar-1',
        instruction: 'Cuoci il riso in 1 litro di brodo finché il liquido non è completamente assorbito. Manteca con burro, parmigiano e zafferano. Stendilo su un vassoio largo e fallo raffreddare in frigorifero per almeno 2 ore.',
        timerMinutes: 120,
        tip: 'L\'amido freddo di frigo si compatta e fa da collante naturale per formare gli arancini.'
      },
      {
        id: 'step-ar-2',
        instruction: 'Inumidisci le mani con acqua. Prendi circa 70-75 g di riso freddo, appiattiscilo sul palmo a conca, inserisci un cucchiaino di ragù denso e cubetti di provola asciutta. Chiudi sigillando bene e ruota tra le mani compattando una sfera solida (ne otterrai 16).',
        timerMinutes: 0,
        tip: 'Compatta con decisione per non lasciare bolle d\'aria all\'interno.'
      },
      {
        id: 'step-ar-3',
        instruction: 'In una ciotola mescola la farina di riso con l\'acqua fredda fino a ottenere una pastella fluida senza grumi. In un piatto mescola il pangrattato con i corn flakes sbriciolati. Immergi ogni arancino prima nella pastella e subito dopo nel pangrattato, premendo bene.',
        timerMinutes: 0,
        tip: 'La pastella senza glutine aderisce molto meglio dell\'uovo e garantisce una panatura sigillata.'
      },
      {
        id: 'step-ar-4',
        instruction: 'Scalda abbondante olio di semi in una pentola alta a circa 170°C. Friggi 2-3 arancini alla volta per 4-5 minuti finché la crosta non è dorata e croccante. Scola su carta assorbente e attendi 2 minuti prima di servire.',
        timerMinutes: 5,
        tip: 'Non affollare la pentola per mantenere l\'olio a temperatura costante.'
      }
    ]
  },
  {
    id: 'recipe-carbonara-rustica',
    title: 'Spaghetti alla Carbonara',
    category: 'Primi',
    prepTime: 5,
    cookTime: 10,
    servings: 4,
    difficulty: 'Facile',
    isGlutenFree: false,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
    personalNotes: 'Unire un cucchiaio di grasso tiepido alla crema di tuorli e mantecare rigorosamente a fuoco spento per evitare l\'effetto frittata.',
    createdAt: new Date('2026-02-04T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-cr-1', name: 'Spaghetti o spaghettoni', amount: 380, unit: 'g' },
      { id: 'ing-cr-2', name: 'Pancetta tesa o guanciale a listarelle', amount: 170, unit: 'g' },
      { id: 'ing-cr-3', name: 'Tuorli d\'uovo grandi', amount: 5, unit: 'tuorli' },
      { id: 'ing-cr-4', name: 'Grana Padano o Pecorino grattugiato', amount: 75, unit: 'g' },
      { id: 'ing-cr-5', name: 'Pepe nero macinato al momento', amount: 1, unit: 'q.b.' }
    ],
    steps: [
      {
        id: 'step-cr-1',
        instruction: 'Metti la pancetta in una padella capiente a freddo senza aggiungere grassi. Accendi a livello medio-basso e lasciala rosolare per 6-7 minuti fino a doratura croccante. Togli la pancetta lasciando il grasso fuso in padella.',
        timerMinutes: 7,
        tip: 'Partire a freddo scioglie dolcemente il grasso senza bruciare la carne.'
      },
      {
        id: 'step-cr-2',
        instruction: 'In una ciotola unisci i 5 tuorli, il formaggio grattugiato, una generosa macinata di pepe e 1 cucchiaio del grasso tiepido della pancetta. Sbatti con una forchetta fino a creare una crema densa e lucida.',
        timerMinutes: 0,
        tip: 'Il grasso tiepido emulsiona i tuorli rendendo la crema vellutata e lucidissima.'
      },
      {
        id: 'step-cr-3',
        instruction: 'Cuoci gli spaghetti in abbondante acqua bollente con poco sale. Scolali al dente conservando una tazza di acqua di cottura.',
        timerMinutes: 10,
        tip: 'L\'acqua di cottura è ricca di amido ed è il segreto per legare il condimento.'
      },
      {
        id: 'step-cr-4',
        instruction: 'Versa la pasta direttamente nella padella col grasso caldo, aggiungi mezzo mestolino d\'acqua di cottura e salta a fiamma viva per 30-40 secondi per legare l\'amido.',
        timerMinutes: 1,
        tip: 'La pasta si lucida e si riveste del sapore del grasso.'
      },
      {
        id: 'step-cr-5',
        instruction: 'Spegni il fuoco e allontana la padella dal fornello. Attendi 30 secondi che lo sfrigolio cessi. Versa la pasta direttamente nella ciotola con la crema di tuorli (oppure la crema in padella tiepida) e mescola energicamente all\'onda. Aggiungi la pancetta croccante e servi subito.',
        timerMinutes: 0,
        tip: 'Mantecare nella ciotola protegge l\'uovo dal calore eccessivo del metallo della padella.'
      }
    ]
  },
  {
    id: 'recipe-torta-fondente-panna',
    title: 'Torta Soffice Fondente alla Panna',
    category: 'Dolci',
    prepTime: 10,
    cookTime: 42,
    servings: 8,
    difficulty: 'Facile',
    isGlutenFree: false,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'La panna liquida fresca nell\'impasto dona una sofficità umida e prolungata nel tempo.',
    createdAt: new Date('2026-02-05T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-tf-1', name: 'Uova intere a temperatura ambiente', amount: 3, unit: 'uova' },
      { id: 'ing-tf-2', name: 'Zucchero semolato', amount: 160, unit: 'g' },
      { id: 'ing-tf-3', name: 'Panna fresca liquida da montare (non zuccherata)', amount: 200, unit: 'ml' },
      { id: 'ing-tf-4', name: 'Cioccolato fondente da tavola', amount: 70, unit: 'g' },
      { id: 'ing-tf-5', name: 'Farina 00', amount: 150, unit: 'g' },
      { id: 'ing-tf-6', name: 'Fecola di patate o amido di mais', amount: 50, unit: 'g' },
      { id: 'ing-tf-7', name: 'Cacao amaro in polvere', amount: 30, unit: 'g' },
      { id: 'ing-tf-8', name: 'Lievito per dolci (bustina intera)', amount: 16, unit: 'g' },
      { id: 'ing-tf-9', name: 'Sale fino', amount: 1, unit: 'pizzico' },
      { id: 'ing-tf-10', name: 'Estratto di vaniglia (o vanillina)', amount: 1, unit: 'cucchiaino' }
    ],
    steps: [
      {
        id: 'step-tf-1',
        instruction: 'Spezzetta il cioccolato fondente e fallo fondere dolcemente a bagnomaria o al microonde a impulsi di 20-30 secondi mescolando ogni volta. Lascialo intiepidire.',
        timerMinutes: 1,
        tip: 'Fondere il cioccolato dolcemente ne preserva la lucentezza.'
      },
      {
        id: 'step-tf-2',
        instruction: 'In una ciotola capiente monta con le fruste elettriche le uova con lo zucchero, il pizzico di sale e la vaniglia per 3-4 minuti fino a ottenere un composto chiaro e spumoso.',
        timerMinutes: 4,
        tip: 'Montare a lungo incorpora bolle d\'aria stabili che aiutano la lievitazione.'
      },
      {
        id: 'step-tf-3',
        instruction: 'Abbassa la velocità delle fruste al minimo e versa a filo la restante panna liquida e il cioccolato fuso ormai tiepido.',
        timerMinutes: 0,
        tip: 'Usa panna a temperatura ambiente per non fare indurire il cioccolato.'
      },
      {
        id: 'step-tf-4',
        instruction: 'Aggiungi la farina, la fecola, il cacao e il lievito setacciati. Amalgama a velocità minima per soli 30 secondi, fermandoti non appena le polveri sono incorporate.',
        timerMinutes: 0,
        tip: 'Non lavorare troppo l\'impasto dopo aver unito la farina per preservare la sofficità.'
      },
      {
        id: 'step-tf-5',
        instruction: 'Versa in una tortiera da 22-24 cm imburrata o rivestita con carta forno. Inforna a 160°C statico preriscaldato per circa 40-42 minuti. Fai la prova stecchino prima di sfornare.',
        timerMinutes: 42,
        tip: 'La temperatura a 160°C consente una cottura dolce e uniforme senza bruciare il cacao.'
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
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Il cucchiaio di miele trattiene l\'umidità ed evita la tipica secchezza dei dolci gluten-free.',
    createdAt: new Date('2026-02-06T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-tc-1', name: 'Uova intere', amount: 3, unit: 'uova' },
      { id: 'ing-tc-2', name: 'Zucchero semolato', amount: 140, unit: 'g' },
      { id: 'ing-tc-3', name: 'Preparato per dolci senza glutine', amount: 150, unit: 'g' },
      { id: 'ing-tc-4', name: 'Cacao amaro senza glutine', amount: 40, unit: 'g' },
      { id: 'ing-tc-5', name: 'Olio di semi (girasole o mais)', amount: 80, unit: 'ml' },
      { id: 'ing-tc-6', name: 'Latte intero (o vegetale)', amount: 135, unit: 'ml' },
      { id: 'ing-tc-7', name: 'Miele millefiori o acacia', amount: 1, unit: 'cucchiaio' },
      { id: 'ing-tc-8', name: 'Lievito per dolci (bustina intera)', amount: 16, unit: 'g' },
      { id: 'ing-tc-9', name: 'Sale fino', amount: 1, unit: 'pizzico' },
      { id: 'ing-tc-10', name: 'Gocce di cioccolato fondente gluten-free (facoltative)', amount: 60, unit: 'g' }
    ],
    steps: [
      {
        id: 'step-tc-1',
        instruction: 'In una ciotola capiente monta le uova con lo zucchero e il pizzico di sale per 3-4 minuti fino a renderle gonfie e spumose.',
        timerMinutes: 4,
        tip: 'Montare le uova a lungo aiuta a dare struttura all\'impasto privo di glutine.'
      },
      {
        id: 'step-tc-2',
        instruction: 'Aggiungi a filo l\'olio di semi, il latte e il cucchiaio di miele continuando a mescolare a bassa velocità.',
        timerMinutes: 0,
        tip: 'Il miele agisce da umettante naturale preservando la freschezza per giorni.'
      },
      {
        id: 'step-tc-3',
        instruction: 'Incorpora il mix per dolci senza glutine, il cacao amaro e il lievito. Mescola brevemente fino a ottenere una crema liscia e densa. Se gradite, unisci le gocce di cioccolato infarinate leggermente con un pizzico di mix.',
        timerMinutes: 0,
        tip: 'Infarinare le gocce evita che affondino sul fondo durante la cottura.'
      },
      {
        id: 'step-tc-4',
        instruction: 'Trasferisci l\'impasto in uno stampo imburrato da 20-22 cm. Cuoci in forno statico preriscaldato a 170°C per 35-40 minuti. Fai la prova stecchino e lascia raffreddare 10 minuti prima di sformare.',
        timerMinutes: 38,
        tip: 'Lo stecchino al centro deve uscire asciutto e pulito.'
      }
    ]
  },
  {
    id: 'recipe-panna-cotta-bicchiere',
    title: 'Panna Cotta',
    category: 'Dolci',
    prepTime: 10,
    cookTime: 5,
    servings: 4,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Consistenza setosa e morbida con 4 g di gelatina. Lasciare riposare in frigo almeno 6 ore per una consistenza impeccabile.',
    createdAt: new Date('2026-02-07T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-pc-1', name: 'Panna fresca liquida', amount: 350, unit: 'ml' },
      { id: 'ing-pc-2', name: 'Latte intero fresco', amount: 200, unit: 'ml' },
      { id: 'ing-pc-3', name: 'Zucchero semolato', amount: 75, unit: 'g' },
      { id: 'ing-pc-4', name: 'Estratto di vaniglia (o vanillina)', amount: 1, unit: 'fialetta' },
      { id: 'ing-pc-5', name: 'Colla di pesce in fogli (2 fogli standard)', amount: 4, unit: 'g' },
      { id: 'ing-pc-6', name: 'Marmellata o confettura a piacere per guarnire', amount: 4, unit: 'cucchiai' }
    ],
    steps: [
      {
        id: 'step-pc-1',
        instruction: 'Metti i fogli di gelatina in una tazza con acqua molto fredda per 8-10 minuti a idratarsi.',
        timerMinutes: 10,
        tip: 'Usa sempre acqua fredda per non sciogliere la gelatina prima del tempo.'
      },
      {
        id: 'step-pc-2',
        instruction: 'In un pentolino unisci panna, latte, zucchero e la vaniglia. Scalda a fiamma medio-bassa fino a quando noti le prime bollicine sui bordi (senza raggiungere il bollore vivace). Spegni il fuoco.',
        timerMinutes: 5,
        tip: 'Non far bollire vigorosamente per preservare il profumo latteo della panna.'
      },
      {
        id: 'step-pc-3',
        instruction: 'Strizza bene i fogli di gelatina tra le mani e uniscili direttamente al liquido caldo. Mescola bene con un cucchiaio fino a completo scioglimento.',
        timerMinutes: 0,
        tip: 'La gelatina si scioglie in pochi secondi nel liquido caldo.'
      },
      {
        id: 'step-pc-4',
        instruction: 'Versa il liquido direttamente in 4 bicchieri o coppette di vetro. Lascia intiepidire 15 minuti a temperatura ambiente, poi copri e metti in frigorifero per almeno 6 ore (o tutta la notte).',
        timerMinutes: 360,
        tip: 'Nel bicchiere la panna cotta morbida non deve essere sformata e risulta impeccabile.'
      },
      {
        id: 'step-pc-5',
        instruction: 'Al momento di servire, scalda la marmellata per 10 secondi al microonde fino a renderla fluida, colala sulla panna cotta e servi al cucchiaio.',
        timerMinutes: 0,
        tip: 'Il contrasto acidulo dei frutti rossi equilibra la dolcezza della vaniglia.'
      }
    ]
  },
  {
    id: 'recipe-fudgy-brownies-gf',
    title: 'Brownies Senza Glutine',
    category: 'Dolci',
    prepTime: 10,
    cookTime: 19,
    servings: 9,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
    personalNotes: 'Sbattere uova e zucchero a mano con una frusta per non incorporare troppa aria e preservare il cuore fondente fudgy.',
    createdAt: new Date('2026-02-08T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-fb-1', name: 'Cioccolato fondente da tavola', amount: 150, unit: 'g' },
      { id: 'ing-fb-2', name: 'Burro', amount: 90, unit: 'g' },
      { id: 'ing-fb-3', name: 'Uova intere grandi', amount: 2, unit: 'uova' },
      { id: 'ing-fb-4', name: 'Zucchero semolato', amount: 130, unit: 'g' },
      { id: 'ing-fb-5', name: 'Farina di riso (o mix dolci gluten-free)', amount: 50, unit: 'g' },
      { id: 'ing-fb-6', name: 'Cacao amaro in polvere', amount: 20, unit: 'g' },
      { id: 'ing-fb-7', name: 'Sale fino', amount: 1, unit: 'pizzico generoso' },
      { id: 'ing-fb-8', name: 'Noci o nocciole spezzettate (facoltative)', amount: 50, unit: 'g' }
    ],
    steps: [
      {
        id: 'step-fb-1',
        instruction: 'Spezzetta il cioccolato fondente e taglia il burro a tocchetti in una ciotola. Fai fondere a intervalli di 30 secondi a media potenza nel microonde, mescolando fino a crema liscia. Lascia intiepidire.',
        timerMinutes: 1,
        tip: 'Sciogli burro e cioccolato a brevi intervalli per non bruciare i grassi.'
      },
      {
        id: 'step-fb-2',
        instruction: 'In una ciotola sbatti con una frusta a mano o forchetta le uova con lo zucchero e il pizzico generoso di sale per 2 minuti. Non montare a spuma.',
        timerMinutes: 2,
        tip: 'Sbattere a mano evita di incorporare troppa aria, preservando la tipica consistenza densa e fudgy.'
      },
      {
        id: 'step-fb-3',
        instruction: 'Versa il mix di burro e cioccolato ancora tiepido nella ciotola delle uova mescolando subito per far sciogliere i granelli di zucchero. Aggiungi la farina di riso e il cacao setacciato, incorporando fino a ottenere un impasto denso e lucido. Se gradite, unisci le noci.',
        timerMinutes: 0,
        tip: 'La farina di riso si amalgama all\'istante senza creare gommosità.'
      },
      {
        id: 'step-fb-4',
        instruction: 'Fodera una teglia quadrata (circa 20x20 cm) con carta forno e versa l\'impasto livellando la superficie. Inforna a 175°C statico preriscaldato per 18-20 minuti. Il centro deve rimanere morbido e umido allo stecchino.',
        timerMinutes: 19,
        tip: 'Non prolungare la cottura oltre i 20 minuti per non asciugare la farina di riso.'
      },
      {
        id: 'step-fb-5',
        instruction: 'Lascia raffreddare completamente nella teglia per almeno un\'ora prima di tagliare a quadrotti regolari.',
        timerMinutes: 60,
        tip: 'Raffreddandosi il brownie si stabilizza e sprigiona tutta la sua ricchezza fondente.'
      }
    ]
  }
];

// Alias for backwards compatibility
export const INITIAL_RECIPES = DEFAULT_RECIPES;
