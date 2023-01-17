const development = {
    name: 'development',
    asset_path :'./assets',
    session_cookie_key: 'blahsomething',
     db: 'new_app_development',
     smtp: {
        service:'gmail',
        host:'smtp.gmail.com' ,
        port: 587,
        secure: false,
        auth:{
            user:'bhagyabeeb@gmail',
            pass:'DulalNilima@123'
        }
    },
    google_client_id:
        "321606281231-sp2s822n8ponproc8ghg0iebrpdg1qet.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
     
}

const production = {
    name:'production'
}

module.exports = development;