import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Fav() {
    const [isLoading, setIsLoading] = useState(false)
    const [saveImage, setsaveImage] = useState([])

    useEffect(() => {
        let id = JSON.parse(localStorage.getItem("id"));
        console.log(id);

        setIsLoading(true)
        fetch('https://picsum.photos/id/0/info')
            .then(response => response.json())
            .then(obj => {
                console.log(obj);
                setsaveImage([...saveImage, obj]);
            })
    }, []);



    return (
        <div>
            <h1>Your Image collection</h1>
            <Link href="/">
                <a>Go to home</a>
            </Link>
            {saveImage.map((img) =>
                <h1 key={img.author}>{img.author}</h1>
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