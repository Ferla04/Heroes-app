import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const LoginPage = () => {

  const navegate = useNavigate()
  const { login } = useContext( AuthContext )
  
  const handleLogin = () => {
    
    login( 'Fernanda velásquez' )
    
    navegate('/marvel', {
      replace: true
    })
  }

  return (
    <div className="container mt-5">
      <h1>LoginPage</h1>
      <hr/>

      <button 
        className="btn btn-primary"
        onClick={ handleLogin }
      > 
        Login 
      </button>
    </div>
  )
}

export default LoginPage