import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../../store/posts";
import Post from "./Post";
const TimeLine = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts)
    console.log(posts)

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [dispatch])

    const allPosts = Object.values(posts).map(post => {
        return (
            <Post post={post} />
        )
    })

    return (
        <section className="all-posts-container">
            {allPosts}
        </section>
    );
}

export default TimeLine;
