const nodemailer = require('nodemailer');

class Mailer{
     constructor(emailAddress,url){
         this.emailAddress = emailAddress,
         this.url = url,
         this.mailer = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'gcodedecrypt@gmail.com',
                pass: 'aampntlfwzabjjwu'
            }
        })
     }


}