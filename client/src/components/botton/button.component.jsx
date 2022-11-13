
import React from 'react';
import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ({
  [BUTTON_TYPE_CLASSES.base] : BaseButton,
  [BUTTON_TYPE_CLASSES.google] : GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.inverted] : InvertedButton,
} [buttonType])

const Button = ({ children, buttonType, ...rest }) => {
  const CustomButton = getButton(buttonType)
  return <CustomButton {...rest} >{children } </CustomButton>
}

export default Button