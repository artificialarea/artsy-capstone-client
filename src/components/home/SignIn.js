import { useState } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserService from '../../services/user-service'
import AuthApiService from '../../services/auth-api-service'

export default function SignIn(props){
    const [login, set] = useState(true)

    return(
        <>
            <nav role="navigation">
                <ul className="nav__links">
                    <li aria-label="About"><Link to='/'><span className="logo--solo">artsy</span></Link></li>
                </ul>
            </nav>
            {login ?    
            <Login 
                history={props.history} 
                set={set}
            /> 
            : 
            <Register 
                history={props.history} 
                set={set}
            />
            }
        </>
    )
}


const Login = (props) => {
    const [form, setForm] = useState({}) 
    const [error, setError] = useState(null)

    const updateForm = e => {
        e.preventDefault()
        const {id, value} = e.target

        setForm({...form, [id]: value})
    }

    const handleSubmitJwtAuth = e => {  
        e.preventDefault()
        const { username, password } = form

        AuthApiService.postLogin({
            username: username,
            pwd: password
        })
            .then(res => {
                setForm({})
                setError(null)
                UserService.saveUser(res)
                TokenService.saveAuthToken(res.authToken)
                handleLoginSuccess();
            })
            .catch(res => {
                return setError(res.error)
            })
    }

    const handleLoginSuccess = () => {
        props.history.push('/feed/home')
    }
    
    return(
        <main>
            <div className="signin login">
                <h1>Login</h1>
                <div className="signin__postscript">
                    <p>Don't have an account?</p>
                    <button className='signin__buttonlink' onClick={() => props.set(false)}>Register</button> 
                </div>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={e => handleSubmitJwtAuth(e)}>
                    <div className="inputgroup">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="input" placeholder="" onChange={e => updateForm(e)} required />
                    </div>
                    <div className="inputgroup">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="input" placeholder="" onChange={e => updateForm(e)} required />
                    </div>
                    <div className="signin__postscript signin__postscript--demo">
                        <p>Demo account available</p>
                        <span className="demo__account"><p><span className="demo--username">demo</span> / <span className="demo--username">Passw0rd!</span></p></span>
                    </div>
                    <div className="input__actions">
                        <input type='submit' className="button" value='Submit' />
                    </div>
                </form>
                
            </div>
        </main>
    )
}

const Register = (props) => {
    const [form, setForm] = useState({})
    const [error, setError] = useState(null)
    
    const updateForm = e => {
        e.preventDefault()
        const {id, value} = e.target

        setForm({...form, [id]: value})
    }

    const submitRegister = e => {
        e.preventDefault()
        const { username, password, email } = form
        
        if(error){ //only submits if error is false
            setError('cannot submit until password matches')
        }else{
            AuthApiService.postUser({
                username: username,
                pwd: password,
                email: email,
            })
                .then(user => {
                    setForm({})
                    setError(null)
                    props.history.push('/feed/home') 
                })
                .catch(res => {
                    setError(res.error)
                })
        }
    }

    const ConfirmPassword = e => {
        e.preventDefault()
        const {value} = e.target

        if(value !== form.password){
            setError('password does not match')
            
        }else{
            setError(null)
        }
    }

    return(
        <main>
            <div className="signin register">
                <h1>Register</h1>
                {error && <p className='error'>{error}</p>}
                <div className="signin__postscript">
                    <p>Already have an account?</p>
                    <button className='signin__buttonlink' onClick={() => props.set(true)}>Login</button> 
                </div>
                <form onSubmit={e => submitRegister(e)}>
                        <div className="inputgroup">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" className="input" placeholder="" onChange={e => updateForm(e)} required />
                        </div>
                        <div className="inputgroup">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" className="input" placeholder="" onChange={e => updateForm(e)} required />
                        </div>
                        <div className="inputgroup">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" className="input" placeholder="" onChange={e => updateForm(e)} required />
                        </div>
                        <div className="inputgroup">
                            <label htmlFor="re-password">Confirm Password</label>
                            <input type="password" id="re-password" className="input" placeholder="" onChange={e => ConfirmPassword(e)} required />
                        </div>

                        <div className="input__actions">
                            <input type='submit' className="button" value='Submit' />
                        </div>
                </form>
                
            </div>
        </main>
    )
}
