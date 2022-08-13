import React from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const Sign = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user );
        const userDocRef = await createUserDocumentFromAuth( user );
    }

    return (
        <div>
            <h1>Sign page</h1>
            <button onClick={ logGoogleUser }>
                Sign with google Pop-up
            </button>
        </div>
    );
}

export default Sign;