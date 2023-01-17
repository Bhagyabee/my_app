const nodemailer = require('../config/nodemailer');




exports.newComment  =  (comment)=>{
    console.log('inside newcomment mailer', comment);
    let htmlString =nodemailer.renderTemplate({comment: comment},'/comments/new_comment.ejs')
    
    nodemailer.transporter.sendMail({
        from: 'bhagyabeeb@gmail.com',
        to: comment.user.email,
        subject: "New comment Published",
        html: htmlString 
    },
    (err,info)=>{
        if(err){
            console.log('error in sending email',err);
            return;
        }
        console.log('message sent', info);
        return;
    })
}
exports.newCommentOnPost = (comment) => 
{
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment_on_post.ejs');
    console.log('Inside newCommentOnPost Mailer');

    nodemailer.transporter.sendMail
    (
        {
            from: 'bhagyabeeb@gmail.com',
            to: comment.post.user.email,
            subject: "New Comment on your Post!",
            html: htmlString
        },
        (err, info) =>
        {
            if(err)
            {
                console.log('Error in sending mail', err);
                return;
            }
            //console.log('Message sent', info);
            return;
        }
    );
}