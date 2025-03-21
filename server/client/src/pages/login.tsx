import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import toast from "react-hot-toast"
import {FcGoogle} from "react-icons/fc" 
import { auth } from "../firebase"
import { useLoginMutation } from "../redux/api/userAPI"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { newUserMessageResponse } from "../types/api-types"
const login = () => {

  const [gender,setGender] = useState("male")
  const [date,setDate] = useState("")

  

  const [login] = useLoginMutation()

  const loginHandler =async()=>{
    try 
    {
      const provider= new GoogleAuthProvider()
      const {user}=  await signInWithPopup(auth,provider)
      const res =await login({
        name: user.displayName!,
        email:user.email!,
        photo:user.photoURL!,
        gender,
        dob:date,
        role:"user",
        _id:user.uid

      });
      if("data" in res) {
        toast.success(res.data?.message || "undefined message")
        return;

      } else{
        const error = res.error as FetchBaseQueryError
        const  message = (error.data as  newUserMessageResponse).message
        toast.error(message)
        return;
      }
      console.log(user)
    } catch (error) {
      toast.error("Failed to login")
    }

  }
  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={e=>setGender(e.target.value)} >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label >date of birth</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)}/>
        </div>

        <div>
          <p>already a User</p>
           <button onClick={loginHandler}>
              <FcGoogle/>
              <span>Sign in with Google</span>
           </button>
        </div>
      </main>
      login
    </div>
  )
}

export default login
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       