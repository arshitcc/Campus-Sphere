import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { service as DBService } from '../appwrite/configure';
import { Container, PostForm } from '../components';


function EditPost() {

    const [post, setPost] = useState({});
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug){
            DBService.getPost(slug).then((post) => {
                if(post){
                    setPost(post);
                }
            })
        }
        else{
            navigate('/');
        }
    },[navigate, slug])

  return post? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div> 
  ) : null
}

export default EditPost