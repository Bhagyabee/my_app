{
    // method 
   let createPost = function(){
    let newPostForm =$('#new-post-form');
   

   newPostForm.submit(function(e){
    e.preventDefault();
 
    
    $.ajax({
           type: 'post',
           url: '/posts/create',
           data: newPostForm.serialize(),
           success: function(data){
           let newpost = newpostdom(data.data.post)
           $('#post-list-container>ul').prepend(newpost)
           deletepost($('.delete-post-button', newpost))
           },error: function(error){
            console.log(error.responseText);
           }
    })
   })
   } 

   //method to create a post in dom
   let newpostdom = function(post){
       return $(`<li id="post-${post._id}">
       <p>
           
           <small>
               <a class="delete-post-button" href="/posts/destroy/${ post._id }"> XX </a>
           </small>
           ${ post.content}
           <br> 
               
                 ${ post.user.name}
              
   
           </small>
       </p>
       
       <div class="post-comments">
           
           <form action="/comments/create" method="POST">
               <input type="text" name="content" placeholder="type here to comments... " required>
               <input type="hidden" name="post" value="${ post._id }" >
               <input type="submit" value="Add Comment">
           </form>
            
         
   
          <div class="post-comment-list">
           <ul id="post-comment-${ post._id }">
               
          
            
           </ul>
          </div>
   
       </div>
   
       
   </li> `)
   } 


   //method to delete a post from dom
   let deletepost = function(deletelink){
       $(deletelink).click(function(e){
              e.preventDefault();

              $.ajax({
                     type:'get',
                     url: $(deletelink).prop('href'),
                     success: function(data){
                          $(`#post-${data.data.post_id}`).remove();
                     },error: function(error){
                            console.log(error.responseText);
                     }
              });
       });
   }


   createPost(); 
}