import React, {useEffect, useState} from 'react'
import axios from 'axios'

const AddDepartment = () => {

    const [department, setDepartment] = useState({
        name: "",
        code: "",
        program_id : ""
    })
    const [myProgram, setMyProgram] = useState([])
    // const [option, setOption] = useState()

    useEffect(() => {
        axios.get('http://localhost:9002/getProgram')
        .then(response => {
        setMyProgram(response.data);
        })
        .catch(error => {
        console.error(error);
        });
    },[]);

    const handleChange = e =>{
        const {name, value} = e.target
        // console.log(name, value)
        setDepartment({
            ...department, //spread operator
            [name] : value
        })
    } 


    const addDepartment = () => {
        
        const {name, code, program_id} = department
        console.log(department)
        if( name && code && program_id){
            // alert("posted")
            axios.post("http://localhost:9002/addDepartment", department)
            .then(res => alert(res.data.message))
            

        } else {
            alert('Invalid input')
        }
        setDepartment({
            name: "",
            code: "",
            program_id: ""
        })
        
    }

    
    return (
        <div class="modal fade" id="addDepartment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Department</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    <div class="modal-body">
                        <select class="form-select" aria-label="Default select example" name="program_id"  value={department.program_id} onChange={handleChange}>
                            <option value="" disabled selected hidden>Choose Program...</option>
                            {myProgram.map(option => (
                                <option key={option.value} value={option._id}>{option.code}</option>
                            ))}
                        </select><br />
                        <input type="text" className="form-control" name="name" value={department.name} placeholder="Enter Department Name" onChange={handleChange}></input><br />
                        <input type="text" className="form-control" name="code" value={department.code} placeholder="Enter Department Code " onChange={handleChange}></input> <br />
                    </div>
                    <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button type="button" class="btn btn-primary" onClick={addDepartment}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDepartment
