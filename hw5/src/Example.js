import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export function Example() {
    let [isShow, setIsShow] = useState(true);
    let ref = useRef(null)
    useEffect(() => {
        console.log('--->', ref)
    }, [])
    let onSubmit = (data) => console.log(data)
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues:{
            firstName:"Jaba1",
            secondName:"Jopa1"
        }
    });
    return (
        <div>
            <button ref={ref} onClick={() => setIsShow(!isShow)} className='awdd'>{isShow ? "Show" : "Hidden"}</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" {...register("firstName", {
                        required: true, minLength: {
                            value: 5, message: 'Enter the first name'
                        }
                    })} />
                    {errors.firstName && <div style={{color: "red"}}>{errors.firstName.message}</div>}
                </div>
                <div>
                    <input type="text" {...register("secondName", {
                        required: true, minLength: {
                            value: 5,
                            message: 'Enter the second name'
                        }
                    })}/>
                    {errors.secondName && <div style={{color: "red"}}>Enter second name</div>}
                </div>
                <input type="submit"></input>
            </form>
        </div>

    )
}
