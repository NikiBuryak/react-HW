import React  from "react";
import axios from 'axios';
import {PostList} from "./PostList";
import {useEffect, useState} from "react";

export function Posts() {
    const [edited, setEdited] = useState(null)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);


    const editPost = (post)=>{
        if(post.id){
            setEdited(post);
            editOldPost(post.id);
        }else{
            
            let last = data[data.length-1];
            post.id = +last.id + 1
            console.log(post);
            addNewPost(post)
        }
    }
    const deleteOldPost = (id) =>{
        deleteCurrentPost(id)
    }
    const editOldPost = (id)=>{
            axios({
                method:"put",
                url:`https://60bb880442e1d00017620c95.mockapi.io/Posts/${id}`,
                data:edited
            })
            .then((e) =>{
                console.log(e);
            })
            
           
    } 

    const addNewPost = (post) =>{
        console.log(post);
        axios({
            method:"POST",
            url:'https://60bb880442e1d00017620c95.mockapi.io/Posts',
            data: post,
        })
        .then((e) =>console.log(e))
       
        let newdata = [...data, post];
        setData(newdata)
    }

    const deleteCurrentPost = (id) =>{
        axios({
            method:'DELETE',
            url:`https://60bb880442e1d00017620c95.mockapi.io/Posts/${id}`,
        }).then((e) => console.log(e));
        let newData = data.filter((e) => e.id !== id);
        setData(newData);
    }



    
    useEffect(() => {
        axios.get("https://60bb880442e1d00017620c95.mockapi.io/Posts")
            .then(res => res.data)
            .then(
                (data) => {
                    setIsLoaded(true);
                    setData(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
            .catch((e)=> {
                setError(e.message)
                })
    }, [])


        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <PostList list = {data} editPost={editPost} deleteOldPost={deleteOldPost}/>
                </div>
            );
        }
    

}














// const queryClient = new QueryClient()
// return (
//     <QueryClientProvider client={queryClient}>
//         <Fetch/>
//     </QueryClientProvider>
// )
//
//
// function Fetch() {
//     const {isLoading, error, data} = useQuery('postsData', () =>
//         fetch('https://60bb880442e1d00017620c95.mockapi.io/Posts').then(res =>
//             res.json()
//         )
//     )
//     if (isLoading) return 'Loading...'
//     if (error) return 'An error has occurred: ' + error.message
//     return (
//         <div>
//             <PostList list={data}/>
//         </div>
//     )
// }

