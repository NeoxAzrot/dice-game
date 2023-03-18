<template>
  <div class="room__footer" v-if="room">
    <div class="room__footer__container">
      <div>
        <label>Room</label>
        <RoomCopyLink />
      </div>
      <div>
        <label>Players</label>
        <div class="room__footer__players">
          <p
            :class="currentUserID === p.id && 'current'"
            v-for="p in room.players"
          >
            {{ p.username }}
            {{
              game &&
              (game.players.find((e: any) => e.id === p.id).isReady ? '🏁' : '')
            }}
          </p>
        </div>
      </div>
      <div class="room__footer__actions">
        <button
          v-if="!game"
          @click="handleCreateGame"
          class="btn--primary createRoom"
          :class="!isEnoughPlayer && 'disabled'"
        >
          Start a new game
        </button>
        <button
          v-else-if="game.state.gameStatus === 'waiting'"
          @click="handleReadyGame"
          class="btn--primary createRoom"
        >
          Ready {{ game.players.filter((e: any) => e.isReady).length }}/2
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { room } = useRoom();
const { game } = useGame();

const currentUserID = useCookie('dice-game-user-id');

const isInGame = computed(() =>
  room.value?.games ? room.value?.games.length > 0 : false
);
const isEnoughPlayer = computed(() =>
  room.value ? room.value.players.length >= 2 : false
);

const handleCreateGame = async () => {
  if (!isEnoughPlayer.value) return;

  useGame().create();
};

const handleReadyGame = async () => {
  useGame().ready();
};
</script>

<style lang="scss">
.room {
  &__footer {
    width: 100%;
    color: white;
    position: fixed;
    bottom: 2rem;
    left: 0;
    display: flex;

    &__container {
      --shadow--size: 3.2rem;
      --shadow--opacity: 0.3;

      margin: auto;
      width: 100%;
      height: 100%;
      padding: 2rem;
      display: inline-flex;
      gap: 4rem;
      max-width: var(--container--max-width);
      position: relative;
      background: #1e1e1e;

      &::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        background: var(--gradient--main);
        height: 2px;
      }

      > div {
        label {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
      }

      &:hover {
        --shadow--size: 5rem;
      }
    }

    &__players {
      display: flex;
      gap: 2rem;
    }

    &__actions {
      margin: 0 0 0 auto;
      display: flex;
      gap: 1rem;

      .createRoom {
        &.disabled {
          pointer-events: none;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
