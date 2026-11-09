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
     shop   true when the game already has its Token shop
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
  { id: 'board',    name: 'Board & Cards',    code: 'B', color: '#8a3ffc' },
  { id: 'gully',    name: 'Gully Sports',     code: 'G', color: '#0aa6b8' },
];

window.G9_GAMES = [
  { id: 'chai', name: 'Chai Empire', line: 'tycoon', genre: 'Cozy tycoon', price: 0, status: 'open', shop: true,
    tagline: "Turn one roadside stall into India's biggest chai chain.",
    play: 'play/chai-empire/', art: 'a-chai',
    modes: ['single'], levels: [],
    about: 'Start with one roadside stall and grow it into a chai chain across India. Serve customers, brew fast, hire staff and unlock new cities.',
    buys: ['Premium recipes like Kesar and Rose chai', 'Staff such as Chai Wala Dada', 'Stall decorations that raise tips', 'Rush-hour 2x coin boosts'] },

  { id: 'ink', name: 'Inkborn Arena', line: 'action', genre: 'Draw-and-battle', price: 0, status: 'open', play: 'play/inkborn-arena/', art: 'a-ink',
    tagline: 'Draw a monster with your finger. Watch it fight.',
    modes: ['single'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'Draw a creature with your finger. More ink means more health, sharp zig-zags hit harder and small drawings move faster. Then it battles rival creatures one after another.',
    buys: ['Special inks with bonus effects', 'Extra drawing slots', 'Arena themes'] },

  { id: 'tide', name: 'Tidekeeper', line: 'puzzle', genre: 'Timing puzzle', price: 0, status: 'open', play: 'play/tidekeeper/', art: 'a-tide',
    tagline: 'Guide every ship home through the storm.',
    modes: ['single'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'The lighthouse beam sweeps around a stormy island. Flash it at the right moment to guide each ship home before it hits the rocks.',
    buys: ['Lighthouse skins', 'Rare ship blueprints', 'Storm shields'] },

  { id: 'echo', name: 'Echo Thief', line: 'action', genre: 'Stealth heist', price: 0, status: 'open', play: 'play/echo-thief/', art: 'a-echo',
    tagline: 'Every sound you make lights up the room.',
    modes: ['single'], levels: ['Normal', 'Hard'],
    about: 'Short heists in the dark. Every step sends out a sound ring that shows the walls, and any guard who hears it comes looking. Grab the gem and get out.',
    buys: ['Gadgets', 'Thief outfits', 'Extra lives per heist'] },

  { id: 'grav', name: 'Gravity Gardener', line: 'tycoon', genre: 'Relaxing builder', price: 0, status: 'open', play: 'play/gravity-gardener/', art: 'a-grav',
    tagline: 'Grow impossible gardens on tiny planets.',
    modes: ['single'], levels: ['Easy', 'Normal'],
    about: 'Plant seeds around tiny planets where gravity bends how they grow. Collect dew from blooms, buy rarer seeds and unlock new planets. Your garden grows while you are away.',
    buys: ['Rare seeds', 'New planets', 'Growth boosts'] },

  { id: 'mirror', name: 'Mirror Duel', line: 'puzzle', genre: '1v1 puzzle', price: 0, status: 'open', play: 'play/mirror-duel/', art: 'a-mirror',
    tagline: 'Whatever you build, your rival gets it flipped.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'Get 4 in a row, but every stone you place also gives your rival a stone in the mirrored square. Play the computer, or 2 players on one phone.',
    buys: ['Board themes', 'Emotes', 'Ranked season pass'] },

  { id: 'train', name: 'Last Train Out', line: 'action', genre: 'Roguelike survival', price: 0, status: 'open', play: 'play/last-train-out/', art: 'a-train',
    tagline: 'One endless train. One choice per carriage.',
    modes: ['single'], levels: ['Normal', 'Hard', 'Expert'],
    about: 'One endless train, one choice per carriage. Keep fuel, food, health and crew going, then spend scrap on permanent upgrades between runs.',
    buys: ['New carriage types', 'Character skins', 'Revive tickets'] },

  { id: 'pocket', name: 'Pocket Kingdoms', line: 'strategy', genre: 'Slow strategy', price: 0, status: 'open', play: 'play/pocket-kingdoms/', art: 'a-pocket',
    tagline: 'Rule one tile. Trade, ally or raid next door.',
    modes: ['single'], levels: ['Normal'],
    about: 'Rule one tile on a small map against three computer kingdoms. Claim land, recruit troops, raid neighbours or pay for a truce. Each turn is one day.',
    buys: ['Buildings and banners', 'Defence walls', 'Map expansion'] },

  { id: 'chaupar', name: 'Chaupar Express', line: 'board', genre: 'Board race', price: 0, status: 'open', play: 'play/chaupar-express/',
    tagline: 'Race 4 trains round the loop. Jump at interchanges.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'A board race on a metro loop. Roll a 6 to leave the depot, land on interchanges to jump 10 stops and send rival trains back. Play 1 or 3 bots, or 2 to 4 friends on one phone.',
    buys: ['Train skins', 'Board themes', 'Lucky dice designs'] },

  { id: 'patta', name: 'Patta Junction', line: 'board', genre: 'Card game', price: 0, status: 'open', play: 'play/patta-junction/',
    tagline: 'Match the line colour. Empty your hand first.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'A fast card-shedding game with metro cards: Express skips, U-turn reverses, Rush hour makes them draw 2 and Platform swap trades whole hands. Play bots, or pass the phone between 2 to 4 friends.',
    buys: ['Card backs', 'Table themes', 'Emotes'] },

  { id: 'striker', name: 'Striker Club', line: 'board', genre: 'Flick board game', price: 0, status: 'open', play: 'play/striker-club/',
    tagline: 'Flick, rebound, pocket. Your club, your rules.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'A carrom-style flick game with real physics. Slide the striker, pull back and release. Your coins score 1, the pink Club coin scores 3. Play a bot or a friend on one phone.',
    buys: ['Striker designs', 'Board finishes', 'Coin sets'] },

  { id: 'gully', name: 'Gully Over', line: 'gully', genre: 'Street cricket', price: 0, status: 'open', play: 'play/gully-over/',
    tagline: 'Two overs. Three wickets. Do not break the window.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'Street cricket. Tap to time your shot and pick a side to beat the fielders, but a six into the window side is out. Bat, then bowl to defend. Or 2 friends take turns batting.',
    buys: ['Bat designs', 'Gully grounds', 'Super over tickets'] },

  { id: 'raid', name: 'Raid Line', line: 'gully', genre: 'Kabaddi action', price: 0, status: 'open', play: 'play/raid-line/',
    tagline: 'One breath. Tag them. Get back over the line.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'Kabaddi-style raids. Dash in, tag defenders and get back across the middle line before you run out of breath. Then defend as captain. Play a bot team or take turns with a friend.',
    buys: ['Team kits', 'Courts', 'Raider moves'] },

  { id: 'patang', name: 'Patang Wars', line: 'action', genre: 'Kite fighting', price: 0, status: 'open', play: 'play/patang-wars/',
    tagline: 'Cross their string. Saw faster. Cut them down.',
    modes: ['single', 'multi'], levels: ['Easy', 'Normal', 'Hard'],
    about: 'Kite fighting over the rooftops. Cross a rival string and saw faster to cut their kite. Clear the sky against 3 bots to sharpen your manja, or duel a friend on one phone.',
    buys: ['Kite designs', 'Manja upgrades', 'Rooftop themes'] },
];
