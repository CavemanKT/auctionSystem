import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import React from 'react'
import { useState, useRef, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { AuthContext } from '../../context/AuthContext'

export const AddAuction = ({setAuction}) => {
  const [ showForm, setShowForm ] = useState(false)
  const [ err, setErr] = useState('')

  const itemTitleRef = useRef()
  const itemDescriptionRef = useRef()
  const startPriceRef = useRef()
  const itemDurationRef = useRef()
  const itemImageRef = useRef()

  const {currentUser} = useContext(AuthContext)

  const openForm = () => setShowForm(true)
  const closeForm = () => setShowForm(false)

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const submitForm = async (e) => {
    e.preventDefault();
    setErr('');

    // form validation
    if(!itemTitleRef?.current?.value) return setErr('Please name your stuff.')
    if(!itemDescriptionRef?.current?.value) return setErr('Please describe your item')
    if(!startPriceRef?.current?.value) return setErr('Please name your price')
    if(!itemDurationRef?.current?.value) return setErr('How long do you want the bidding last ? Please input the value in hour')
    if(!itemImageRef?.current?.files[0] ) return setErr('Please upload an image')
    if(!imgTypes.includes(itemImageRef.current.files[0].type)) return setErr('Please only upload png, jpeg or jpg type image');

    let hr = itemDurationRef.current.value * 60 * 60 * 1000
    let duration = Date.now() + hr

    console.log(itemImageRef.current.files[0], itemImageRef.current.files[0].name);
    let imgName = itemImageRef.current.files[0].name
    let newAuction = {
      email: currentUser.email,
      title: itemTitleRef.current.value,
      desc: itemDescriptionRef.current.value,
      curPrice: startPriceRef.current.value,
      duration,
      itemImage: itemImageRef.current.files[0],
      imgName
    };

    setAuction(newAuction);
    closeForm();
  }


  return (
    <>
      <div className="col d-flex justify-content-center">
        <div className="btn btn-outline-secondary mx-2" onClick={openForm}>
          + Auction
        </div>
        <div className="btn btn-outline-secondary mx-2 hover:animate-ping absolute" onClick={openForm}>
          + Auction
        </div>
      </div>

      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>

          <Modal.Header>
            <Modal.Title>Create Auction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {
            err && (
              <Alert variant='danger'>
                {err}
              </Alert>
            )
          }
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Item Title
                  </Form.Label>
                  <Form.Control type="text" required ref={itemTitleRef} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Item Description
                  </Form.Label>
                  <Form.Control type="text" required ref={itemDescriptionRef} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Start Price
                  </Form.Label>
                  <Form.Control type="number" required ref={startPriceRef} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Item Duration in Hours
                  </Form.Label>
                  <Form.Control type="number" required ref={itemDurationRef} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Seller
                  </Form.Label>
                  <Form.Control type="text" value={currentUser.email} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Item Image
                  </Form.Label>
                  <Form.Control type="file" label="Select Item Image" required ref={itemImageRef} />
                </Form.Group>
              </Col>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={submitForm}>
              Submit
            </Button>
          </Modal.Footer>

        </form>

      </Modal>
    </>
  )
};
