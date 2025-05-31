import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../style/Home.css";
import jobImg from "../media/jobimg.jpg";
import empimg from "../media/emp.webp";
import joey from "../media/joey.webp"
import pheobe from '../media/pheobe.jpg'
import ross from '../media/ross.webp'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
const Home = () => {
  const nav=useNavigate();
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const aboutRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true });
  const isAboutInView = useInView(aboutRef, { once: true });

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
         const testimonials=[
              {
                name: "Joey Tribbiani",
                role: "Software Engineer",
                text: "Jobxie got me a job faster than I finish a pizza. And believe me, that’s fast. How you doin’? I’m employed now.",
                img:joey
              },
              {
                name: "Pheobe Buffay",
                role: "UI/UX Designer",
                text: "I used to sing 'Smelly Job Hunt' at Central Perk. But thanks to Jobxie, I found my dream gig before the second verse!",
                 img:pheobe
              },
              {
                name: "Ross Geller",
                role: "Full Stack Developer",
                text: "Pivoting my career was easier than moving a couch, thanks to Jobxie. And no dinosaurs were harmed in the process.",
                 img:ross
              },
            ]
  return (
      <>
    <motion.div className="container">
      {/* Welcome Title - Top Section */}
      <motion.div
        ref={titleRef}
        className="Title text-center my-5"
        variants={fadeUp}
        initial="hidden"
        animate={isTitleInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div className="d-flex flex-column align-items-center gap-3">
          <motion.h1
            className="heading"
            whileHover={{
              scale: 1.03,
              textShadow: "0 0 10px rgba(255, 50, 50, 0.8)",
              transition: { duration: 0.3 },
            }}
          >
            !!! Welcome to Jobxie !!!
          </motion.h1>
          <button type="button" className="btn btn-custom1" onClick={()=>nav('/Register')}>
            Get Started
            <i className="bi bi-arrow-right" style={{ color: "gold" }}></i>
          </button>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="row align-items-center me-5  py-4 content-row"
        ref={contentRef}
      >
        <motion.div
          className="col-md-7"
          variants={fadeUp}
          initial="hidden"
          animate={isContentInView ? "visible" : "hidden"}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <figure className="text-center my-5 custom-quote">
            <blockquote className="blockquote">
              <p className="lead fw-bold">
                Bridging the Gap Between What You Know and Where You Want to Be
              </p>
            </blockquote>
            <figcaption className="blockquote-footer mt-3 fs-6 text-light-emphasis">
              Discover jobs tailored to your skills, build stunning resumes in
              minutes, and track your growth — all in one place.
              <br />
              Whether you're a fresher or a pro, <strong>JOBXIE</strong> helps
              you take control of your professional journey with confidence and
              clarity.
            </figcaption>
          </figure>
        </motion.div>

        <motion.div
          className="col-md-5 text-center"
          variants={fadeUp}
          initial="hidden"
          animate={isContentInView ? "visible" : "hidden"}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img
            src={jobImg}
            alt="Jobxie Preview"
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "400px",
              objectFit: "cover",
              marginLeft: "72px",
            }}
          />
        </motion.div>
      </motion.div>

      {/* About Section */}
      <motion.div
        ref={aboutRef}
        className="row align-items-center py-5  me-5  content-row px-4"
        variants={fadeUp}
        initial="hidden"
        animate={isAboutInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: 0.2 }}
       
      >
        {/* Left side - About text */}
        <motion.div className="col-md-6 text-md-start text-center mb-4 mb-md-0 pe-md-5">
          <h2 className="mb-3 ms-5" id="about">
            About Us
          </h2>
          <p className="lead ms-5" id="aboutpara">
            At <strong>Jobxie</strong>, we believe in unlocking every
            individual's true potential. Our platform is designed to bridge the
            gap between talent and opportunity by offering personalized job
            matches, effortless resume building, and smart progress tracking
            tools. Whether you're just starting out or advancing your career,
            Jobxie equips you with everything you need to succeed in today's
            competitive job market. Join us in reshaping the way you discover,
            apply, and grow professionally.
          </p>
        </motion.div>

        {/* Right side - Image */}
        <motion.div className="col-md-6 text-center ps-md-5" id="aboutimg">
          <img
            src={empimg}
            alt="Emp Preview"
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "400px",
              objectFit: "cover",
              marginLeft: "106px",
            }}
          />
        </motion.div>

        <motion.div className="d-flex flex-column align-items-center gap-3">
          {/* Features Section */}
          <motion.div
            className="row g-4 p-5 mb-5 px-3"
            id="feature-item"
            style={{ marginTop: "10rem", marginLeft: "5rem" }}
            ref={aboutRef}
            variants={fadeUp}
            initial="hidden"
            animate={isAboutInView ? "visible" : "hidden"}
            transition={{ duration: 2, delay: 1 }}
          >
            <h2 className="mb-3 ms-5 text-center w-100" id="features-title">
              Features
            </h2>

            {/* Feature Cards */}
            <motion.div
              className="col-md-6"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <motion.div className="feature-item p-4 rounded shadow text-center bg-light h-100">
                <i className="bi bi-person-video3 text-primary fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">AI Interview Coach</h5>
                <p className="text-muted">
                  Practice with realistic mock interviews and get instant
                  AI-driven feedback to improve your confidence and performance.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="col-md-6"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <motion.div className="feature-item p-4 rounded shadow text-center bg-light h-100">
                <i className="bi bi-graph-up-arrow text-success fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">Track Your Career Growth</h5>
                <p className="text-muted">
                  Monitor job applications, interviews, and progress — all in
                  one streamlined dashboard.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="col-md-6"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <motion.div className="feature-item p-4 rounded shadow text-center bg-light h-100">
                <i className="bi bi-briefcase-fill text-warning fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">Personalized Job Matching</h5>
                <p className="text-muted">
                  Receive job suggestions based on your skills, interests, and
                  career goals — no spam, just real opportunities.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="col-md-6"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <motion.div className="feature-item p-4 rounded shadow text-center bg-light h-100">
                <i className="bi bi-lightning-fill text-danger fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">Quick Apply System</h5>
                <p className="text-muted">
                  Apply to jobs instantly using your saved profile — no more
                  filling out forms repeatedly.
                </p>
              </motion.div>
            </motion.div>
            {/* Get Started Button Below Features */}
            <motion.div
              className="my-5 ms-5 p-3  text-center"
              ref={aboutRef}
              variants={fadeUp}
              initial="hidden"
              animate={isAboutInView ? "visible" : "hidden"}
              transition={{ duration: 2, delay: 1 }}
            >
              <button type="button" className="btn btn-custom2" onClick={()=>nav('/Register')}>
                Get Started
                <i className="bi bi-arrow-right" style={{ color: "gold" }}></i>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.h2
        id="features-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginLeft: "4rem" }}
      >
        Our Services
      </motion.h2>

      <div className="container mt-5">
        <div className="row ">
          {[
            {
              icon: "bi bi-briefcase",
              title: "Smart Job Finder",
              desc: "Find jobs tailored to your skills using intelligent filtering and personalized recommendations.",
            },
            {
              icon: "bi bi-person-badge",
              title: "Resume Builder",
              desc: "Craft professional resumes instantly with our pre-designed templates and easy editor.",
            },
            {
              icon: "bi bi-lightbulb",
              title: "Skill Tracker",
              desc: "Track and showcase your core competencies to stand out to recruiters.",
            },
            {
              icon: "bi bi-speedometer2",
              title: "Career Dashboard",
              desc: "A centralized place to manage job applications, resumes, and your progress.",
            },
            {
              icon: "bi bi-journal-code",
              title: "Skill Assessments",
              desc: "Quickly test your abilities and boost your credibility with employers.",
            },
            {
              icon: "bi bi-people",
              title: "Professional Network",
              desc: "Connect with peers, mentors, and recruiters to grow your opportunities.",
            },
          ].map((item, i) => (
            <motion.div
              className="col-lg-4 col-md-6 mb-4"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div id="feature-item" className="h-100 text-center">
                <div className="mb-3">
                  <i className={`${item.icon} display-5`}></i>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div 
      variants={fadeUp}
        initial="hidden"
        animate='visible'
        transition={{ duration: 0.8, delay: 0.2 }}
      className="container mt-5 ">
        <div className="col">
          <div className="row my-3 ms-3 mt-2">
            {" "}
            <h2 className="mb-3 ms-5 text-center w-80" id="features-title">
              What Our Users Say
            </h2>
          </div>
          <div className="row my-3 ms-5 mt-2">

           <Swiper
           spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{delay:4000}}
            pagination={{clickable:true}}
            modules={[Autoplay,Pagination]}>
            {testimonials.map((t,i)=>(
                 <SwiperSlide key={i}>
      <motion.div 
     variants={fadeUp}
        initial="hidden"
       animate='visible'
        transition={{ duration: 0.8, delay: 0.2 }}
      
      className="testimonial-card text-center p-4 rounded shadow mx-auto" style={{ maxWidth: "600px" }}>
        <img
          src={t.img}
          alt={t.name}
          className="rounded-circle mb-3"
          style={{ width: "15rem", height: "15rem", objectFit: "cover" }}
        />
        <h5 className="fw-bold">{t.name}</h5>
        <p className="text-muted fst-italic">{t.role}</p>
        <p className="mt-3">“{t.text}”</p>
      </motion.div>
    </SwiperSlide>
            ))}
           </Swiper>
          </div>
        </div>
      </motion.div>
      <div className="container py-5" id="contact">
  <h2 className="text-center mb-5">Contact Us</h2>

  {/* Contact Info Cards */}
  <motion.div 
    variants={fadeUp}
        initial="hidden"
      animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}
  className="row text-center mb-5">
    <div className="col-md-4 mb-4">
      <div className="testimonial-card h-100">
        <i className="bi bi-geo-alt-fill fs-1 mb-3 text-primary"></i>
        <h5>Address</h5>
        <p className="text-muted">123 Main Street, New Delhi, India</p>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="testimonial-card h-100">
        <i className="bi bi-envelope-fill fs-1 mb-3 text-danger"></i>
        <h5>Email</h5>
        <p className="text-muted">support@example.com</p>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="testimonial-card h-100">
        <i className="bi bi-clock-fill fs-1 mb-3 text-success"></i>
        <h5>Hours</h5>
        <p className="text-muted">Mon–Fri: 9am–6pm<br />Sat: 10am–2pm</p>
      </div>
    </div>
  </motion.div>

  {/* Contact Form */}
  <motion.div
  variants={fadeUp}
        initial="hidden"
     animate="visible"

        transition={{ duration: 0.8, delay: 0.2 }}
           className="row justify-content-center mb-5">
    <div className="col-md-8">
      <div className="card p-4 shadow-sm border-0">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
      </div>
    </div>
  </motion.div>

  {/* Google Map */}
  <div className="row justify-content-center ms-5">
    <div className="col-12">
      <div className="map-container ratio ratio-16x9">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.0853301939133!2d77.20902127532968!3d28.591828975686364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26ac8f8ed91%3A0x6623e2573903dc33!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1682258580192!5m2!1sen!2sin"
       
       
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Location"
        ></iframe>
      </div>
    </div>
  </div>
</div>


    </motion.div>
    
<footer className="bg-dark text-light pt-5 pb-4 " >
  <div className="container text-center text-md-start">
    <div className="row text-center text-md-start">
 
      <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">YourBrand</h5>
        <p>
          Bringing you the best solutions with love & expertise. We’re here to make your life easier and smarter.
        </p>
      </div>

      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">Links</h5>
        <p><a href="#home" className="text-light text-decoration-none">Home</a></p>
        <p><a href="#services" className="text-light text-decoration-none">Services</a></p>
        <p><a href="#contact" className="text-light text-decoration-none">Contact</a></p>
        <p><a href="#about" className="text-light text-decoration-none">About</a></p>
      </div>


      <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">Contact</h5>
        <p><i className="bi bi-geo-alt-fill me-2"></i> 123 Main Street, New Delhi, India</p>
        <p><i className="bi bi-envelope-fill me-2"></i> support@example.com</p>
        <p><i className="bi bi-phone-fill me-2"></i> +91 9876543210</p>
        <p><i className="bi bi-clock-fill me-2"></i> Mon–Fri: 9am–6pm</p>
      </div>


      <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3">
        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">Follow Us</h5>
        <a href="#" className="text-light me-4"><i className="bi bi-facebook"></i></a>
        <a href="#" className="text-light me-4"><i className="bi bi-twitter-x"></i></a>
        <a href="#" className="text-light me-4"><i className="bi bi-instagram"></i></a>
        <a href="#" className="text-light me-4"><i className="bi bi-linkedin"></i></a>
      </div>
    </div>


    <hr className="my-4 text-light" />
    <div className="row">
      <div className="col-md-7 col-lg-8">
        <p>© 2025 YourBrand. All Rights Reserved.</p>
      </div>
      <div className="col-md-5 col-lg-4 text-md-end">
        <p>Designed by <span className="text-primary">Viraj</span></p>
      </div>
    </div>
  </div>
</footer>
 </>
  );
 
};

export default Home;
