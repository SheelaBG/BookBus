import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import '../Styles/Profile.css';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { useRef } from "react";
import profilepic from  '../Profile.jpg';
import ToasterUi from 'toaster-ui'; //import toaser 1


  const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
  
    const Profile = () => {
      //MODAL FOR ACTIVE BOOKING   
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    //MODAL FOR ACTIVE BOOKING  
    
     //MODAL FOR PREVIOUS BOOKING   
     let subtitle1;
     const [modalIsOpen1, setIsOpen1] = useState(false);
   
     function openModal1() {
       setIsOpen1(true);
     }
   
     function afterOpenModal1() {
       // references are now sync'd and can be accessed.
       subtitle1.style.color = '#f00';
     }
   
     function closeModal1() {
       setIsOpen1(false);
     }
     //MODAL FOR PREVIOUS BOOKING  
  

     //MODAL FOR EDIT PROFILE  
     let subtitleEdit;
     const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
     
   
     function openModalEdit() {
       setIsOpenEdit(true);
       fetch("http://localhost:4000/users/"+userdetails.id)
           .then((res)=>{return res.json()})
           .then((data)=>{
            console.log(data);
            username.current.value=data.username;
            Email.current.value=data.email;
            Pwd.current.value=data.password;
            Dob.current.value=data.dob;
            mNo.current.value=data.mobileno;
            Gender.current.value=data.gender;
           })
          
     }
   
     function afterOpenModalEdit() {
       // references are now sync'd and can be accessed.
       subtitleEdit.style.color = '#f00';
     }
   
     function closeModalEdit() {
       setIsOpenEdit(false);
     }
    //MODAL FOR EDIT PROFILE  


    let[userdetails,setuserdetails]=useState("");
    let[updatedData,setUpdatedData]=useState("");
  
    let navigate=useNavigate();
    const toaster = new ToasterUi();//declare toaster object 2
    
    let username=useRef();
    let Email=useRef();
    let Pwd=useRef();
    let Dob=useRef();
    let mNo=useRef();
    let Gender=useRef();
    
     useEffect(()=>{
      
      //print current user details on profile page
       let userdetails = JSON.parse(localStorage.getItem("userdetails"))
       setuserdetails(userdetails);
       console.log(userdetails);

       let Prevoius_ticket = userdetails.active_bookings.filter((tickets,i)=>{
        return new Date(tickets.date)<new Date()
       })
      
       //pushing tickets to previous booking
        Prevoius_ticket.map((ticket)=>{
          userdetails.previous_bookings.push(ticket);
        })

        //deleting the previous tickets from active bookings
        let updatedActive_Bookings= userdetails.active_bookings.filter((ticket)=>{
          return  new Date(ticket.date)>new Date();
        })

            if(updatedActive_Bookings!=null)
            {
              let UpdatedData = 
              {
                ...userdetails ,active_bookings:[...updatedActive_Bookings]
              }
          // console.log(UpdatedData);
          setUpdatedData(UpdatedData);
            }  
           
    },[])

    let logout=()=>{
      //clear current user from localstorage
      localStorage.removeItem("userdetails");
      toaster.addToast("logged out...");//usage toaser 3
      navigate("/Login")
    }
    //delete account permanently from json
    let DeleteAccount=()=>{
      //before delete ask user once for confirmation
     let promptvalue= prompt("Are you sure to delete,if yes please provide password")
      if(promptvalue!=userdetails.password)
      {
       alert("invalid password!!!")
       return 
      }
      else{
        fetch("http://localhost:4000/users/"+userdetails.id, { method: "DELETE" })
       // after deleting object in users.json object no need to keep current user object in local storage
        localStorage.removeItem("userdetails");
        alert("Account deleted Permenently...")
        .then(()=>{ navigate("/") })//back to signup page
      }
    }

    //editing profile...
    let handleUpdate=(e)=>{
      e.preventDefault();
        let updateDetails={
        username:username.current.value,
        email:Email.current.value,
        password:Pwd.current.value,
        dob:Dob.current.value,
        mobileno:mNo.current.value,
        gender:Gender.current.value,
        active_bookings:updatedData.active_bookings,
        previous_bookings:updatedData.previous_bookings
    
     }

      fetch("http://localhost:4000/users/"+updatedData.id,
      {
                     method:"PUT",
                     headers:{"Content-Type":"application/json"},
                     body:JSON.stringify(updateDetails)
      })
      .then((data)=>{
        //console.log(data);
        toaster.addToast("Profile Updated successfully...")
        localStorage.setItem("userdetails",JSON.stringify(updateDetails))
        navigate("/profile") 
      })
      
    }
    
    return ( 
      <div className="profilepage">
      <Navbar/>
      {userdetails && 
      <div className="user-details">
          <div className="cover-page">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
          </div>
          <div className="profile">
              <img src={profilepic} alt="" />
              <h1>{userdetails.username}</h1>
              <button onClick={logout}>logout</button>
              <button onClick={DeleteAccount}>delete account</button>
          </div>
          <div>
              <p>Phone : {userdetails.mobileno}</p>
              <p>Email : {userdetails.email}</p>
              <p>Total booking : {userdetails.active_bookings.length + userdetails.previous_bookings.length}</p>
              <p>Active booking : <button onClick={openModal}>View</button> </p>
              <p>Previous booking : <button onClick={openModal1}>View</button> </p>
          </div>
          <button onClick={openModalEdit}>Edit profile</button>
      </div>}


{/* for active model */}
      {
      updatedData && 
        <Modal 
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
       { updatedData.active_bookings ? <div className="active">
          <h2  ref={(_subtitle) => (subtitle = _subtitle)}>Active tickets</h2>
         <div className="active-ticket-card">
              {
                  updatedData.active_bookings.map((ticket ,i)=>{
                      return(
                          <div className="ticket">
                              <p>{i+1}</p>
                              <p>Bus : {ticket.busname} - {ticket.busnumber} </p>
                              <p>{ticket.date}</p>
                              <p>{ticket.from}:{ticket.start} - {ticket.to}:{ticket.end}</p>
                              <p> BookedSeats : {ticket.seats}</p>
                          </div>
                      )
                  })
              }
          </div>
          <button  onClick={closeModal}>close</button>
          </div>:<h1 style={{color:"white"}}>No Active Bookings... </h1>}
      </Modal>}

{/* for previous model */}
      {updatedData && 
      <Modal
      isOpen={modalIsOpen1}
      onAfterOpen={afterOpenModal1}
      onRequestClose={closeModal1}
      style={customStyles}
      contentLabel="Example Modal">
        <div className="active">
          <h2 ref={(_subtitle) => (subtitle1 = _subtitle)}>Previous tickets</h2>
          <div className="active-ticket-card">
              {
                  updatedData.previous_bookings.map((ticket ,i)=>{
                      return(
                          <div className="ticket">
                              <p>{i+1}</p>
                              <p>Bus : {ticket.busname} - {ticket.busnumber} </p>
                              <p>{ticket.date}</p>
                              <p>{ticket.from}:{ticket.start} - {ticket.to}:{ticket.end}</p>
                              <p>BookedTickets : {ticket.seats}</p>
                          </div>
                      )
                  })
              }
          </div>
          <button onClick={closeModal1}>close</button>
          </div>
      </Modal>}

      {/* for Edit model */}
      {updatedData && 
      <Modal
      isOpen={modalIsOpenEdit}
      onAfterOpen={afterOpenModalEdit}
      onRequestClose={closeModalEdit}
      style={customStyles}
      contentLabel="Example Modal">
       
          <h2 ref={(_subtitle) => (subtitleEdit = _subtitle)}>Edit Profile</h2>
          <div className="EditProfile">
              {
                  <><form onSubmit={handleUpdate}>
                  <input type="text" placeholder="Username" ref={username} required/>
                  <input type="email" placeholder="Email" ref={Email} required/>
                  <input type="password" placeholder="Password" ref={Pwd} required/>
                  <input type="date" placeholder="DateOfBirth" ref={Dob} required/>
                  <input type="tel" placeholder="MobileNo" ref={mNo} max="10" required/>
                  <input type="text" placeholder="Gender" ref={Gender} required/> 
                  <input type="submit" value="Update" />
                    </form></>
              }
          <button onClick={closeModalEdit}>close</button>
          </div>
      </Modal>}

  </div> );
}
 
export default Profile;