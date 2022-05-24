import React, { Component } from 'react';
import { Card,CardHeader,CardBody,CardFooter,CardTitle,Row,Col,Button, Badge, Breadcrumb, BreadcrumbItem, Label} from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Control, LocalForm, Errors } from 'react-redux-form';

import { MDBDataTableV5 } from 'mdbreact';

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
// const override = css`
//   filter: blur(-3px);
  
// `;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

class Registration extends Component {
    constructor(props){
        super(props);
        this.state = {
            src : require('./../../assets/img/default-avatar.png'),
            selectedFile:null
        }
    }

    handleImageUpload = (e) => {
        e.preventDefault();
        this.setState({
            src: URL.createObjectURL(e.target.files[0]),
            selectedFile: e.target.files[0]
        });
        console.log(e.target.files[0])
    }

    handleSubmit = (values) => {
        alert(JSON.stringify(values))
        console.log(values)

        const formData = new FormData();
        formData.append("values", JSON.stringify(values));
        formData.append("file", this.state.selectedFile);
        formData.append("user", localStorage.getItem('usr'));

        axios.post(`http://${window.location.hostname}:5555/student/registration`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokn')}` 
            } 
        })  
        .then((response) => {
            // setResponse(response.data);
            console.log("Response");
            console.log(response)
            if (response.status === 200) {
                console.log("Created");
                alert("Created!");

                // Resset the form!
                document.getElementById("reset").click();
                this.setState({src: require('./../../assets/img/default-avatar.png')});
                document.getElementById('picture').value = '';
            }
        }).catch((error) => {
            console.log("error");
            console.log(error)
        })
    }
    render() { 
        return ( 
            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    {/* <BreadcrumbItem><Link to='/admin/student'>Student</Link></BreadcrumbItem> */}
                    <BreadcrumbItem active>Registration</BreadcrumbItem>
                </Breadcrumb>
                
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row>

                    <Col md={3}>
                        <Card>
                            <CardHeader>Upload Picture:</CardHeader>
                            <CardBody>
                                <div className="team-player">
                                    <div className="flip-box-front">
                                    <img
                                        alt=""
                                        className="rounded-circle img-fluid img-raised mx-auto d-block"
                                        src={this.state.src}
                                        style={{width:"150px", height:"150px", overflow:"hidden",maxWidth:"100%",borderRadius:"100%", maxHeight:"100%"}}
                                    ></img>
                                    </div>
                                </div>
                                <hr />
                                <Row className="form-group">
                                    <Col>
                                        <Control.file model=".picture" id="picture" name="picture"
                                            placeholder="First Name"   
                                            className="form-control"
                                            onChange={this.handleImageUpload}
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".picture"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                    <Card>
                        {/* <CardHeader>New Student Registration:</CardHeader>
                        <hr /> */}
                        <CardBody>
                                <p>Students' Details:</p>
                                <hr />
                                <Row className="form-group">
                                    {/* <Label md={2} style={{fontSize:"1.23em"}}>Student:</Label> */}
                                    
                                    <Col md={4}>
                                        <Control.text model=".firstName" id="firstName" name="firstName"
                                            placeholder="First Name"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".firstName"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".middleName" id="middleName" name="middleName"
                                            placeholder="Middle Name"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".middleName"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".lastName" id="lastName" name="lastName"
                                            placeholder="Last Name"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".lastName"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                
                                </Row>
                                <Row className="form-group">
                                    <Col md={3}>
                                        <Control.text type="number" model=".urn" id="urn" name="urn"
                                            placeholder="Unique Reg. No."
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".urn"
                                            show="touched"
                                            messages={{
                                                required: 'Number Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Control.text type="number" model=".contact" id="contact" name="contact"
                                            placeholder="Contact No."
                                            className="form-control"
                                            validators={{
                                                required, maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".contact"
                                            show="touched"
                                            messages={{
                                                required: 'Number Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Control.text model=".caste" id="caste" name="caste"
                                            placeholder="Caste"
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".caste"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Control.text model=".religion" id="religion" name="religion"
                                            placeholder="Religion"
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".religion"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} style={{fontSize:"1.2em"}}>Admission Date:</Label>
                                    <Col md={3}>
                                        <Control.text type="date" model=".admissionDate" id="admissionDate" name="admissionDate"
                                            // placeholder="Unique Reg. No."
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".admissionDate"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Label md={3} style={{fontSize:"1.2em"}}>Date Of Birth:</Label>
                                    <Col md={3}>
                                        <Control.text type="date" model=".dob" id="dob" name="dob"
                                            // placeholder="Unique Reg. No."
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".dob"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={3}>
                                        <Control.text model=".nationality" id="nationality" name="nationality"
                                            placeholder="Nationality"
                                            // defaultValue="male"
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".nationality"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    {/* <Label md={2} style={{fontSize:"1.2em"}}>Gender:</Label> */}
                                    <Col md={3}>
                                        <Control.select model=".gender" id="gender" name="gender"
                                            // placeholder="Unique Reg. No."
                                            defaultValue="male"
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Control.select>
                                        <Errors 
                                            className="text-danger"
                                            model=".gender"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Col>
                                        <Control.textarea model=".address" id="address" name="address"
                                            placeholder="Residential Address"
                                            className="form-control"
                                            rows={2}
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".address"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <hr />
                                <p>Fathers' Details:</p>
                                <hr />
                                <Row className="form-group">
                                    <Col md={4}>
                                        <Control.text model=".fatherName" id="fatherName" name="fatherName"
                                            placeholder="Name"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".fatherName"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".fatherOccupation" id="fatherOccupation" name="fatherOccupation"
                                            placeholder="Occupation"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".fatherOccupation"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".fatherQualification" id="fatherQualification" name="fatherQualification"
                                            placeholder="Qualification"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".fatherQualification"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={4}>
                                        <Control.text type="number" model=".fatherContact" id="fatherContact" name="fatherContact"
                                            placeholder="Contact"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".fatherContact"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text type="number" model=".fatherIncome" id="fatherIncome" name="fatherIncome"
                                            placeholder="Annual Income"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".fatherIncome"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".fatherEmail" id="fatherEmail" name="fatherEmail"
                                            placeholder="Email"   
                                            className="form-control"
                                            validators={{
                                                required, validEmail
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".fatherEmail"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                validEmail: ' Invalid Email'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <hr />
                                <p>Mothers' Details:</p>
                                <hr />
                                <Row className="form-group">
                                    <Col md={4}>
                                        <Control.text model=".motherName" id="motherName" name="motherName"
                                            placeholder="Name"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".motherName"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".motherOccupation" id="motherOccupation" name="motherOccupation"
                                            placeholder="Occupation"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".motherOccupation"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".motherQualification" id="motherQualification" name="motherQualification"
                                            placeholder="Qualification"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".motherQualification"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={4}>
                                        <Control.text type="number" model=".motherContact" id="motherContact" name="motherContact"
                                            placeholder="Contact"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".motherContact"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text type="number" model=".motherIncome" id="motherIncome" name="motherIncome"
                                            placeholder="Annual Income"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".motherIncome"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".motherEmail" id="motherEmail" name="motherEmail"
                                            placeholder="Email"   
                                            className="form-control"
                                            validators={{
                                                required, validEmail
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".motherEmail"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                validEmail: ' Invalid Email'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={6}>
                                        <Button color="danger" id="reset" block type="reset">Reset</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button type="submit" outline block color="success">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                           
                        </CardBody>
                    </Card>
                    </Col>
                    </Row>
                
                </LocalForm>
                
                

            </div>
         );
    }
}
 
export default Registration;