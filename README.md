# Dice game

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
