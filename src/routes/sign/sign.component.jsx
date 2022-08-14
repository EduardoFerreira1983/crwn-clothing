import { React } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

const Sign = () => {
    
 

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
         createUserDocumentFromAuth( user );
         const userDocRef = await createUserDocumentFromAuth( user );
    }

    return (
        <div>
            <h1>Sign page</h1>
            <button onClick={ logGoogleUser }>
                Sign with google Pop-up
            </button>
            <SignUpForm/>
        </div>
    );
}

export default Sign;