import {Modal, Form} from 'react-bootstrap'
import React, { useState, useRef, useContext } from 'react'
import {Button} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { AuthContext } from '../../context/AuthContext'

export const RegisterComp = () => {
  const [ showForm, setShowForm ] = useState(false)
  const [ err, setErr] = useState('')

  const { register } = useContext(AuthContext)

  const emailRef = useRef()
  const pwRef = useRef()
  const cmfPwRef = useRef()

  const openForm = () => setShowForm(true)
  const closeForm = () => setShowForm(false)
  const submitForm = async (e) => {
    e.preventDefault()
    setErr('')
    if(pwRef.current.value !== cmfPwRef.current.value){
      return setErr('pw does not match')
    }
    if(pwRef.current.value.length <= 5){
      return setErr('pw needs to be longer than 5 characters')
    }

    try {
      await register(emailRef.current.value, pwRef.current.value)
      closeForm()
    } catch (error) {
      setErr(error)
    }

  }

  return (
    <>
      <div className="rounded-lg px-3 py-2 text-slate-700 font-medium bg-emerald-200 hover:bg-emerald-400 hover:text-slate-900 inline cursor-pointer mr-4" onClick={openForm}>
        Register
      </div>

      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>

          <Modal.Header>
            <Modal.Title>Register</Modal.Title>
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

            <Form.Group>
              <Form.Label>
                Confirm Password
              </Form.Label>
              <Form.Control type="password" required ref={cmfPwRef}/>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={submitForm}>
              Register
            </Button>
          </Modal.Footer>

        </form>
      </Modal>
    </>
  )
}
