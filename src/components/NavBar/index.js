import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdOutlineClose} from 'react-icons/md'

import './index.css'

const navItemsList = [
  {id: 1, navItemText: 'Home', itemPath: '/'},
  {id: 2, navItemText: 'Reports', itemPath: '/reports'},
]
const NavBar = props => {
  const navbarLogoutButtonHandler = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar-main-box">
      <div className="navbar-second-box">
        <h2 className="navbar-tracker-heading">Daily Mood Tracker</h2>
        <div className="navbar-lg-view-box">
          <ul className="navbar-ul-box">
            {navItemsList.map(item => (
              <li key={item.id} style={{marginRight: '14px'}}>
                <Link className="navbar-link-text" to={item.itemPath}>
                  {item.navItemText}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={navbarLogoutButtonHandler}
            className="navbar-logout-button"
            type="button"
          >
            Logout
          </button>
        </div>
        <div className="navbar-sm-view-box">
          <Popup
            modal
            trigger={
              <button
                aria-label="Open menu"
                className="navbar-gingerBread-button"
                type="button"
              >
                <GiHamburgerMenu size={24} />
              </button>
            }
            className="popup-content"
          >
            {close => (
              <div>
                <div className="navbar-sm-modal-header">
                  <h2 className="navbar-tracker-heading">Daily Mood Tracker</h2>
                  <button
                    onClick={close}
                    aria-label="Close menu"
                    className="navbar-gingerBread-button"
                    type="button"
                  >
                    <MdOutlineClose size={24} />
                  </button>
                </div>
                <div style={{padding: '16px'}}>
                  <ul style={{listStyleType: 'none', paddingLeft: '0px'}}>
                    {navItemsList.map(item => (
                      <li style={{marginBottom: '8px'}} key={item.id}>
                        <Link className="navbar-link-text" to={item.itemPath}>
                          {item.navItemText}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    style={{marginTop: '24px'}}
                    className="navbar-sm-logout-button"
                    type="button"
                    onClick={navbarLogoutButtonHandler}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(NavBar)
