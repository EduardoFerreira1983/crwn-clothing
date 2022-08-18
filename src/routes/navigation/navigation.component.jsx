import { React, useContext, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import "./navigation.styles.scss"
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart-context";


import { signOutUser }  from '../../utils/firebase/firebase.utils'


const Navigation = () => {
     
    const { currentUser, setCurrentUser } = useContext( UserContext );
    const { isCartOpen, setIsCartOpen } = useContext( CartContext );

    const signOutHandler = async () => {
         await signOutUser();
        setCurrentUser( null );
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    { currentUser ? <span onClick={ signOutHandler } className="nav-link">SIGN OUT</span> :
                        <Link className="nav-link" to="/auth">SIGN IN </Link>
                    }
                    <CartIcon/>
                </div>
                { isCartOpen && <CartDropdown /> }
            </div>
            <Outlet /> 
        </Fragment>
    );
    
}

export default Navigation;