import { Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { signOutUser } from "../../utils/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, LogoContainer, NavLinks, NavLink }  from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
    const  currentUser  = useSelector(selectCurrentUser)
    //const { isCartOpen } = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen);
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