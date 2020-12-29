import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CLink, CRow,CModal , CModalBody,CModalHeader,CModalFooter,CModalTitle } from "@coreui/react";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState();
    // get users
    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users")
                .then(response => response.json())
                .then(jsonData => setUsers(jsonData));
        } catch (err) {
            console.error(err.message)
        }
    }
    // Delete user
    const deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE"
            });
            setShow(!show);
            getUsers();
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const fields =
        [
            {
                key: 'id',
                label: 'Id',
            },
            {
                key: 'first_name',
                sorter: false
            },
            'last_name',
            'email'
            ,
            {
                key: 'age',
                sorter: false
            },
            {
                key: 'edit',
                label: 'Action',
                _style: { width: '1%' },
                sorter: false
            }
        ]
    return (
        <>
            <CRow>
                <CLink to='/users/add'>
                    <CButton color="primary"  size="lg" className="mb-2">
                        <span>+</span> Add
                    </CButton>
                </CLink>
            </CRow>
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            All Users
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={users}
                                fields={fields}
                                tableFilter
                                sorter
                                striped
                                hover
                                border
                                itemsPerPageSelect
                                itemsPerPage={10}
                                pagination
                                scopedSlots={{
                                    'edit':
                                        (user) => {
                                            return (
                                                <td className="py-2 d-flex">
                                                    <CLink to={"/users/edit/".concat(user.id)}>
                                                        <CButton color="warning"  size="sm">
                                                            Edit
                                                        </CButton>
                                                    </CLink>
                                                    <CButton color="danger" size="sm" className="ml-1"
                                                        onClick={() => {setShow(!show);setUserId(user.id)}}>
                                                        Delete
                                                    </CButton>

                                                    {/*  */}
                                                
                                                    <CModal
                                                        show={show}
                                                        onClose={() => setShow(!show)}
                                                        color="danger"
                                                    >
                                                        <CModalHeader closeButton>
                                                            <CModalTitle>Delete user</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            Are you sure ?
                                                         </CModalBody>
                                                        <CModalFooter>
                                                            <CButton color="danger" onClick={() =>deleteUser(userId) }>Delete</CButton>{' '}
                                                            <CButton color="secondary" 
                                                            onClick={() => setShow(!show)}>Cancel</CButton>
                                                        </CModalFooter>
                                                    </CModal>





                                                </td>
                                            )
                                        }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Users
