import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
export default function Home({ data }) {

  const [idImage, setIdImage] = useState([]);

  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget)
    event.preventDefault();

    //check if exist
    let exist = idImage.find(item => item.id === data.get('idImage'));
    if (!exist || idImage.length == 0) {
      let item = { id: data.get('idImage') }
      setIdImage([...idImage, item]);
    }


  };

  useEffect(() => {
    // storing input name
    localStorage.setItem("id", JSON.stringify(idImage));
    console.log(JSON.parse(localStorage.getItem("id")));

  }, [idImage]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          data.map((img) =>
            <div key={img.id}>
              <Image src={img.download_url} alt={img.author} width={img.width} height={img.height}></Image>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={img.id}
                  name="idImage"
                  readOnly
                />
                <input type="submit" value="Add this image"></input>
              </form>
            </div>
          )
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://picsum.photos/v2/list?page=2&limit=1`)
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}