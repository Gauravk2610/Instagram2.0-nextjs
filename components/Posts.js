import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import Post from "./Post"

const posts = [
    {
        id: 1,
        username: 'gaurav_konde',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'We are anonymous'
    },
    {
        id: 2,
        username: 'gaurav_konde',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'We are anonymous'
    },
    {
        id: 3,
        username: 'gaurav_konde',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'We are anonymous'
    },
]

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
            setPosts(snapshot.docs)
        })
    , [db])

    return (
        <div className=''>  
            {posts.map(post => (
                <Post 
                    key={post.id} 
                    id={post.id} 
                    username={post.data().username} 
                    userImg={post.data().profileImg} 
                    img={post.data().image} 
                    caption={post.data().caption} 
                />
            ))} 
        </div>
    )
}

export default Posts
