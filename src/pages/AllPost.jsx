import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { useSelector } from 'react-redux'

function AllPost() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const userData = useSelector(state => state.auth.userData);

useEffect(() => {
  if (userData?.$id) {
    appwriteService.getPosts(userData.$id).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    }).finally(() => setLoading(false))
  }
  else {
    setLoading(false); 
  }
}, [userData])
  
  return (
    <div  className='w-full py-12 min-h-screen bg-blue-50 text-blue-900'>
      <Container>
        <h1 className='text-3xl font-bold mb-10 text-center text-blue-800'>All Posts</h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400'></div>
          </div>
        ) : posts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {posts.map((post) => (
              <PostCard 
                key={post.$id}
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                className="transition-transform hover:scale-105 duration-200"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-blue-500 text-lg font-medium">No posts found. Create your first post!</p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPost