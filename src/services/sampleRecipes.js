// 4 authentic, tested starter recipes for CucinApp
export const INITIAL_RECIPES = [
  {
    id: 'recipe-carbonara-1',
    title: 'Spaghettoni alla Carbonara Classica',
    category: 'Primi',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Media',
    sourceUrl: 'https://ricette.giallozafferano.it/Spaghetti-alla-Carbonara.html',
    sourceName: 'GialloZafferano',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
    personalNotes: 'Ricordarsi di non salare troppo l\'acqua della pasta perché il pecorino e il guanciale sono già saporiti! Togliere la padella dal fuoco prima di unire le uova per evitare l\'effetto frittata.',
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
        instruction: 'Metti a bollire abbondante acqua per la pasta (poco salata). Taglia il guanciale a listarelle di circa mezzo centimetro.',
        timerMinutes: 0,
        tip: 'Non usare olio o burro per il guanciale: rilascerà il suo stesso grasso naturale.'
      },
      {
        id: 'step-2',
        instruction: 'In una padella antiaderente, rosola il guanciale a fuoco medio-basso finché il grasso diventa trasparente e la parte magra diventa dorata e croccante (circa 8 minuti). Scola il guanciale e tienilo da parte al caldo, conservando il grasso fuso nella padella.',
        timerMinutes: 8,
        tip: 'Tieni da parte qualche pezzetto di guanciale croccante per guarnire il piatto finale.'
      },
      {
        id: 'step-3',
        instruction: 'In una ciotola capiente, mescola i 4 tuorli e l\'uovo intero con il Pecorino Romano grattugiato e una macinata generosa di pepe nero, creando una crema densa (la "carbocrema"). Aggiungi 1-2 cucchiai del grasso del guanciale raffreddato per renderla setosa.',
        timerMinutes: 0,
        tip: 'Se la crema risulta troppo densa, ammorbidiscila con un cucchiaio di acqua di cottura della pasta.'
      },
      {
        id: 'step-4',
        instruction: 'Butta gli spaghettoni nell\'acqua bollente e cuocili per 10 minuti (fino a quando mancano 2 minuti alla cottura al dente).',
        timerMinutes: 10,
        tip: 'Conserva sempre mezza tazza di acqua di cottura ricca di amido prima di scolare la pasta.'
      },
      {
        id: 'step-5',
        instruction: 'Scola la pasta direttamente nella padella col grasso del guanciale a fuoco spento. Salta gli spaghetti un minuto aggiungendo un mestolino di acqua calda.',
        timerMinutes: 1,
        tip: 'Attendi 30-40 secondi prima di unire la crema d\'uovo affinché la padella non sia rovente.'
      },
      {
        id: 'step-6',
        instruction: 'Versa la carbocrema e la maggior parte del guanciale sugli spaghetti. Manteca vigorosamente per creare l\'emulsione cremosa. Servi subito completando con il guanciale croccante tenuto da parte, altro pecorino e pepe nero appena macinato.',
        timerMinutes: 0,
        tip: 'Servi nei piatti caldi per goderti la massima cremosità!'
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
    sourceUrl: 'https://www.cucchiaio.it/ricetta/risotto-ai-funghi-porcini/',
    sourceName: 'Il Cucchiaio d\'Argento',
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
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
        instruction: 'Pulisci delicatamente i funghi porcini con un panno umido (senza lavarli sotto l\'acqua corrente) e tagliali a fettine. Falli saltare 4 minuti in padella con un filo d\'olio e un pizzico di sale.',
        timerMinutes: 4,
        tip: 'Tieni in caldo il brodo vegetale in un pentolino a fianco a fiamma minima.'
      },
      {
        id: 'step-202',
        instruction: 'In una casseruola ampia, fai appassire lo scalogno tritato con un filo d\'olio. Aggiungi il riso e tostalo a secco mescolando per 2-3 minuti fino a quando i chicchi diventano traslucidi.',
        timerMinutes: 3,
        tip: 'Tocca il riso con il dorso della mano: quando è ben caldo, la tostatura è perfetta.'
      },
      {
        id: 'step-203',
        instruction: 'Sfuma con il vino bianco secco a fiamma vivace e lascia evaporare completamente l\'odore di alcol.',
        timerMinutes: 1,
        tip: 'Usa vino a temperatura ambiente, mai freddo da frigo, per non bloccare la cottura del chicco.'
      },
      {
        id: 'step-204',
        instruction: 'Comincia ad aggiungere il brodo bollente un mestolo alla volta, continuando a mescolare ogni volta che si assorbe. A metà cottura (dopo circa 8 minuti) unisci i funghi porcini precedentemente trifolati.',
        timerMinutes: 16,
        tip: 'Il riso deve sobbollire dolcemente e non annegare nel liquido.'
      },
      {
        id: 'step-205',
        instruction: 'Una volta al dente, spegni il fuoco. Aggiungi il burro ghiacciato a cubetti e il Parmigiano. Copri con un coperchio per 2 minuti, poi manteca energicamente e completa con prezzemolo fresco tritato.',
        timerMinutes: 2,
        tip: 'Il riso deve essere "all\'onda": se serve, aggiungi un goccio di brodo prima di servire.'
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
    sourceUrl: 'https://ricette.giallozafferano.it/Tiramisu.html',
    sourceName: 'GialloZafferano',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Inzuppare i savoiardi per non più di 1 secondo per lato, altrimenti rilasciano troppo liquido nel dolce. Lasciare in frigo almeno 4 ore prima di servire.',
    createdAt: new Date('2026-01-20T17:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-301', name: 'Mascarpone fresco di qualità', amount: 500, unit: 'g' },
      { id: 'ing-302', name: 'Biscotti Savoiardi', amount: 300, unit: 'g' },
      { id: 'ing-303', name: 'Uova freschissime medie', amount: 4, unit: 'uova' },
      { id: 'ing-304', name: 'Zucchero semolato', amount: 100, unit: 'g' },
      { id: 'ing-305', name: 'Caffè espresso della moka (zuccherato leggermente)', amount: 300, unit: 'ml' },
      { id: 'ing-306', name: 'Cacao amaro in polvere', amount: 2, unit: 'cucchiai' }
    ],
    steps: [
      {
        id: 'step-301',
        instruction: 'Prepara il caffè con la moka, versalo in una ciotola larga e lascialo raffreddare completamente a temperatura ambiente.',
        timerMinutes: 0,
        tip: 'Se ti piace, puoi aggiungere al caffè freddo un cucchiaio di Marsala secco o liquore al caffè.'
      },
      {
        id: 'step-302',
        instruction: 'Separa i tuorli dagli albumi. Monta i tuorli con lo zucchero con le fruste elettriche per almeno 5 minuti, fino a ottenere un composto chiaro e spumoso.',
        timerMinutes: 5,
        tip: 'Lavora il mascarpone prima con una forchetta per renderlo morbido prima di incorporarlo.'
      },
      {
        id: 'step-303',
        instruction: 'Aggiungi il mascarpone al composto di tuorli a cucchiaiate, continuando a montare a velocità bassa fino a ottenere una crema liscia e compatta.',
        timerMinutes: 0,
        tip: 'Non montare eccessivamente per evitare che il mascarpone impazzisca rilasciando siero.'
      },
      {
        id: 'step-304',
        instruction: 'In una ciotola pulita monta gli albumi a neve ben ferma con un pizzico di sale. Incorporali delicatamente alla crema di mascarpone con movimenti dal basso verso l\'alto.',
        timerMinutes: 3,
        tip: 'Usa una spatola in silicone per non smontare la spumosità della crema.'
      },
      {
        id: 'step-305',
        instruction: 'In una pirofila rettangolare, stendi un velo di crema. Inzuppa rapidamente i savoiardi nel caffè (1 secondo per lato) e disponili in fila. Copri con metà della crema.',
        timerMinutes: 0,
        tip: 'Alterna la direzione dei savoiardi nel secondo strato per una migliore tenuta al taglio.'
      },
      {
        id: 'step-306',
        instruction: 'Crea il secondo strato di savoiardi e copri con la crema rimanente, livellandola o creando dei ciuffetti con la sac-à-poche. Riponi in frigorifero per almeno 4 ore.',
        timerMinutes: 0,
        tip: 'Spolvera il cacao amaro solo subito prima di portare in tavola per mantenerlo vellutato e asciutto.'
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
    sourceUrl: 'https://cucina.corriere.it/ricette/secondi/salmone-al-forno-con-verdure/',
    sourceName: 'Cucina Corriere',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    personalNotes: 'Piatto leggero e velocissimo per la cena durante la settimana. La cottura a 190°C mantiene il cuore del salmone tenero e succoso.',
    createdAt: new Date('2026-01-22T19:00:00Z').toISOString(),
    ingredients: [
      { id: 'ing-401', name: 'Filetti di salmone fresco senza spine', amount: 350, unit: 'g' },
      { id: 'ing-402', name: 'Zucchine medie', amount: 2, unit: 'pezzi' },
      { id: 'ing-403', name: 'Limone biologico a fettine', amount: 1, unit: 'pezzo' },
      { id: 'ing-404', name: 'Olio extravergine d\'oliva', amount: 2, unit: 'cucchiai' },
      { id: 'ing-405', name: 'Timo o aneto fresco', amount: 2, unit: 'rametti' },
      { id: 'ing-406', name: 'Sale fino e pepe rosa', amount: 1, unit: 'q.b.' }
    ],
    steps: [
      {
        id: 'step-401',
        instruction: 'Preriscalda il forno a 190°C statico (o 180°C ventilato). Fodera una teglia con carta da forno.',
        timerMinutes: 0,
        tip: 'Asciuga bene la superficie dei filetti di salmone con carta assorbente prima di condirli.'
      },
      {
        id: 'step-402',
        instruction: 'Lava le zucchine e tagliale a rondelle sottili. Disponile sulla teglia condendole con un filo d\'olio, sale e pepe.',
        timerMinutes: 0,
        tip: 'Tagliare le zucchine sottili assicura che cuociano nello stesso tempo del pesce.'
      },
      {
        id: 'step-403',
        instruction: 'Adagia i filetti di salmone sopra il letto di zucchine, posiziona sopra ogni trancio 2 fette sottili di limone e rametti di timo fresco. Irrora con un filo d\'olio.',
        timerMinutes: 0,
        tip: 'Le fette di limone proteggono il salmone dal seccarsi in superficie durante la cottura.'
      },
      {
        id: 'step-404',
        instruction: 'Inforna a 190°C e lascia cuocere per circa 18 minuti, finché il salmone risulta opaco e dorato sui bordi.',
        timerMinutes: 18,
        tip: 'Se ami la crosticina, puoi azionare il grill negli ultimi 2 minuti di cottura.'
      }
    ]
  }
];
