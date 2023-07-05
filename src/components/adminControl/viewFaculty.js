import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewFaculty () {
  
  const [faculty, setFaculty] = useState([]);


  const deleteUser = (id) => {
    
    axios.post('http://localhost:9002/deleteUser', {_id: id})
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => console.error(error));
  }


  useEffect(() => {
    axios.get('http://localhost:9002/getFaculty')
      .then(response => {
        setFaculty(response.data);
      })
      .catch(error => console.error(error));

  }, []);


  return (
    // <>
    <div className='container p-3 justify-content-center '>
        <h3 className='text-center'>Faculties</h3>
        <table className="table table-bordered table-light table-striped ">
  <thead>
    <tr>
      <th scope="col" className='w-25'>Name</th>
      <th scope="col">Email</th>
      <th scope="col">Assigned Course</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   
    {    

    faculty.map(option => (
        <tr>
            <td>{option.name}</td>
            <td>{option.email}</td>
            {/* <td>{option.courses +"\t"}</td> */}
            <td>{option.courses.map((e) => (
              <>
              {e}&nbsp;
              </>
            ))}</td>
            <td><button type="button" className="btn btn-danger btn-sm w-75" onClick={()=>deleteUser(option._id)}>Delete</button></td>
        </tr>
          ))}
  </tbody>
</table>
     
    </div>
    //  </> 
  );
}

export default ViewFaculty;
