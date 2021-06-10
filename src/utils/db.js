import firebase from '../lib/firebase';

export const addUser = async (authUser) => {
  const resp = await firebase
    .firestore()
    .collection('users')
    .doc(authUser.uid)
    .set({ ...authUser }, { merge: true });
  return resp;
};