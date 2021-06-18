import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import './Form.css'

export function PostForm({oldPost, submitForm}) {
    const postForm = useRef(null);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [editedData, setEditedData] = useState(null);
    const [id, setId] = useState(null)

    const onSubmit = (e) => {
        setEditedData(e);
    }
    //fill the form
    useEffect(() => {
        if (oldPost !== null) {
            const data = oldPost;
            setId(data.id)
            postForm.current[0].value = data.title;
            postForm.current[1].value = data.body;
            postForm.current[2].value = data.id;
        }
    }, [oldPost]);

    useEffect(()=>{
        submitForm (editedData);
    },[editedData])



    return (
        <form ref={postForm} onSubmit={handleSubmit(onSubmit)} className="posts-form">

            <div className="input-wrapper">
                <input  {...register("title", {required: true, minLength:5})}/>
                {errors.title && <div>Enter the title</div>}
            </div>
            {/*minLength:4*/}
            <div className="input-wrapper">
                <input {...register("body", {required: true, minLength:5})}/>
                {errors.body && <div>Enter the body</div>}
            </div>
            <input type="text" className="hidden"{...register("id",{value:id})}/>
            <div className="input-wrapper">
                <input type="submit"/>
            </div>
        </form>
    )

}

