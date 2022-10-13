import "./authentication.styles.scss"
import SignIn from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up/sign-up.component";

const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignIn />
            <SignUpForm />
        </div>
    )
}

export default Authentication