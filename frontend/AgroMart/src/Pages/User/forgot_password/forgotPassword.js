import Header from "../../../components/header";
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from "../../../config";

const ForgotPassword = () => {

  let navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const ResetPassword = () => {
    if (email.length === 0) {
      //  alert('please enter email')
      toast.warning('please enter email')
    } else if (password.length === 0) {
      //alert('please enter password')
      toast.warning('please enter password')
    } else {
      axios.put(config.serverURL + '/user/forgotPassword', { 'email': email, 'password': password }, { "Content-Type": "application/json" }).then((response) => {
        console.log(response);
        const result = response.data

        console.log(result.status)
        if (result.status === 'Success') {
          toast.success('password reset Successfull!!!!!')
          console.log("password reset Successfull!!!!!")
          navigate('/signin')
        }
      }
      ).catch((error) => {
        console.log('error')
        console.log(error)
        toast.error('invalid Email')

        console.log('invalid')
        navigate('/signin')
      })
    }

  }
  return (
    <div>
      <Header />
      <div style={{ marginTop: 70 }}>
        <div style={styles.container}>
          <div className='mb-3'>
            <label>Email</label>
            <input
              className='form-control'
              type='email'
              required=''
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className='mb-3'>
            <label>Password</label>
            <input
              required=''
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className='form-control'
              type='password'
            />
          </div>
          <div className='mb-3' style={{ marginTop: 30 }}>

            <button onClick={ResetPassword} style={styles.signinButton}>
              Reset password
            </button>

          </div>
        </div>
      </div>
    </div>

  )
}

const styles = {
  container: {
    width: 400,
    height: 300,
    padding: 20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    borderColor: '#5C41A8',
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: 'solid',
    boxShadow: '1px 1px 20px 5px #C9C9C9',
  },
  signinButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#5C41A8',
    color: 'white',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
  },
}

export default ForgotPassword;