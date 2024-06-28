

const Post = ({ post }) => {
    console.log('post made', post)

    const imageOverflow = post.post_images[0]?.url

    return (
        <div className="post-box">

            {/* Left-Side -- profile picture */}
            <div className="profile-picture-container">
                <img className="post-profile-picture" src={post.owner_profile_picture} />
            </div>
            <div>
                <div className="post-header">
                    <div className="post-box-header-info">
                        <p className="user_username">{post.owner_username}</p>
                        <p className="user_at">@{post.owner_at}</p>
                    </div>
                </div>
                <div className="post-box-content">
                    <p className="post-text">{post.text}</p>
                    <div className={"post-image-container"}>
                        <img className="post-image" src={post.post_images[0]?.url} />
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Post;
