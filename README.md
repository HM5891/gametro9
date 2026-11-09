# Gametro9

Every game, A to Z, on one network. Original mobile games with one Token card for all of them.

## Add a new game (no limit)
1. Open `games.js`.
2. Copy one game block, paste it at the END of the list, change the values.
3. Commit and push. The map, lines, station codes, cards, counts, A to Z and search all update automatically.

To add a new line (a new kind of game), add a block to `G9_LINES` in the same file.

## Files
- `index.html` — the website
- `games.js` — the game list (the only file you edit to add games)
- `play/<game>/` — playable web games
- `covers/` — optional cover images for games
- `favicon.svg` — the Gametro9 logo

Hosted on GitHub Pages. For gametro9.com later: add a `CNAME` file containing `gametro9.com` and point the domain's DNS at GitHub Pages.
