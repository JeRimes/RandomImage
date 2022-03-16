import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function Home() {

    useEffect(() => {
        let id = JSON.parse(localStorage.getItem("id"));
        console.log(id);
    }, []);

    return (
        <div>
            <h1>Your Image collection</h1>
            <Link href="/">
                <a>Go to home</a>
            </Link>
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