import React,{useEffect,useState} from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostCard } from '../components'
import { useSelector } from 'react-redux'

function Home() {
  const [posts, setPosts] = useState([])
  const status=useSelector(state=>state.auth.status)
  const [loading, setLoading] = useState(true)
  const userData = useSelector(state => state.auth.userData);
  useEffect(() => {
    
  if (status && userData?.$id) {
    appwriteService.getPosts(userData.$id).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    }).finally(() => setLoading(false))
  }
  else {
    setLoading(false); 
  }
}, [status,userData?.$id])

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  )
}

   if(status){
    if (posts.length === 0) {
        return (
            <div className="w-full py-16 bg-blue-50 text-center">
                <Container>
                    <div className="p-6 bg-white rounded-xl shadow-md mx-auto max-w-xl">
            <h1 className="text-2xl font-semibold text-blue-800">No Posts Yet</h1>
            <p className="text-blue-500 mt-2">Start by creating your first post using the Add Post button.</p>
          </div>
                </Container>
            </div>
        )
    }
   }
   else{
    return (
        <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="p-8 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
          <h1 className="text-3xl font-semibold text-blue-800 mb-3">Welcome to BlogVerse 🚀</h1>
          <p className="text-blue-600 text-md mb-6">
            BlogVerse is your personal blogging space where you can write, edit, and manage your thoughts, ideas, and stories.
            Join a growing community of writers and express yourself freely.
          </p>
          <p className="text-blue-500 text-sm mb-4 italic">
            🔧 This site is currently under development. Upcoming updates will include features like user interaction, commenting, liking, and more.
          </p>
          <p className="text-blue-500 mb-6">
            Please log in to view your saved or created blog posts, and to start writing your own content.
          </p>
          <div className="flex justify-center">
            <a
              href="/login"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Log In
            </a>
          </div>
        </div>
                </Container>
            </div>
    )
   }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800">Latest Posts</h1>
          <p className="text-blue-500 mt-1">Your thoughts, stories, and ideas.</p>
        </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full sm:w-[45%] lg:w-[30%] xl:w-[23%] p-2">
                          {/* //Yaha Hum without spread kiye hue bhi bhejenge toh bhi chal jaayega  */}
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home