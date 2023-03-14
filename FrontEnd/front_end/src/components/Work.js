import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import Data from '../assets/data.json';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Work = () => {
    return (
        <div id='work'><hr />
            <h2>WORK</h2>
            <section>
                <article>
                    <Carousel 
                    showArrows={false}
                    showIndicators={false}
                    showThumbs={false}
                    autoPlay={true}
                    interval={2000}
                    showStatus={false}
                    infiniteLoop={true}>
                       {Data.projects.map((i)=>
                       
                        <div key={i.title} className='workItem'>
                            <img src={i.imgSrc} alt={i.title}></img>
                            <aside>
                                <h2>{i.title}</h2>
                                <h3>{i.description} </h3>
                                <a href={i.url}>view Demo</a>
                            </aside>
                        </div>
                       )}
                    </Carousel>
                </article>
            </section>
        </div>
    )
}

export default Work;