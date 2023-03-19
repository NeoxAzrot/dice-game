export default function useFirebase() {
  const { $firebase } = useNuxtApp();

  return $firebase;
}
