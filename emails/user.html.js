export function userEamilHTML(email,token){
    return `<head>
    <!-- If you delete this tag, the sky will fall on your head -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title>Email Sample</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="cailon.css" />
        <link rel="stylesheet" href="css/robotonewfont.css" />
        <!--Text-->
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        <style>
            .form {
  background:rgb(243,243,243);
  padding: 40px;
  max-width:600px;
  margin:30px auto;
}

.form-small {
  background:white;
  padding: 40px;
  max-width:600px;
  margin:10px auto;
}

.h1-font {
    font-family: Lobster;
    text-align: center;
}

.contact-font {
	font-family: Indie Flower;
	font-style: italic;
	text-align: center;
	color: rgb(111,111,111);
}

.p-font {
    margin: 20px 10px 20px;
    font-size: 20px;  
    font-family: 'Times New Roman', Times, serif;
    text-align: center;
}

.p-footer {
	margin: 20px 10px 20px;
	padding: 10px 50px 0px;
    font-size: 11px;  
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
}

/* .mail-image {
	padding: 0px;
	max-width:600px;
	margin:10px auto;
} */

/* Button */
:root {
    --bg: rgb(243,243,243);
    --color: rgb(255,178,0);
    --font: Montserrat, Roboto, Helvetica, Arial, sans-serif;
}

.wrapper {
    padding: 20px 150px 40px;
    filter: url('#goo');
}

.button {
    display: inline-block;
    text-align: center;
    background: rgb(255,178,0);
    color: rgb(243,243,243);
    font-weight: bold;
    padding: 1.18em 1.32em 1.03em;
    line-height: 1;
    border-radius: 1em;
    position: relative;
    min-width: 8.23em;
    text-decoration: none;
    font-family: Montserrat, Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.75rem;
}

.button:before,
.button:after {
    width: 4.4em;
    height: 2.95em;
    position: absolute;
    content: "";
    display: inline-block;
    background: rgb(255,178,0);
    border-radius: 50%;
    transition: transform 0.3s ease;
    transform: scale(0);
    z-index: -1;
}

.button:before {
    top: -25%;
    left: 20%;
}

.button:after {
    bottom: -25%;
    right: 20%;
}

.button:hover:before,
.button:hover:after {
    transform: none;
}


/* Demo styles */

body {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(243,243,243);
}

/* End Button */


/* Icon Social */



/* Base Styles */



.social-buttons {
  margin: auto;
  font-size: 0;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.social-button {
  display: inline-block;
  background-color: #fff;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  opacity: .99;
  border-radius: 50%;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
  -webkit-transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
  transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
}
.social-button:before {
  content: '';
  background-color: #000;
  width: 120%;
  height: 120%;
  position: absolute;
  top: 90%;
  left: -110%;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
  -webkit-transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
  transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
}
.social-button .fa {
  font-size: 38px;
  vertical-align: middle;
  -webkit-transform: scale(0.8);
          transform: scale(0.8);
  -webkit-transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
  transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
}
/* //Facbook */
.social-button.facebook:before {
  background-color: #3B5998;
}
.social-button.facebook .fa {
  color: #3B5998;
}

/* //Twitter */
.social-button.twitter:before {
  background-color: #55acee;
}
.social-button.twitter .fa {
  color: #55acee;
}

/* //Google Plus */
.social-button.google:before {
  background-color: #dd4b39;
}
.social-button.google .fa {
  color: #dd4b39;
}

.social-button:focus:before, .social-button:hover:before {
  top: -10%;
  left: -10%;
}
.social-button:focus .fa, .social-button:hover .fa {
  color: #fff;
  -webkit-transform: scale(1);
          transform: scale(1);
}

.logo {
	font-family: 'Lobster', cursive;
	font-size: 4em;
	font-weight: 400;
	float: left;
	padding: 5px;
	margin-top: 25px;
}

/* Transitions */

header, .logo{
	-webkit-transition: all 1s;
          transition: all 1s; 
}

/* End Icon Social */


/* cyrillic */
@font-face {
  font-family: 'Lobster';
  font-style: normal;
  font-weight: 400;
  src: local('Lobster'), local('Lobster-Regular'), url(https://fonts.gstatic.com/s/lobster/v18/c28rH3kclCLEuIsGhOg7evY6323mHUZFJMgTvxaG2iE.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Lobster';
  font-style: normal;
  font-weight: 400;
  src: local('Lobster'), local('Lobster-Regular'), url(https://fonts.gstatic.com/s/lobster/v18/RdfS2KomDWXvet4_dZQehvY6323mHUZFJMgTvxaG2iE.woff2) format('woff2');
  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Lobster';
  font-style: normal;
  font-weight: 400;
  src: local('Lobster'), local('Lobster-Regular'), url(https://fonts.gstatic.com/s/lobster/v18/9NqNYV_LP7zlAF8jHr7f1vY6323mHUZFJMgTvxaG2iE.woff2) format('woff2');
  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Lobster';
  font-style: normal;
  font-weight: 400;
  src: local('Lobster'), local('Lobster-Regular'), url(https://fonts.gstatic.com/s/lobster/v18/cycBf3mfbGkh66G5NhszPQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}

/* latin */
@font-face {
  font-family: 'Indie Flower';
  font-style: normal;
  font-weight: 400;
  src: local('Indie Flower'), local('IndieFlower'), url(https://fonts.gstatic.com/s/indieflower/v8/10JVD_humAd5zP2yrFqw6ugdm0LZdjqr5-oayXSOefg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
/* --------------------- */
        </style>
    </head>

    <body style="background-color: rgb(136,189,191)">
        <div class="form">
            <div>
             
            </div>
        
            <div class="form-small"; style="padding: 0px">
                <div>
                    <img class="mail-image" alt="top image" src="https://i.pinimg.com/564x/bb/1b/a6/bb1ba6b05117aad132660512842a71a7.jpg" width="100%">
                </div>
                <h1 class="h1-font">Email Confirmation<h1>
                <p class="p-font">Hey ${email}, you're almost ready to start enjoying <b>HMS</b>.  
                Simply click the BIG yellow button below to verify your email address.</p>
                <div class="wrapper">
                    <a class="button" href="https://hms-x2rp.onrender.com/user/verify/${token}">Verify email address</a>
                </div>

                <!-- Filter: https://css-tricks.com/gooey-effect/ -->
                <svg style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />    
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                        </filter>
                    </defs>
                </svg>               
            </div>

            <div>
                <h3 class="contact-font">Stay in touch<h3>

                <div class="social-buttons">
                    <a class="social-button facebook" href="#">
                        <i class="fa fa-facebook">
                        </i>
                    </a>
                    
                    <a class="social-button twitter" href="#">
                        <i class="fa fa-twitter">
                        </i>
                    </a>
                    
                    <a class="social-button google" href="#">
                        <i class="fa fa-google">
                        </i>
                    </a>
                </div>

                <p class="p-footer">Email sent by Elephantry.com <br>
                Copyright © 2017 Elephantry Inc. All rights reserved</p>
            </div>
        </div>

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="js/bootstrap.min.js"></script>
    </body>`
}