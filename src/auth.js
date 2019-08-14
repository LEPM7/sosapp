import CognitoConfig from 'configs/Cognito.config';
import Amplify, { Auth } from 'aws-amplify';
Amplify.configure(CognitoConfig);


const auth = {
    isAuthenticated: false,

    forgotPassword: async (username) => {
      try {
        const data = await Auth.forgotPassword(username);
        this.isAuthenticated = true;
        console.log('SUCCESSFULLY SIGNIN', data);
      }catch(e){
        console.trace(e);
      }
    },

    signIn: async (username, password) => {
      try {
        const success = await Auth.signIn(username, password);
        this.isAuthenticated = true;
        console.log('SUCCESSFULLY SIGNIN', success);
      }catch(e){
        console.trace(e);
      }
    },

    signOut: async () => {
      try {
        await Auth.signOut();
        this.isAuthenticated = false;
      }catch(e){
        console.trace(e);
      }
    }
  }

export default auth;