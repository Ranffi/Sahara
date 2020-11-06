import React from 'react'

const About = () => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <section>
        <div className="w3-row w3-padding-64" id="about">
    <div className="w3-col m6 w3-padding-large w3-hide-small">
     <img src="janko-ferlic-sfL_QOnmy00-unsplash.jpg" className="w3-round w3-image w3-opacity-min" alt="Table Setting" width="600" height="750" />
    </div>

    <div className="w3-col m6 w3-padding-large">
      <h1 className="w3-center">About Us</h1><br />
      <h5 className="w3-center">Sahara</h5>
      <p className="w3-large">Here at Sahara we believe that today’s readers are tomorrow’s leaders. We strive to aid our future leaders and equip them with a wealth of knowledge. We provide a convenient and affordable way to obtain the world’s greatest books from all across the global. </p>
      <p className="w3-large w3-text-grey w3-hide-medium">Founded by 4 software developers with a passion for reading, Sahara promises to deliever the most competeive prices for the best reads </p>
    </div>
        </div>

    <div className="w3-row-padding w3-grayscale">
    <h3 className="w3-center">Meet The Team</h3>
  <br />
    <div className="w3-col l3 m6 w3-margin-bottom">
    <img className= "smallSize"src="https://ca.slack-edge.com/T024FPYBQ-U016NB9TPJP-de122ddb456f-512" alt="John" />
      <h3>John Cook</h3>
      <p className="w3-opacity">Co-Founder</p>
    </div>
    <div className="w3-col l3 m6 w3-margin-bottom">
    <img className= "smallSize"src="https://ca.slack-edge.com/T024FPYBQ-U016GMDRU5T-0dfcc04ddcb1-512" alt="John" />
    <h3>Anton Preku</h3>
      <p className="w3-opacity">Co-Founder</p>
    </div>
    <div className="w3-col l3 m6 w3-margin-bottom">
    <img className= "smallSize"src="https://ca.slack-edge.com/T024FPYBQ-U016WMGBV6D-cf2d5d778c4b-512" alt="John" />
    <h3>James Amato</h3>
      <p className="w3-opacity">Co-Founder</p>
    </div>
    <div className="w3-col l3 m6 w3-margin-bottom">
    <img className= "smallSize"src="https://ca.slack-edge.com/T024FPYBQ-U016GMDMFC5-80a769ab3f15-512" alt="John" />
    <h3>Ranffi Ramirez</h3>
      <p className="w3-opacity">Co-Founder</p>
    </div>
    </div>


        </section>
    )
}

export default About
