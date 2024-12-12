import './About.css'
const About = () => {
  return (
    <div className='About' id='aboutSection'>
      
      <div className="sectionTitle">
        <h1 className='headingH1'>ABOUT ME</h1>
      </div>

      <div className="aboutFrame">
      <div className="aboutText">
        <h1>In Action</h1>
        <p>With a solid foundation in web development, I am creating dynamic and user-centric
          websites and applications. My experience spans across various technologies and frameworks,
          including HTML, CSS, JavaScript, and modern libraries such as React.js.
          <br /> My portfolio showcases a range of projects that demonstrate my ability to craft seamless
          user experiences and responsive designs.
        </p>
      </div>
      <div className="corner1"></div>
      <div className="corner2"></div>
      </div>

      <div className="aboutFrame">
      <div className="aboutText">
      <h1>Future Drive</h1>
        <p>My goal is to pursue a career in web development with a focus on integrating AI techniques. As AI
              continues to reshape industries, I am committed to staying at the forefront of these
              advancements. By combining my web development skills with AI-driven solutions, I aim to create
              innovative and responsive web applications that meet the evolving needs of users and businesses.
        </p>
      </div>
      <div className="corner1"></div>
      <div className="corner2"></div>
      </div>

    </div>
  )
}

export default About