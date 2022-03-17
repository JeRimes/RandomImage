import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Fav() {

    const [saveImage, setsaveImage] = useState([])

    useEffect(() => {

        let id = JSON.parse(localStorage.getItem("id"));
        console.log(id);
        async function fetchSymbols() {
            if (id != null) {
                const symbols = [];
                await id.forEach(element => {
                    fetch('https://picsum.photos/id/' + element.id + '/info')
                        .then(response => response.json())
                        .then(obj => {

                            let img = {
                                id: obj.id,
                                download_url: obj.download_url,
                                author: obj.author
                            }
                            symbols.push(img);
                        })
                });
                console.log(symbols);
                symbols.forEach((element) => {

                    console.log(element);
                    setsaveImage(...saveImage, element);
                }
                )

            }

        }
        fetchSymbols();
        console.log(saveImage);
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

                <Image
                    key={img.id}
                    id={img.id}
                    className='random-image'
                    src={img.download_url + ".webp"}
                    alt={img.author}
                    width={600}
                    height={450}
                ></Image>

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