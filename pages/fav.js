import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Fav() {

    const [saveImage, setsaveImage] = useState([])

    useEffect(() => {
        let id = JSON.parse(localStorage.getItem("id"));

        function fetchImageSaved() {
            let images = [];
            id.forEach(element => {
                fetch('https://picsum.photos/id/' + element.id + '/info')
                    .then(response => response.json())
                    .then(obj => {
                        images.push(obj);
                    })
            });
            images.forEach(element => {
                setsaveImage(...saveImage, element)
            })
        }

        fetchImageSaved()

    }, []);

    return (
        <div>
            <div className='header'>
                <h1>Your Image collection</h1>
                <Link href="/">
                    <a>Go to home</a>
                </Link>
            </div>
            {saveImage.map((img) =>
                <div key={img.id} >
                    <h1 >{img.author}</h1>
                    <Image
                        id={img.id}
                        className='random-image'
                        src={img.download_url + ".webp"}
                        alt={img.author}
                        width={600}
                        height={450}
                    ></Image>
                </div>


            )
            }
        </div>


    )



}

// export async function getServerSideProps(context) {
//     // Fetch data from external API
//     const res = await fetch(`https://picsum.photos/id/`)
//     const data = await res.json()
//     // Pass data to the page via props
//     return { props: { data } }
// }