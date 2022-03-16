import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useContext } from 'react';
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext, DarkModeProvider } from '../components/DarkModeContext';



export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Random Image project</title>
        <meta name="description" content="Developp with next.js with lorem picsum api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DarkModeProvider>
        <Content data={data} />
      </DarkModeProvider>

      <footer>
        <p>
          Made by passion ©JeRimes
        </p>
      </footer>
    </div>
  )
}

function Content({ data }) {
  const { darkMode } = useContext(DarkModeContext);
  const [idImage, setIdImage] = useState([]);
  const refScrollContainer = useRef(null);
  const [randomImage, setrandomImage] = useState([])

  function RenderRandomImage() {
    let copy = data.map(object => ({ ...object }));
    let numberMaxImage = 5;
    copy = copy.sort((a, b) => 0.5 - Math.random()).slice(0, numberMaxImage);
    setrandomImage(copy)
  }

  function refreshPage() {
    window.location.reload();
  }

  useEffect(() => {
    RenderRandomImage()
    return () => {
      setrandomImage({});
    };
  }, []);



  const handleClick = (e) => {
    switch (e.detail) {
      case 1:
        AddFav(e.target.id);
        break;
      case 2:
        RemoveFav(e.target.id);
        break;
      default:
        return;
    }
  };

  const AddFav = (idInput) => {
    //check if exist
    let exist = idImage.find(item => item.id === idInput);
    if (!exist || idImage.length == 0) {
      let item = { id: idInput }
      setIdImage([...idImage, item]);
      toast("Image save in collection");
    }
  };
  const RemoveFav = (idInput) => {
    //check if exist
    let exist = idImage.find(item => item.id === idInput);
    if (exist) {
      setIdImage(idImage.filter(item => item.id != idInput));
      toast("Image remove from collection");
    }
  };

  useEffect(() => {
    // async function getLocomotive() {
    //   const Locomotive = (await import("locomotive-scroll")).default;
    //   new Locomotive({
    //     el: refScrollContainer.current,
    //     direction: 'horizontal',
    //     // reloadOnContextChange: true,
    //     touchMultiplier: 2,
    //     smoothMobile: 0,
    //     multiplier: 1.4,
    //     smooth: true,
    //     smartphone: {
    //       smooth: true,
    //       breakpoint: 767
    //     },
    //     tablet: {
    //       smooth: true,
    //       breakpoint: 1024
    //     },
    //   });
    // }
    // getLocomotive();
    let scroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        direction: 'horizontal',
        resetNativeScroll: true,
        reloadOnContextChange: true,
        smartphone: {
          smooth: false,
          // breakpoint: 767
        },


      });
    });

    // `useEffect`'s cleanup phase
    return () => scroll.destroy();
  }, []);

  useEffect(() => {
    // storing input name
    localStorage.setItem("id", JSON.stringify(idImage));
    console.log(JSON.parse(localStorage.getItem("id")));
  }, [idImage]);
  return (

    <div className={darkMode ? 'Container-dark' : 'Container-light'}>
      <main className="main" ref={refScrollContainer} data-scroll-container>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <LitghtSwitch />
        <Link href="/fav" >
          <a className="saved">My collection</a>
        </Link>
        <div className='title' data-scroll-section>
          <h1
            data-scroll

          >1 Click To Save. Double To Remove.</h1>
        </div>
        <div className="card-container">
          {
            randomImage.map((img) =>

              <div key={img.id} className="card-image" data-scroll-section >
                <Image
                  id={img.id}
                  className='random-image'
                  src={img.download_url + ".webp"}
                  alt={img.author}
                  width={600}
                  height={450}
                  data-scroll
                  data-scroll-speed="2"
                  onClick={handleClick}
                ></Image>
                <div className='author'>
                  <h2 data-scroll
                    data-scroll-speed="3"
                  >{img.author}</h2>
                </div>

              </div>

            )
          }
        </div>
        <div className='load-more' data-scroll-section>
          <div>
            <h1 onClick={refreshPage}
            >Load More ?</h1>
          </div>

        </div>

      </main>
    </div>


  )

}

function LitghtSwitch() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const handleClick = () => {
    toggleDarkMode();
    console.log("is darkmode : " + darkMode);
  }

  return (
    <div>
      <div className='light-div'>
        <Image
          alt="Lightswitch on"
          width={100}
          height={100}
          src={darkMode ? "/lightswitch-off.png " : "/lightswitch-on.png"}
          onClick={handleClick} />
      </div>
    </div>
  )

}


export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://picsum.photos/v2/list?limit=10`)
  const data = await res.json()
  // Pass data to the page via props

  return { props: { data } }
}