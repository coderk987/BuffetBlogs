<script context="module">
    export async function load({url}) {
        const temp=url.pathname;
        console.log(temp);
        return {
            props: {
                id: temp.substring(6, temp.length)
            }
        }
    }
</script>

<script>
    import Header from "../../lib/Header.svelte";
    import {db} from '../../firebase.js';
    import { doc, onSnapshot, updateDoc} from "firebase/firestore";
    import {user,logged} from "../../stores.js";
    import {goto} from "$app/navigation";
    import {onMount} from 'svelte';

    onMount( ()=>{
        if($logged==false){
            goto('/login');
        }  
    })

    export let id;

    let curBlog=[];
    let likedList=[];

    const unsub = onSnapshot(doc(db, "blogs", id), (doc) => {
        curBlog=doc.data();
        likedList=curBlog.liked;
    });

    function likedPost(s){
        for(let i=0;i<likedList.length;i++){
            if(likedList[i]==s) return true;
        }
        return false;
    }
    const likePost=async()=>{
        console.log("clicked", $user.displayName);
        console.log(likedList[0]);
        if(likedPost($user.displayName)){
            console.log("remove");
            await updateDoc(doc(db, "blogs", id), {
                liked: likedList.filter((item) => item!=$user.displayName)
            });
            
        }else{
            console.log("add");
            await updateDoc(doc(db, "blogs", id), {
                liked: [$user.displayName,...likedList]
            });
        }
    }
</script>

<div class="lmao">
    <Header />
    <div class="blog">
        <h1>{curBlog.title}</h1>
        <h2>{curBlog.by}</h2>
        <p>{curBlog.content}</p>
        <h3 on:click={likePost}><i class="bi bi-hand-thumbs-up-fill"></i> {likedList.length}</h3>
    </div>
</div>

<style>
    *{
        font-family: 'Noto Sans', sans-serif;
        color: #191a1b;
    }
    .lmao{
        width: 100vw;
        min-height: 100vh;
        background-color: #f5f5f5;
    }
    h1{
        margin-top: 0.5em;   
    }
    .blog{
        margin:1em 5vw;
        width: 90vw;
        background-color: #fefbfb;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0 1em;
    }
    h3,i{
        margin-bottom: 0.5em;
        color: rgb(149, 149, 237);
    }
</style>