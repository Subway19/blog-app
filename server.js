var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var pg = require('pg');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');

var app = express();
//app.use(morgan('combined'));

var config ={
  user:'subway19',
  database:'subway19',
  host:'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD

};



app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));


var pool = new Pool(config);


function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}



function createTemplate(data){

  var heading = data.heading;
  var date = data.date;
  var content= data.content;
  var author = data.author;


  var htmlTemplate= `
  <!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <title>M</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css">

    <!-- Bootstrap core CSS -->
    <link href="/ui/bootstrap.min.css" rel="stylesheet">

    <!-- Material Design Bootstrap -->
    <link href="/ui/mdb.min.css" rel="stylesheet">

    <!-- Template styles -->
    <style rel="stylesheet">
        /* TEMPLATE STYLES */
        
        main {
            padding-top: 7rem;
            padding-bottom: 3rem;
        }
        
        .widget-wrapper {
            padding-bottom: 2rem;
            border-bottom: 1px solid #e0e0e0;
            margin-bottom: 2rem;
        }
        
        .reviews {
            text-align: center;
            border-top: 1px solid #e0e0e0;
            border-bottom: 1px solid #e0e0e0;
            padding: 1rem;
            margin-top: 1rem;
            margin-bottom: 2rem;
        }
        
        
    </style>

</head>

<body>


    <header>

        <!--Navbar-->
        <nav class="navbar navbar-fixed-top scrolling-navbar navbar-dark teal">

            <!-- Collapse button-->
            <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#collapseEx">
                <i class="fa fa-bars"></i>
            </button>

            <div class="container">

                <!--Collapse content-->
                <div class="collapse navbar-toggleable-xs" id="collapseEx">
                    <!--Navbar Brand-->
                   
                    <!--Links-->
                    <ul class="nav navbar-nav">
                         <li class="nav-item">
                            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/publish-article">Publish Article</a>
                        </li>
                    </ul>
                </div>
                <!--/.Collapse content-->

            </div>

        </nav>
        <!--/.Navbar-->

    </header>

    <main>

        <!--Main layout-->
        <div class="container">
            <div class="row">

                <!--Sidebar-->
                
                <!--/.Sidebar-->

                <!--Main column-->
                <div class="col-md-12">

                    <!--First row-->
                    <div class="row">
                        <div class="col-md-12">
                            <!--Product-->
                            <div class="product-wrapper">

                                <!--Featured image-->
                                <!--<div class="view overlay hm-white-light z-depth-1-half">
                                    <img src="http://mdbootstrap.com/images/ecommerce/slides/slide%20(3).jpg" class="img-fluid " alt="">
                                    <div class="mask">
                                    </div>
                                    <h3 class="price"><span class="tag red darken-2">10 $</span></h3>
                                </div> -->
                                <!--/.Featured image-->

                                <br>

                                <!--Product data-->
                                <div> <h2 class="h2-responsive">${heading}  </h2> Written by <i> <a href=""> ${author} </a> </i> ${date.toDateString()}</div>
                                
                                <hr>
                                <p>${content}</p>
                                

                                <ul class="rating inline-ul">
                                    <li><i class="fa fa-star amber-text"></i></li>
                                    <li><i class="fa fa-star amber-text"></i></li>
                                    <li><i class="fa fa-star amber-text"></i></li>
                                    <li><i class="fa fa-star amber-text"></i></li>
                                    <li><i class="fa fa-star"></i></li>
                                </ul>

                            </div>
                            <!--Product-->

                        </div>
                    </div>
                    <!--/.First row-->
                    
                    <!--Section: Leave a reply (Logged In User)-->
                    <div class="row">

                        <!--Leave a reply form-->
                        <div id="comment_form">
                   
                        </div>
                        <!--/.Leave a reply form-->

                    </div>
                    <!--/Section: Leave a reply (Logged In User)-->
                    

                    <!--Second row-->
                    <div class="row">

                        <!--Heading-->
                        
                        <div class="reviews">
                            <h2 class="h2-responsive">Comments</h2>
                        </div>

                        <!--First review-->
                        <div id="comments">

                        </div>
                  

                    </div>
                    <!--/.Second row-->

                </div>
                <!--/.Main column-->

            </div>
        </div>
        <!--/.Main layout-->

    </main>

    <!--Footer-->
    <footer class="page-footer darkgrey center-on-small-only primary">

    <!--Footer Links-->
    <div class="container-fluid">
        <div class="row">

            <!--First column-->
            <div class="col-md-3 offset-md-1">
                <h5 class="title">Application developed as part of IMAD</h5>
            </div>
            <!--/.First column-->
            <hr class="hidden-md-up">
       
            <div class="col-md-4">
            </div>
         


            <!--Fourth column-->
            <div class="col-md-1">
               <h5><a href="https://www.hackerearth.com/@sumant2" target="_blank"><i class="fa fa-linkedin fa-lg" aria-hidden="true"></i></a></h5>
           </div>
            <hr class="hidden-md-up">
           <div class="col-md-1">
             <h5><a href="https://www.hackerearth.com/@sumant2" target="_blank"><i class="fa fa-header fa-lg"></i></a></h5>
           </div>
            <hr class="hidden-md-up">
           <div class="col-md-1">
              <h5><a href="https://www.facebook.com/sumantbagade19" target="_blank"><i class="fa fa-facebook fa-lg"></i></a></h5>
           </div>
            <hr class="hidden-md-up">
            <div class="col-md-1">
              <h5><a href="https://github.com/Subway19" target="_blank"><i class="fa fa-github fa-lg"></i></a></h5>           
            </div>
             <hr class="hidden-md-up">

       </div>
   </div>
   <!--/.Footer Links-->

   <hr>
   <!--Copyright-->
   <div class="footer-copyright">
    <div class="container-fluid">
        © 2016 Application developed and Maintained by Sumant Bagade

    </div>
</div>
<!--/.Copyright-->

</footer>
    <!--/.Footer-->


    <!-- SCRIPTS -->
    <script type="text/javascript" src="/ui/article.js"></script>

    <!-- JQuery -->
    <script type="text/javascript" src="/ui/jquery-2.2.3.min.js"></script>

    <!-- Bootstrap tooltips -->
    <script type="text/javascript" src="/ui/tether.min.js"></script>

    <!-- Bootstrap core JavaScript -->
    <script type="text/javascript" src="/ui/bootstrap.min.js"></script>

    <!-- MDB core JavaScript -->
    <script type="text/javascript" src="/ui/mdb.min.js"></script>


</body>

</html>

  `

  return htmlTemplate;
}

 app.post('/create-user', function (req, res) {
    // username, password
    // {"username": "tanmai", "password": "password"}
    // JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
       if (err) {
           res.status(500).send(err.toString());
       } else {
           res.send('User successfully created: ' + username);
       }
    });
 });




app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});







app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});






app.post('/publish-article', function (req, res) {
   // JSON
   // var username = req.body.username;
   // var password = req.body.password;

    var articletitle = req.body.articletitle;
    var articleheading = req.body.articleheading;
    var articledate= req.body.articledate;
    var articleauthor = req.body.articleauthor;
    var articlecontent = req.body.articlecontent;

    if (articletitle == '' || articleheading == '' || articleauthor == '' || articlecontent == '' ) {
        // Inform the user on the screen through some message or give him a alert message
        res.redirect('/publish-article');
        return;
    }
    
    //console.log(articledate);
   pool.query('INSERT INTO article(title, heading, date, content, author) VALUES ($1, $2, $3, $4, $5)', [articletitle, articleheading, articledate, articlecontent, articleauthor], function (err, result) {
      if (err) {
          //res.status(500).send(err.toString());
          res.redirect('/login');
      } else {
          res.send(articletitle +' published successfully.');
      }
    });

   //setTimeout(res.redirect('/login'),5000);
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.get('/articles/:articleName', function (req, res) {


  var articleName = req.params.articleName;

  pool.query("SELECT * FROM article WHERE title = $1", [articleName] , function(err,result){
    if(err){
      res.status(500).send(err.toString());
    }
    else{
      if(result.rows.length==0){
        res.status(404).send('Article not found');
      }
      else{
        var articleData = result.rows[0];
        res.send(createTemplate(articleData));
      }
    }

  });

  
});


app.get('/get-comments/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','about.html'));


  
});
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname,'ui','login.html'));
});


app.get('/publish-article', function (req, res) {
     if (req.session && req.session.auth && req.session.auth.userId) {
       res.sendFile(path.join(__dirname,'ui','publish-article.html'));

     }
     else{
      res.send("Login to publish article");
     }
   
});


app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.redirect('/');
});






app.get('/font/roboto/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/font/roboto', req.params.fileName));
});


app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});








var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ` + port );
});
