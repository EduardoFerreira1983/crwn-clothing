import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email:"",
    password:"",
}

const SignInForm = () => {

    const signInWihtGoogle = async () => {
        await signInWithGooglePopup();
    }
    
    const [ formFields, setFormFields ] = useState( defaultFormFields );
    
    const { email, password } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            await signInAuthUserWithEmailAndPassword(
                email,
                password
            );

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
                    //spread operator
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