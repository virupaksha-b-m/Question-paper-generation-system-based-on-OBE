import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SetPaperFormat = () => {

    const [courseOptions, setCourseOptions] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState();
    const [selectedUnit, setSelectedUnit] = useState();

    const [paperFormat, setPaperFormat] = useState({
        course: "",
        setter: "",
        unit: "",
        question_code: []

    })

    const [q, setQ] = useState({ PI: "", CO: "" });

    const handleChange = (event) => {
        const { name, value } = event.target
        if(name === "PI" || name==="CO")
            setQ({
            ...q, 
            [name]: value,
            })
        else{
            setPaperFormat({
                ...paperFormat,
                [name]: value
            })
        }
      }

    const handleQuestionCode = (event) => {
        if(q.PI && q.CO){
        setPaperFormat( (oldItems) => {
            // question_code: [...prevState, q]
            return { ...oldItems, question_code: [...oldItems.question_code, q]}
          })
        }
        else{
            alert("Invalid Input");
        }
        setQ({
            ...q,
            PI:"",
            CO: ""
        })
    }

    const handleCourseChange = (event) => {
        const sel = event.target.value;
        setPaperFormat(prevState => ({
            ...prevState,
            course: sel
          }))
        console.log(paperFormat);
      };

      const handleSubmit = (event) => {
        const {course, unit, setter, question_code } = paperFormat
            if(course && unit && setter && question_code ){
                // alert("posted")
                axios.post("http://localhost:9002/setPaper", paperFormat)
                .then(res => alert(res.data.message))
            } else {
                alert('Invalid input')
            }
            console.log(paperFormat);
      };

    useEffect(() => {
        axios.get('http://localhost:9002/getCourse')
            .then(response => {
                setCourseOptions(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <div className="modal fade" id="setPaperFormat" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Set Paper</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        {/* <div className='d-flex flex-row '> */}
                            Select Course
                            {/* <input className='form-control' list="data2"  name='course' value={selectedCourse} placeholder="Type to search..." onChange={handleCourseChange} /> */}
                            <select className="form-select" aria-label="Default select example" value={selectedUnit} name="unit" onChange={handleCourseChange}>
                            <option disabled selected hidden>Select Course...</option>
                                {courseOptions.map((option, index) => (
                                    <option key={index} value={option._id}>{option.name}</option>
                                ))}
                            </select>
                        {/* </div> */}
                        <br />
                        Select ISA
                        <select className="form-select" aria-label="Default select example" value={selectedUnit} name="unit" onChange={handleChange}>
                            <option disabled selected hidden>Select ISA...</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select> <br/>
                        Paper Setter
                        <input className='form-control'  placeholder="Enter Setter email" value={paperFormat.setter} name="setter" onChange={handleChange} /><br />
                        <div className="d-flex flex-row w-75 ">
                            
                            <input type="text" className="form-control" value={q.PI} name="PI" placeholder="Enter PI" onChange={handleChange}></input><br />
                            
                            <input type="number" className="form-control ms-3" value={q.CO} name="CO" placeholder="Enter CO" onChange={handleChange}></input><br />
                            <button className="btn btn-primary ms-3 w-75 " onClick={handleQuestionCode}>ADD</button>
                        </div>
                        <ol type="i">
                        {paperFormat.question_code.map((option, k) => (
                            
                            <li key={k}> &nbsp; PI: <b>{option.PI}</b> &nbsp;&nbsp; CO: <b>{option.CO}</b></li>
                        ))}
                         {/* {courseOptions.map((option, index) => (
                                    <option key={index} value={option.name}>{option.name}</option>
                                ))} */}
                        
                        </ol>     
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetPaperFormat
