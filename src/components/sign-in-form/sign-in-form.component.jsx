import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

import { UserContext } from "../contexts/user.context";

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email:"",
    password:"",
}

const SignInForm = () => {

    const { setCurrentUser } = useContext( UserContext );

    const signInWihtGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth( user );
        await createUserDocumentFromAuth( user )
    }
    
    const [ formFields, setFormFields ] = useState( defaultFormFields );
    
    const { email, password } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            setCurrentUser( user );
          resetFormFields();
        } catch (error) {
          switch (error.code) {
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
            case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
            default: console.log(error);
          }
        }
      };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleChange = ( event ) => {
        const { name, value } = event.target;
        
        setFormFields({...formFields, [name]: value })
    }  

    return (
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput
                    label= "Email"
                    onChange={ handleChange }
                    type="email" required
                    name="email"
                    value={ email }
                />

                <FormInput
                    label="Password"
                    onChange={ handleChange }
                    type='password' required
                    name="password"
                    value={ password }
                />
                <div className="buttons-container">
                    <Button type="submit">
                        Sign In
                    </Button>
                    <Button type='button' buttonType ="google" onClick={ signInWihtGoogle }>
                        Google sign In 
                    </Button>
                </div>

            </form>
        </div>
    );
}

export default SignInForm;