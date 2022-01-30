import React, {useContext} from 'react'
import logoImage from '../../assets/logo.png'
import { AuthContext } from '../../context/AuthContext'
import { useGoogleAuth } from '../../hooks/useGoogleAuth'
import { LoginComp } from './LoginComp'
import { RegisterComp } from './RegisterComp'
import { GoogleLogin } from 'react-google-login';
import { clientId } from '../../config/firebase'
import { GoogleLogout } from 'react-google-login';

export const NavComp = () => {
  const {currentUser, logout} = useContext(AuthContext)
  const { googleCredentials, googleAuth, googleAuthLogout } = useGoogleAuth()

  const responseGoogle = (response) => {
      googleAuth(response)
  }

  const googleLogout = () => {
    googleAuthLogout()
  }

  return (
    <nav className="container flex sm:justify-center space-x-4">
      <div className="container-fluid flex justify-content-between">
        <div className="bg-cover inline">
          <img src={logoImage} alt="logo" className='w-16 inline'/>
        </div>
        <div className="d-flex">
          <div className="col align-self-center">
          {
            currentUser && !googleCredentials && (
              <>
                <div className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 disabled inline mr-4">
                  {currentUser?.email}
                </div>
                <div
                  className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 inline cursor-pointer"
                  onClick={()=> {
                    logout()
                  }}
                >
                  Logout
                </div>
              </>
            )
          }

          {
            !currentUser && !googleCredentials && (
              <>
                <LoginComp />
                <RegisterComp />
              </>
            )
          }

          {!googleCredentials && !currentUser && (
            <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <div className="rounded-lg px-3 py-2 text-slate-700 font-medium bg-emerald-200 hover:bg-emerald-400 hover:text-slate-900 inline cursor-pointer mr-4">
                        Google Login
                    </div>
                    </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={true}
                cookiePolicy={process.env.REACT_APP_GOOGLE_AUTH_ORIGIN}
            />
            )
          }

          {
            googleCredentials && (
            <GoogleLogout
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <div className="rounded-lg px-3 py-2 text-slate-700 font-medium bg-emerald-200 hover:bg-emerald-400 hover:text-slate-900 inline cursor-pointer mr-4">
                    Google Logout
                    </div>
                    </button>
                )}  
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={googleLogout}
            >
            </GoogleLogout>
            )
          }

    
          </div>
        </div>
      </div>
    </nav>
  )
}
