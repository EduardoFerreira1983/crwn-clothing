import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

import {
    createAuthUserWithEmailAndPassword, createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}

const SignUpForm = () => {
    
    const [ formFields, setFormFields ] = useState( defaultFormFields );
    
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async ( event ) => {
        event.preventDefault();
        // confirm datas from sign 
        if ( password !== confirmPassword ) {
            alert( 'passwords do not match' );
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword( email, password );
            
            await createUserDocumentFromAuth( user, { displayName } );
            resetFormFields();

        } catch ( error ) {
            if ( error.code === 'auth/email-already-in-use' )
                alert( 'cannot create user, email already in use' );
            console.log( 'user creation encountered a error ', error );
        }
            
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleChange = ( event ) => {
        const { name, value } = event.target;
        
        setFormFields({...formFields, [name]: value })
    }  

    return (
        <div className="sign-up-container">
            <h2>I do not have account</h2>
            <span>Sign with your email and password</span>
            <form onSubmit={ handleSubmit }>
                
                <FormInput
                    label="Display Name"
                    onChange={ handleChange }
                    type="text" required
                    name="displayName"
                    value={ displayName }
                />

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

                <FormInput
                    label="Confirm Password"
                    onChange={ handleChange }
                    type='password' required
                    name="confirmPassword"
                    value={ confirmPassword }
                />

                <Button button_type ="inverted"type="submit">
                    Sign Up
                </Button>

            </form>
        </div>
    );
}

export default SignUpForm;