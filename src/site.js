import React, {useState, useEffect } from "react";
import "./site.css";

import github from "./pictures/githubWhite.png";
import linkedin from "./pictures/linkedinWhite.png";
import cLogo from "./pictures/cLogo.png";
import cssLogo from "./pictures/cssLogo.png";
import htmlLogo from "./pictures/htmlLogo.png";
import javaLogo from "./pictures/lavaLogo.png";
import pythonLogo from "./pictures/pythonLogo.png";
import reactLogo from "./pictures/reactLogo.png";
import vbaLogo from "./pictures/vbaLogo.png";
import jsLogo from "./pictures/jsLogo.png";
import snake from "./pictures/Snake.jpeg"
import stock from "./pictures/stock.png"
import spell from "./pictures/spellSC.png"

import { Link } from "react-scroll";
import { useInView } from "react-intersection-observer"

// page elements
function Page3() { 
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
  const experianceScroll = pageHeight * 0.16;
  // projects part of page
  const projectScroll = pageHeight * 0.45;
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
        
    return (
        <div className="page3Contain">
            {/* page contents */}
            <div className="page3text">
                {/* left side of page */} 
                <div className="leftSide">
                    <h1 className="nameTitle">Aidan James</h1>
                    <h2 className="nameText">CS student at Western University</h2>
                    <h3 className="nameBody"> 3rd year computer science student at the University of <span className="colorChange">Western Ontario.</span></h3>

                    {/* navbar items */}
                    <div className="navbar">
                        <Link className="navButton"
                            to="about" // section name
                            smooth={true} // smooth scroll
                            duration={500} // 500ms
                            spy={true} // link is selected when scroll at traget postion
                            offset={-20}
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
                            <b style={textStyleExperiance} className="navExperianceText">EXPERIANCE</b>
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
                        </div>
                    </div>
                </div>

                {/* right side of page */}
                <div className="rightSide">
                    {/* about me section */}
                    <section id="about" className="aboutMe">
                        <b className="aboutMeText">
                            I am 20 years old and have graduated from Northern Collegiate with Honours. 
                            I am currently attending 
                        </b>
                        <span className="aboutMeTextColor"> Western University</span>
                        <b className="aboutMeText">
                            , and am a third-year majoring in 
                        </b>
                        <span className="aboutMeTextColor"> Honors Computer Science </span> 
                        <b className="aboutMeText">
                            with a minor in
                        </b> 
                        <span className="aboutMeTextColor"> Software Egineering</span>
                        <b className="aboutMeText">     
                            . I speak English, and French as a second language. 
                            I have played travel hockey and soccer as well as playing multiple 
                            intramural sports such as: volleyball, spikeball, soccer, and golf.
                        </b>
                        <p></p>
                        {/* second paragraph about me */}
                        <b className="aboutMeText">
                            I am experienced with a variety of languages such as: Visual Basic, C, 
                            HTML, CSS, JavaScript, Java, Python, VBA, PHP, SQL, and ARM. As well as the basics of 
                            game development in Unity. Competent with the interworking of computers and am able to assemble desktop PC’s.
                        </b>
                        <p></p>
                        {/* third paragraph about me */}
                        <b className="aboutMeText">
                            When I'm not at my computer or studying, I'm probably at the gym,
                            hanging with friends, or playing golf. 
                        </b>
                    </section>

                    {/* Experiance section */}
                    <section id="experiance" className={`scroll-element ${inView ? 'scroll-effect' : ''}`} ref={ref}>
                        {/* subheading */}
                        <div className="subheadTitleContain">
                            <h1 className="subheadTitle">Experience</h1>
                            <span className="subheadLine"></span>
                        </div>

                        {/* experiance cards */}
                        {/* third experiance */}
                        <div className="experianceCard">
                            <div className="timeline">
                                <b>May 2022 - Aug 2023</b>
                            </div>
                            <div className="textContain">
                                <h2>Lambton Scientific</h2>
                                <h3>Lab Technician</h3>
                                <p>
                                    Handled environmental samples and completed a variety of 
                                    testing on them. Obtained data from sampling software and 
                                    recorded data using excel. Managed database of testing results.
                                    In this role I perfected time management due to the juggling of tasks
                                    as well as cooperation and communication with co-workers.
                                </p>
                            </div>
                        </div>

                        {/* third experiance */}
                        <div className="experianceCard">
                            <div className="timeline">
                                <b>July 2020 - Aug 2021 </b>
                            </div>
                            <div className="textContain">
                                <h2>Metro</h2>
                                <h3>Grocery Clerk</h3>
                                <p>
                                    Helping customers, stocking shelves, receiving deliveries 
                                    from trucks. Making displays, incorporating them to the 
                                    floor and organize floor display layout. Managed inventory, returns, and expired products using 
                                    company software.  
                                </p>
                            </div>
                        </div>

                        {/* third experiance */}
                        <div className="experianceCard">
                            <div className="timeline">
                                <b>Jan 2019 - Aug 2021</b>
                            </div>
                            <div className="textContain">
                                <h2>McDonalds</h2>
                                <h3>Customer Service</h3>
                                <p>
                                    Interact with 100+ customers an hour, take and complete orders 
                                    using POS. Handle money, fulfill returns, organize 
                                    orders, and track order completion time. In this position, 
                                    communication and time management were essential.
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
                                <img className="projectPic" src={stock} alt="stock"></img>
                            </div>
                            <div className="rightSideText">
                                <h1 className="projectTitle">Portfolio Manager</h1>
                                <div className="projectText">
                                    <b>
                                    I developed a website which users can add their stock holdings which are then stored in a database. Then, using Yahoo’s API can track current prices and make profit / loss calculations. This is still a work in progress 
                                    </b>
                                </div>
                                <div className="codingTypes">
                                    <b>Yahoo API</b>
                                    <b>Node JS</b>

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
                                <h1 className="projectTitleL">Snake Game</h1>
                                <div className="projectTextL">
                                    <b>
                                    I replicated the popular online arcade game snake, eating apples 
                                    increases snake’s length by one. The game speed increases and bombs also spawn 
                                    which the player must dodge. This game uses a server to host a chatroom and allows for
                                    muliplayer. 
                                    </b>
                                </div>
                                <div className="codingTypes">
                                    <b>Python</b>
                                    <b>Pygame</b>

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
                            <div className="rightSidePic">
                                <img className="projectPic" src={snake} alt="snake"></img>
                            </div>
                        </div>

                        {/* third project */}
                        <div className="projectCard">
                            <div className="leftSidePic">
                                <img className="projectPic" src={spell} alt="spell"></img>
                            </div>
                            <div className="rightSideText">
                                <h1 className="projectTitle">Spell Checker</h1> 
                                <div className="projectText">
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
                    </section>

                    {/* languages secton of page */}
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
                        </div>
                        <div className="gitLinkContainer">
                            <a className="gitLink" target={"_blank"} rel="noreferrer" href="https://github.com/aidanjames97">
                                <span>View more!</span>
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div> 
    );
}

export default Page3;