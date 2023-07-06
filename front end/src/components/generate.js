import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import axios from "axios"
// import PaperLayout from "./paperLayout";
import { Link } from "react-router-dom"


// import { Form, Button } from 'bootstrap';


const Generate = () => {

  const user = window.localStorage.getItem("username");


  const [question1, setQuestion1] = useState({ id: '1', q: [] });
  const [question2, setQuestion2] = useState({ id: '2', q: [] });
  const [question3, setQuestion3] = useState({ id: '3', q: [] });

  const [q1, setQ1] = useState({ PI: "", CO: "", BL:"", course: "", unit: '' });
  const [q2, setQ2] = useState({ PI: "", CO: "", BL:"", course: "", unit: '' });
  const [q3, setQ3] = useState({ PI: "", CO: "", BL:"", course: "", unit: '' });

  const [section1, setSection1] = useState({ id: '1', q: [] });
  const [section2, setSection2] = useState({ id: '2', q: [] });
  const [section3, setSection3] = useState({ id: '3', q: [] });

  const [myCourse, setMyCourse] = useState([]);

  const [paperCourse, setPaperCourse] = useState();
  const [minor, setMinor] = useState();
  const [examDate, setExamDate] = useState();
  const [examCourse, setExamCourse] = useState(null);
  const [paperFormat, setPaperFormat] = useState({
    ISA: "",
    setter: "",
    question_code: "",
    course_id: ""

  });

  useEffect(() => {
    // setPaperFormat("");
    axios.post('http://localhost:9002/getPaperFormat', examCourse)
      .then(response => {
        // setPaperFormat(response.data.setter);
        setPaperFormat({
          ISA: response.data.ISA,
          setter: response.data.setter,
          question_code: response.data.question_code,
          course_id: response.data.course_id

        });
        console.log(response.data);
        // console.log(user);
        console.log(paperFormat);

      })
      .catch(error => {
        console.error(error);
      });

  }, [examCourse]);

  const handleChange = (event) => {
    const { name, value } = event.target
    // console.log(name, value)
    setQ1({
      ...q1, //spread operator
      [name]: value,
      course: paperCourse,
      unit: minor
    })
  }

  const handleChange2 = (event) => {
    const { name, value } = event.target
    // console.log(name, value)
    setQ2({
      ...q2, //spread operator
      [name]: value,
      course: paperCourse,
      unit: minor
    })
  }

  const handleChange3 = (event) => {
    const { name, value } = event.target
    // console.log(name, value)
    setQ3({
      ...q3, //spread operator
      [name]: value,
      course: paperCourse,
      unit: minor
    })
  }

  const handleQuestion1 = () => {
    if(q1.PI && q1.CO && q1.BL)
    setQuestion1((oldItems) => {
      return { ...oldItems, q: [...oldItems.q, q1] }
    })
    else {
      alert("Invalid Input");
    }

    setQ1({
      ...q1,
      PI: "",
      CO: "",
      BL: "",
    });
    console.log(question1);
  }

  const handleQuestion2 = () => {
    if(q2.PI && q2.CO && q2.BL)
    setQuestion2((oldItems) => {
      // return [...oldItems, q2];
      return { ...oldItems, q: [...oldItems.q, q2] }
    })
    else{
      alert("Invalid Input");
    }
    setQ2({
      ...q2,
      PI: "",
      CO: "",
      BL:"",
    });
  }

  const handleQuestion3 = () => {
    if(q3.PI && q3.CO && q3.BL)
    setQuestion3((oldItems) => {
      // return [...oldItems, q3];
      return { ...oldItems, q: [...oldItems.q, q3] }
    })
    else {
      alert("Invalid Input");
    }
    setQ3({
      ...q3,
      PI: "",
      CO: "",
      BL: "",
    });
  }


  const handlePaperChange = (event) => {
    setPaperCourse(event.target.value);
    myCourse.forEach(element => {
      if (element._id === event.target.value) {
        setExamCourse(element);
      }
    });

  }

  const handleMinorChange = (event) => {
    setMinor(event.target.value);
  }

  async function Generate(curQues) {

    // console.log(curQues);
    if (curQues.q.length !== 0 )
      try {
        const res = await axios.post('http://localhost:9002/getQuestion1', curQues.q)
        if (curQues.id === '1') {
          console.log("sucesss")
          setSection1({
            ...section1,
            id: curQues.id,
            q: res.data
          })
        }
        if (curQues.id === '2')
          setSection2({
            ...section2,
            id: curQues.id,
            q: res.data
          })
        if (curQues.id === '3')
          setSection3({
            ...section3,
            id: curQues.id,
            q: res.data
          })
      } catch (error) {
        console.error(error);
      };
  }

  const [myPaper, setMyPaper] = useState({ q1: [], q2: [], q3: [] });



  function findQuestions(section) {

    if (section.q.length === 2) {
      for (let i = 0; i < section.q[0].length; i++) {
        for (let j = 0; j < section.q[1].length; j++) {
          let arr = [];
          let q1 = section.q[0][i];
          let q2 = section.q[1][j];
          if ((q1.marks + q2.marks) === 20 && q1._id !== q2._id) {
            // return [q1, q2, q3];
            arr.push(q1);
            arr.push(q2);
            setMyPaper((oldItems) => {
              if (section.id === '1')
                return { ...oldItems, q1: [...oldItems.q1, arr] };
              if (section.id === '2')
                return { ...oldItems, q2: [...oldItems.q2, arr] };
              if (section.id === '3')
                return { ...oldItems, q3: [...oldItems.q3, arr] };
            })
          }
        }
      }
    }
    if (section.q.length === 3) {
      for (let i = 0; i < section.q[0].length; i++) {
        for (let j = 0; j < section.q[1].length; j++) {
          for (let k = 0; k < section.q[2].length; k++) {
            let arr = [];
            let q1 = section.q[0][i];
            let q2 = section.q[1][j];
            let q3 = section.q[2][k];
            if ((q1.marks + q2.marks + q3.marks) === 20 && q1._id !== q2._id && q1._id !== q3._id && q2._id !== q3._id) {
              // return [q1, q2, q3];
              arr.push(q1);
              arr.push(q2);
              arr.push(q3);
              setMyPaper((oldItems) => {
                if (section.id === '1')
                  return { ...oldItems, q1: [...oldItems.q1, arr] };
                if (section.id === '2')
                  return { ...oldItems, q2: [...oldItems.q2, arr] };
                if (section.id === '3')
                  return { ...oldItems, q3: [...oldItems.q3, arr] };
              })
            }
          }
        }
      }
    }


    console.log(myPaper.q1)
    if (section.id === '1')
      setQuestion1({
        id: question1.id,
        q: []
      })
    if (section.id === '2')
      setQuestion2({
        id: question2.id,
        q: []
      })
    if (section.id === '3')
      setQuestion3({
        id: question3.id,
        q: []
      })

    return null; // no such combination found
  }

  useEffect(() => {
    if (section1.q.length !== 0)
      findQuestions(section1)

  }, [section1]);

  useEffect(() => {
    if (section2.q.length !== 0)
      findQuestions(section2)

  }, [section2]);

  useEffect(() => {
    if (section3.q.length !== 0)
      findQuestions(section3)

  }, [section3]);

  useEffect(() => {
    axios.get('http://localhost:9002/getCourse')
      .then(response => {
        setMyCourse(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);

  function generateIndex(length) {
    console.log(myPaper.q1.length)
    let l = Math.floor(Math.random() * length) + 1;
    setIndex1(l - 1);
    //  console.log(length);
  }

  function generateIndex2(length) {
    let l = Math.floor(Math.random() * length) + 1;
    setIndex2(l - 1);
    console.log(l);
  }

  function generateIndex3(length) {
    let l = Math.floor(Math.random() * length) + 1;
    setIndex3(l - 1);
    console.log(l);
  }

  return (

    <div className="container-fluid ">
      <div className="container ">
        <Navbar />
      </div><br></br>
      <div className='container p-3 '><br />
        <h3 className="mt-3 mb-3 text-center">Generate Paper</h3>
        <div className="d-flex flex-row justify-content-between bg-light p-2 " >
          <div className=" text-dark w-75 p-2">
            <div className="w-50 ">
              Select Course
              <select className="form-select" aria-label="Default select example" value={paperCourse} name="course" onChange={handlePaperChange}>
                <option disabled selected hidden>Select Course First...</option>
                {myCourse.map((option, k) => (
                  <option key={k} value={option._id}>{option.name}</option>
                ))}
              </select>
            </div>  <br />
            <div className="w-50 ">
              Select ISA
              <select className="form-select" aria-label="Default select example" value={minor} name='unit' onChange={handleMinorChange} >
                <option disabled selected hidden>Select ISA...</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select> <br />
            </div>
            <div className="w-50 ">
              Exam Date
              <input className="form-control" type="date" id="examDate" name="examDate" onChange={(event) => { setExamDate(event.target.value) }} />
            </div>
          </div>
          {(paperCourse == paperFormat.course_id && paperFormat.setter == user)?
          <div className=" m-2 w-0 border border-2 rounded-2 bg-white">
            <h6 className="bg-light  text-center p-2"><b>Question Code Details</b></h6>
            <ul  className="">
              {paperFormat.question_code.map((option, k) => (
                // <li>{option.PI}.   {option.CO}</li>
                <li key={k}> &nbsp; PI: <b>{option.PI}</b> &nbsp;&nbsp; CO: <b>{option.CO}</b></li>
              ))}
            </ul>
          </div>:null}
        </div>
        
        {(paperCourse == paperFormat.course_id && paperFormat.setter == user && minor == paperFormat.ISA && examDate) ?
          <div className="w-100 mt-3 p-3 bg-light">
            <h4>Paper Details  </h4>
            {/* <Link className="btn btn-primary ms-5 text-center"
                  to="/viewCode"
                  state={{ course: examCourse, unit : minor }} 

                >Show Paper</Link> */}
            {/* <div className=" ms-5 bg-dark text-white p-2 w-25">
              <h6>Question Code Details</h6>
              <ol type="a">
                {paperFormat.question_code.map((option, k) => (
                  // <li>{option.PI}.   {option.CO}</li>
                  <li key={k}> &nbsp; PI: <b>{option.PI}</b> &nbsp;&nbsp; CO: <b>{option.CO}</b></li>
                ))}
              </ol>
            </div> */}
            <div className="m-5 mt-3 p-3 border border-2 bg-warning rounded-2">
              <h4 className="text-start "> Question 1.</h4>
              <div className="d-flex flex-row w-75 ">
                <input type="text" className="form-control " value={q1.PI} name="PI" placeholder="Enter PI" onChange={handleChange}></input><br />
                <input type="number" className="form-control ms-3 " value={q1.CO} name="CO" placeholder="Enter CO" onChange={handleChange}></input><br />
                <input type="number" className="form-control ms-3 " value={q1.BL} name="BL" placeholder="Enter BL" onChange={handleChange}></input><br />
                <button className="btn btn-primary ms-3 w-75 " onClick={handleQuestion1}>ADD</button>
                <button className="btn btn-success ms-3  w-75 " onClick={() => Generate(question1)}>Submit</button>

              </div>
              <ol type="a">
                {question1.q.map((option, k) => (
                  <li key={k}> &nbsp; PI: <b>{option.PI}</b> &nbsp;&nbsp; CO: <b>{option.CO}</b> &nbsp;&nbsp; BL: <b>{option.BL}</b></li>
                ))}
              </ol>
              {(myPaper.q1.length !== 0) ?
                <div className="bg-white p-2">
                  {
                    <>
                      <h5>Total set of questions : {myPaper.q1.length}</h5>
                      <ol type="a" >{
                        myPaper.q1[index1].map((item, k2) => (
                          <li key={k2}>{item.text} &nbsp; ({item.marks})</li>
                        ))}
                      </ol>
                      <button className="btn btn-secondary ms-3 mb-2 " onClick={() => generateIndex(myPaper.q1.length)}>Regenerate</button>
                    </>
                  }
                </div> : null}
            </div>
            <div className="m-5 p-3 border border-2 bg-warning rounded-2">

              <h4 className="text-start"> Question 2.</h4>

              <div className="d-flex flex-row w-75 ">

                <input type="text" className="form-control" value={q2.PI} name="PI" placeholder="Enter PI" onChange={handleChange2}></input><br />
                <input type="number" className="form-control ms-3" value={q2.CO} name="CO" placeholder="Enter CO" onChange={handleChange2}></input><br />
                <input type="number" className="form-control ms-3" value={q2.BL} name="BL" placeholder="Enter BL" onChange={handleChange2}></input><br />

                <button className="btn btn-primary ms-3 w-75 " onClick={handleQuestion2}>ADD</button>
                <button className=" btn btn-success ms-3 w-75 " onClick={() => Generate(question2)}>Submit</button>
                {/* <button className="btn btn-secondary ms-3 w-75 " onClick={()=> generateIndex2(myPaper.q2.length)}>Regenerate</button> */}
              </div>
              <ol type="a">
                {question2.q.map((option, k) => (
                  // <li>{option.PI}.   {option.CO}</li>
                  <li key={k}> &nbsp; PI: <b>{option.PI}</b> &nbsp;&nbsp; CO: <b>{option.CO}</b> &nbsp;&nbsp; BL: <b>{option.BL}</b></li>
                ))}
              </ol>
              {(myPaper.q2.length !== 0) ?
                <div className="bg-white p-2">
                  {

                    <>
                      <h5>Total set of questions : {myPaper.q2.length}</h5>
                      <ol type="a" >{
                        myPaper.q2[index2].map((item, k2) => (
                          <li key={k2}>{item.text} &nbsp; ({item.marks})</li>
                        ))}
                      </ol>
                      <button className="btn btn-secondary ms-3 mb-2  " onClick={() => generateIndex2(myPaper.q2.length)}>Regenerate</button>

                    </>
                  }
                </div> : null}

            </div>
            <div className="m-5 mt-2 border p-3 border-2 bg-warning rounded-2">
              <h4 className="text-start"> Question 3.</h4>

              <div className="d-flex flex-row w-75 ">

                <input type="text" className="form-control" value={q3.PI} name="PI" placeholder="Enter PI" onChange={handleChange3}></input><br />
                <input type="number" className="form-control ms-3" value={q3.CO} name="CO" placeholder="Enter CO" onChange={handleChange3}></input><br />
                <input type="number" className="form-control ms-3" value={q3.BL} name="BL" placeholder="Enter BL" onChange={handleChange3}></input><br />

                <button className="btn btn-primary ms-3 w-75 " onClick={handleQuestion3}>ADD</button>
                <button className="btn btn-success ms-3 w-75" onClick={() => Generate(question3)}>Submit</button>
                {/* <button className="btn btn-secondary ms-3 w-75 " onClick={()=> generateIndex3(myPaper.q3.length)}>Regenerate</button> */}
              </div>
              <ol type="a">
                {question3.q.map((option, k) => (
                  <li key={k}> &nbsp; PI: <b>{option.PI}</b> &nbsp;&nbsp; CO: <b>{option.CO}</b> &nbsp;&nbsp; BL: <b>{option.BL}</b></li>
                ))}
              </ol>
              {(myPaper.q3.length !== 0) ?
                <div className="bg-white p-2 ">
                  {
                    <>
                      <h5>Total set of questions : {myPaper.q3.length}</h5>
                      <ol type="a" >{
                        myPaper.q3[index3].map((item, k2) => (
                          <li key={k2} >{item.text} &nbsp; ({item.marks})</li>
                        ))}
                      </ol>
                      <button className="btn btn-secondary ms-3 mb-2 " onClick={() => generateIndex3(myPaper.q3.length)}>Regenerate</button>

                    </>
                  }
                </div> : null}
            </div>
            <div className="justify-content-center ">
              {(myPaper.q1.length !== 0 && myPaper.q2.length !== 0 && myPaper.q3.length !== 0) ?
                <Link className="btn btn-primary ms-5 text-center"
                  to="/paperLayout"
                  state={{ course: examCourse, examdate: examDate, que1: myPaper.q1[index1], que2: myPaper.q2[index2], que3: myPaper.q3[index3] }} // your data array of objects

                >Show Paper</Link>
                : null}
            </div>
          </div> : null}
      </div>
    </div>
  );
}

export default Generate;
