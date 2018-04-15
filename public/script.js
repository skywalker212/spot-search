/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

var artistSource = document.getElementById('artist-template').innerHTML,
  artistTemplate = Handlebars.compile(artistSource),
  artistPlaceholder = document.getElementById('artist-info');

var trackSource = document.getElementById('track-template').innerHTML,
  trackTemplate = Handlebars.compile(trackSource),
  trackPlaceholder = document.getElementById('track-info');

var albumSource = document.getElementById('album-template').innerHTML,
  albumTemplate = Handlebars.compile(albumSource),
  albumPlaceholder = document.getElementById('album-info');

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
      success: function (response) {
        $('#user-profile').html('Welcome, <span class="name"> ' + response.display_name + '</span>!');
        $('#login').hide();
        $('#loggedin').show();
      }
    });

    var int = setInterval(function () {
      $.ajax({
        url: '/refresh_token',
        data: {
          'refresh_token': refresh_token
        }
      }).done(function (data) {
        access_token = data.access_token;
        timeout = data.timeout;
        console.log('token updated: ' + access_token);
      });
    }, (timeout * 1000) - 60);
  } else {
    // render initial screen
    $('#login').show();
    $('#loggedin').hide();
  }
}

$('.src-btn').on('click', function (event) {
  event.preventDefault();
  var value = $(".text-content").val();
  if (value.length == 0) {
    alert('Please enter something in the search box!');
  } else {
    if (value.split(':').length == 3) {
      var type = value.split(':')[1];
      var id = value.split(":")[2];
      if (type == 'artist') {
        $('#artist-info').html("");
        $('#artist-info').show();
        $('#album-info').hide();
        $('#track-info').hide();
        $.ajax({
          url: 'https://api.spotify.com/v1/artists/' + id,
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: function (data) {
            artistPlaceholder.innerHTML = artistTemplate(data);
          }
        });
      } else if (type == 'track') {
        $('#track-info').html("");
        $('#track-info').show();
        $('#album-info').hide();
        $('#artist-info').hide();
        $.ajax({
          url: 'https://api.spotify.com/v1/tracks/' + id,
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: function (data) {
            trackPlaceholder.innerHTML = trackTemplate(data);
          }
        });
      } else if (type == 'album') {
        $('#album-info').html("");
        $('#album-info').show();
        $('#track-info').hide();
        $('#artist-info').hide();
        $.ajax({
          url: 'https://api.spotify.com/v1/albums/' + id,
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: function (data) {
            albumPlaceholder.innerHTML = albumTemplate(data);
          }
        });
      } else {
        alert('Sorry, currently we only show info of Artist/Album/Track');
      }
    } else {
      alert("Please enter valid URI, you can't fool me!");
    }
  }

});

function getFeatures(id) {
  $.ajax({
    url: 'https://api.spotify.com/v1/audio-features/' + id,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    success: function (data) {
      html = '';
      html += "<ul class='gen-list'>";
      html += "<li class='link'><strong>danceability:</strong> " + data.danceability + "</li>";
      html += "<li class='link'><strong>energy:</strong> " + data.energy + "</li>";
      html += "<li class='link'><strong>loudness:</strong> " + data.loudness + "</li>";
      html += "<li class='link'><strong>speechiness:</strong> " + data.speechiness + "</li>";
      html += "<li class='link'><strong>acousticness:</strong> " + data.acousticness + "</li>";
      html += "<li class='link'><strong>instrumentalness:</strong> " + data.instrumentalness + "</li>";
      html += "<li class='link'><strong>liveness:</strong> " + data.liveness + "</li>";
      html += "<li class='link'><strong>valence:</strong> " + data.valence + "</li>";
      html += "<li class='link'><strong>tempo:</strong> " + data.tempo + "</li>";
      html += "</ul>"
      $('.audio-feature').html(html);
    }
  });
}