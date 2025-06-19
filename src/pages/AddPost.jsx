import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-12 bg-blue-50 min-h-screen'>
      <Container>
        <div className='max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-blue-200'>
          <h1 className='text-3xl font-bold text-blue-800 mb-6 text-center'>Create New Post</h1>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost