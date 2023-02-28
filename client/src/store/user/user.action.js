import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});

export const SignInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user) 

export const SignInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error) 