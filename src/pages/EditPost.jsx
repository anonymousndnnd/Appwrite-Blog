import React, { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post)
          } else {
            navigate('/')
          }
        })
        .finally(() => setLoading(false))
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  return post ? (
    <div className="min-h-screen py-12 bg-blue-50">
      <Container>
        <div className="max-w-4xl mx-auto p-8 bg-white border border-blue-200 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Edit Post</h1>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null
}

export default EditPost