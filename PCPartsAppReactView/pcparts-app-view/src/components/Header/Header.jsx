import {Link} from "react-router-dom";

const Navigation = (props) => {
    const {name, setName} = props;
    let menu;
    
    const logout = async () => {
        await fetch('https://localhost:44321/api/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        setName('');
    }

    if(name==='' || name===undefined){
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to='/login' className="nav-link" >Login</Link>
                </li>
                <li className="nav-item">
                    <Link to='/register' className="nav-link" >Register</Link>
                </li>
            </ul>
        )
    }else{
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to='/#' className="nav-link" onClick={logout}>Logout</Link>
                </li>
            </ul>
        )
    }

  return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div className="container-fluid">
              <Link to='/' className="nav-link" >Home</Link>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                  {menu}
              </div>
          </div>
      </nav>
  );
}

export default Navigation;