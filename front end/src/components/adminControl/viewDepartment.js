import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewDepartment () {
  
  const [department, setDepartment] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:9002/getDepartment')
      .then(response => {
        setDepartment(response.data);
      })
      .catch(error => console.error(error));
  }, []);


  return (
    // <>
    <div className='container p-3 justify-content-center '>
        <h3 className='text-center'>Departments</h3>
        <table className="table table-bordered table-light table-striped ">
  <thead>
    <tr>
      <th scope="col" className='w-50'>Name</th>
      <th scope="col">Code</th>
    </tr>
  </thead>
  <tbody>
   
    {department.map(option => (
        <tr>
            <td>{option.name}</td>
            <td>{option.code}</td>
        </tr>
          ))}
  </tbody>
</table>
     
    </div>
    //  </> 
  );
}

export default ViewDepartment;
