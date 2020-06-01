import { firebase } from "./firebase";

const db = firebase.firestore();
const auth = firebase.auth();

export const CreateUser = (username, name , email, password, bio) => {
  return auth.createUserWithEmailAndPassword(email, password).then(cred=>{
        db.collection("users").doc(cred.user.uid).set({
        name: name,
        email: email,
        password: password,
        username:username,
        bio:bio
       })
       localStorage.setItem('uid', JSON.stringify(firebase.auth().currentUser.uid))
       localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser))
       alert(localStorage.getItem('uid'))
       console.log(cred);

  })
};

export const SigninUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password).then(cred=>{
    localStorage.setItem('uid', JSON.stringify(firebase.auth().currentUser.uid));
    localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser));
    // alert(localStorage.getItem('uid'));
    // console.log(cred);
  });
};

export const logOutUser = ()=>{
    auth.signOut().then(()=>{
        // localStorage.removeItem('user');
        // localStorage.removeItem('uid');
        // localStorage.removeItem('Fuid');
localStorage.clear();
        console.log("Signed Out");
    })
}
export const isUserSignedIn = () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      // alert(localStorage.getItem('uid'));
      // JSON.parse(localStorage.getItem('authUser'));
      console.log("User is logged in!");
    } else {
      console.log("User is not logged in!");
    }
  });
};

export const userToken = () => {
firebase.auth.onAuthStateChanged(authUser => {
  authUser
    ? localStorage.setItem('authUser', JSON.stringify(authUser))
    : localStorage.removeItem('authUser')
});
};

// export const userSession = (email, password) =>{
// firebase.auth().setPersistence(auth.Auth.Persistence.SESSION)
//   .then(function() {

//     return firebase.auth().signInWithEmailAndPassword(email, password);
    
//   })
//   .catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });
// };


// const signout = () => {
//   return firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       setUser(false);
//     });
// };

// const sendPasswordResetEmail = email => {
//   return firebase
//     .auth()
//     .sendPasswordResetEmail(email)
//     .then(() => {
//       return true;
//     });
// };

// const confirmPasswordReset = (code, password) => {
//   return firebase
//     .auth()
//     .confirmPasswordReset(code, password)
//     .then(() => {
//       return true;
//     });
// };

