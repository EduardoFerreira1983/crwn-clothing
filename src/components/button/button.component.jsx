import { BaseButton, InvertedButton, GoogleSignButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = ( buttonType = BUTTON_TYPE_CLASSES.base ) => (
  {
    [ BUTTON_TYPE_CLASSES.base ]: BaseButton, // function with map the input to a custom button
    [ BUTTON_TYPE_CLASSES.google ]: GoogleSignButton, //pattern
    [ BUTTON_TYPE_CLASSES.inverted ]: InvertedButton
  }[ buttonType ] );

const Button = ( { children, buttonType, ...otherProps } ) => {
  
  const CustomButton = getButton( buttonType );

  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  );
};

export default Button;
