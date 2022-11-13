import SignIn from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up/sign-up.component";
import { AuthContainer } from "./authentication.styles";

const Authentication = () => {
    return (
        <AuthContainer>
            <SignIn />
            <SignUpForm />
        </AuthContainer>
    )
}

export default Authentication