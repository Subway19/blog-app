var currentArticleTitle = window.location.pathname.split('/')[2];


function loadCommentForm () {
	var commentFormHtml = `
	<div class="reply-form">
	<h1 class="section-heading">Leave a reply </h1>
	<p class="text">(You are currently Logged In)</p>

	<!--Third row-->
	<div class="row">
	<!--Image column-->
	<div class="col-sm-4 col-xs-12">
	<a class="media-left" href="#">
	<img class="img-circle" src="http://mdbootstrap.com/wp-content/uploads/2015/10/team-avatar-1.jpg" alt="Generic placeholder image">
	</a>
	</div>
	<!--/.Image column-->

	<!--Content column-->
	<div class="col-sm-4 col-xs-12">
	<div class="md-form">
	<textarea type="text" id="comment_text" class="md-textarea"></textarea>
	<label for="comment_text">Your message</label>
	</div>

	</div>
	<div class="col-sm-4 col-xs-12">
	<div class="text-xs-center">
	<button class="btn btn-primary" id="submit">Submit</button>
	</div>
	</div>
	<!--/.Content column-->

	</div>
	<!--/.Third row-->
	</div>
	`;
	document.getElementById('comment_form').innerHTML = commentFormHtml;

    // Submit username/password to login
    var submit = document.getElementById('submit');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
        	if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                	alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
            }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Submitting...';
        
    };
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}




function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}












function loadComments () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
        

                    content += `
                      <div class="media">
                            <a class="media-left" href="#">
                                <img class="img-circle" src="http://mdbootstrap.com/wp-content/uploads/2015/10/team-avatar-1.jpg" alt="Generic placeholder image">
                            </a>
                            <div class="media-body">
                                <h4 class="media-heading"><span>${escapeHTML(commentsData[i].username)}</span></h4>
                                <ul class="rating inline-ul">
                                    <li><i class="fa fa-star amber-text"></i></li>
                                    <li><i class="fa fa-star amber-text"></i></li>
                                    <li><i class="fa fa-star amber-text"></i></li>
                                    <li><i class="fa fa-star"></i></li>
                                    <li><i class="fa fa-star"></i></li>
                                </ul>
                                <p>- ${time.toLocaleTimeString()} on ${time.toLocaleDateString()}</p>
                                <p><span>${escapeHTML(commentsData[i].comment)}</span></p>
                            </div>
                        </div>
                    `
                }
                content += "</ul>"
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}




















loadLogin();

loadComments();