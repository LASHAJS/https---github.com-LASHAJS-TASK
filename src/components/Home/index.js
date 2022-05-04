import React, { useState } from 'react';
import { useSelector , useDispatch} from "react-redux";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import {Table,Button,Badge,Modal} from 'react-bootstrap';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";




const Home = () => {
  
  const contacts = useSelector((state) =>  state.contactReducer);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeModal = (id) => {
  deletecontact(id)
  handleClose()
  };
  const deletecontact = (id) => {

    dispatch({type:"DELETE_CONTACT", payload:id});
    toast.error("წაიშალა");
  };
  return (
    <div className="container-fluid">

      <div className="row d-flex flex-column">
      <div className="col-md-2 justify-content-end">
      <Link to="/add" className="btn btn-outline-dark my-2 ml-auto">
      <AiOutlinePlusCircle/> დამატება
        </Link>
        </div>

        <div className="col-md-12 my-2">
        <Table striped bordered hover>
  <thead>
    <tr>
                <th scope="col">ნომერი</th>
                <th scope="col">სახელი</th>
                <th scope="col">გვარი</th>
                <th scope="col">ასაკი</th>
                <th scope="col">მისამართი</th>
                <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {   contacts.length > 0 ? ( 
    contacts.map((contact,id) => (
      <tr key={id}>
        <td><Badge bg="success">ნომერი{id + 1}</Badge></td>
                    <td>{contact.name}</td>
                    <td>{contact.lastname}</td>
                    <td>{contact.age}</td>
                    <td>{contact.address}</td>
        <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-outline-primary mr-1"
                      >
                        <AiOutlineEdit/>შესწორება
                      </Link>
                      <button className="btn btn-outline-danger ms-2"onClick={handleShow}>
                        <AiOutlineDelete/>წაშლა
                      </button>
                      <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                              >
                                <Modal.Header>
                                </Modal.Header>
                                <Modal.Body>
                                ნამდვილად გინდა წაშლა?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={handleClose}>
                                    არა
                                  </Button>
                                  <Button  variant="primary" onClick={() => closeModal(contact.id)} >დიახ</Button>
                                </Modal.Footer>
                              </Modal>
        </td>

      </tr>
    ))
    ):(
      <tr>
                  <td>No contacts found</td>
                </tr>
    )}
  </tbody>
</Table>

          </div> 

      </div>

    </div>


  )
};

export default Home;
