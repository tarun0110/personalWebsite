import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import image from '../../img/tarung.jpg';

export const Navbar = ({ auth:{loading, user, isAuthenticated}, logout }) => {
    
    // const adminLinks = (
    //     <ul>
    //         {/* <li><Link to="/profiles">Profiles</Link></li> */}
    //         <li>
    //             <Link to='/allBuses'>All Buses</Link>
    //         </li>
    //         <li>
    //             <Link to='/add-bus'>Add Bus</Link>
    //         </li>
    //         {/* <li>
    //             <Link to='/dashboard'>Dashboard</Link>
    //         </li> */}
    //         <li>
    //             <a onClick={logout}>
    //                 <i class='fas fa-sign-out-alt'></i>
    //                 LOGOUT
    //             </a>
    //         </li>
    //     </ul>
    // );
    return (
        <Fragment>
           
             <button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>
            <header id="header">
                <div className="d-flex flex-column">

                <div className="profile">
                    <img src={image} alt="" className="img-fluid rounded-circle" />
                    <h1 className="text-light"><Link to="index.html">Tarun Garg</Link></h1>         
                    <div className="social-links mt-3 text-center">
                    <a href="https://twitter.com/TARUNGA05545749" target="_blank"class="twitter"><i class="fab fa-twitter"></i></a>
                    {/* <a href="#" class="facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="instagram"><i class="fab fa-instagram"></i></a> */}
                    <a href="https://www.linkedin.com/in/tarun-garg-48a526170/" target="_blank"class="linkedin"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                <nav className="nav-menu">
                    <ul>
                    <li><a href="#hero"><i className="bx bx-user"></i> <span>Home</span></a></li>
                    <li><a href="#resume"><i className="bx bx-user"></i> <span>Resume</span></a></li>
                    <li><a href="#projects"><i class="bx bx-server"></i> Projects</a></li>
                    <li><a href="#testimonials"><i class="bx bx-server"></i> Blogs</a></li>
                    <li><a href="#contact"><i class="bx bx-envelope"></i> Contact</a></li>
                    </ul>
                </nav>
                {/* <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button> */}

                </div>
            </header>
            
        </Fragment>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
