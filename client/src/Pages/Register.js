import axios from 'axios'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import '../Pages/auth.css'
import '../App.css'
import { Link } from 'react-router-dom';
function Register() {
    const [allDesignation, setAllDesignation] = useState([])
    const [allRoles, setAllRoles] = useState([])
    useEffect(() => {
        axios.get(`/api/all-designation`).then(res => {
            if (res.data.status == 200) {
                console.log('res', res)
                setAllDesignation(res.data.allDesgination);

            }
        })
        axios.get(`/api/all-roles`).then(res => {
            if (res.data.status == 200) {
                setAllRoles(res.data.allRoles);

            }
        })

    }, [])

    // const navigate=useNavigate();

    const [image, setImage] = useState('');
    console.log('image info', image.size)
    const [picture, setPicture] = useState('');

    const onChangePicture = (e) => {
        const selectedImage = e.target.files[0];
        // console.log('selectedImage: ', selectedImage);
        // setPicture(URL.createObjectURL(selectedImage));
        setImage(e.target.files[0]);
    };
    const [cvFile,setcvFile]=useState('')
    const onChangeCv=(e)=>{
        setcvFile(e.target.files[0])
    }



    const [registerInputState, setRegisterInputState] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        present_address: "",
        permanent_address: "",
        role: "",
        designation: ""
    })


    const handleChange = (e) => {
        setRegisterInputState({
            ...registerInputState, [e.target.name]: e.target.value
        })
    }


    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', registerInputState.name);
        formData.append('email', registerInputState.email);
        formData.append('password', registerInputState.password);
        formData.append('confirm_password', registerInputState.confirm_password);
        formData.append('present_address', registerInputState.present_address);
        formData.append('permanent_address', registerInputState.permanent_address);
        formData.append('role', registerInputState.role);
        formData.append('designation', registerInputState.designation);
        formData.append('image', image);
        formData.append('cv_file', cvFile);


        axios.post(`/api/save-user`, formData, config).then((res) => {
            if (res.data.status == 200) {
                Swal.fire(res.data.message, '', 'success');
                // router.push('/');
            }
        });
    };


    return (
        <>
            <div class="wrapper">

                <form class="formright" id="registerForm" onSubmit={handleRegisterSubmit} encType='multipart/form-data'>
                    <h2 class="text-uppercase">Registration form</h2>
                    <div class="row">
                        <div class="col-sm-6 mb-3">
                            <label>Full Name</label>
                            <input type="text" name="name" id="name" value={registerInputState.name} class="inputfield" onChange={handleChange} />
                        </div>
                        <div class="mb-3 col-sm-6">
                            <label>Your Email</label>
                            <input type="email" class="inputfield" name="email" value={registerInputState.email} required onChange={handleChange} />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6 mb-3">
                            <label>Password</label>
                            <input type="password" name="password" id="password" class="inputfield" value={registerInputState.password} onChange={handleChange} />
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label>Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" value={registerInputState.confirm_password} onChange={handleChange} class="inputfield" />
                        </div>
                    </div>

                    <div className='row'>
                        <div class="col-sm-6 mb-3">
                            <label>Nid</label>
                            <input type="text" name="nid" id="nid" value={registerInputState.nid} class="inputfield" onChange={handleChange} />
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label>University</label>
                            <input type="text" name="present_address" id="present_address" value={registerInputState.present_address} class="inputfield" onChange={handleChange} />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6 mb-3">
                            <label>Designation</label>
                            <select class="form-select" aria-label="Default select example" name="designation" value={registerInputState.designation} onChange={handleChange}>
                                <option selected>Choose</option>

                                {
                                    allDesignation.map((item, i) => {
                                        return (
                                            <>
                                                <option value={item._id}>{item.name}</option>

                                            </>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label>Department</label>
                            <select class="form-select" aria-label="Default select example" name="role" value={registerInputState.role} onChange={handleChange}>
                                <option selected>Choose</option>
                                {
                                    allRoles.map((item, i) => {
                                        return (
                                            <>
                                                <option value={item._id}>{item.name}</option>

                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>


                    <div className='row'>
                        <div class="col-sm-6 mb-3">
                            <label>Supervisor</label>
                            <select class="form-select" aria-label="Default select example" name="role" value={registerInputState.role} onChange={handleChange}>
                                <option selected>Choose</option>
                                {
                                    allRoles.map((item, i) => {
                                        return (
                                            <>
                                                <option value={item._id}>{item.name}</option>

                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>


                        <div class="col-sm-6 mb-3">
                            <label>Present Address</label>
                            <input type="text" name="present_address" id="present_address" value={registerInputState.present_address} class="inputfield" onChange={handleChange} />
                        </div>

                    </div>
                    <div class="col-sm-12 mb-3">
                        <label>Permanent Address</label>
                        <input type="text" name="permanent_address" id="name" value={registerInputState.permanent_address} class="inputfield" onChange={handleChange} />
                    </div>

                    <div className='row'>
                        <div class="col-sm-6 mb-3">
                            <label for="formFile" class="form-label">User Image</label>
                            <input class="form-control" type="file" id="formFile" name="image" onChange={onChangePicture} />
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="formFile" class="form-label">Upload CV</label>
                            <input class="form-control" type="file" id="formFile" name="cv_file" onChange={onChangeCv} />
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="option">I agree to the <a href="#">Terms and Conditions</a>
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="formfield">
                        <input type="submit" value="Register" class="register" name="register" />
                    </div>
                </form>


            </div>
        </>
    )
}

export default Register