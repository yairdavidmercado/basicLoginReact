import { useRef, useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
const Login = () => {

    const emailRef = useRef()
    const errRef = useRef()
    const [email, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const dispach = useDispatch()

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let values = {email: email, password: pwd}
            const userData = await login(values).unwrap()
            dispach(setCredentials({...userData, email}))
            setUser('')
            setPwd('')
            navigate('/welcome')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err?.response?.status === 400) {
                setErrMsg('Missing email or password')
            } else if (err?.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }

            errRef.current.focus()
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)
    
    const content = isLoading ? <h1>Loading</h1> : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offcreen"}></p>
            <h1>Employed Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email:</label>
                <input
                    type="text"
                    id="email"
                    ref={emailRef}
                    value={email}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                 />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={pwd}
                    required
                 />
                 <button>Sign In</button>
            </form>
        </section>
    )
    return content
}
export default Login