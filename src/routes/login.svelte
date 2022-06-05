<script>
    import {auth} from '../firebase.js';
    import { GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
    import {user,logged} from '../stores.js';
    import {goto} from '$app/navigation';

    const signInGoogle=async()=>{
        const provider = new GoogleAuthProvider();
        const res=await signInWithPopup(auth, provider);
        $logged=true;
        $user=res.user;
        console.log($logged)
        goto("/");
    }
    let fields=['','']
    const signInEmail=()=>{
        signInWithEmailAndPassword(auth,fields[0],fields[1])
        .then((cred)=>{
            $user=cred.user;
            $logged=true;
            goto("/");
        })
    }
</script>

<div class="login">
    <center>
        <div class="form">
            <h1>Login</h1>
            <div class="email">
                <form action="">
                    <div class="inputs">
                        <p>Email:</p>
                        <input type="email" bind:value={fields[0]}/>
                        <p>Password:</p>
                        <input type="password" bind:value={fields[1]}/>
                        <button class="create" on:click|preventDefault={signInEmail}>Login Account</button>
                    </div>
                </form>
            </div>
            <div class="orHR">
                Or Use
            </div>
            <div class="provs">
                <button on:click={signInGoogle}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 22 20"><path fill="#4285F4" fill-rule="evenodd" d="M19.981 10.21c0-.654-.06-1.283-.172-1.886h-8.911v3.566h5.092c-.22 1.152-.886 2.128-1.888 2.782v2.313h3.058c1.79-1.605 2.821-3.968 2.821-6.776z" clip-rule="evenodd"></path><path fill="#34A853" fill-rule="evenodd" d="M10.898 19.219c2.555 0 4.696-.826 6.262-2.234l-3.058-2.313c-.847.553-1.931.88-3.204.88-2.465 0-4.55-1.621-5.295-3.8H2.442v2.388c1.557 3.013 4.757 5.079 8.456 5.079z" clip-rule="evenodd"></path><path fill="#FBBC05" fill-rule="evenodd" d="M5.603 11.752A5.414 5.414 0 015.307 10c0-.607.107-1.198.296-1.752V5.86H2.442a9.025 9.025 0 000 8.28l3.161-2.388z" clip-rule="evenodd"></path><path fill="#EA4335" fill-rule="evenodd" d="M10.898 4.448c1.389 0 2.636.465 3.617 1.378l2.714-2.644c-1.64-1.487-3.78-2.4-6.331-2.4-3.699 0-6.9 2.065-8.456 5.078l3.161 2.388c.744-2.178 2.83-3.8 5.295-3.8z" clip-rule="evenodd"></path></svg>
                    Login with Google
                    <div></div>
                </button>
            </div>
            <h6>By continuing, you agree to Our Terms of Service, Privacy Policy</h6>
            <div class="ops">
                <h5><a href="/register"> Create an Account?</a></h5>
                <h5><a href="/forgot">Forgot Password.</a></h5>
            </div>
        </div>
    
   
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
    *{
        font-family: 'Noto Sans', sans-serif;
        color: #191a1b;
    }
    .login{
        overflow-y: hidden;
        background-color: #F5F5F5;
        height: 100vh;
    }
    .form{
        width: 550px;
        max-width: 90vw;
        background-color: #FFFFFF;
        margin-top: 10vh;
        border-radius: 10px;
        box-sizing: border-box;
        padding-bottom: 20px;
        border: 2px solid rgb(171, 171, 171);
        box-shadow:inset 0 -3em 3em rgba(0,0,0,0.1), 0.3em 0.3em 1em rgba(0,0,0,0.3);
    }
    h1{
        background-color: #F2F2F2;
        border-radius: 10px 10px 2px 2px;
        margin: 0;
        margin-bottom: 0.5em;
        padding: 0.2em;
        font-weight: 700;
    }
    .inputs{
        display:flex;
        flex-direction: column;
    }
    .inputs>p{
        margin: 0 2em;
        padding: 0;
        align-self: flex-start;
        font-size: larger;
        font-weight: bolder;
    }
    input{
        margin: 1.5em 2em;
        padding: 0.2em 0.5em;
        border-radius: 5px;
        font-size: large;
    }
    .provs{
        display:flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 0.2em;
    }
    .provs>button{
        width: 50%;
        padding: 0.5em 1em;
        background-color: whitesmoke;
        margin: 1em 0;
        border-radius: 5px;
        display:flex;
        justify-content: space-between;
    }
    h6{
        margin: 0;
    }

    .orHR {
        display: flex;
        align-items: center;
        text-align: center;
        width: 80%;
        color:rgb(80, 80, 80);}

    .orHR::before,
    .orHR::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid rgb(80, 80, 80);
    }

    .orHR:not(:empty)::before {
        margin-right: .25em;
    }

    .orHR:not(:empty)::after {
        margin-left: .25em;
    }

    .ops{
        display:flex;
        justify-content: center;
    }
    .ops>h5{
        margin: 1em 2em;
        margin-bottom: 0;
    }

    a{
        text-decoration: none;
        color: black;
    }

    button.create{
        align-self: center;
        padding: 0.5em 0.1em;
        width: 30%;
        background-color: #20e07d;
        border: 1px solid #1ab766;
        border-radius: 5px;
        margin: 0.4em 0.2em;
    }
</style>