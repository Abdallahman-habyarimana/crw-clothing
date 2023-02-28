import { takeLatest, put, call,all } from "redux-saga/effects"
import { createUserDocumentFromAuth, getCurrentUser, signInAuthWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase.utils"
import { SignInFailed, SignInSuccess } from "./user.action"
import { USER_ACTION_TYPES } from "./user.types"

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
        yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
        
    } catch (error) {
        yield put(SignInFailed(error));
    }
}

export function* signInWithEmail({ payload: {email, password }}) {
    try {
        const { user } = yield call(
            signInAuthWithEmailAndPassword,
            email, 
            password
        );
        yield call(getSnapshotFromUserAuth, user)
    } catch (err) {
        yield put(SignInFailed(err));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(SignInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(SignInFailed(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export  function* userSagas() {
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ])
}