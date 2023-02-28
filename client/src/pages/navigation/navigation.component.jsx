import { Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, LogoContainer, NavLinks, NavLink }  from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
    const  currentUser  = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch()
    const signOutUser = () => dispatch(signOutStart())
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
                  <NavLink as="span" onClick={signOutUser}> SIGN OUT </NavLink>
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