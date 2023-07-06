import React from "react";
import CollegeLogo from '../assets/college_logo.png'
import { useLocation } from "react-router-dom";
// import html2pdf from 'html2pdf.js';
// import { saveAs } from 'file-saver';
// import { PDFDownloadLink, PDFViewer } from 'react-pdf';



const PaperLayout = () => {

    let {state} = useLocation();

  function handleClick() {
    window.print();
    // console.log(state.que1);
  }

//   const handleDownload = () => {
//     const pdfContent = document.getElementById('my-pdf');
//     const options = {
//         margin: [10, 10, 10, 10], // top, right, bottom, left
//       };
  
//       html2pdf().set(options).from(pdfContent).save('Question-Paper.pdf');

    
//   };
   

    return (
        <>
        <div className="container h-100" id = "my-pdf" ><br />

            <div className="d-flex justify-content-between">
                {/* <img src={CollegeLogo}></img> */}
                    <div className="float-start">
                        <img src={CollegeLogo} className="img-fluid w-75" alt=""/>
                    </div>
                    <div className="float-end w-75 ">
                        <p className="text-end mt-3 mb-1">Earlier Known as</p>
                        <p className="text-end mt-0 mb-3">B.V.B College of Engineering & Technology</p>
                    </div>
            </div><br />

            <div className="d-flex justify-content-center">
                <h3>School of Computer Science Engineering</h3>
            </div><br />

            <div className="d-flex justify-content-center"><h5>ISA - 1</h5></div><br />
            <div className="">
            <table className="table table-bordered p-4">
                <tbody>
                    <tr>
                        <td className="w-50">Course: {state.course.name}</td>
                        <td>USN : </td>
                    </tr>
                    <tr>
                        <td className="w-50">Course Code:{state.course.code}</td>
                        <td>Semester : {state.course.sem} </td>
                    </tr>
                    <tr>
                        <td className="w-50">Date of Exam: {state.examdate}</td>
                        <td>Duration : 1 hr 15 mins (Maximum Marks: 40)</td>
                    </tr>
                </tbody>
            </table>
            
            <div className="d-flex justify-content-center"><b>Note : Answer any Two Full Questions</b></div><br />

            <div className="d-flex justify-content-center">
                <table className="table table-bordered p- 2">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Q.No.</th>
                            <th scope="col" className="text-center w-100">Question</th>
                            <th scope="col" className="text-center">PI</th>
                            <th scope="col" className="text-center">CO</th>
                            <th scope="col" className="text-center">BL</th>
                            {/* <th scope="col" className="text-center">BL</th> */}
                            <th scope="col" className="text-center">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                   
                    {    
                         
                        state.que1.map((item, k2) => (
                        <tr>
                            <th scope="row">1{String.fromCharCode(k2+97)}</th>
                            <td>{item.text}</td>
                            <td className="text-center">{item.pi}</td>
                            <td className="text-center">{item.co}</td>
                            <td className="text-center">{item.bl}</td>
                            {/* <td className="text-center">{item.bl}</td> */}
                            <td className="text-center">{item.marks}</td>
                        </tr>
                        ))                          
                    } 
                    {    
                        state.que2.map((item, k2) => (
                        <tr>
                            <th scope="row">2{String.fromCharCode(k2+97)} </th>
                            <td>{item.text}</td>
                            <td className="text-center">{item.pi}</td>
                            <td className="text-center">{item.co}</td>
                            <td className="text-center">{item.bl}</td>
                            {/* <td className="text-center">{item.bl}</td> */}
                            <td className="text-center">{item.marks}</td>
                        </tr>
                        ))                        
                    } 
                    {    
                        state.que3.map((item, k2) => (
                        <tr>
                            <th scope="row">3{String.fromCharCode(k2+97)}</th>
                            <td>{item.text}</td>
                            <td className="text-center">{item.pi}</td>
                            <td className="text-center">{item.co}</td>
                            <td className="text-center">{item.bl}</td>
                            {/* <td className="text-center">{item.bl}</td> */}
                            <td className="text-center">{item.marks}</td>
                        </tr>
                        ))                      
                    } 
                    
                       
                        {/* <tr>
                            <th scope="row">2a</th>
                            <td> A computer primarily uses direct addressing, but has several different instruction formats. What problems does this create for the relocation bit approach to program relocation? How might these problems be solved?</td>
                            <td className="text-center">4</td>
                        </tr> */}
                        
                        {/* <tr>
                            <th scope="row">3a</th>
                            <td> A computer primarily uses direct addressing, but has several different instruction formats. What problems does this create for the relocation bit approach to program relocation? How might these problems be solved?</td>
                            <td className="text-center">4</td>
                        </tr> */}
                       
                    </tbody>
                </table>
                </div>
            </div>
            <div className="justify-content-end text-center " id="downloadBtn">
                <button className="btn btn-primary mt-3 mb-5 " onClick={handleClick}>Download Paper</button>
            </div>

        </div>
        </>
    );
}

export default PaperLayout;
