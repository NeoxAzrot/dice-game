import useGlobalStore from '~~/store/main';
import { storeToRefs } from 'pinia'

const useStore = () => {
  const store = storeToRefs(useGlobalStore());
  return store
}

export default useStore;