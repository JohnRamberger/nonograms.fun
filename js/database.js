var ajaxurl = './php/ajax.php';
$(document).ready(function(){
    //check whether user has a valid session
    $("#name_tag").click(function(){
        if(checkIfLoggedIn()){
            //name link is clicked
            window.location.href = "account.html";
        }
    });
    if(document.getElementsByClassName("name")[0] != null){
        document.getElementsByClassName("name")[0].innerHTML = getUsername();
    }
    
});

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
  function onFailure(error) {
    console.log(error);
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    
    var _username = profile.getName();
    var _email = profile.getEmail();
    var _img_url = profile.getImageUrl();

    //Store the entity object in sessionStorage where it will be accessible from all pages of your site.
    sessionStorage.setItem('email',_email);
    sessionStorage.setItem('username',_username);

    var data = {action: 'check_user', email: _email};
    console.log("signed in");
    $.ajax({
        url:ajaxurl,
        type:"POST",
        dataType:'json',
        data: data,
        success: function(data){
            var res = parseInt(data['result']);
            //console.log(data['result'] + " - " + res);
            if(res == 0){
                //user is not in the database
                var _score = getCookie("score");
                var _size = getCookie("size");
                var _difficulty = getCookie("difficulty");
                data = {action: 'signup', username: _username, email: _email, score: _score, size: _size, difficulty: _difficulty, img_url: _img_url};
                $.ajax({
                    url:ajaxurl,
                    type:"POST",
                    dataType:'json',
                    data:data,
                    success: function(data){
                        console.log(data["result"]);
                    },
                    error: function(xhr, status, error){
                        console.error("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
                    }
                });
            }
        },
        error: function(xhr, status, error){
            alert("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            console.error(xhr.responseText);
        }
    });
    //database setup complete
    document.getElementsByClassName("filled")[0].innerHTML = _username;
    $('.filled').addClass("name_link").removeClass("filled");
    //startup();
    document.getElementById("save").style.display = "block";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    setTimeout(() => {
        sessionStorage.clear();
        window.location.href = "index.html";
    }, 500);
}


function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}

function checkIfLoggedIn()
{
  if(sessionStorage.getItem('email') == null || sessionStorage.getItem('email').length < 2){
    return false;
  } else {
    return true;
  }
}

function getEmail(){
    return sessionStorage.getItem('email');
}
function getUsername(){
    return sessionStorage.getItem('username');
}
function get_current_puzzle(){
    return sessionStorage.getItem('current_puzzle');
}
function set_current_puzzle(id){
    sessionStorage.setItem('current_puzzle', id);
    if(id == 0){
        setTimeout(() => {
            document.getElementById("trash").style.display = "none";
        }, 500);  
    }else{
        setTimeout(() => {
            document.getElementById("trash").style.display = "grid";
        }, 500);  
    }  
}

function check_puzzle(){
    if(sessionStorage.getItem('current_puzzle') == null || sessionStorage.getItem('current_puzzle') == 0){
        return false;
      } else {
        return true;
      }
}

function deletepuzzle(){
    //ask for confirmation
    if(check_puzzle()){
        let c = confirm("delete the saved puzzle?");
        if(!c){
            return;
        }
        let id = get_current_puzzle();
        //reset the session storage
        set_current_puzzle(0);
        //remove puzzle from database
        data = {action: 'delete_puzzle', puzzle_id: id};
        $.ajax({
            url:ajaxurl,
            type:"POST",
            dataType:'json',
            data:data,
            async:true,
            success: function(data){
                //console.log("puzzle deleted")
            },
            error: function(xhr, status, error){
                console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            }
        });
        newPuzzle();
    }
}