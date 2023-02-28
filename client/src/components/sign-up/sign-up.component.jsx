import React, { useState } from 'react';
import "./sign-up.styles.scss"
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/botton/button.component';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch()

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords do not Match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields()
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            } else {
                console.log("Failed to connect")
            }
        }
    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Display Name" type="text" onChange={handleChange} required name="displayName" value={displayName}  />
            <FormInput label="Email" type="email" onChange={handleChange} required name="email" value={email} />
            <FormInput label="Password" type="password" onChange={handleChange} required name="password" value={password} autoComplete="false" />
            <FormInput label="Confirm Password" type="password"  onChange={handleChange} required name="confirmPassword" value={confirmPassword} autoComplete="false" />
            <Button type="submit">Sign up</Button>
        </form>
    </div>
  )
}

export default SignUpForm