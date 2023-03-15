import useMainStore from '~~/store/main';
import { storeToRefs } from 'pinia'

const useStore = () => {
  const store = storeToRefs(useMainStore());
  return store
}

export default useStore;