import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewChapter() {

  const [chapter, setChapter] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();


  useEffect(() => {
    axios.get('http://localhost:9002/getChapter')
      .then(response => {
        setChapter(response.data);
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:9002/getCourse')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error(error));

  }, []);


  return (
    // <>
    <div className='container p-3 justify-content-center '>

      <div className="w-50 ">
        Select Course
        <select className="form-select" aria-label="Default select example" value={selectedCourse} name="course" onChange={(event) => { setSelectedCourse(event.target.value) }}>
          <option disabled selected hidden>Select Course First...</option>
          {courses.map((option, k) => (
            <option key={k} value={option._id}>{option.name}</option>
          ))}
        </select>
      </div>  <br />
      <h3 className='text-center'>Chapters</h3>

      <table className="table table-bordered table-light table-striped ">
        <thead>
          <tr>
            <th scope="col" className='w-25'>Name</th>
            <th scope="col">Unit</th>
            <th scope="col">Topic</th>
          </tr>
        </thead>
        <tbody>

          {chapter.filter(option => option.course_id === selectedCourse).map(filteredName => (
            <tr>
              <td>{filteredName.name}</td>
              <td>{filteredName.unit}</td>
              <td>{filteredName.topic + ","}</td>
            </tr>
          ))}

          {/* {chapter.map(option => (
            <tr>
              <td>{option.name}</td>
              <td>{option.unit}</td>
              <td>{option.topic + ","}</td>
            </tr>
          ))} */}

          {/* {chapter.map(option => (
        <tr>
            <td>{option.name}</td>
            <td>{option.unit}</td>
            <td>{option.topic+","}</td>
        </tr>
          ))} */}
        </tbody>
      </table>

    </div>
    //  </> 
  );
}

export default ViewChapter;
