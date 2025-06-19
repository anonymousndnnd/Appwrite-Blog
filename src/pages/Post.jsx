import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    
    useEffect(() => {
        if (slug) {
            const loadpost=async()=>{
                try {
                    let fetchedPost=await appwriteService.getPost(slug)
                    if(fetchedPost){
                        setPost(fetchedPost);
                    }
                    else{
                        navigate("/")
                    }
                } catch (error) {
                    console.error("Post loading error:", err);
                    navigate("/");
                }
                finally{
                    setLoading(false);
                }
            }
            loadpost();
        } else {
            navigate("/");
        }
    }, [slug, navigate,userData]);
    // console.log("UserData is:",userData);
    // console.log("post is:",post);
    const isAuthor = useMemo(() => {
        if (loading || !post || !userData) return false;
        
        // Handle different ID property names
        const userId = userData.$id || userData.id;
        const postAuthorId = post.userId;
        
        console.log("Author verification:", {
            userId,
            postAuthorId,
            match: userId === postAuthorId
        });
        
        return userId === postAuthorId;
    }, [loading,post, userData]);
    console.log("Status:",isAuthor)

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
            </div>
        );
    }

    return post ? (
        <div className="min-h-screen bg-blue-50 py-12 text-blue-900">
            <Container>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Featured Image with Edit/Delete Buttons */}
                    <div className="w-full mb-10 relative rounded-xl overflow-hidden shadow-lg border border-blue-200 bg-white">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage).toString().replace("preview", "view") + "&mode=admin"}
                            alt={post.title}
                            className="w-full h-auto max-h-96 object-cover"
                        />

                        
                            <div  className="absolute right-6 top-6 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button 
                                        bgColor="bg-green-500 hover:bg-green-600"
                                        textColor="text-white"
                                        className="shadow-md transition-all duration-200"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                        bgColor="bg-red-500 hover:bg-red-600"
                                    textColor="text-white"
                                    onClick={deletePost}
                                    className="shadow-md transition-all duration-200 px-4 py-2 rounded-md"

                                    >
                                        Delete
                                    </Button>
                            </div>
                        
                    </div>

                    {/* Post Title */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-800">
                            {post.title}
                        </h1>
                        <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full"></div>
                    </div>

                    {/* Post Content */}
                    <div className="bg-white rounded-xl shadow-md border border-blue-200 p-6 sm:p-8">
    <div className="prose prose-lg max-w-none prose-blue">
        <div className="prose-headings:text-blue-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-strong:text-blue-800 prose-blockquote:text-blue-500 prose-code:bg-blue-100 prose-pre:bg-blue-100">
            {parse(post.content)}
        </div>
    </div>
</div>
                </div>
            </Container>
        </div>
    ) : null;
}