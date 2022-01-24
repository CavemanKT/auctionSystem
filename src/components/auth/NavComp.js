import React, {useContext} from 'react'
import logoImage from '../../assets/logo.png'
import { AuthContext } from '../../context/AuthContext'
import { LoginComp } from './LoginComp'
import { RegisterComp } from './RegisterComp'

export const NavComp = () => {
  const {currentUser, logout} = useContext(AuthContext)

  return (
    <nav className="container flex sm:justify-center space-x-4">
      <div className="container-fluid flex justify-content-between">
        <div className="bg-cover inline">
          <img src={logoImage} alt="logo" className='w-16 inline'/>
        </div>
        <div className="d-flex">
          <div className="col align-self-center">
          {
            currentUser ? (
              <>
                <div className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 disabled inline mr-4">
                  {currentUser.email}
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
