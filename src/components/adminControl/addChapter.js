import React, {useEffect, useState}  from 'react'
import axios from 'axios'

const AddChapter = () => {

    const [chapter, setChapter] = useState({
        name: "",
        unit: "",
        topic: [],
        course_id: "",
    })
    const [myCourse, setMyCourse] = useState([])
    // const [option, setOption] = useState()

    useEffect(() => {
        axios.get('http://localhost:9002/getCourse')
            .then(response => {
                setMyCourse(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleChange = e => {
        const { name, value } = e.target
        console.log(name, value)
        setChapter(prevState => ({
            ...chapter, //spread operator
            [name] : value
        }))
        console.log(chapter);
    }

    const handleTopicChange = () => {
        const val = document.querySelector('#topic').value;
        // console.log(chapter);
        setChapter(prevState => ({
            ...prevState,
            topic: [...prevState.topic, val]
          }))
        //   console.log(chapter);
          document.querySelector('#topic').value = '';
    }

    const addChapter = () => {

        const { name, unit, topic, course_id } = chapter
        console.log(chapter)
        if (name && unit && topic && course_id) {
            // alert("posted")
            axios.post("http://localhost:9002/addChapter", chapter)
                .then(res => alert(res.data.message))


        } else {
            alert('Invalid input')
        }
        setChapter({
            name: "",
            unit: "",
            topic: [],
            course_id: chapter.course_id
        })

    }

    return (
        <div class="modal fade" id="addChapter" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" >Add Chapter</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <select class="form-select" aria-label="Default select example" value={chapter.course_id} name="course_id"  onChange={handleChange}>
                            <option value="" disabled selected hidden>Choose course...</option>
                            {myCourse.map(option => (
                                <option key={option.value} value={option._id}>{option.name}</option>
                            ))}
                        </select><br />
                        <input type="text" className="form-control" placeholder='Enter Chapter Name' value={chapter.name} name='name' onChange={handleChange} /> <br />
                        <select class="form-select" aria-label="Default select example" value={chapter.unit} name='unit' onChange={handleChange}>
                        <option value="" disabled selected hidden>Choose Unit</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select><br /> 

                        <p id="demo">
                        {chapter.topic.map((option, k) => (
                                <li>{option}</li>
                            ))}
                            </p>


                        <input type="text"  placeholder='Enter Topic' id='topic' /> 
                        <button className="btn btn-primary btn-plus" onClick={handleTopicChange}>Add</button> <br /><br />

                        <br /><br />
                    </div>
                    <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button type="button" class="btn btn-primary" onClick={addChapter}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddChapter
