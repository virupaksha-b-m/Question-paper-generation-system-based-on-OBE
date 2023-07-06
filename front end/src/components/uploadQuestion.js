import React, { useState, useEffect } from 'react'
import "../styles/uploadQuestion.css"
import Navbar from './navbar';

import axios from "axios"
// import { useNavigate } from "react-router-dom"
// import { Dropdown } from 'bootstrap';

const UploadQuestion = () => {

  // const navigate = useNavigate()
  const [question, setQuestion] = useState({
    course: "",
    chapter: "",
    topic: "",
    unit: "",
    questionDescription: "",
    PI: "",
    CO: "",
    BL: "",
    marks: "",
  })

  const [myCourse, setMyCourse] = useState([])
  const [myChapter, setMyChapter] = useState([])
  const [mylist, setMylist] = useState([])
  const dropDownChapter = [];
  const [myTopic, setMyTopic] = useState([])

  const handleChange = e => {

    const { name, value } = e.target

    if (name === "course") {
      myChapter.forEach(element => {

        if (element.course_id === value) {
          dropDownChapter.push(element);

        }
      });
      setMyTopic(dropDownChapter[0].topic);
      setMylist(dropDownChapter);
    }

    if (name === "chapter") {
      myChapter.forEach(element => {
        if (element._id === value) {
          setMyTopic(element.topic);
          const k = question;
          k.unit = element.unit;
          setQuestion(k)
        }
      });
    }
    setQuestion({
      ...question, //spread operator
      [name]: value
    })
  }

  useEffect(() => {
    axios.get('http://localhost:9002/getCourse')
      .then(response => {
        setMyCourse(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost:9002/getChapter')
      .then(response => {
        setMyChapter(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  const addQuestion = () => {

    const { course, chapter, topic, unit, questionDescription, PI, CO, BL, marks } = question
    console.log(question)
    if (course && chapter && topic && unit && questionDescription && PI && CO && BL && marks) {
      // alert("posted")
      axios.post("http://localhost:9002/addQuestion", question)
        .then(res => alert(res.data.message))
      setQuestion({
        course: question.course,
        chapter: "",
        topic: "",
        unit: "",
        questionDescription: "",
        PI: "",
        CO: "",
        BL: "",
        marks: ""
      })

    } else {
      alert('Invalid input')
    }
  }

  return (
    <div className="container-fluid">
      <Navbar />
      <div className='container uploadQuestion'><br />
        <h4>Add Question</h4><br />
        Select Course
        <select className="form-select" aria-label="Default select example" value={question.course} name="course" onChange={handleChange}>
          <option value="" disabled selected hidden>Select Course First...</option>
          {myCourse.map(option => (
            <option key={option.value} value={option._id}>{option.name}</option>
          ))}
        </select><br />

        <select className="form-select" aria-label="Default select example" value={question.chapter} name="chapter" onChange={handleChange}>
          <option value="" disabled selected hidden>Select Chapter...</option>
          {mylist.map(option => (
            <option key={option.value} value={option._id}>{option.name}</option>
          ))}
        </select><br />
        <select className="form-select" aria-label="Default select example" value={question.topic} name="topic" onChange={handleChange}>
          <option value="" disabled selected hidden>Select Topic...</option>
          {myTopic.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select><br />
        <div className="mb-1">
          <label for="exampleFormControlTextarea1" class="form-label">Question Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={question.questionDescription} name="questionDescription" onChange={handleChange}></textarea>
        </div><br />

        <div className="row">
          <div className="col">
            PI
            <input type="text" className="form-control" value={question.PI} placeholder="Enter PI Code" aria-label="PI code" name="PI" onChange={handleChange} />
          </div>
          <div className="col">
            CO
            <input type="number" className="form-control" value={question.CO} placeholder="Enter CO " aria-label="CO" name="CO" onChange={handleChange} />
          </div>

        </div><br />
        <div className="row">
          <div className="col">
            BL
            <input type="number" className="form-control" value={question.BL} placeholder="Enter BL" aria-label="BL" name="BL" onChange={handleChange} />
          </div>

          <div className="col">
            Marks
            <input type="number" className="form-control" min={1} max={20} value={question.marks} placeholder="Enter Marks" aria-label="marks" name="marks" onChange={handleChange} />
          </div>
        </div>
        <br />
        <div className="d-grid gap-2 col-2 mx-auto">
          <button className="btn btn-primary" type="button" onClick={addQuestion} >ADD</button><br />
        </div>
      </div>
    </div>
  )
}

export default UploadQuestion
