# Dice game

## Routes

- Rooms

  - POST /rooms - create a new room
  - POST /rooms/:id/join - join a room

  - GET /rooms - get all rooms - OPTIONAL
  - DELETE /rooms/:id - delete a room - OPTIONAL

- Games

  - POST /rooms/:roomId/games - create a new game
  - POST /rooms/:roomId/games/:gameId/play - roll or hold a dice

  - Get /games - get all games - OPTIONAL
