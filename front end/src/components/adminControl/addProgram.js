import React, {useState} from 'react'
import axios from 'axios'

const Program = () => {

    const [program, setProgram] = useState({
        name: "",
        code: ""
    })

    const handleChange = e =>{
        const {name, value} = e.target
        // console.log(name, value)
        setProgram({
            ...program, //spread operator
            [name] : value
        })
    } 

    const addProgram = () => {
        
        const {name, code} = program
        if( name && code){
            // alert("posted")
            axios.post("http://localhost:9002/addProgram", program)
            .then(res => alert(res.data.message))
            

        } else {
            alert('Invalid input')
        }
        setProgram({
            name: "",
            code: ""
        })
        
    }
    

    return (
        <div class="modal fade" id="addProgram" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Program</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" className="form-control" name="name" value={program.name} placeholder="Enter Program Name" onChange={handleChange}></input><br />
                        <input type="text" className="form-control" name="code" value={program.code} placeholder="Enter Program Code " onChange={handleChange}></input> <br />
                    </div>
                    <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button type="button" class="btn btn-primary" onClick={addProgram}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Program
