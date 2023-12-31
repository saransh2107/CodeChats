//method to submit form data
{
let createPost=function(){
    let newPostForm=$('#new-post-form');

    newPostForm.submit(function(e){

        console.log("Preventing");
        e.preventDefault();
   

    $.ajax({
        type:'post',
        url:'/posts/create',
        data:newPostForm.serialize(),
        success:function(data){
            let newPost=newPostDom(data.data.post)
            $('.post-container>ul').prepend(newPost);
            deletePost($('.delete-post-button',newPost))
            console.log("I am success",data);

        },
        error:function(error){
            console.log("I am error",error.responseText);
        }
    });
});
}

//method to create a post in DOM
let newPostDom=function(post){
    return $(`<li id="post-${post._id}">
            <div class="post-header">
            <h4> ${post.user.name} <span>  <a class="delete-post-button" href="/posts/destroy/${post._id}">
            <i class="fa-solid fa-trash delete" style="color: #bea527;"></i>
        </a></span></h4>
            </div>
            <div class="post-content">
                <p> ${post.content}</p>
            </div>
              

    <div class="post-comments">
            <form action="/comments/create" method="Post">

                <input type="text" name="comment" placeholder="Type your comment">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">

            </form>

                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                    </ul>
                </div>
    </div>

</li>`)
}


//method to delete a post
let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.data.post_id}`).remove();

            },
            error:function(error){
                console.log(error.responseText);

            }
        })

    })
}


createPost();

}