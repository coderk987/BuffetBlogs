<script>
    export let title;
    export let by;
    export let to;
    export let cat;
</script>

<div class="card">
    <div class="top">
        <h2><a href={`/blogs/${to}`}>{title}</a></h2>
        {#if cat==''} <p>other</p>
        {:else} <p>{cat}</p>
        {/if}
    </div>
    <h4>Author: {by}</h4>
</div>

<style>
    .card{
        width: 40vw;
        border: 1px solid rgb(41, 41, 41);
        padding: 0.5em 2em;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: #fafafa;
    }
    a{
        text-decoration: none;
        color:rgb(41, 41, 41);
    }
    h2{
        font-weight: bolder;
    }
    .top{
        display:flex;
        justify-content: space-between;
    }
    p{
        background-color: #7ED4E6;
        border-radius: 5px;
        text-align: center;
        max-height: 30px;
        padding: 3px;
        box-sizing: border-box;
    }
</style>