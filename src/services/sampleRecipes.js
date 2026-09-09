// Complete curated recipe catalog for CucinApp
export const INITIAL_RECIPES = [
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
    personalNotes: 'Mantecare a fuoco spento con burro freddissimo per ottenere una perfetta mantecatura all\'onda.',
    createdAt: new Date('2026-02-01T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-rvr-1', name: 'Riso Carnaroli', amount: 340, unit: 'g' },
      { id: 'ing-rvr-2', name: 'Vino rosso fermo (Barbera, Chianti o Bonarda)', amount: 300, unit: 'ml' },
      { id: 'ing-rvr-3', name: 'Brodo vegetale leggero caldo', amount: 1200, unit: 'ml' },
      { id: 'ing-rvr-4', name: 'Burro freddo da frigorifero', amount: 40, unit: 'g' },
      { id: 'ing-rvr-5', name: 'Parmigiano Reggiano o Grana Padano grattugiato', amount: 45, unit: 'g' },
      { id: 'ing-rvr-6', name: 'Stracciatella fresca', amount: 200, unit: 'g' },
      { id: 'ing-rvr-7', name: 'Pepe nero macinato', amount: 1, unit: 'q.b.' }
    ],
    steps: [
      {
        id: 'step-rvr-1',
        instruction: 'Scalda la casseruola a fiamma medio-alta. Versa il riso Carnaroli e tosta per 2 minuti a secco muovendolo spesso finché i chicchi non sono caldi al tatto.',
        timerMinutes: 2,
        tip: 'Tostare il riso a secco aiuta a renderlo resistente in cottura.'
      },
      {
        id: 'step-rvr-2',
        instruction: 'Versa il vino rosso direttamente sul riso caldissimo. Tieni la fiamma vivace e lascia evaporare per 2-3 minuti finché l\'odore dell\'alcol svanisce e il liquido è quasi del tutto assorbito.',
        timerMinutes: 3,
        tip: 'Lascia evaporare bene l\'alcol a fiamma viva per concentrare aroma e colore.'
      },
      {
        id: 'step-rvr-3',
        instruction: 'Abbassa la fiamma a livello medio e aggiungi il brodo caldo 1-2 mestoli per volta, rabboccando quando il precedente si è quasi assorbito. Cuoci per circa 14-15 minuti.',
        timerMinutes: 15,
        tip: 'Aggiungi il brodo caldo gradualmente man mano che si assorbe.'
      },
      {
        id: 'step-rvr-4',
        instruction: 'Spegni il fuoco, sposta la pentola dal fornello caldo e fai riposare 1 minuto coperto. Unisci il burro freddo e il formaggio grattugiato, mescolando energicamente per creare l\'onda.',
        timerMinutes: 1,
        tip: 'La mantecatura a fuoco spento con burro freddo garantisce la massima cremosità.'
      },
      {
        id: 'step-rvr-5',
        instruction: 'Versa nei piatti piani, batti leggermente sotto il piatto per stendere il riso e adagia al centro una generosa cucchiaiata di stracciatella fresca a crudo e un pizzico di pepe.',
        timerMinutes: 0,
        tip: 'La stracciatella fresca a crudo crea un gradevole contrasto termico con il riso caldo.'
      }
    ]
  },
  {
    id: 'recipe-ferrero-rocher-gf',
    title: 'Ferrero Rocher Senza Glutine',
    category: 'Dolci',
    prepTime: 15,
    cookTime: 0,
    servings: 12,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Il passaggio delle palline in freezer permette al cioccolato di copertura di solidificarsi istantaneamente.',
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
        instruction: 'In una ciotola sbriciola i wafer senza glutine a pezzi irregolari con le mani. Unisci la crema di nocciole e mescola con un cucchiaio fino a ottenere un composto omogeneo.',
        timerMinutes: 0,
        tip: 'Sbriciolare i wafer a mano senza ridurli in polvere per mantenere la croccantezza.'
      },
      {
        id: 'step-fr-2',
        instruction: 'Preleva una noce di impasto, inserisci una nocciola intera al centro e modella una pallina tra i palmi delle mani. Disponi le palline su un piatto coperto con carta forno.',
        timerMinutes: 0,
        tip: 'Inumidisci leggermente i palmi se il composto risulta appiccicoso.'
      },
      {
        id: 'step-fr-3',
        instruction: 'Metti il piatto con le palline in freezer per 20 minuti: devono diventare ben sode e fredde.',
        timerMinutes: 20,
        tip: 'Il riposo in freezer è fondamentale per far presa rapida sulla copertura calda.'
      },
      {
        id: 'step-fr-4',
        instruction: 'Spezzetta il cioccolato fondente in una ciotola o tazza capiente. Scioglilo al microonde a impulsi di 20-30 secondi mescolando bene. Unisci il cucchiaino di olio di semi e versa la granella di nocciole.',
        timerMinutes: 1,
        tip: 'L\'olio di semi rende la glassa lucida ed elastica.'
      },
      {
        id: 'step-fr-5',
        instruction: 'Tira fuori le palline dal freezer. Immergi una pallina per volta aiutandoti con una forchetta, scolala dal cioccolato in eccesso e riappoggiala sulla carta forno. Il cioccolato si solidificherà in circa un minuto grazie al freddo.',
        timerMinutes: 1,
        tip: 'Scola bene il cioccolato in eccesso per uno strato uniforme.'
      }
    ]
  },
  {
    id: 'recipe-arancini-gf',
    title: 'Arancini al Ragù Senza Glutine',
    category: 'Antipasti',
    prepTime: 25,
    cookTime: 8,
    servings: 8,
    difficulty: 'Media',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Usare riso ben freddo di frigorifero e provola o mozzarella asciutta per garantire la perfetta tenuta in frittura.',
    createdAt: new Date('2026-02-03T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-ar-1', name: 'Riso Carnaroli o Roma', amount: 400, unit: 'g' },
      { id: 'ing-ar-2', name: 'Acqua o brodo vegetale leggero', amount: 850, unit: 'ml' },
      { id: 'ing-ar-3', name: 'Zafferano in polvere (sciolto in poca acqua)', amount: 1, unit: 'bustina' },
      { id: 'ing-ar-4', name: 'Burro', amount: 40, unit: 'g' },
      { id: 'ing-ar-5', name: 'Parmigiano grattugiato', amount: 40, unit: 'g' },
      { id: 'ing-ar-6', name: 'Ragù di carne ristretto, denso e freddo di frigo', amount: 150, unit: 'g' },
      { id: 'ing-ar-7', name: 'Provola dolce o mozzarella per pizza asciutta a cubetti', amount: 100, unit: 'g' },
      { id: 'ing-ar-8', name: 'Uova intere', amount: 2, unit: 'uova' },
      { id: 'ing-ar-9', name: 'Pangrattato senza glutine', amount: 120, unit: 'g' },
      { id: 'ing-ar-10', name: 'Corn flakes senza glutine sbriciolati a mano', amount: 40, unit: 'g' },
      { id: 'ing-ar-11', name: 'Olio di semi di arachidi per friggere', amount: 500, unit: 'ml' }
    ],
    steps: [
      {
        id: 'step-ar-1',
        instruction: 'Cuoci il riso nel brodo finché il liquido non è completamente assorbito. Manteca con burro, parmigiano e l\'eventuale zafferano. Stendilo su un vassoio largo e fallo raffreddare completamente in frigorifero per almeno 2 ore.',
        timerMinutes: 120,
        tip: 'L\'amido freddo di frigo si compatta e fa da legante naturale.'
      },
      {
        id: 'step-ar-2',
        instruction: 'Inumidisci le mani con acqua. Prendi una porzione di riso freddo (circa 80 g), appiattiscila sul palmo formando una conca. Metti al centro un cucchiaino di ragù denso e cubetti di provola asciutta. Chiudi il riso sigillando bene e ruota tra le mani compattando una sfera solida.',
        timerMinutes: 0,
        tip: 'Usa formaggio ben asciutto per evitare che rilasci umidità in frittura.'
      },
      {
        id: 'step-ar-3',
        instruction: 'Sbatti le due uova con un pizzico di sale in un piatto fondo. In un altro piatto mescola il pangrattato senza glutine con i corn flakes sbriciolati finemente. Passa ciascun arancino prima nell\'uovo sbattuto e poi nel mix di pangrattato e mais, premendo delicatamente per farlo aderire.',
        timerMinutes: 0,
        tip: 'I corn flakes uniti al pangrattato donano una doratura croccante.'
      },
      {
        id: 'step-ar-4',
        instruction: 'Scalda abbondante olio di semi in una pentola alta (circa 170°C). Friggi 2 arancini alla volta completamente immersi per 4-5 minuti finché la crosta non è dorata e croccante. Scola su carta assorbente e fai riposare 2 minuti prima di servire.',
        timerMinutes: 5,
        tip: 'Friggi pochi pezzi alla volta per non abbassare la temperatura dell\'olio.'
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
    personalNotes: 'Allontanare la padella dalla fiamma prima di unire i tuorli sbattuti per ottenere una crema vellutata senza grumi.',
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
        instruction: 'Metti la pancetta in una padella capiente a freddo senza aggiungere olio né burro. Accendi la fiamma a livello medio-basso e lasciala rosolare dolcemente per 6-7 minuti fino a doratura croccante. Togli la pancetta su un piattino, lasciando il grasso fuso in padella.',
        timerMinutes: 7,
        tip: 'Partire da padella fredda permette al grasso di sciogliersi gradualmente senza bruciare.'
      },
      {
        id: 'step-cr-2',
        instruction: 'In una ciotola unisci i 5 tuorli, il formaggio grattugiato e una generosa macinata di pepe nero. Sbatti con una forchetta fino a ottenere una crema densa e omogenea.',
        timerMinutes: 0,
        tip: 'Usare solo i tuorli assicura una cremosità setosa e ricca.'
      },
      {
        id: 'step-cr-3',
        instruction: 'Cuoci gli spaghetti in abbondante acqua bollente con poco sale. Scolali al dente tenendo da parte una tazza di acqua di cottura.',
        timerMinutes: 10,
        tip: 'L\'acqua di cottura è fondamentale per emulsionare formaggio e uova.'
      },
      {
        id: 'step-cr-4',
        instruction: 'Versa la pasta direttamente nella padella col grasso caldo della pancetta, aggiungi mezzo mestolino d\'acqua di cottura e salta a fiamma viva per 30-40 secondi per legare l\'amido.',
        timerMinutes: 1,
        tip: 'Questo passaggio lucida la pasta con il grasso saporito.'
      },
      {
        id: 'step-cr-5',
        instruction: 'Spegni il fornello e sposta la padella dalla fonte di calore. Attendi 30 secondi che lo sfrigolio si calmi. Versa la crema di tuorli e formaggio sulla pasta e mescola energicamente e rapidamente. Se necessario, unisci poca acqua di cottura per fluidificare. Aggiungi la pancetta croccante e servi subito.',
        timerMinutes: 0,
        tip: 'Il calore residuo della pasta è sufficiente a creare una crema vellutata.'
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
    personalNotes: 'La panna fresca liquida incorporata all\'impasto mantiene la torta soffice e umida per più giorni.',
    createdAt: new Date('2026-02-05T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-tf-1', name: 'Uova intere a temperatura ambiente', amount: 3, unit: 'uova' },
      { id: 'ing-tf-2', name: 'Zucchero semolato', amount: 160, unit: 'g' },
      { id: 'ing-tf-3', name: 'Panna fresca liquida da montare (non zuccherata)', amount: 200, unit: 'ml' },
      { id: 'ing-tf-4', name: 'Cioccolato fondente da tavola', amount: 70, unit: 'g' },
      { id: 'ing-tf-5', name: 'Farina 00', amount: 150, unit: 'g' },
      { id: 'ing-tf-6', name: 'Fecola di patate o amido di mais', amount: 50, unit: 'g' },
      { id: 'ing-tf-7', name: 'Cacao amaro in polvere', amount: 30, unit: 'g' },
      { id: 'ing-tf-8', name: 'Lievito per dolci (mezza bustina)', amount: 8, unit: 'g' },
      { id: 'ing-tf-9', name: 'Sale fino', amount: 1, unit: 'pizzico' },
      { id: 'ing-tf-10', name: 'Estratto di vaniglia (o 1 bustina vanillina)', amount: 1, unit: 'cucchiaino' }
    ],
    steps: [
      {
        id: 'step-tf-1',
        instruction: 'Spezzetta il cioccolato fondente in una tazza, aggiungi 2 cucchiai di panna presi dal totale e scalda al microonde a media potenza per 40 secondi. Mescola bene fino a renderlo liscio e fluido, poi lascialo intiepidire.',
        timerMinutes: 1,
        tip: 'Fondere il cioccolato con un goccio di panna evita bruciature al microonde.'
      },
      {
        id: 'step-tf-2',
        instruction: 'In una ciotola capiente monta con le fruste elettriche le uova con lo zucchero, il pizzico di sale e la vaniglia per 3-4 minuti fino a ottenere un composto chiaro e spumoso.',
        timerMinutes: 4,
        tip: 'Montare a lungo le uova incorpora aria e dona leggerezza.'
      },
      {
        id: 'step-tf-3',
        instruction: 'Abbassa la velocità delle fruste al minimo e versa a filo la restante panna liquida e il cioccolato fuso ormai tiepido.',
        timerMinutes: 0,
        tip: 'Usa panna fresca a temperatura ambiente per non smontare il composto.'
      },
      {
        id: 'step-tf-4',
        instruction: 'Aggiungi la farina, la fecola, il cacao e il lievito setacciati. Amalgama a velocità minima per soli 30 secondi, fermandoti non appena le polveri sono incorporate.',
        timerMinutes: 0,
        tip: 'Non lavorare troppo l\'impasto dopo aver unito la farina per mantenerlo soffice.'
      },
      {
        id: 'step-tf-5',
        instruction: 'Versa in una tortiera da 22-24 cm imburrata o rivestita con carta forno. Inforna a 160°C in forno statico preriscaldato per 40-42 minuti. Fai la prova stecchino prima di sfornare.',
        timerMinutes: 42,
        tip: 'La temperatura a 160°C consente una cottura dolce e uniforme.'
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
    personalNotes: 'Montare bene le uova con lo zucchero assicura sofficità e tenuta alla struttura anche senza glutine.',
    createdAt: new Date('2026-02-06T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-tc-1', name: 'Uova intere', amount: 3, unit: 'uova' },
      { id: 'ing-tc-2', name: 'Zucchero semolato', amount: 140, unit: 'g' },
      { id: 'ing-tc-3', name: 'Preparato per dolci senza glutine', amount: 150, unit: 'g' },
      { id: 'ing-tc-4', name: 'Cacao amaro senza glutine', amount: 40, unit: 'g' },
      { id: 'ing-tc-5', name: 'Olio di semi (girasole o mais)', amount: 80, unit: 'ml' },
      { id: 'ing-tc-6', name: 'Latte intero (o vegetale)', amount: 100, unit: 'ml' },
      { id: 'ing-tc-7', name: 'Lievito per dolci (mezza bustina)', amount: 8, unit: 'g' },
      { id: 'ing-tc-8', name: 'Sale fino', amount: 1, unit: 'pizzico' },
      { id: 'ing-tc-9', name: 'Gocce o pezzi di cioccolato fondente senza glutine (facoltativi)', amount: 60, unit: 'g' }
    ],
    steps: [
      {
        id: 'step-tc-1',
        instruction: 'In una ciotola capiente monta le uova con lo zucchero e il pizzico di sale per 3-4 minuti fino a renderle gonfie e spumose.',
        timerMinutes: 4,
        tip: 'Montare le uova a lungo aiuta a dare struttura all\'impasto.'
      },
      {
        id: 'step-tc-2',
        instruction: 'Aggiungi a filo l\'olio di semi e il latte continuando a mescolare a bassa velocità.',
        timerMinutes: 0,
        tip: 'L\'olio mantiene il dolce morbido anche nei giorni successivi.'
      },
      {
        id: 'step-tc-3',
        instruction: 'Incorpora il mix per dolci senza glutine, il cacao amaro e il lievito. Mescola brevemente fino a ottenere una crema liscia e densa. Se gradite, aggiungi le gocce di cioccolato infarinate leggermente con un pizzico di mix.',
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
    personalNotes: 'Servire nei bicchierini con un velo di confettura o marmellata calda prima di portare in tavola.',
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
        instruction: 'Metti i fogli di gelatina in una tazza con abbondante acqua fredda per 8-10 minuti a idratarsi.',
        timerMinutes: 10,
        tip: 'Usa sempre acqua molto fredda per non sciogliere la gelatina durante l\'ammollo.'
      },
      {
        id: 'step-pc-2',
        instruction: 'In un pentolino unisci panna, latte, zucchero e la vaniglia. Scalda a fiamma medio-bassa fino a quando vedi le prime microscopiche bollicine sui bordi (senza raggiungere il bollore vivace). Spegni il fuoco.',
        timerMinutes: 5,
        tip: 'Non far bollire forte per preservare la freschezza del gusto della panna.'
      },
      {
        id: 'step-pc-3',
        instruction: 'Strizza bene i fogli di gelatina tra le mani e uniscili direttamente al liquido caldo. Mescola bene con un cucchiaio fino a completo scioglimento.',
        timerMinutes: 0,
        tip: 'La gelatina idratata si scioglie rapidamente nel liquido caldo.'
      },
      {
        id: 'step-pc-4',
        instruction: 'Versa il liquido direttamente in 4 bicchieri o coppette di vetro. Lascia intiepidire 15 minuti a temperatura ambiente, poi copri e metti in frigorifero per almeno 4 ore.',
        timerMinutes: 240,
        tip: 'Nel bicchiere la presentazione è sempre pulita ed elegante.'
      },
      {
        id: 'step-pc-5',
        instruction: 'Al momento di servire, scalda la marmellata per 10 secondi al microonde fino a renderla fluida, colala sulla panna cotta e servi al cucchiaio.',
        timerMinutes: 0,
        tip: 'La nota acidula di frutti di bosco bilancia la dolcezza della vaniglia.'
      }
    ]
  },
  {
    id: 'recipe-fudgy-brownies-gf',
    title: 'Brownies Senza Glutine',
    category: 'Dolci',
    prepTime: 10,
    cookTime: 22,
    servings: 9,
    difficulty: 'Facile',
    isGlutenFree: true,
    sourceName: 'Ricettario Casalingo',
    imageUrl: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
    personalNotes: 'Montare bene uova e zucchero per creare la caratteristica crosticina lucida in superficie. Non eccedere nei tempi di cottura per mantenere il cuore morbido.',
    createdAt: new Date('2026-02-08T12:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-fb-1', name: 'Cioccolato fondente da tavola', amount: 150, unit: 'g' },
      { id: 'ing-fb-2', name: 'Burro', amount: 90, unit: 'g' },
      { id: 'ing-fb-3', name: 'Uova intere grandi', amount: 2, unit: 'uova' },
      { id: 'ing-fb-4', name: 'Zucchero semolato', amount: 130, unit: 'g' },
      { id: 'ing-fb-5', name: 'Farina di riso (o mix per dolci senza glutine)', amount: 50, unit: 'g' },
      { id: 'ing-fb-6', name: 'Cacao amaro in polvere', amount: 20, unit: 'g' },
      { id: 'ing-fb-7', name: 'Sale fino', amount: 1, unit: 'pizzico generoso' },
      { id: 'ing-fb-8', name: 'Noci o nocciole spezzettate (facoltative)', amount: 50, unit: 'g' }
    ],
    steps: [
      {
        id: 'step-fb-1',
        instruction: 'Spezzetta il cioccolato fondente e taglia il burro a tocchetti in una ciotola adatta al microonde. Fai fondere a intervalli di 30 secondi a media potenza, mescolando fino a crema liscia. Lascia intiepidire.',
        timerMinutes: 1,
        tip: 'Sciogli burro e cioccolato a brevi intervalli per non bruciarli.'
      },
      {
        id: 'step-fb-2',
        instruction: 'In una ciotola sbatti le uova con lo zucchero e il pizzico generoso di sale con le fruste elettriche per 3-4 minuti, fino a ottenere un composto chiaro e spumoso.',
        timerMinutes: 4,
        tip: 'Montare a lungo uova e zucchero crea la tipica pellicola lucida in superficie.'
      },
      {
        id: 'step-fb-3',
        instruction: 'Versa il mix di burro e cioccolato fuso nella montata di uova mescolando delicatamente. Aggiungi la farina di riso e il cacao amaro setacciato, incorporando fino a ottenere un impasto denso e lucido. Se gradite, unisci le noci.',
        timerMinutes: 0,
        tip: 'La farina di riso dona una consistenza morbida e naturalmente gluten-free.'
      },
      {
        id: 'step-fb-4',
        instruction: 'Fodera una teglia quadrata (circa 20x20 cm) con carta forno e versa l\'impasto livellando la superficie. Inforna a 175°C statico preriscaldato per 20-25 minuti. Il centro deve rimanere morbido.',
        timerMinutes: 22,
        tip: 'Lo stecchino al centro deve uscire con briciole umide, mai asciutto.'
      },
      {
        id: 'step-fb-5',
        instruction: 'Lascia raffreddare completamente nella teglia per almeno un\'ora prima di tagliare a quadrotti regolari.',
        timerMinutes: 60,
        tip: 'Raffreddandosi il brownie si stabilizza e raggiunge la consistenza fondente perfetta.'
      }
    ]
  }
];
