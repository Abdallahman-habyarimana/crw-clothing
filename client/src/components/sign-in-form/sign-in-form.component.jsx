import React, {  useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../botton/button.component';
import { createUserDocumentFromAuth, signInAuthWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase.utils';
import SignUpForm from '../sign-up/sign-up.component.jsx';
import { SignUpContainer } from './sign-in-form.styles';

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
    <SignUpContainer>
        <h2>Already have an account?</h2>
        <span>Sign In with your email and password</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput label="Email" type="email" onChange={handleChange} required name="email" value={email} />
            <FormInput label="Password" type="password" onChange={handleChange} required name="password" value={password} autoComplete="false" />
            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
            </div>
           
        </form>
    </SignUpContainer>
  )
}

export default SignIn