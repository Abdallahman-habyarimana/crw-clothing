import { Outlet, Link } from "react-router-dom";
import { useContext, useState } from "react";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import { NavigationContainer, LogoContainer, NavLinks, NavLink }  from "./navigation.styles";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
      <>
        <NavigationContainer>
          <LogoContainer to="/">
            <CrwnLogo className="logo" />
          </LogoContainer>
          
          <NavLinks>
              <NavLink to="/shop">
                SHOP
              </NavLink>
              {
                currentUser ? (
                  <NavLink as="span" onClick={signOutUser }> SIGN OUT </NavLink>
                ) : 
                (
                  <NavLink  to="/auth">
                    SIGN IN
                  </NavLink>
                )
              }
              <CartIcon />
          </NavLinks>
          { isCartOpen && <CartDropDown /> }
        </NavigationContainer>
        <Outlet />
      </>
    )
  }

  export default Navigation