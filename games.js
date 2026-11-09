/* ==========================================================================
   GAMETRO9 — GAME LIST
   This is the only file you edit to add games. Everything on the website
   (route map, lines, station codes, cards, counts, A to Z, search) updates
   itself from this list. There is no limit on games or lines.

   TO ADD A GAME: copy one block in GAMES, paste it at the END, change values.
     id     short unique name, no spaces            'cricket-boss'
     name   shown on the site                        'Cricket Boss'
     line   id of a line from LINES below            'tycoon'
     genre  short description of the type            'Sports manager'
     tagline one short line that sells the game        'Build a cricket club from gully to stadium.'
     price  0 = free, or price in rupees             49
     status 'open'         = playable now
            'boarding'     = launching soon (add opens: '2027-03' to show the month)
            'construction' = still being built
     play   (live games) link to the game            'play/cricket-boss/'
     cover  (optional) image path                    'covers/cricket-boss.jpg'
            no cover? the site draws one in the line's colour
     modes  how it can be played: ['single'] or ['multi'] or ['single','multi']
     levels difficulty levels the game offers, any of:
            'Easy', 'Normal', 'Hard', 'Expert'   (leave [] if the game has none)
     about  one or two sentences about the game
     buys   list of things Tokens buy in this game

   TO ADD A LINE: add a block in LINES. code = letters used in station codes.
   Order in GAMES = launch order. Station codes (T-01, P-02...) are automatic.
   ========================================================================== */

window.G9_LINES = [
  { id: 'tycoon',   name: 'Tycoon & Builder', code: 'T', color: '#f0412b' },
  { id: 'puzzle',   name: 'Puzzle',           code: 'P', color: '#2f5bff' },
  { id: 'action',   name: 'Action & Battle',  code: 'A', color: '#13a05c' },
  { id: 'strategy', name: 'Strategy',         code: 'S', color: '#e89a00' },
];

window.G9_GAMES = [
  { id: 'chai', name: 'Chai Empire', line: 'tycoon', genre: 'Cozy tycoon', price: 0, status: 'open',
    tagline: "Turn one roadside stall into India's biggest chai chain.",
    play: 'play/chai-empire/', art: 'a-chai',
    modes: ['single'], levels: [],
    about: 'Start with one roadside stall and grow it into a chai chain across India. Serve customers, brew fast, hire staff and unlock new cities.',
    buys: ['Premium recipes like Kesar and Rose chai', 'Staff such as Chai Wala Dada', 'Stall decorations that raise tips', 'Rush-hour 2x coin boosts'] },

  { id: 'ink', name: 'Inkborn Arena', line: 'action', genre: 'Draw-and-battle', price: 49, status: 'boarding', art: 'a-ink',
    tagline: 'Draw a monster with your finger. Watch it fight.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal', 'Hard'],
    about: "Draw a creature with your finger. Its shape becomes its stats, then it fights other players' drawings.",
    buys: ['Special inks with bonus effects', 'Extra drawing slots', 'Arena themes'] },

  { id: 'tide', name: 'Tidekeeper', line: 'puzzle', genre: 'Timing puzzle', price: 0, status: 'boarding', art: 'a-tide',
    tagline: 'Guide every ship home through the storm.',
    modes: ['single'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'Keep the lighthouse on a drifting island and guide ships home through storms.',
    buys: ['Lighthouse skins', 'Rare ship blueprints', 'Storm shields'] },

  { id: 'echo', name: 'Echo Thief', line: 'action', genre: 'Stealth heist', price: 79, status: 'construction', art: 'a-echo',
    tagline: 'Every sound you make lights up the room.',
    modes: ['single', 'multi'], levels: ['Normal', 'Hard'],
    about: 'Short heists where sound is your only map. Every noise you make lights the room, and the guards hear it too.',
    buys: ['Gadgets', 'Thief outfits', 'Extra lives per heist'] },

  { id: 'grav', name: 'Gravity Gardener', line: 'tycoon', genre: 'Relaxing builder', price: 0, status: 'construction', art: 'a-grav',
    tagline: 'Grow impossible gardens on tiny planets.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal'],
    about: 'Grow plants on tiny planets where gravity bends how they grow. Trade rare seeds with friends.',
    buys: ['Rare seeds', 'New planets', 'Growth boosts'] },

  { id: 'mirror', name: 'Mirror Duel', line: 'puzzle', genre: '1v1 puzzle', price: 0, status: 'boarding', art: 'a-mirror',
    tagline: 'Whatever you build, your rival gets it flipped.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal', 'Hard'],
    about: "Whatever you build on your side appears flipped on your rival's. Win by sabotage through symmetry.",
    buys: ['Board themes', 'Emotes', 'Ranked season pass'] },

  { id: 'train', name: 'Last Train Out', line: 'action', genre: 'Roguelike survival', price: 99, status: 'construction', art: 'a-train',
    tagline: 'One endless train. One choice per carriage.',
    modes: ['single'], levels: ['Normal', 'Hard', 'Expert'],
    about: 'One endless train, one choice per carriage. Upgrade your train between runs and see how far you get.',
    buys: ['New carriage types', 'Character skins', 'Revive tickets'] },

  { id: 'pocket', name: 'Pocket Kingdoms', line: 'strategy', genre: 'Slow strategy', price: 0, status: 'construction', art: 'a-pocket',
    tagline: 'Rule one tile. Trade, ally or raid next door.',
    modes: ['multi'], levels: ['Normal'],
    about: 'Rule one tiny tile on a shared map. Trade, ally or raid your neighbours once a day.',
    buys: ['Buildings and banners', 'Defence walls', 'Map expansion'] },
];
