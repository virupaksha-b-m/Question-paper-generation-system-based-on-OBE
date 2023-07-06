import React, {useEffect, useState}  from 'react'
import axios from 'axios'

const AddCourse = () => {

    const [course, setCourse] = useState({
        name: "",
        code: "",
        sem: "",
        department_id : ""
    })
    const [myDepartment, setMyDepartment] = useState([])
    // const [option, setOption] = useState()

    useEffect(() => {
        axios.get('http://localhost:9002/getDepartment')
        .then(response => {
        setMyDepartment(response.data);
        })
        .catch(error => {
        console.error(error);
        });
    },[]);

    const handleChange = e =>{
        const {name, value} = e.target
        // console.log(name, value)
        setCourse({
            ...course, //spread operator
            [name] : value
        })
    } 

    const addCourse = () => {
        
        const {name, code, sem, department_id} = course
        // console.log(course)
        if( name && code && sem && department_id){
            // alert("posted")
            axios.post("http://localhost:9002/addCourse", course)
            .then(res => alert(res.data.message))

        } else {
            alert('Invalid input')
        }
        setCourse({
            name: "",
            code: "",
            sem: "",
            department_id: ""
        })
        
    }



    
    return (
        <div class="modal fade" id="addCourse" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Course</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <select class="form-select" aria-label="Default select example" name="department_id"  value={course.department_id} onChange={handleChange}>
                            <option value="" disabled selected hidden>Choose Department...</option>
                            {myDepartment.map(option => (
                                <option key={option.value} value={option._id}>{option.name}</option>
                            ))}
                        </select><br />
                        <input type="text" className="form-control" name="name" value={course.name} placeholder="Enter Course Name" onChange={handleChange}></input><br />
                        <input type="text" className="form-control" name="code" value={course.code} placeholder="Enter Course Code " onChange={handleChange}></input><br />
                        <input type="number" className="form-control" name="sem" value={course.sem} placeholder="Enter Course semester " onChange={handleChange}></input><br />
                    </div>
                    <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button type="button" class="btn btn-primary" onClick={addCourse}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourse
