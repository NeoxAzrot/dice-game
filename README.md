# Dice game

## Rules

On clique pour lancer les dés, on peut relancer les dés qu'on veut autant de fois qu'on veut. On peut aussi bloquer les dés qu'on veut. Le but est d'obtenir le plus de points possible.

Le backend renvoie un tableau de 5 dés avec un nombre aléatoire entre 1 et 6 et un booléen qui indique si le dé est bloqué ou non.

Le front affiche les dés et permet de les relancer ou les bloquer.

## Routes

- Rooms

  - [x] POST /rooms - create a new room
  - [x] POST /rooms/:id/join - join a room
  - [x] DELETE /rooms/:id - delete a room

  - [ ] GET /rooms - get all rooms - OPTIONAL

- Games

  - [ ] POST /rooms/:roomId/games - create a new game
  - [ ] POST /rooms/:roomId/games/:gameId/play - roll or hold a dice

  - [ ] Get /games - get all games - OPTIONAL

## Todo

### Back

- [ ] Add response types on async function
- [ ] Add tests
- [ ] Add then + catch on async function (for error handling) with types

### Upgrade

- [ ] Add a music kit
- [ ] Add a chat
- [ ] Add a score
- [ ] Add a ranking
- [ ] Add music design on interaction
