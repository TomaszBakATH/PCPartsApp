import {Link, useNavigate} from "@reach/router";
import "./Header.scss"
import React, {useState} from "react";

const Header = (props) => {
    const {name, setName,image,nickname} = props;
    let menu;
    const [check,setCheck] = useState(false);
    const logout = async () => {
        await fetch('https://localhost:44321/api/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        setName('');
    }

    const x = () => {
        setCheck(!check);
    }

    if (name === '' || name === undefined) {
        menu = (
            <>
                <Link to='/login' onClick={logout}>
                    <div className='header_logout'>
                        <h2>Login</h2>
                    </div>
                </Link>
                <Link to='/register'>
                    <div className='header_logout'>
                        <h2>Rejstracja</h2>
                    </div>
                </Link>
            </>
        )
    } else {
        menu = (
            <>
                <Link to='/#' onClick={logout}>
                    <div className='header_logout'>
                        <h2>Wyloguj</h2>

                    </div>
                </Link>
                <Link to='/new-announcement'>
                    <div className='header_add'>
                        <h2>Dodaj Ogłoszenie</h2>
                    </div>
                </Link>
                <Link to={'/user/'+name.toString()}>
                    <div className='header_user'>
                        {
                            image
                                ?<img className='header_user-image' src={"https://localhost:44321/images/"+image}/>
                                :<img className='header_user-image' src={process.env.PUBLIC_URL + '/user-unknown.png'}/>
                        }
                        <h4>Witaj {nickname}!</h4>
                    </div>
                </Link>
            </>
        )
    }

    let mobileMenu;

    if (name === '' || name === undefined) {
        mobileMenu = (
           <ul>
               <li>
                   <Link to='/#' onClick={x}>
                       <div className='header_logo-container'>
                           <h2>PC PARTS</h2>
                       </div>
                   </Link>
               </li>
               <li>
                   <Link to='/login' onClick={logout}>
                       <h2>Login</h2>
                   </Link>
               </li>
               <li>
                   <Link to='/register' onClick={x}>
                       <h2>Rejstracja</h2>
                   </Link>
               </li>
           </ul>
        )
    } else {
        mobileMenu = (
            <ul>
                <li>
                    <Link to='/#' onClick={x}>
                        <div className='header_logo-container'>
                            <h2>PC PARTS</h2>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={"/user/"+name.toString()} onClick={x}>
                    <div className='header_mobile-user'>
                        {
                            image
                                ?<img className='announcement-owner-info_user-image' src={"https://localhost:44321/images/"+image}/>
                                :<img className='announcement-owner-info_user-image' src={process.env.PUBLIC_URL + '/user-unknown.png'}/>
                        }
                        <h2>Witaj {nickname}!</h2>
                    </div>
                </Link>
                </li>
                <li>
                    <Link to='/new-announcement' onClick={x}>
                        <h2>Dodaj Ogłoszenie</h2>
                    </Link>
                </li>
                <li>
                    <Link to='/#' onClick={logout}>
                        <h2>Wyloguj</h2>
                </Link>
                </li>

            </ul>
        )
    }
    


    return (
        <div className='header'>
            <div className='header_nav'>
                <Link to='/#'>
                    <div className='header_logo-container' >
                        <h2>PC PARTS</h2>
                    </div>
                </Link>
                <div className='header_blank-space'>

                </div>
                <div className='header_links'>
                    {menu}
                </div>
            </div>
            <div className='header_underline'>

            </div>

            <input id="page-nav-toggle" className="main-navigation-toggle" type="checkbox" checked={check}/>
            <label htmlFor="page-nav-toggle" onClick={x}>
                <svg className="icon--menu-toggle" viewBox="0 0 60 30">
                    <g className="icon-group">
                        <g className="icon--menu">
                            <path d="M 6 0 L 54 0"/>
                            <path d="M 6 15 L 54 15"/>
                            <path d="M 6 30 L 54 30"/>
                        </g>
                        <g className="icon--close">
                            <path d="M 15 0 L 45 30"/>
                            <path d="M 15 30 L 45 0"/>
                        </g>
                    </g>
                </svg>
            </label>

            <nav className="main-navigation">
                {mobileMenu}
            </nav>
        </div>
    );
}

export default Header;