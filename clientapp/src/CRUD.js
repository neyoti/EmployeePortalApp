import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';

const CRUD = () => {

    const apiUrl = "http://13.234.110.26:5000/api/Employee"

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[name, setName] = useState('')
    const[age, setAge] = useState('')
    const[isActive, setIsActive] = useState(0)

    const[editID, setEditID] = useState('');
    const[editName, setEditName] = useState('')
    const[editAge, setEditAge] = useState('')
    const[editIsActive, setEditIsActive] = useState(0)

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () =>{
        axios.get(apiUrl)
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleEdit = (id) => {
        handleShow();
        axios.get(apiUrl+`/${id}`)
        .then((result)=>{
            setEditName(result.data.name);
            setEditAge(result.data.age);
            setEditIsActive(result.data.isActive);
            setEditID(id);
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this employee?") === true) {
            axios.delete(apiUrl+`/${id}`)
            .then((result)=>{
                if(result.status === 200)
                {
                    toast.success("Employee has been deleted.");
                    getData();
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    const handleUpdate = () => {
        const data = {
            "id":editID,
            "name":editName,
            "age":editAge,
            "isActive":editIsActive
        }

        axios.put(apiUrl+`/${editID}`, data)
        .then((result)=>{
            getData();
            clear();
            toast.success("Employee has been Updated.");
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    const handleSave = () =>{
        const data = {
            "name":name,
            "age":age,
            "isActive":isActive
        }

        axios.post(apiUrl, data)
        .then((result)=>{
            getData();
            clear();
            toast.success("Employee has been added");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const clear = () =>{
        setName('');
        setAge('');
        setIsActive(0);
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
        setEditID('');
    }

    const handleActiveChange=(e)=>{
        if(e.target.checked){
            setIsActive(1);
        }
        else{
            setIsActive(0);
        }
    }

    const handleEditActiveChange=(e)=>{
        if(e.target.checked){
            setEditIsActive(1);
        }
        else{
            setEditIsActive(0);
        }
    }

    return (
        <Fragment>
            <br></br>
            <ToastContainer/>
            <Container>
                <Row>
                    <Col>
                        < input type="text" className="form-control" placeholder="Enter Name" 
                        value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                    <Col>
                        < input type="text" className="form-control" placeholder="Enter Age" 
                        value={age} onChange={(e) => setAge(e.target.value)} />
                    </Col>
                    <Col>
                        < input type="checkbox" 
                        checked={isActive === 1 ? true : false}
                        onChange={(e) => handleActiveChange(e)} value={isActive}
                        />
                        &nbsp;
                        <label>IsActive</label>
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={()=>handleSave()} >Submit</button>
                    </Col>
                </Row>
            </Container>
            <br></br>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>IsActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.isActive}</td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Loading...'
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                <Col>
                        < input type="text" className="form-control" placeholder="Enter Name" 
                        value={editName} onChange={(e) => setEditName(e.target.value)} />
                    </Col>
                    <Col>
                        < input type="text" className="form-control" placeholder="Enter Age" 
                        value={editAge} onChange={(e) => setEditAge(e.target.value)} />
                    </Col>
                    <Col>
                        < input type="checkbox" 
                        checked={editIsActive === 1 ? true : false}
                        onChange={(e) => handleEditActiveChange(e)} value={editIsActive}
                        />
                        &nbsp;
                        <label>IsActive</label>
                    </Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
    )
}

export default CRUD;
