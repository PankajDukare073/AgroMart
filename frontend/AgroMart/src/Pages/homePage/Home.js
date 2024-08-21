import homeImg from "../../images/bgimg2.jpg"
import "./home.css"
import { useNavigate } from "react-router-dom"
const Home = () => {

    const navigate = useNavigate()
    const loginUser = () => {
        navigate('/signin')
    }
    const SignupUser = () => {
        navigate('/signup')
    }
    const RegisterRest = () => {
        navigate('/registerDeliveryBoy')
    }
    return (
        <div className="container-fluid"
            style={{
                backgroundImage: `url(${homeImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>

            <div class="nav">
                <nav className="navbar navbar-expand-lg">
                    <ul className='navbar-nav float-right  mb-2 mb-lg-0'>
                        <li className='nav-item '>
                            <button className="btn" onClick={loginUser} >
                                Login
                            </button>
                        </li>
                        <li className='nav-item' class="d">
                            <button className="btn" onClick={SignupUser} >
                                Sign Up
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="p">
                <div className="row">
                    <div className="col col-6" >
                        <div className="foodi">Welcome to</div>
                        <div className="logo1"><b>AgroMart</b></div>
                        <div className="text1">
                            <p>AgroMart is an all-in-one system for managing a fertilizer shop. It simplifies tasks like inventory tracking,
processing orders, and working with farmers. The system provides real-time data to help shop owners make better
decisions and manage farmer bills. It also makes delivery smoother and helps farmers easily track their orders.</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default Home;