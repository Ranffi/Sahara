import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
    <footer>
  <div className="footer-inner" >
    <section className="footer-item">
      <h1 className = "footer_h1">Sahara</h1>

      <h2 className = "footer_h2">Get Lost <br />in the story.</h2>
    </section>

    <section className="footer-item">
      <h3 className = "footer_h3">Explore</h3>
        <ul className = "footer_ul">
        <Link to="/books"><li className = "footer_li"><ul className = "footer_a"href="#">All Books</ul></li></Link>
        </ul>
    </section>

    <section className="footer-item">

        <h3 className = "footer_h3">Contact us</h3>
        <p className = "footer_p"> <a className = "footer_a" href="#">Sahara@gmail.com</a></p>
        <p className = "footer_p"><a className = "footer_a" href="#">999.333.7777</a></p>

    </section>


    <section className="footer-item">
      <h3 className = "footer_h3"> Follow</h3>
        <ul className = "footer_ul">
          <li className = "footer_li"><a className = "footer_a" href="https://www.instagram.com/" target = "_blank">Instagram</a></li>
          <li className = "footer_li"><a className = "footer_a" href="https://www.facebook.com/" target = "_blank">Twitter</a></li>
          <li className = "footer_li"><a className = "footer_a" href="https://www.LinkedIn.com/" target = "_blank">LinkedIn</a></li>
        </ul>
    </section>


    <section className="footer-item">
        <Link to = "/about"><ul className = "footer_a" href="#" className="footer-button">Next: About</ul></Link>
    </section>
  </div>
    </footer>
    )
}
export default Footer
