import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Button } from '../components';
import { service as DBService } from '../appwrite/configure';
import  parse  from 'html-react-parser';

function Post() {

    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    /* 
      * Using this isAuthor to provide access of Delete and Edit only to Author not to anyelse
    */
   
    const isAuthor = (post && userData)? post?.userId === userData?.$id : false;

    useEffect(() => {
        if(slug){
            console.log("1.1")
            DBService.getPost(slug).then((post) => {
                if(post){
                    setPost(post);
                }
            })
        }
        else{
            navigate('/');
        }
    },[navigate, slug]);

    const deletePost = () => {
      DBService.deletePost(slug).then((status) =>{
        if(status){
          DBService.deleteFile(post.featured_image);
          navigate("/");
        }
      })
    }

  return post ? (
    <div className='py-8'>
      <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                {console.log("1")}
              <img
                  src={DBService.getFile(post.featured_image)}
                  alt={post.title}
                  className="rounded-xl"
              />

              {isAuthor && (
                  <div className="absolute right-6 top-6">
                      <Link to={`/edit-post/${post.$id}`}>
                          <Button bgColor="bg-green-500" className="mr-3">
                              Edit
                          </Button>
                      </Link>
                      <Button bgColor="bg-red-500" onClick={deletePost}>
                          Delete
                      </Button>
                  </div>
              )}
          </div>

          <div className="w-full mb-6">
              <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
            
          <div className="browser-css">
              {/* {post.content} */}
              {parse(post.content)}
          </div>
      </Container>
    </div>
  ) : null;
}

export default Post