import React, { useCallback, useEffect } from 'react'
import {Button, Input, Select, RTE} from '../index'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { service as DBService} from '../../appwrite/configure'

function PostForm({post}) {

  const {register, handleSubmit, watch, setValue, getValues, control}  = useForm({
    defaultValues : {
      title : post?.title || '',
      slug : post?.title || '',
      content : post?.content || '',
      status : post?.status || 'active'
    }
  }); 
  // watch is used to continuosly monitor any field
 
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);

  const submitPost = async (data) => {

    if(post){ // It's an Edit-Post Operation
      // created file of new Image
      const newPostImage = data.image[0]? await DBService.uploadFile(data.image[0]) : null

      if(newPostImage){
        DBService.deleteFile(newPostImage.$id);
      }

      const updatedPost = await DBService.updatePost(post.$id,
        {
          ...data, 
          featured_image : newPostImage ? newPostImage.$id  : featured_image
        }
      );    
      navigate(`/posts/${updatedPost.$id}`)
    }

    else{ // It's a create-Post Operation
    
      const newPostImage = await DBService.uploadFile(data.image[0]);
      
      if(newPostImage){

        data.featured_image = newPostImage.$id;
        const newPost = await DBService.createPost({
          ...data, userId : userData.$id
        })

        if(newPost){
          navigate(`/post/${newPost.$id}`)
        }
      }
    }
  }

  const slugTranformation = useCallback((value) => {
    if(value && typeof value === 'string'){
      return value
      .trim()
      .toLowerCase()
      .replace(/^[!@#$%^&*()_]/,'')
      .replace(/\s/g,'-');
    }

    return "";
  },[])


  useEffect(() => {
    const subscription = watch((value, {name} ) => {
      if(name === 'title'){
        setValue('slug', slugTranformation(value.title), { shouldValidate : true})
      }
    })

    return () => subscription.unsubscribe();
  }, [watch, slugTranformation, setValue])

  return (
    <form onSubmit={handleSubmit(submitPost)} className="flex flex-wrap md:flex-nowrap">
      <div className="w-full md:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      
      <div className="w-full md:w-1/3 px-2 mt-4 md:mt-0">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={DBService.getFile(post.featured_image)}
              alt={post.title}
              className="rounded-lg w-full"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm