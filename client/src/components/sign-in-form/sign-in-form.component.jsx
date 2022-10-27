import React, {  useState } from 'react';
import "./sign-in-form.styles.scss"
import FormInput from '../form-input/form-input.component';
import Button from '../botton/button.component';
import { createUserDocumentFromAuth, signInAuthWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase.utils';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async() => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthWithEmailAndPassword(email, password);
            resetFormFields()
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert("incorrect password and email");
                    break;
                case 'auth/user-not-found': 
                    alert("No user associated with this email");
                    break;
                default:
                    console.log("Failed to Sign In", error)
            }
        }

     
    
    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

  return (
    <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign In with your email and password</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput label="Email" type="email" onChange={handleChange} required name="email" value={email} />
            <FormInput label="Password" type="password" onChange={handleChange} required name="password" value={password} autoComplete="false" />
            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
            </div>
           
        </form>
    </div>
  )
}

export default SignIn