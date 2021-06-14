import React, { Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getBlogById } from '../../actions/blog';
import { Link } from 'react-router-dom';
import image from '../../img/tarung.jpg';
import ReactGa from 'react-ga';


const Blog = ({match, blog,getBlogById}) => {

    useEffect(() => {
        getBlogById(match.params.id)
    }, [getBlogById,match.params.id]);

    // console.log(match.params.id);
    const clickHandler = () => {
        ReactGa.event({
            category: 'Blog',
            action: `Blog id ${match.params.id} checked out by user`
        })
    }

    return (
        <Fragment>
            {blog.blog===null || blog.loading ? (<Spinner />): <Fragment>
                <div className="row">
                    <div className="col-3"> <header id="header">
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
                    <li className="active"><Link to="/"  style={{ textDecoration: 'none' }}><i className="bx bx-user"></i> <span>Go Back</span></Link></li>
                    </ul>
                </nav>
                {/* <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button> */}

                </div>
            </header>
           </div>
                    <div className="col-9 container  border" style={{background: 'rgb(240 241 250', borderRadius: '1%', border: '1px solid #d5eaff!important'}} onClick={clickHandler}>
                        <br></br>
                        <span className="d-flex justify-content-center align-items-center"><h3> {blog.blog.blog_name} </h3></span> <br></br>
                        <span><h4>{blog.blog.content}</h4></span><br></br>
                        {/* <span>Deployed at - <h3><a href={`${blog.blog.url_link}`} target="_blank">{project.project.url_link}</a></h3></span><br></br>
                        {project.project.github_link!="" ?<span>Code hosted at - <h3><a href={`${project.project.github_link}`} target="_blank">{project.project.github_link}</a></h3></span> : <></>}<br></br> */}
                   <Link className='btn btn-light my-1 d-flex flex-column justify-content-center align-items-center' style={{background: '#149ddd', borderRadius: '1%', border: '1px solid #d5eaff!important'}}  to='/'>
                            Go Back
                        </Link>
                    </div>
                    
                </div>
           {/* {project._id} */}    
            </Fragment>}
           
        </Fragment>
    )
}

Blog.propTypes = {
    getBlogById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    blog: state.blog
});

export default connect(mapStateToProps, { getBlogById })(Blog)
