import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewCourse () {
  
  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9002/getCourse')
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => console.error(error));
  }, []);


  return (
    // <>
    <div className='container p-3 justify-content-center '>
        <h3 className='text-center'>Courses</h3>
        <table className="table table-bordered table-light table-striped ">
  <thead>
    <tr>
      <th scope="col" className='w-50'>Name</th>
      <th scope="col">Course Code</th>
      <th scope="col">Semester</th>
    </tr>
  </thead>
  <tbody>
   
    {course.map(option => (
        <tr>
            <td>{option.name}</td>
            <td>{option.code}</td>
            <td>{option.sem}</td>
        </tr>
          ))}
  </tbody>
</table>
     
    </div>
    //  </> 
  );
}

export default ViewCourse;
