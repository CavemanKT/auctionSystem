import React, {useContext} from 'react'
import logoImage from '../../assets/logo.png'
import { AuthContext } from '../../context/AuthContext'
import { LoginComp } from './LoginComp'
import { RegisterComp } from './RegisterComp'

export const NavComp = () => {
  const {currentUser, logout} = useContext(AuthContext)

  return (
    <nav className="container navbar sticky-top navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src={logoImage} alt="logo" height="75px" />
        </div>
        <div className="d-flex">
          <div className="col">
          {
            currentUser ? (
              <>
                <div className="btn btn-outline-secondary mx-2 disabled">
                  {currentUser.email}
                </div>
                <div
                  className="btn btn-outline-secondary mx-2"
                  onClick={()=> {
                    logout()
                  }}
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <LoginComp />
                <RegisterComp />
              </>
            )
          }
          </div>
        </div>
      </div>
    </nav>
  )
}
