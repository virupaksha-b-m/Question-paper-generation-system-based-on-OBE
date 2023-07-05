import React, {useState, useEffect} from 'react'
import axios from 'axios'

const AddFaculty = () => {


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
        courses : [],
    })

  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();

  useEffect(() => {
    axios.get('http://localhost:9002/getCourse')
      .then(response => {
        setCourseOptions(response.data);
      })
      .catch(error => console.error(error));
  }, []);

    const handleChange = e =>{
        const {name, value} = e.target
        setUser({
            ...user, //spread operator
            [name] : value
        })
    } 

    const handleCourseChange = (event) => {
        const sel = event.target.value;
        setSelectedCourse(sel);
      };

    const handleCourse = () => {
        //     setListCourse((oldItems) => {
        //     return [...oldItems, selectedCourse];
        //   })
        //   setSelectedCourse("");
        setUser(prevState => ({
            ...prevState,
            courses: [...prevState.courses, selectedCourse]
          }))
        // setUser((oldItems) => {
        //     return [...oldItems, selectedCourse];
        //   })
          setSelectedCourse("");
    }

    const register = () => {
        
        const {name, email, password, reEnterPassword, courses } = user
        if( name && email && password && courses && (password === reEnterPassword)){
            // alert("posted")
            axios.post("http://localhost:9002/register", user)
            .then(res => alert(res.data.message))
        } else {
            alert('Invalid input')
        }
        setUser({
            name: "",
            email: "",
            password: "",
            reEnterPassword: "",
            courses : []
        })     
    }


    return (
        <div className="modal fade " id="addFaculty" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Faculty</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Faculty Name
                        <input type="text"  className="form-control " name="name" value={user.name} placeholder="Enter Faculty Name" onChange={handleChange}></input><br />
                        Email
                        <input type="email" className="form-control" name="email" value={user.email} placeholder="Enter Faculty email" onChange={handleChange}></input><br /> 
                        Password
                        <input type="password" className="form-control" name="password" value={user.password} placeholder="Enter password" onChange={handleChange}></input><br />
                        Confirm Password
                        <input type="password" className="form-control" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter password" onChange={handleChange}></input>
                        
                        <label for="exampleDataList" class="form-label">Assign Courses</label>
                        <div className='d-flex flex-row '>
                            <input className='form-control' list="data2"  value={selectedCourse} placeholder="Type to search..." onChange={handleCourseChange}/>
                                <datalist id="data2" >
                                    {courseOptions.map((option, index) => (
                                        <option value={option.code}>{option.name}</option>
                                    ))}
                                </datalist>
                            <button className="btn-primary ms-3 " onClick={handleCourse}>ADD</button>
                            
                        </div>
                        {/* <p>Selected Courses:</p> */}
                        <ol>
                            {user.courses.map((course, index) => (
                            <li key={index}>{course}</li>
                            ))}
                        </ol>

            
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button type="button" className="btn btn-primary"onClick={register}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFaculty
