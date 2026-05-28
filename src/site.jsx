import React, { useState, useEffect, useCallback, memo } from 'react';
import './site.css';

// getting screen width for spot sizes
const viewportWidth = window.innerWidth

// array w/ section
const SECTIONS = ['home', 'about', 'experience', 'projects', 'contact'];

// ramdomizing coorinates and spot sizes
const getRandomPos = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * (100 - 40) + 40,
});

// Breathing Spots for landing and footer
const BackgroundSpots = memo(() => {
    // changing amount of spots for mobile users (less clutter)
    const s = 7
    if (viewportWidth < 768) {
        const s = 4
    }
    const [spots, setSpots] = useState(
        Array.from({ length: s }).map((_, i) => ({
          id: i,
          ...getRandomPos(),
          delay: Math.random() * -10, // Desyncs the animations
        }))
      );
    
      // Function to move a specific spot (called when it's invisible)
      const relocateSpot = useCallback((id) => {
        setSpots((prev) =>
          prev.map((spot) =>
            spot.id === id ? { ...spot, ...getRandomPos() } : spot
        )
    );
}, []);

    return (
        <div className="background-container">
        {spots.map((spot) => (
            <div
            key={spot.id}
            className="bg-spot"
            onAnimationIteration={() => relocateSpot(spot.id)}
            style={{
                width: `${spot.size}px`,
                height: `${spot.size}px`,
                left: `${spot.x}vw`,
                top: `${spot.y}vh`,
                animationDelay: `${spot.delay}s`,
            }}
            />
        ))}
        </div>
    );
});

// full site component
function Site() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const [dateTime, setDateTime] = useState({ time: '', date: '' });
    const [location, setLocation] = useState({ city: 'Locating', lat: null, lon: null });
    const [temp, setTemp] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Cursor logic
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
            const target = event.target;
            // Check if hovering over link/button
            setIsHovering(target.tagName === 'A' || target.closest('a') || target.tagName === 'BUTTON');
        };

        // Navbar observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        const sections = document.querySelectorAll('.page');
        sections.forEach((section) => observer.observe(section));

        window.addEventListener('mousemove', handleMouseMove);

        // Get Date and Time
        const updateDateTime = () => {
            const now = new Date();
            setDateTime({
                time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
            });
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000); // Update every minute

        // Get Location and Temperature
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(prev => ({ ...prev, lat: latitude, lon: longitude }));

                try {
                    // Fetch weather based on coordinates
                    const response = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                    );
                    const data = await response.json();
                    setTemp(data.current_weather.temperature);
                    
                    // Optional: Get city name using "Reverse Geocoding"
                    const geoRes = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const geoData = await geoRes.json();
                    setLocation(prev => ({ ...prev, city: geoData.address.city || geoData.address.town || "Unknown" }));
                } catch (err) {
                    setError("Could not fetch weather data.");
                }
            }, (err) => {
                setError("Location access denied.");
                setLocation({ city: "Location Disabled", lat: null, lon: null });
            });
        } else {
            setError("Geolocation not supported by browser.");
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            sections.forEach((section) => observer.unobserve(section));
            clearInterval(interval);
        };
    }, []);  
  
    return (
        <div className='container'>
            {/* CURSOR */}
            <div className={`cursor-wrapper ${isHovering ? 'hovering' : ''}`}
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
            >
                <div className="cursor-glow"></div>
                <div className="cursor-centre"></div>
            </div>

            {/* Right Side Navbar */}
            <nav className='navbar'>
                {SECTIONS.map((section) => (
                    <a 
                        key={section} 
                        href={`#${section}`} 
                        className={`nav-item ${activeSection === section ? 'active' : ''}`}
                    >
                        {section}
                    </a>
                ))}
            </nav>

            <div className='content'>
            {/* Landing */}
            <section className="page" id="home">
                <BackgroundSpots />
                <div className="info-display">
                    <div className="time-group">
                        <b>{dateTime.date}</b>
                        <h2>{dateTime.time}</h2>
                    </div>
                    <div className="weather-group">
                        <b>{location.city}</b>
                        {temp !== null ? (
                            <pre className="temp"> - {temp}°C</pre>
                        ) : (
                            <b>{error ? error : ""}</b>
                        )}
                    </div>
                </div>

                <div className='landingContainer'>
                    <b>Hey, I'm <span className="lightText">Aidan</span></b>
                    <b>I'm a <span className="lightText">business analytics</span> student at Ivey Business School</b>
                    <b className='currently'>Incoming Data Analyst at <span className='lightText'>Scotiabank</span></b>
                </div>
            </section>

            {/* About */}
            <section className="page" id='about'>
                <h1 className='bg-text'>About me</h1>
                <div className='aboutContainer'>
                    <div className='image'>
                        <img src='me.png' alt="Aidan" />
                    </div>
                    <div className='text'>
                        <div>
                            <h1>EDUCATION</h1>
                            <h2 className='default'>Bachelors of Science, Computer Science @ Western University</h2>
                            <h2 className='default'>Masters of Science, Business Analytics @ Ivey Business School</h2>
                            <h2 className='mobile'>BSc Computer Science @ UWO</h2>
                            <h2 className='mobile'>MSc Business Analytics @ Ivey</h2>
                        </div>

                        <div>
                            <h1>LOCATION</h1>
                            <h2>London, Ontario</h2>
                        </div>

                        <div>
                            <h1>PERSONAL INTERESTS</h1>
                            <h2>Finance, Tech, Golf, Poker, Working Out</h2>
                        </div>

                        <div>
                            <h1>TECHNICALS</h1>
                            <h2>Excel, Python, R, React, VBA, Java, SQL</h2>
                        </div>

                        <div>
                            <h1>MORE</h1>
                            <h2>
                                I am interested in finance where I apply my technical and analytical knowledge to 
                                assist my investment decisions. I created and implemented operational and governance 
                                changes as a Business Consultant, securing a successful certification audit while also 
                                engineered automated models to drive efficiency. My technical background extends to web 
                                development, where I designed and deployed a company’s official website and maintain this site! 
                                Beyond analytics, I co-founded 
                                and scaled the Western University Poker Club to 270 members, where I led executive teams 
                                and managed large-scale event logistics. 
                                I am interested in leveraging strategic insights 
                                and technical innovation to drive impactful business decisions in the fields of finance 
                                and analytics.
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section className="page" id='experience'>
                <h1 className='bg-text'>Experience</h1>

                <div className='experienceContainer'>
                    <div className='rowLine'>
                        <div className='text'>
                            <p><span className='lightText'>Data Analyst</span> - Scotiabank</p>
                            <b className='dateMobile'>MAY 2026 - PRESENT</b>
                            <b>Create and develop a market sentiment indicator surrounding Canadian and US banks. 
                                Analyze retail and analysit sentiment to provide holistic views on banks. Created using
                                a mix of Python, Powerpoint, and AI</b>
                        </div>
                        <b className='date'>MAY 2026 - PRESENT</b>
                    </div>

                    <div className='rowLine'>
                        <div className='text'>
                            <p><span className='lightText'>Investor</span> - Personal</p>
                            <b className='dateMobile'>FEB 2021 - PRESENT</b>
                            <b>
                                Managed personal equity portfolios with a focus on value investing, consistently 
                                outperforming S&P 500 over a 4-year period. Analyzed fundamental and quantitative data 
                                to execute trades while maintaining risk levels.
                            </b>
                        </div>
                        <b className='date'>FEB 2021 - PRESENT</b>
                    </div>

                    <div className='rowLine'>
                        <div className='text'>
                            <p><span className='lightText'>Business Consultant</span> - IEH Laboratories</p>
                            <b className='dateMobile'>NOV 2025 - JAN 2026</b>
                            <b>
                                Determined and implemented comprehensive changes to operations, organization, 
                                and governance making critical decisions to successfully pass a certification 
                                audit. Created and implemented Excel sheets used for HR, Operations, and Admin.
                            </b>
                        </div>
                        <b className='date'>NOV 2025 - JAN 2026</b>
                    </div>

                    <div className='rowLine'>
                        <div className='text'>
                            <p><span className='lightText'>Property Management</span> - Fairwind Farms</p>
                            <b className='dateMobile'>MAY 2025 - AUG 2025</b>
                            <b>
                                Collaborated with team members and solved problems independantly to 
                                streamline operations, resulting in reduced equipment downtime, improved 
                                safety compliance, and yeild maximixation.
                            </b>
                        </div>
                        <b className='date'>MAY 2025 - AUG 2025</b>
                    </div>

                    <div className='rowLine'>
                        <div className='text'>
                            <p><span className='lightText'>Developer</span> - Lambton Scientific</p>
                            <b className='dateMobile'>MAY 2024 - AUG 2024</b>
                            <b>
                                Designed and deployed company’s official website using React and Tailwind CSS, 
                                optimizing SEO to boost Google rankings, increasing site traffic, and driving new 
                                client acquisition. Engineered and refined Excel models to automate chemical 
                                calculations, significantly improving internal workflow efficiency and accuracy 
                                of client reports.
                            </b>
                        </div>
                        <b className='date'>MAY 2024 - AUG 2024</b>
                    </div>

                    <div className='rowLine'>
                        <div className='text'>
                            <p><span className='lightText'>Lab Technician</span> - Lambton Scientific</p>
                            <b className='dateMobile'>MAY 2022 - AUG 2023</b>
                            <b>
                                Executed end-to-end preparation and testing of environmental samples while processing 
                                data, ensuring timely reporting for client retention. 
                                Trained and mentored new hires on laboratory safety protocols, reporting standards, 
                                and operational procedures.</b>
                        </div>
                        <b className='date'>MAY 2022 - AUG 2023</b>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section className='page' id='projects'>
                <h1 className='bg-text'>Projects</h1>

                <div className='projectContainer'>
                    <div className='rowLine'>
                        <div className='text'>
                            <p>Company Website - <span className='lightText'>React, SEO, Graphic Design</span></p>
                            <p className='mobileText'>Company Website<span className='lightText'>React, SEO, Graphic Design</span></p>
                            <b>Using React and other desing tools, I created the graphics,  designed the webpage, 
                                took photos, and developed the webpage. I was tasked with creating a new, 
                                modern webpage for Lambton Scientific, check it out at: 
                                <a href='https://www.lambtonscientific.com/' target='_blank'> www.lambtonscientific.com</a></b>

                            <b className='mobileText'>Using React and other tools, I designed and developed a companies webpage. Check it out: 
                            <a href='https://www.lambtonscientific.com/' target='_blank'> www.lambtonscientific.com</a></b>
                        </div>
                        <img src='/site.png' alt='p1'/>
                    </div>

                    <div className='rowLine'>
                        <div className='text'>
                            <p>Golf Tracker - <span className='lightText'>Swift, MapKit, Python</span></p>
                            <p className='mobileText'>Golf Tracker<span className='lightText'>Swift, MapKit, Python</span></p>
                            <b>Since I love to play golf, I decided to create an IOS App which allows users to 
                                track their rounds as well as look at other courses. I scraped the data using Python from
                                an online database. </b>

                            <b className='mobileText'>I love to play golf, so I created an IOS app that allows users to track rounds played. Data was gathered using Python from online sources.</b>
                        </div>
                        <img src='/app.png' alt='p2' />
                    </div>

                    <div className='rowLine'>
                        <div className='text'>
                            <p>Snake Game - <span className='lightText'>Python, Pygame, IP</span></p>
                            <p className='mobileText'>Snake Game<span className='lightText'>Python, Pygame, IP</span></p>
                            <b>I replicated the popular online arcade game snake, eating apples 
                                increases snake’s length by one. The game speed increases and bombs 
                                also spawn which the player must dodge. This game uses a server to host 
                                a chatroom and allows for multiplayer.
                            </b>

                            <b className='mobileText'>An adaptation of the original "Snake" game. The game is hosted on a server which supports multiplayer and chat.</b>
                        </div>
                        <img src='/snake.jpeg' alt='p3' />
                    </div>

                    <div className='rowLine'>
                        <div className='text'>
                            <p>Spell Checker - <span className='lightText'>Java, Jira, Data Structures</span></p>
                            <p className='mobileText'>Spell Checker<span className='lightText'>Java, Jira, Data Structures</span></p>
                            <b>
                                I made a Java program which takes a file and reads the words, checking their spelling, 
                                and giving correction options to the user. To increase efficiency, I created and implemeneted 
                                data structured which reduced compute needs for each operation.
                            </b>
                            <b className='mobileText'>Java program that spell checks a text file and gives correction options. Different data structures used for computational efficiency.</b>
                        </div>
                        <img src='/spellSC.png' alt='p4' />
                    </div>

                    <div className='rowLine'>
                        <div className='text'>
                            <p>NFL Model - <span className='lightText'>Python, Stats, Pandas</span></p>
                            <p className='mobileText'>NFL Model<span className='lightText'>Python, Stats, Pandas</span></p>
                            <b>I built a model that uses Linear Regression and last year's data to predict next year's NFL Champion and their chances.</b>
                            <b className='mobileText'>I built a model that uses Linear Regression and last year's data to predict next year's NFL Champion and their chances.</b>
                        </div>
                        <img src='/mesh.png' alt='p5' />
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className='page' id='contact'>
                <BackgroundSpots />
                <div className='footerContainer'>
                    <div className='titleRow'>
                        <b>Check out my other <span className='lightText'>links</span></b>
                        <img src='arrow.png' alt='arrow' />
                    </div>

                    <div className='footerItems'>
                        <a href='https://www.linkedin.com/in/aidanjames/' target='_blank' rel="noreferrer" className="footer-link-button">
                            <img src='/linkedin.png' alt='linkedin'/>
                            <b>/aidanjames</b>
                        </a>
                        <a href='https://github.com/aidanjames97' target='_blank' rel="noreferrer" className="footer-link-button">
                            <img src='/github.png' alt='github'/>
                            <b>/aidanjames97</b>
                        </a>
                        <a href="mailto:ajames.msc2026@ivey.ca" target='_blank' rel='noreferrer' className="footer-link-button">
                            <img src='/email.png' alt='email'/>
                            <b>ajames.msc2026@ivey.ca</b>
                        </a>
                        <a href="/Resume.pdf" target='_blank' rel='noopener noreferrer' className="footer-link-button">
                            <img src='/document.png' alt='resume'/>
                            <b>Resume</b>
                        </a>
                    </div>
                </div>
            </section>
            </div>
        </div>
    );
} 

export default Site;