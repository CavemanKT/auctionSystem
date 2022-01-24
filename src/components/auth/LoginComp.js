import {Modal, Form} from 'react-bootstrap'
import React, { useState, useRef, useContext } from 'react'
import {Button} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { AuthContext } from '../../context/AuthContext'


export const LoginComp = () => {
  const [ showForm, setShowForm ] = useState(false)
  const [ err, setErr] = useState('')

  const { login } = useContext(AuthContext)
  const emailRef = useRef()
  const pwRef = useRef()

  const openForm = () => setShowForm(true)
  const closeForm = () => setShowForm(false)
  const submitForm = async (e) => {
    e.preventDefault()
    setErr('')

    if(emailRef.current.value.length === 0) return setErr('please fill the email address')
    if(pwRef.current.value.length === 0) return setErr('please fill the password')

    try {
      await login(emailRef.current.value, pwRef.current.value)
      closeForm()
    } catch (error) {
      setErr(error)
    }
  }

  return (
    <>
      <div className="rounded-lg px-3 py-2 text-slate-700 font-medium bg-emerald-200 hover:bg-emerald-400 hover:text-slate-900 inline cursor-pointer mr-4" onClick={openForm}>
        Login
      </div>

      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>

          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          {
            err && (
              <Alert variant='danger'>
                {err}
              </Alert>
            )
          }
            <Form.Group>
              <Form.Label>
                Email Address
              </Form.Label>
              <Form.Control type="email" required ref={emailRef}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Password
              </Form.Label>
              <Form.Control type="password" required ref={pwRef}/>
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={submitForm}>
              Login
            </Button>
          </Modal.Footer>

        </form>
      </Modal>
    </>
  )
}
