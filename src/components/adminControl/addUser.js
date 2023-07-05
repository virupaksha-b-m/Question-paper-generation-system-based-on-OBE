import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddUser () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9002/getCourse')
      .then(response => {
        setCourseOptions(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFaculty = {
      name: name,
      email: email,
      password: password,
      courses: courses
    };
    // axios.post('http://localhost:9002/register', newFaculty)
    //   .then(response => console.log(response.data))
    //   .catch(error => console.error(error));
    // // Clear form inputs after submission
    // setName('');
    // setEmail('');
    // setPassword('');
    // setConfirmPassword('');
    // setCourses([]);
    // setSelectedCourses([]);
    console.log(newFaculty);
  };

  const handleCourseChange = (event) => {
    const selectedCourses = Array.from(event.target.selectedOptions, option => option.value);
    setCourses(selectedCourses);
    setSelectedCourses(selectedCourses);
    console.log(selectedCourses);
  };

  return (
    <div>
      <h2>Add Faculty</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />

        <label htmlFor="confirm-password">Re-enter Password:</label>
        <input type="password" id="confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />

        <label htmlFor="courses">Courses Assigned:</label>
        {/* <input type="text" list="course-options" value={courses} onChange={handleCourseChange} /> */}
        {/* <datalist id="course-options">
          {courseOptions.map((option, index) => (
            // <option key={index} value={option} />
            <option key={option.index} value={option.name}>{option.name}</option>
          ))}
        </datalist> */}

        {/* <div>
          <p>Selected Courses:</p>
          <ul>
            {selectedCourses.map((course, index) => (
              <li key={index}>{course.name}</li>
            ))}
          </ul>
        </div> */}

        <button type="submit">Add Faculty</button>
      </form>
    </div>
  );
}

export default AddUser;
