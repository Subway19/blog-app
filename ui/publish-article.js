
function publishArticle() {
   
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                alert('Article published successfully');
                  //register.value = 'Registered!';
                } else {
                  alert('Could not publish the Article. Try again later');
                  //register.value = 'Register';
                }
              }
            };

        // Make the request
        var articletitle = document.getElementById('article-title').value;
        var articleheading = document.getElementById('article-heading').value;

        var today = new Date();
        var dd = today.getDate();
//The value returned by getMonth is an integer between 0 and 11, referring 0 to January, 1 to February, and so on.
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
          dd='0'+dd;
        } 

        if(mm<10) 
        {
          mm='0'+mm;
        } 
        today = mm+'-'+dd+'-'+yyyy;
        console.log(today);

      var articledate= today;
      var articleauthor = document.getElementById('author-name').value;
      var articlecontent = document.getElementById('content').value;
      if (articletitle == '' || articleheading == '' || articleauthor == '' || articlecontent == '' ) {
        // Inform the user on the screen through some message or give him a alert message
        alert("Any article field cannot be left empty");
        return;
      }
      request.open('POST', '/publish-article', true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({articletitle: articletitle, articleheading: articleheading, articledate: articledate, articleauthor: articleauthor, articlecontent : articlecontent }));  
        //register.value = 'Registering...';


  }