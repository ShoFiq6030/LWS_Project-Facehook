import React from 'react'
import PostCard from './PostCard'

function PostList({ posts,dispatch }) {
  return (
    !!posts && posts.map((post) => <PostCard key={post.id} post={post} dispatch={dispatch} />)
  )
}

export default PostList