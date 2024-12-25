
import './App.css';
import {Container,Row,Col,Table } from 'react-bootstrap'
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'

function App() {

   const initialState = {
      uname:'',
      uemail:'',
      umobile:'',
      umessage:'',
      index:''
   }
   let[formData,setformData] = useState(initialState)
   let[userData, setUserData] = useState([])

   let getValue = (event)=>
   {
      let oldData = {...formData}
      let inputName = event.target.name;
      let inputValue = event.target.value;
      oldData[inputName] = inputValue;
      setformData(oldData)

      
   }
   


  
  
   let handleSubmit = (event)=>
      {
         
         
         let currentUserFormData = {
            uname: formData.uname,
            uemail:formData.uemail,
            umobile:formData.umobile,
            umessage:formData.umessage
         }
      if(formData.index==="")
      {

         let checkFilterUser = userData.filter((v)=>v.uemail===formData.uemail || v.umobile===formData.umobile)

         if(checkFilterUser.length===1)
            {
               toast.error("Email or Phone already exist")
            }
            else
            {
              let oldUserData = [...userData,currentUserFormData]
              setUserData(oldUserData)
              console.log(oldUserData)
         
         setformData (initialState)//To make empty to the form after submit)  
      }  
      }
      else
      {
         let editIndex = formData.index;
         let oldData  =userData;

         let checkFilterUser = userData.filter((v,i)=>(v.uemail===formData.uemail || v.umobile===formData.umobile) && i!==editIndex)

         if(checkFilterUser.length===0)
         {
            oldData[editIndex]['uname'] = formData.uname
            oldData[editIndex]['uemail'] = formData.uemail
            oldData[editIndex]['umobile'] = formData.umobile
            oldData[editIndex]['umessage'] = formData.umessage
   
            setUserData(oldData)
   
            setformData ({    //To make empty to the form after submit
               uname:'',
               uemail:'',
               umobile:'',
               umessage:'',
               index:''
            })
            toast.success("Row Updated successfully")
         }
        else{
         toast.error("Email or Phone already exist")
        }
      }
      event.preventDefault();
    }

   let deleteRow = (indexNumber)=>
   {
     let filterDataAfterDelete = userData.filter((v,i)=>i!==indexNumber)
     toast.success("Row deleted successfully")
     setUserData(filterDataAfterDelete)
   }
  
   let editRow = (indexNumber)=>{

      let editData = userData.filter((v,i)=>i===indexNumber)[0]
      console.log(editData)
      editData['index'] = indexNumber;

      setformData(editData)
   }

  return (
    
       <Container fluid>
          <Container>
          
           <ToastContainer/>
             <Row>
                <Col className='text-center py-5'><h1>Enquiry Form</h1></Col>
             </Row>
             <Row>
               <Col lg={5}>
                
                 <form onSubmit={handleSubmit}>
                     <div className="pb-3">
                        <label className='form-label'>Name:</label>
                        <input type="text" onChange={getValue} name='uname' value={formData.uname} className='form-control' placeholder='Enter your Name' required/>
                     </div>

                     <div className="pb-3">
                        <label className='form-label'>EMail:</label>
                        <input type="email" onChange={getValue} name='uemail' value={formData.uemail} className='form-control' placeholder='E-mail id' required/>
                     </div>

                     <div className="pb-3">
                        <label className='form-label'>Mobile No:</label>
                        <input type="text" onChange={getValue} name='umobile' value={formData.umobile} className='form-control' placeholder='Mobile No' required/>
                     </div>

                     <div className="mb-3">
                        <label  className='form-label'>Message</label>
                        <textarea onChange={getValue} className='form-control' name='umessage' value={formData.umessage} id='' rows='3'></textarea>
                     </div>

                     <button className='btn btn-primary'>{formData.index !=="" ? 'Update' : 'Save'}</button>
                 </form>
               </Col>

    <Col lg={7}>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th> Email</th>
          <th>Phone</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
           {userData.length>=1 ?
             
             userData.map((obj,i)=>
            {
               return(
                  <tr key={i}>
                  <td>{i+1}</td>
                  <td>{obj.uname}</td>  
                  <td>{obj.uemail}</td>
                  <td>{obj.umobile}</td>
                  <td>{obj.umessage}</td>
                  <td>
                    <button onClick={()=>deleteRow(i)}>Delete</button>
                    <button onClick={()=>editRow(i)}>Edit</button>
                  </td>
               </tr>
               )
            })
          
        :
        <tr>
        <td colSpan={6} className='text-center'>No Data Found</td>
        </tr>

         }
           
                 
      
      
     
       
 
      </tbody>
      </Table>
    </Col>
  </Row>
   </Container>
   </Container>
    
  );
}

export default App;
