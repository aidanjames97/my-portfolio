import React, {useState, useEffect } from "react"
import "./site.css"

import github from "/githubWhite.png"
import linkedin from "/linkedinWhite.png"
import cLogo from "/cLogo.png"
import cssLogo from "/cssLogo.png"
import htmlLogo from "/htmlLogo.png"
import javaLogo from "/lavaLogo.png"
import pythonLogo from "/pythonLogo.png"
import reactLogo from "/reactLogo.png"
import vbaLogo from "/vbaLogo.png"
import jsLogo from "/jsLogo.png"
import snake from "/Snake.jpeg"
import site from "/site.png"
import spell from "/spellSC.png"
import resume from "/Resume.pdf"
import app from "/app.png"
import cppLogo from "/cppLogo.png"
import swiftLogo from "/swiftLogo.png"
import phpLogo from "/phpLogo.png"
import jsonLogo from "/jsonLogo.png"
import headshot from "/headshot.jpeg"

import { Link } from "react-scroll";
import { useInView } from "react-intersection-observer"

function openPDF() {
    window.open(resume, "_blank");
}

// page elements
function Site() { 
    // hook returns boolean 'inView' and a ref to attach 
    const [ref, inView] = useInView({
        triggerOnce: true, // Only trigger once when the element enters the viewport
        threshold: 0.5, // Trigger when at least 50% of the element is in the viewport
    });

    // State to hold the scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to handle scroll event and update scrollPosition state
  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
  };

  // Attach the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Clean up the scroll event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the page height (you can adjust this based on your layout)
  const pageHeight = document.documentElement.scrollHeight;

  // top of page
  const aboutScroll = 0;
  // experiance part of page
  const experianceScroll = pageHeight * 0.1;
  // projects part of page
  const projectScroll = pageHeight * 0.3;
  // languages part of page
  const languageScroll = pageHeight * 0.66;

  // scroll position for about
  const textColorAbout = (scrollPosition >= aboutScroll) && (scrollPosition < experianceScroll) ? 'rgb(230, 230, 255)' : 'rgb(169, 169, 189)';
  const aboutWeight = (scrollPosition >= aboutScroll) && (scrollPosition < experianceScroll) ? 700 : 500;
  // scroll position for experiance
  const textColorExperiance = (scrollPosition >= experianceScroll) && (scrollPosition < projectScroll) ? 'rgb(230, 230, 255)' : 'rgb(169, 169, 189)';
  const experianceWeight = (scrollPosition >= experianceScroll) && (scrollPosition < projectScroll) ? 700 : 500;
  // scroll position for projects
  const textColorProjects = (scrollPosition >= projectScroll) && (scrollPosition < languageScroll) ? 'rgb(230, 230, 255)' : 'rgb(169, 169, 189)';
  const projectsWeight = (scrollPosition >= projectScroll) && (scrollPosition < languageScroll) ? 700 : 500;
  // scroll position for languages
  const textColorLanguages = scrollPosition >= languageScroll ? 'rgb(230, 230, 255)' : 'rgb(169, 169, 189)';
  const languagesWeight = scrollPosition >= languageScroll ? 700 : 500;

  // applying styling dynamically
  const textStyleAbout = {
    color: textColorAbout,
    fontWeight: aboutWeight,
  };
  const textStyleExperiance = {
    color: textColorExperiance,
    fontWeight: experianceWeight,
  };
  const textStyleProjects = {
    color: textColorProjects,
    fontWeight: projectsWeight,
  };
  const textStyleLanguages = {
    color: textColorLanguages,
    fontWeight: languagesWeight,
  };

  // for init load
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);

    }, 1); // 1ms delay (can be increaed to simulate loading)

    return () => clearTimeout(timeout);
  }, []);
        
    return (
        <div className={`page3Contain ${isLoaded ? 'loaded' : ''}`}>
            {/* page contents */}
            <div className="page3text">
                {/* left side of page */} 
                <div className="leftSide">
                    <div className="picName">
                        <img className="headshot" src={headshot}></img>
                        <div className="leftsideText">
                            <h1 className="nameTitle">Aidan James</h1>
                            <h2 className="nameText">MSc Buisness Analytics 26' Candidate <a href="https://www.ivey.uwo.ca/" target="_blank" className="iveyColor">Ivey Business School</a></h2>
                        </div>
                    </div>
                
                    {/* navbar items */}
                    <div className="navbar">
                        <Link className="navButton"
                            to="about" // section name
                            smooth={true} // smooth scroll
                            duration={500} // 500ms
                            spy={true} // link is selected when scroll at traget postion
                            offset={-100}
                        >
                            <b style={textStyleAbout} className="navAboutText">ABOUT</b>
                            <span style={textStyleAbout} className="navButtonLine"></span>
                        </Link>

                        <Link className="navButton"
                            to="experiance" // section name
                            smooth={true} // smooth scroll
                            duration={500} // 500ms
                            spy={true} // link is selected when scroll at traget postion
                            offset={-20}
                        >
                            <b style={textStyleExperiance} className="navExperianceText">EXPERIENCE</b>
                            <span className="navButtonLine"></span>
                        </Link>
                        <Link className="navButton"
                            to="projects" // section name
                            smooth={true} // smooth scroll
                            duration={500} // 500ms
                            spy={true} // link is selected when scroll at traget postion
                            offset={-20}
                        >
                            <b style={textStyleProjects} className="navProjectsText">PROJECTS</b>
                            <span className="navButtonLine"></span>
                        </Link>
                        <Link className="navButton"
                            to="languages" // section name
                            smooth={true} // smooth scroll
                            duration={500} // 500ms
                            spy={true} // link is selected when scroll at traget postion
                            offset={-20}
                        >
                            <b style={textStyleLanguages} className="navLanguagesText">LANGUAGES</b>
                            <span className="navButtonLine"></span> 
                        </Link>
                        <Link className="navButton"
                            to="contact" // section name
                            smooth={true} // smooth scroll
                            duration={500} // 500ms
                            spy={true} // link is selected when scroll at traget postion
                            offset={-20}
                        >
                            <b style={textStyleLanguages} className="navLanguagesText">CONTACT ME</b> 
                        </Link>

                        {/* socials */}
                        <div className="socialLogo">
                            {/* link to sites and open in new tab */}
                            <a href="http://www.linkedin.com/in/aidanjames/" target="_blank" rel="noreferrer">
                                <img className="logo" src={linkedin} alt="linkedin"></img>
                            </a>
                            <a href="https://github.com/aidanjames97" target="_blank" rel="noreferrer">
                                <img className="logo" src={github} alt="github"></img>
                            </a>
                            <button className="resumeButton" onClick={openPDF}>Resume</button>
                        </div>
                    </div>
                </div>

                {/* right side of page */}
                <div className="rightSide">
                    {/* about me section */}
                    <section id="about" className="aboutMe">
                        <b className="aboutMeText">
                            I am currently pursuing a Master's of Science in   
                        </b>
                        <span style={{color:"#034638"}} className="aboutMeTextColor"> Buisness Analytics </span>

                        <b className="aboutMeText">
                            at
                        </b>
                        <span style={{color:"#034638"}} className="aboutMeTextColor"> Ivey Business School</span>

                        <b className="aboutMeText">
                            , building off of my
                        </b>
                        <span style={{color:"#4F2683"}} className="aboutMeTextColor"> Computer Science </span>

                        <b className="aboutMeText">
                            degree from
                        </b>
                        <span style={{color:"#4F2683"}} className="aboutMeTextColor"> Western University</span>

                        <b className="aboutMeText">
                            . Beyond academics, I am interested in finance where I apply my technical and analytical knowledge to assist my investment decisions.
                        </b>
                         
                        <p></p> 

                        <b className="aboutMeText">
                            I created and implemented operational and governance changes as a Business Consultant, securing a successful certification audit 
                            while also engineered automated models to drive efficiency. My technical background extends to web development, where I designed 
                            and deployed a company’s official website and maintain a this portfolio showcasing my latest coding projects! Beyond analytics, 
                            I co-founded and scaled the Western University Poker Club to 270 members, where I led executive teams and managed large-scale event logistics.
                        </b>

                        <p></p>

                        <b className="aboutMeText">
                            I am interested in leveraging strategic insights and technical innovation to drive impactful business decisions in the fields of 
                            finance and analytics. Learn more about me and my experiance below!
                        </b>
                    </section>

                    {/* Experiance section */}
                    <section id="experiance" className={`scroll-element ${inView ? 'scroll-effect' : ''}`} ref={ref}>
                        {/* subheading */}
                        <div className="subheadTitleContain">
                            <h1 className="subheadTitle">Experience</h1>
                            <span className="subheadLine"></span>
                        </div>

                        {/* most recent experiance */}
                        <div className="experianceCard">
                            <div className="timeline">
                                <b>Dec 2025 - Jan 2026 </b>
                            </div>
                            <div className="textContain">
                                <h2>Business Consultant</h2>
                                <h3>Contracted by Lambton Scientific</h3>
                                <p>
                                    I was contracted to determine and implemente comprehensive changes to operations, organization, and governance 
                                    making critical decisions to successfully pass a certification audit. This involved analyzing audit problem statements
                                    and creating innovative, efficient solutions from them. I also created automated Excel worksheets to calculate chemical formulas, 
                                    expiditing reporting times and reducing errors.
                                </p>
                            </div>
                        </div>

                        {/* experiance card */}
                        <div className="experianceCard">
                            <div className="timeline">
                                <b>July 2025 - Aug 2025 </b>
                            </div>
                            <div className="textContain">
                                <h2>Fairwind Farms</h2>
                                <h3>Property Management</h3>
                                <p>
                                    In this role I: collaborated with team members to ensure instructions clearly communicated to streamline 
                                    operations, resulting in reduced equipment downtime and improved safety compliance. Proactively initiated 
                                    efficiency improvements after analyzing possible risks that directly contributed to cost reductions and 
                                    maximized crop yields.
                                </p>
                            </div>
                        </div>

                        {/* experiance card */}
                        <div className="experianceCard">
                            <div className="timeline">
                                <b>May 2022 - Aug 2024</b>
                            </div>
                            <div className="textContain">
                                <h2>Lambton Scientific</h2>
                                <h3>Lab Tech {'>'} Excel Modelling {'>'} Developer</h3>
                                <p>
                                    In this role I: executed end-to-end preparation and testing of environmental samples while processing data via 
                                    specialized software to ensure timely reporting for client retention. Trained and mentored new hires on laboratory 
                                    safety protocols, reporting standards, and operational procedures. Next, I engineered and refined Excel models to 
                                    automate chemical calculations, significantly improving internal workflow efficiency and accuracy of client reports.
                                    Finally, I Designed and deployed company’s official website using React and Tailwind CSS, optimizing SEO to boost 
                                    Google rankings, increasing site traffic, and driving new client acquisition.
                                </p>
                            </div>
                        </div>

                        {/* experiance card */}
                        <div className="experianceCard">
                            <div className="timeline">
                                <b>July 2020 - Aug 2021 </b>
                            </div>
                            <div className="textContain">
                                <h2>Metro</h2>
                                <h3>Grocery Clerk</h3>
                                <p>
                                    In this role I: assisted customers depending on their needs, 
                                    stocked shelves, receiving and unloaded deliveries from trucks while coordinating 
                                    with inventory. I created displays and incorporated them on the 
                                    floor in an organized and tidy layout. Managed inventory, returns, and expired products using 
                                    company software. In this position communication, time management, and personal responsibility were
                                    crucial as often I would work alone on tasks or had to coordinate with others.
                                </p>
                            </div>
                        </div>

                        {/* experiance card */}
                        <div className="experianceCard">
                            <div className="timeline">
                                <b>Jan 2019 - Aug 2021</b>
                            </div>
                            <div className="textContain">
                                <h2>McDonalds</h2>
                                <h3>Customer Service</h3>
                                <p>
                                    In this role I: interacted and served 100+ customers an hour, taking and completing orders 
                                    using POS. I Handled money, fulfilled returns, organized 
                                    orders, and track order completion time. In this position, 
                                    communication and time management were essential and I developed these skills.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* projects portion of the page */}
                    <section id="projects" className="projectContainer">
                        {/* subheading */}
                        <div className="subheadTitleContain">
                            <span className="subheadLine"></span>
                            <h1 className="subheadTitle">Projects</h1>
                        </div>

                        {/* first project */}
                        <div className="projectCard">
                            <div className="leftSidePic">
                                <img className="projectPic" src={site} alt="site"></img>
                            </div>
                            <div className="rightSideText">
                                <h1 className="projectTitle">Company Website</h1>
                                <div className="projectText">
                                    <b>
                                        Using React and other design tools, I created the graphics, designed the webpage, took photos, and developed the webpage.
                                        I was tasked with creating a new, modern webpage for Lambton Scientific, check it out at:
                                    </b>
                                    <a href="https://www.lambtonscientific.com/"> www.lambtonscientific.com</a>
                                </div>
                                <div className="codingTypes">
                                    <b>React</b>
                                    <b>SEO</b>
                                    <b>Graphic Design</b>

                                    <div className="socialLinkContain">
                                        <a href="http://www.linkedin.com/in/aidanjames/" target="_blank" rel="noreferrer">
                                            <img className="socialLink" src={linkedin} alt="Linkedin"></img>
                                        </a>
                                        <a href="https://github.com/aidanjames97" target="_blank" rel="noreferrer">
                                            <img className="socialLink" src={github} alt="Github"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* second project */}
                        <div className="projectCard">
                            <div className="leftSideText">
                                <h1 className="projectTitle">Snake Game</h1>
                                <div className="projectText">
                                    <b>
                                    I replicated the popular online arcade game snake, eating apples 
                                    increases snake’s length by one. The game speed increases and bombs also spawn 
                                    which the player must dodge. This game uses a server to host a chatroom and allows for
                                    multiplayer. 
                                    </b>
                                </div>
                                <div className="codingTypes">
                                    <b>Python</b>
                                    <b>Pygame</b>
                                    <b>IP</b>

                                    <div className="socialLinks">
                                        <a href="http://www.linkedin.com/in/aidanjames/" target="_blank" rel="noreferrer">
                                            <img className="socialLink" src={linkedin} alt="Linkedin"></img>
                                        </a>
                                        <a href="https://github.com/aidanjames97" target="_blank" rel="noreferrer">
                                            <img className="socialLink" src={github} alt="Github"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="leftSidePic">
                                <img className="projectPic" src={snake} alt="snake"></img>
                            </div>
                        </div>

                        {/* third project */}
                        <div className="projectCard">
                            <div className="leftSidePic">
                                <img className="projectPic" src={app} alt="app"></img>
                            </div>
                            <div className="rightSideText">
                                <h1 className="projectTitle">Golf Tracker</h1>
                                <div className="projectText">
                                    <b>
                                        Since I love to play golf, I decided to create an IOS App which allows
                                        users to track their rounds as well as look at other courses using data I scraped from
                                        an online course database.
                                    </b>
                                </div>
                                <div className="codingTypes">
                                    <b>Swift</b>
                                    <b>MapKit</b>
                                    <b>Python</b>

                                    <div className="socialLinks">
                                        <a href="http://www.linkedin.com/in/aidanjames/" target="_blank" rel="noreferrer">
                                            <img className="socialLink" src={linkedin} alt="Linkedin"></img>
                                        </a>
                                        <a href="https://github.com/aidanjames97" target="_blank" rel="noreferrer">
                                            <img className="socialLink" src={github} alt="Github"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* fourth project */}
                        <div className="projectCard">
                            <div className="leftSideText">
                                <h1 className="projectTitleL">Spell Checker</h1> 
                                <div className="projectTextL">
                                    <b>
                                        For my CS class, Data Structures and Algorithms, we were 
                                        tasked in making a java program which takes a file and reads 
                                        the words, checking their spelling, and giving correction options 
                                        to the user.
                                    </b>
                                </div>
                                <div className="codingTypes">
                                    <b>Java</b>
                                    <b>Data Structures</b>
                                    <b>Jira</b>

                                    <div className="socialLinkContain">
                                        <a href="http://www.linkedin.com/in/aidanjames/" target="_blank" rel="noreferrer">
                                            <img className="socialLink" src={linkedin} alt="Linkedin"></img>
                                        </a>
                                        <a href="https://github.com/aidanjames97" target="_blank" rel="noreferrer">
                                            <img className="socialLink" src={github} alt="Github"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="rightSidePic">
                                <img className="projectPic" src={spell} alt="spell"></img>
                            </div>
                        </div>
                    </section>

                    {/* languages section of page */}
                    <section id="languages" className="languagesContainer">
                        <div className="subheadTitleContain">
                            <h1 className="subheadTitle">Languages</h1>
                            <span className="subheadLine"></span>
                        </div>

                        <div className="languageLogoContainer">
                            <img className="languageLogo" src={cLogo} alt="c"></img>
                            <img className="languageLogo" src={cssLogo} alt="css"></img>    
                            <img className="languageLogo" src={htmlLogo} alt="html"></img>
                            <img className="languageLogo" src={jsLogo} alt="js"></img>
                            <img className="languageLogo" src={javaLogo} alt="java"></img>
                            <img className="languageLogo" src={pythonLogo} alt="python"></img>
                            <img className="languageLogo" src={reactLogo} alt="react"></img>
                            <img className="languageLogo" src={vbaLogo} alt="vba"></img>
                            <img className="languageLogo" src={swiftLogo} alt="swift"></img>
                            <img className="languageLogo" src={cppLogo} alt="cpp"></img>
                            <img className="languageLogo" src={phpLogo} alt="php"></img>
                            <img className="languageLogo" src={jsonLogo} alt="json"></img>
                        </div>
                        <div className="gitLinkContainer">
                            <a className="gitLink" target={"_blank"} rel="noreferrer" href="https://github.com/aidanjames97">
                                <span>View more!</span>
                            </a>
                        </div>
                    </section>

                    {/* contact me section of page */}
                    <section id="contact" className="contactContainer">
                        {/* subheading */}
                        <div className="subheadTitleContain">
                            <span className="subheadLine"></span>
                            <h1 className="subheadTitle">Contact</h1>
                        </div>

                        <div className="contactHeaderText">
                            <a href="mailto:aidan97james@gmail.com?subject=Website%20Question%20">Feel free to contact me with questions or suggestions!</a>
                        </div>
                    </section>
                </div>
            </div>
        </div> 
    );
}
export default Site;
