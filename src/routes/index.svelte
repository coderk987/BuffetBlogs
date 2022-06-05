<script>
    import Header from '$lib/Header.svelte';
    import Card from '$lib/Card.svelte';
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation';
    import {user,logged} from '../stores.js';
    import {db} from '../firebase.js';
    import { collection,onSnapshot, where, query} from "firebase/firestore";

    onMount( ()=>{
        console.log($logged);
        if($logged==false){
            goto('/login');
        }  
    })

    let blogList=[];

    let op="!=";
    let selq="all";

    let search='';
    let isSearch=false;

    let q=query(collection(db,"blogs"),where("category","!=","all"));
    $: {
        if(!isSearch){
            console.log("ran q change");
            q=query(collection(db,"blogs"),where("category",op,selq));
            console.log(q);
        }
    }
    $: {const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let fb=[];
        querySnapshot.forEach((doc) => {
            let blog={...doc.data(),id: doc.id};
            fb=[blog,...fb];
        });
        blogList=fb;
    });}
    const handleQuery=()=>{
        console.log("ran op change");
        console.log(selq);
        if(selq=="all"){
            op="!=";
        }else{
            op="==";
        }
    }
    const handleSearch=()=>{
        q=query(collection(db,"blogs"),where('title','>=',search),where('title','<=',search+'\uf8ff'));
        isSearch=true;
    }
</script>

<div class="body">
    <Header/>
    <div class="query">
        <div class="filter">
            <select bind:value={selq} on:change={handleQuery}>
                <option value="all">All</option>
                <option value="desert">Dessert</option>
                <option value="starter">Starter</option>
                <option value="main">Main Course</option>
            </select>
        </div>
        <div class="search">
            <input type="text" bind:value={search} on:input={handleSearch}>
            <p on:click={handleSearch}><i class="bi bi-search"></i></p>
        </div>
        <div class="info">
            <p>{blogList.length} Blogs | </p><p>Sort By</p>
        </div>
    </div>
    <div class="blogs">
        {#each blogList as item}
            <div class="item">
                <Card title={item.title} by={item.by} to={item.id} cat={item.category}/>
            </div>
        {/each}
    </div>
</div>

<style>
    *{
        box-sizing: border-box;
        color: #191a1b;
        font-family: 'Noto Sans', sans-serif;
    }
    .body{
        background-color: #F5F5F5;
        min-height: 100vh;
    }
    .query{
        display:flex;
        justify-content: space-between;
        margin: 2em;
        background-color: #eeecec;
        padding-right: 0.6em;
    }
    .info{
        display:flex;
        font-size: larger;
        font-weight: bolder;
    }
    select{
        padding: 0;
        height: 1.5em;
        font-size: x-large;
        margin: 0.6em;
        background-color: #5ff0a5;
        border:none;
        border-radius: 5px;
    }
    .blogs{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .item{
        width: 40vw;
        margin: 1em 2em;
    }
    input{
        width: 50vw;
        padding: 0.5em;
        border-radius: 5px;
        margin: 1.2em;
        margin-right: 0.1em;
        outline: none;
        box-sizing: border-box;
    }
    .search{
        display:flex;
        text-align: center;
        box-sizing: border-box;
    }
    .search>p{
        font-size: large;
        background-color: #5ff0a5;
        border: 2px solid #20d276;
        border-radius: 5px;
        padding: 0.2em 0.5em;
        box-sizing: border-box;
    }
</style>