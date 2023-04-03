<template>
  <div class="room__footer" v-if="room">
    <div class="room__footer__container">
      <div>
        <label>
          Room
          <span v-if="room.settings.isPrivate">🔒</span>
        </label>
        <RoomCopyLink />
      </div>
      <div>
        <label>Players {{ room.players.length }} / {{ MAX_PLAYERS }}</label>
        <div class="room__footer__players">
          <p
            :class="currentUserID === p.id && 'current'"
            v-for="p in room.players"
            :key="p.id"
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
          Ready {{ game.players.filter((e: any) => e.isReady).length }}/{{
            game.players.length
          }}
        </button>
        <RoomTimer v-if="game" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MIN_PLAYERS } from '~/utils/constants';

const { room } = useRoom();
const { game } = useGame();

const currentUserID = useCookie('dice-game-user-id');

const isEnoughPlayer = computed(() =>
  room.value ? room.value.players.length >= MIN_PLAYERS : false
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
          display: block;
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
      display: flex;
      align-items: center;

      .createRoom {
        &.disabled {
          pointer-events: none;
          opacity: 0.5;
        }
      }
    }
  }
}

.timer {
  color: var(--color--third);
  margin: 0 0 0 auto;
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
