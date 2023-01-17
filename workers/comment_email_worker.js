const queue = require('../config/kue')

const commentsmailer = require('../mailers/comments_mailer');

queue.process('commenter-email', (job,done)=>{
    console.log('email worker is processing the jobs',job.data);

    commentsmailer.newComment(job.data);

    done();
})
queue.process('post-owner-email', function(job, done)
{
    console.log('Comment email worker is processing a job (post owner)');
    commentsmailer.newCommentOnPost(job.data);
    done();
});