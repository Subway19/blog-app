
function userSignUp() {

    
    //var register = document.getElementById('register_btn');
    //console.log(register);
    //register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  document.getElementById('username').value='';
                  document.getElementById('password').value='';
                  //register.value = 'Registered!';
              } else {
                  alert('Could not register the user/User already exists');
                  //register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
         if (username == '' || password == '') {
        // Inform the user on the screen through some message or give him a alert message
        alert("Username/Password field can't be left empty");
        return;
        }
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        //register.value = 'Registering...';
    
    //};
}


function userLogin(){


	// Submit username/password to login
    //var submit = document.getElementById('login_btn');
    //cons
    //submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  //submit.value = 'Sucess!';
                  loadLogin();
              } else if (request.status === 403) {
                  //submit.value = 'Invalid credentials. Try again?';
                  alert('Invalid credentials. Try again?');
              } else if (request.status === 500) {
                  //alert('Something went wrong on the server');
                  //submit.value = 'Login';
              } else {
                  //alert('Something went wrong on the server');
                  //submit.value = 'Login';
              }
              loadLogin();
              
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('logusername').value;
        var password = document.getElementById('logpassword').value;
         if (username == '' || password == '') {
        // Inform the user on the screen through some message or give him a alert message
        alert("Username/Password field can't be left empty");
        return;
        }
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        //submit.value = 'Logging in...';
        
    //};


}


function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}


function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
                hideSignupAndLogin();
            } else {
                console.log("loadLogin failed")//loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}




function hideSignupAndLogin(){
  var loginForm = document.getElementById('login-form');
  var signUpForm = document.getElementById('sign-upform');

  loginForm.innerHTML = ' ';
  signUpForm.innerHTML=' ';
}


function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${escapeHTML(username)}</i></h3>
        <h4>Publish your Article or comment on exisiting articles</h4>
        <a href="/publish-article"><button class="btn btn-primary" type="submit">
                            Publish Article
        </button>                    
         </a>                   
         </button>
        <a href="/logout"><button class="btn btn-primary" type="submit">
                            Logout
         </button></a>
         <br>
         <hr>
        
    `;
}



function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<div>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    // content += `<li>
                    // <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    // Published on:
                    // ${articleData[i].date.split('T')[0]} Author:${articleData[i].author}</li>`;


                    content += `
                     <div class="post-wrapper">
            
                        <span><h1 class="h1-responsive">${escapeHTML(articleData[i].heading)} <small class="text-muted"></small></h1></span>
              
                         <h5>Written by <a href="">${escapeHTML(articleData[i].author)}</a>, ${escapeHTML(articleData[i].date.split('T')[0])}</h5>
                         <br>
                         <br>
                         <p>${articleData[i].content}</p>
              
                        <span><a href="/articles/${articleData[i].title}"><button class="btn btn-primary">Read more</button></a></span>
                   </div>
                   <hr>
                    `
                }
                content += "</div>"
                articles.innerHTML = content;
            } else {
                 articles.innerHTML='Sorry! Could not load all articles!';
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}






loadLogin();

loadArticles();





// The first thing to do is to check if the user is logged in!





//loadLoginForm();