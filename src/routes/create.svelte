<script>
    import Header from "../lib/Header.svelte";
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation';
    import {user,logged} from '../stores.js';
    import {db} from '../firebase.js';
    import {addDoc, collection} from "firebase/firestore";
    
    let title;
    let content;
    let cat='other';

    const createBlog=async()=>{
        const docRef = await addDoc(collection(db, "blogs"), {
            title: title,
            content: content,
            liked: [],
            by: $user.displayName,
            category: cat
        });
        goto("/")
    }

    onMount( ()=>{
        if($logged==false){
            goto('/login');
        }  
    })
</script>

<Header/>
<div class="create">
    <form action="">
        <div class="formItems">
            <p>Blog Title: </p>
            <input type="text" bind:value={title}>
            <p>Blog Content: </p>
            <textarea name="" id="" cols="30" rows="10" bind:value={content}></textarea>
            <h5>The Blog Content Supports Markdown. It also Supports HTML</h5>
            <p>Blog Category: </p>
            <div class="sel" on:change={()=>{console.log(cat)}}>
                <label><input type="radio" name="cat" bind:group={cat} value={"starter"}>Starter</label>
                <label><input type="radio" name="cat" bind:group={cat} value={"main"}>Main-Course</label>
                <label><input type="radio" name="cat" bind:group={cat} value={"desert"}>Desert</label>
            </div>
            <button on:click|preventDefault={createBlog}>Create Blog</button>
        </div>
    </form>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
    *{
        font-family: 'Noto Sans', sans-serif;
        color: #191a1b;
    }
    .create{
        display:flex;
        flex-direction: column;
        align-items: center;
        background: #F5F5F5;
        height: 88vh;
        padding-top: 1em;
        box-sizing: border-box;
    }
    .formItems{
        margin-top: 1em;
        display:flex;
        flex-direction: column;
        width: 60vw;
        padding: 1em 3em;
        align-items: center;
        background-color: rgb(232, 232, 232);
        border-radius: 20px;
        box-shadow:inset 0 -3em 3em rgba(0,0,0,0.1), 0.3em 0.3em 1em rgba(0,0,0,0.3);
    }
    input[type=text]{
        width: 100%;
        padding: 0.5em;
        box-sizing: border-box;
    }
    textarea{
        width: 100%;
        padding: 0.7em;
        box-sizing: border-box;
        border-radius: 10px;
        max-height: 22ch;
    }
    .sel{
        display:flex;
        width: 100%;
        justify-content: space-between;
        font-size: large;
    }
    label{
        display:flex;
    }
    input[type=radio]{
        transform: scale(1.5);
        margin: 0 1em;
    }
    p{
        padding: 0 !important;
        margin: 0.5em 0;
        align-self: flex-start;
        font-size: larger;
        font-weight: bold;
    }
    h5{
        margin-bottom: 0;

    }
    button{
        align-self: center;
        padding: 0.2em 0.7em;
        background-color: #20e07d;
        border: 1px solid #1ab766;
        border-radius: 5px;
        margin-top: 1em;
        font-size: larger;
        font-weight: bolder;
    }
</style>