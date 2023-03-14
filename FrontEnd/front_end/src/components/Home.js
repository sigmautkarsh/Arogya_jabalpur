import React from 'react';
import { animate, motion } from "framer-motion";
import TypewriterComponent from 'typewriter-effect';
import { BsArrowUpRight, BsChevronDown } from 'react-icons/bs';
import me from '../assets/MohitPort.png';
import { useRef } from 'react';
const Home = () => {
  const projectCount = useRef('');
  const CertificateCountRef = useRef('')
  const animationProject =()=>{
    animate(0,8,{
    duration:1,
    onUpdate:(v)=>{projectCount.current.textContent =v.toFixed()}
    })
  }
  const animationCertificate =()=>{
    animate(0,8,{
    duration:1,
    onUpdate:(v)=>{CertificateCountRef.current.textContent =v.toFixed()}
    })
  }


  return (
    <div id='Home'>
      <section>
        <div>
          <motion.h1 initial={{
            x: "-100%",
            opacity: 0,
          }}
            whileInView={{
              x: '0',
              opacity: 1,
            }}>
            Hey , I am <br />
            MOHIT DUBEY
          </motion.h1>
          I love to learn
          <TypewriterComponent options={{
            strings: ['Web Development', 'Python programing', 'AWS'],
            autoStart: true,
            loop: true,
            wrapperClassName: "typewriter",
          }} />
          <div className='div2'><a href="mailto:mohitdubey1322001@gmail.com"> Hire me </a>
            <a href='#work'>Projects <BsArrowUpRight /></a>
          </div>

        
        <article>
          <p>
            +<motion.span whileInView={animationProject} ref={projectCount}>5</motion.span>
          </p>
          <span>
            projects
          </span>
        </article>
        <aside><article>
          <p>
            +<motion.span whileInView={animationCertificate} ref={CertificateCountRef}>8</motion.span>
          </p>
          <span>
            certificate
          </span>
        </article>
          <article data-specal>
            <p>Contect</p>
            <span>mohitdubey1322001@gmail.com</span>
          </article>

        </aside>
        </div>

      </section>
      <section className='imgHome'>
       {   //   <img src={me} alt="MOhit DUBEY" /> 
       }
 
      </section>
      <BsChevronDown />
    </div>
  )
}

export default Home