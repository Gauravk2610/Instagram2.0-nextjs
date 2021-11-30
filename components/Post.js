import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline"
import { 
    HeartIcon as HeartIconFilled
 } from "@heroicons/react/solid"

import { useSession } from 'next-auth/react'
import { useEffect, useState } from "react"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'

function Post({ id, username, userImg, img, caption }) {
    const {data: session} = useSession()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const[hasliked, setHasLiked] = useState(false)

    useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), snapshot => 
        setComments(snapshot.docs)
    ), [db, id])

    useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'), snapshot => 
        setLikes(snapshot.docs)    
    ), [db, id])

    useEffect(() => 
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
    , [likes])

    const likePost = async () => {
        if (hasliked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        } else{
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment(' ')

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()
        })
    }

    return (
        <div className='bg-white my-7 rounded-sm'>
            {/* Header */}
            <div className='flex items-center p-5'>
                <img className="h-12 w-12 rounded-full objec-contain p-1 mr-3 border" src={userImg} alt="" />
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5' />
            </div>
            {/* img */}
            <img className='object-cover w-full' src={img} alt="" />

            {/* Button */}
            {session && 
                <div className='flex justify-between pt-4 px-4'>
                    <div className='flex space-x-4'>
                        {hasliked ? (
                            <HeartIconFilled onClick={likePost} className='btn text-red-500' />
                        ) : (
                            <HeartIcon onClick={likePost} className='btn' />
                        )}
                        <ChatIcon className='btn' />
                        <PaperAirplaneIcon className='btn' />
                    </div>
                    <BookmarkIcon className='btn' />
                </div>
            }

            {/* Caption */}
                <p className='p-5 truncate'>
                    {likes.length > 0 && (
                        <p className='font-bold mb-1'>{likes.length} likes</p>
                    )}
                    <span className='font-bold mr-1' >{username}</span>
                    {caption}
                </p>
            {/* Comments */}
                { comments.length > 0 && (
                    <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                        {comments.map((comment) => (
                            <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                                <img className='h-7 rounded-full' src={comment.data().userImage} alt="" />
                                <p className='text-sm flex-1'><span className='font-bold '>{" "}{comment.data().username}</span>{comment.data().comment}</p>
                                <Moment fromNow className='pr-5 text-xsm'>
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                            </div>
                        ))}
                    </div>
                ) }
            {/* Input box */}
            {session &&
                <form className='flex items-center p-4'>
                    <EmojiHappyIcon className='h-7' />
                    <input className='border-none flex-1 focus:ring-0' value={comment} onChange={e => setComment(e.target.value)} placeholder='Add a comment...' type="text" />
                    <button  type='submit' onClick={sendComment} disabled={!comment.trim()} className='font-semibold text-blue-400 '>Post</button>
                </form>
            }
        </div>
    )
}

export default Post