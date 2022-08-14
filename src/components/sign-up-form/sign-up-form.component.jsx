import { useState } from "react";

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
        <div>
            <h1>Sign with your email and password</h1>
            <form onSubmit={ handleSubmit }>
                <label>Name</label>
                <input onChange={ handleChange } type="text" required
                    name="displayName" value={ displayName } />

                <label>Email</label>
                <input onChange={ handleChange } type="email" required
                    name="email" value={ email } />

                <label >Password</label>
                <input onChange={ handleChange } type='password' required
                    name="password" value={ password } />

                <label>Confirm Password</label>
                <input onChange={ handleChange } type='password' required
                    name="confirmPassword" value={ confirmPassword } />

                <button type="submit">
                    Sign Up
                </button>

            </form>
        </div>
    );
}

export default SignUpForm;