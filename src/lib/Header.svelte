<script>
    import { auth } from '../firebase.js';
    import {user,logged} from '../stores.js';
    import {signOut} from 'firebase/auth';
    import {goto} from '$app/navigation';

    const logoutUser=async()=>{
        signOut(auth).then(()=>{
            console.log("Logged Out");
        })
        $logged=false;
        goto('/login');
    }
</script>

<header>
    <div class="title">
        <h1>
            <i class="bi bi-egg-fried" style="margin-right: 10px;"></i><sup>Buffet</sup><sub>Blogs</sub>
        </h1>
    </div>
    <nav>
        <a href="/"><h3><i class="bi bi-house-door-fill"></i></h3></a>
        <a href="/create"><h3><i class="bi bi-plus-circle-fill"/></h3></a>
        <a href="/about"><h3><i class="bi bi-question-octagon-fill"/></h3></a>
    </nav>
    <div class="profile">
        <h4>{$user.displayName}</h4>
        <h4 on:click={logoutUser}><i class="bi bi-box-arrow-right"></i></h4>
    </div>
</header>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
    *{
        box-sizing: border-box;
        color: #191a1b;
        font-family: 'Noto Sans', sans-serif;
    }
    header{
        max-width: 100vw;
        display:flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(237, 236, 236);
        margin: 0;
        padding: 0 0.5em;
        height: 12vh;
        padding-right: 0;
    }
    .title{
        display:flex;
    }
    nav{
        display: flex;
        align-items: center;
        height: 100%;
    }
    a{
        text-decoration: none;
        color: black;
        box-sizing: border-box;
    }
    a>h3{
      margin: 0 1em;
      font-size: xx-large;  
    }
    .profile{
        font-size: x-large;
        display:flex;
        align-content: center;
    }
    .profile>h4{
        margin-right: 0.5em;
    }
</style>