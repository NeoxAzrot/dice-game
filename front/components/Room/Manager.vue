<template>
  <div class="room-manager">
    <div class="room-manager__selector">
      <p
        :class="selection === 'join' && 'selected'"
        @click="selection = 'join'"
      >
        Join
      </p>
      <p
        :class="selection === 'create' && 'selected'"
        @click="selection = 'create'"
      >
        Create
      </p>
    </div>

    <form v-if="selection === 'join'" @submit="handleJoin">
      <div class="room-manager__field input">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" v-model="username" />
      </div>
      <div class="room-manager__field input">
        <label for="room">Room</label>
        <input type="text" id="room" name="room" v-model="requestedRoom" />
      </div>
      <input type="submit" value="Join" class="btn--primary" />
    </form>

    <form v-else @submit="handleCreate">
      <div class="room-manager__field input">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" v-model="username" />
      </div>
      <div class="room-manager__field input">
        <label for="username">Private</label>
        <label
          class="checkbox"
          :class="isPrivate && 'checked'"
          @click="isPrivate = !isPrivate"
        ></label>
      </div>
      <input type="submit" value="Create" class="btn--primary" />
    </form>
    <p class="room-manager__error" v-if="error"><WarningIcon />{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import WarningIcon from '~/assets/icons/warning.svg';

const props = defineProps({
  selected: {
    type: String,
    default: '',
  },
});

const cookie = useCookie('dice-game-user-id');

const selection: Ref<'join' | 'create'> = ref('join');

const { username, roomID, userID } = useStore();
const requestedRoom = ref((useRoute().query.room as string) || '');

const isPrivate = ref(false);

const error = ref('');

watch(
  () => selection.value,
  () => {
    error.value = '';
  }
);

watch(
  () => props.selected,
  () => {
    selection.value = 'join';
    requestedRoom.value = props.selected;
  }
);

const handleJoin = (e: Event) => {
  e.preventDefault();
  useRoom()
    .join(requestedRoom.value)
    .then(({ data }) => {
      cookie.value = data.user.id;
      userID.value = data.user.id;
      window.location.href = `${useRuntimeConfig().APP_URL}/${data.room.id}`;
    })
    .catch((err) => {
      error.value = err.response._data.message;
    });
};

const handleCreate = (e: Event) => {
  e.preventDefault();
  useRoom()
    .create(isPrivate.value)
    .then(({ data }) => {
      cookie.value = data.user.id;
      roomID.value = data.room.id;
      userID.value = data.user.id;
      window.location.href = `${useRuntimeConfig().APP_URL}/${data.room.id}`;
    })
    .catch((err) => {
      error.value = err.response._data.message;
    });
};
</script>

<style lang="scss">
.room-manager {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  &__selector {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;

    p {
      pointer-events: all;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.3s ease-in-out;
      padding-bottom: 0.5rem;
      color: var(--color--second);

      &.selected {
        pointer-events: none;
        border-bottom: 2px solid var(--color--second);
        opacity: 1;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    input[type='submit'] {
      margin-top: 1rem;
    }
  }

  &__error {
    color: #ff0000;
    font-size: 1.4rem;
    letter-spacing: normal;
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
}
</style>
