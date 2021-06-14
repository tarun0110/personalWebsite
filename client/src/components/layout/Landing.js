import React, { Fragment,useEffect,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import image from '../../img/tarung.jpg';
import { getProjects } from '../../actions/project';
import { getEducations } from '../../actions/education';
import { postQuestion } from '../../actions/question';
import { getBlogs } from '../../actions/blog';
import { getProjectById } from '../../actions/project';
// import ScriptTag from 'react-script-tag';

export const Landing = ({ isAuthenticated, getProjects, projects, getEducations, educations, postQuestion, 
  getBlogs, blogs, getProjectById }) => {
    useEffect(() => {
        getProjects();
        getEducations();
        getBlogs();
    }, []);
    
    const [formData, setFormData] = useState({
        visitor_name:'',
        question_from: '',
        subject: '',
        content_question: ''
    });

    const {
        visitor_name,
        question_from,
        subject,
        content_question,
    } = formData;

    

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
        const onSubmit = e => {
            e.preventDefault();
            postQuestion(formData);
        };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }
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
                    <li ><a href="#hero"  style={{ textDecoration: 'none' }}><i className="bx bx-user"></i> <span>Home</span></a></li>
                    <li><a href="#resume"  style={{ textDecoration: 'none' }}><i className="bx bx-user"></i> <span>Resume</span></a></li>
                    <li><a href="#projects" style={{ textDecoration: 'none' }}><i class="bx bx-server"></i> Projects</a></li>
                    <li><a href="#testimonials" style={{ textDecoration: 'none' }}><i class="bx bx-server"></i> Blogs</a></li>
                    <li><a href="#contact" style={{ textDecoration: 'none' }}><i class="bx bx-envelope"></i> Contact</a></li>
                    </ul>
                </nav>
                {/* <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button> */}

                </div>
            </header>
            
            {/* <ScriptTag type="text/javascript" src="../../main.js" /> */}
           <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
                <div className="hero-container" data-aos="fade-in">
                <p>Hi! Thanks for visiting my space. </p>
                <span style={{color: 'white'}}>I'm</span>
                <h1>Tarun Garg</h1>
                {/* <p>I'm <span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer"></span></p> */}
                <p style={{marginBottom: '0%'}}>I love PIZZA, Cricket and F. R. I. E. N. D. S </p>
                <span style={{color: 'white'}}>and a <em> Software Developer</em> by Profession</span>
                </div>
            </section>
            <main id="main">
    {/* <section id="about" className="about">
      <div className="container">

        <div className="section-title">
          <h2>About</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>

        <div className="row">
          <div className="col-lg-4" data-aos="fade-right">
            <img src="../../img/profile-img.jpg" className="img-fluid" alt=""/>
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
            <h3>UI/UX Designer &amp; Web Developer.</h3>
            <p className="font-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="icofont-rounded-right"></i> <strong>Birthday:</strong> 1 May 1995</li>
                  <li><i className="icofont-rounded-right"></i> <strong>Website:</strong> www.example.com</li>
                  <li><i className="icofont-rounded-right"></i> <strong>Phone:</strong> +123 456 7890</li>
                  <li><i className="icofont-rounded-right"></i> <strong>City:</strong> City : New York, USA</li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="icofont-rounded-right"></i> <strong>Age:</strong> 30</li>
                  <li><i className="icofont-rounded-right"></i> <strong>Degree:</strong> Master</li>
                  <li><i className="icofont-rounded-right"></i> <strong>PhEmailone:</strong> email@example.com</li>
                  <li><i className="icofont-rounded-right"></i> <strong>Freelance:</strong> Available</li>
                </ul>
              </div>
            </div>
            <p>
              Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis.
              Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque. Aliquid amet quidem ut quaerat cupiditate. Ab et eum qui repellendus omnis culpa magni laudantium dolores.
            </p>
          </div>
        </div>

      </div>
    </section> */}
   <section id="resume" className="resume">
      <div className="container">

        <div className="section-title">
          <h2>Resume</h2>
          <p></p>
        </div>

        <div className="row">
          <div className="col-lg-6" data-aos="fade-up">
            <h3 className="resume-title">Education</h3>
            {educations.length ? educations.map(education => (
             
             <div className="resume-item" key={education._id}>
             <h4>{education.qualification}</h4>
             <h5>{education.year_from.split('-')[0]} - {education.year_to.split('-')[0]}</h5>
             <p><em>{education.school_name}</em></p>
             <p>{education.description}</p>
           </div>
         
             )):  <div className="container d-flex flex-column justify-content-center align-items-center" style={{ background: 'white' }}>No Education Published Yet!</div>}
            
            
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Professional Experience</h3>
            <div className="resume-item">
              <h4>SDE Intern</h4>
              <h5>2021 - Present</h5>
              <p><em>Hyperverge, Bangalore, India </em></p>
              <ul>
                <li>Started my 6 months internship at Hyperverge in may 2021</li>
                <li>Part of the SDE team at Hyperverge</li>
                <li>Fluent in MERN stack </li>
               </ul>
            </div>
            <div className="resume-item">
              <h4>Head Internship Coordinator</h4>
              <h5>2020 - 2021</h5>
              <p><em>IIT Ropar</em></p>
              <ul>
                <li>Leading a team of around 50 people</li>
                <li>Main responsibilities included managing Internship Operations at IIT Ropar for UG students</li>
                <li>Visited Chennai Auto Expo and interacted with around 100 companies to increase outreach of IIT Ropar</li>
                <li>Worked on the TnP Cell's website initative</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
    <section id="projects" className="services">
      <div className="container">

        <div className="section-title">
          <h2>Projects</h2>
         
        </div>

        <div className="row">
            {projects.length ? projects.map(project => (
              <div className="col-lg-6 col-md-6 icon-box zoom" data-aos="fade-up" key={project._id} >
                    <Link to={`/public/project/${project._id}`} style={{ textDecoration: 'none' }}> 
                        <div className="icon"><i className="icofont-computer"></i></div>
                        <h4 className="title"><a href={project.url_link} target="_blank">{project.project_name}</a></h4>
                        <p className="description">{project.description}</p>
                        {/* {project.github_link!="" ? <h5 className="description"><a href={project.github_link} target="_blank">Code Link</a></h5> : <></>} */}
                    </Link>
              </div>
                
            )):  <div className="container d-flex flex-column justify-content-center align-items-center" style={{ background: 'white' }}>Opps! No Projects Published Yet!</div>}
            
        </div>

      </div>
    </section>
    <section id="testimonials" className="testimonials section-bg">
      <div className="container">

        <div className="section-title">
          <h2>Blogs</h2>
          <p>I write sometimes, just to express some thoughts, just a beginner so please don't be harsh on me :)
            I will also put updates on different things here, so stay tunned!
          </p>
        </div>

        <div className=" head-contact-row">
        {blogs.length ? blogs.map(blog => (
              <Link to={`/public/blog/${blog._id}`} style={{ textDecoration: 'none' }}> 
             <div className="testimonial-item zoom" data-aos="fade-up" data-aos-delay="200">
            <p>
              <i className="bx bxs-quote-alt-left quote-icon-left"></i>
              {blog.content.length > 200 ? `${blog.content.substr(0,200)}.......`: blog.content}
              <i className="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <h4>{blog.blog_subject}</h4>
            <br></br>
          </div>
            </Link>
        )): <div className="container d-flex flex-column justify-content-center align-items-center" style={{ background: 'white' }}>Opps! No Blogs Published Yet!</div>}
         


          
{/* 
          <div className="testimonial-item" data-aos="fade-up" data-aos-delay="400">
            <p>
              <i className="bx bxs-quote-alt-left quote-icon-left"></i>
              Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
              <i className="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <img src="assets/img/testimonials/testimonials-5.jpg" className="testimonial-img" alt=""/>
            <h3>John Larson</h3>
            <h4>Entrepreneur</h4>
          </div> */}

        </div>

      </div>
    </section>
    <section id="contact" className="contact">
      <div className="container">

        <div className="section-title">
          <h2>Contact</h2>
          <p>Feel free to reach out to me in case of any queries/ feedback/ bussiness or any other motives.</p>
        </div>

        <div className="row" data-aos="fade-in">

          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="address">
                <i className="icofont-google-map"></i>
                <h4>Location:</h4>
                <p>IIT Ropar Main Campus, Rupnagar, Punjab PIN- 140001, India</p>
              </div>

              <div className="email">
                <i className="icofont-envelope"></i>
                <h4>Email:</h4>
                <p>tarun2018garg@gmail.com</p>
              </div>

              

              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" style={{"border:0; width: 100%; height: 290px;"}} allowfullscreen></iframe> */}
            </div>
          </div>

          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form className='php-email-form' onSubmit={e => onSubmit(e)}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="name">Your Name</label>
                  <input type="text" name="visitor_name" value={visitor_name} onChange={e => onChange(e)} className="form-control" id="name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                  <div className="validate"></div>
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Your Email</label>
                  <input type="email"  name="question_from" value={question_from} onChange={e => onChange(e)} className="form-control" id="email" data-rule="email" data-msg="Please enter a valid email" />
                  <div className="validate"></div>
                </div>
              </div>
              <div className="form-group">
                <label for="name">Subject</label>
                <input type="text" name="subject" value={subject} onChange={e => onChange(e)} className="form-control" id="subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                <div className="validate"></div>
              </div>
              <div className="form-group">
                <label for="name">Message</label>
                <textarea name="content_question" value={content_question} onChange={e => onChange(e)}className="form-control" rows="10" data-rule="required" data-msg="Please write something for us"></textarea>
                <div className="validate"></div>
              </div>
              <div className="mb-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>

              
              <div className="text-center"><input type='submit' className='btn btn-primary my-1' /></div>
            </form>
          </div>

        </div>

      </div>
    </section>

  </main>
        </Fragment>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
    getProjects: PropTypes.func.isRequired,
    getEducations:PropTypes.func.isRequired,
    postQuestion: PropTypes.func.isRequired,
    getBlogs: PropTypes.func.isRequired,
    getProjectById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    projects: state.project.projects,
    educations: state.education.educations,
    blogs: state.blog.blogs
});

export default connect(mapStateToProps,{getProjects, getEducations, postQuestion,getBlogs , getProjectById})(Landing);
