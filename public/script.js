(function() {

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById('user-profile');

    var params = getHashParams();

    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error,
        timeout = params.timeout;

    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (access_token) {

        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
              userProfilePlaceholder.innerHTML = userProfileTemplate(response);

              $('#login').hide();
              $('#loggedin').show();
            }
        });

        var int = setInterval(function() {
          $.ajax({
            url: '/refresh_token',
            data: {
              'refresh_token': refresh_token
            }
          }).done(function(data) {
            access_token = data.access_token;
            timeout = data.timeout;
            console.log('token updated: ' +access_token);
          });
        },(timeout*1000)-60);
      } else {
          // render initial screen
          $('#login').show();
          $('#loggedin').hide();
      }
    }
  })();