<template>
  <div class="home">
    <h1>Hello</h1>
    <div id="login">
      <h1>This is an example of the Authorization Code flow</h1>
      <button v-on:click="login" class="btn btn-primary">Log in with Spotify</button>
    </div>
    <div id="loggedin">
      <div id="user-profile"></div>
      <div id="oauth"></div>
      <div id="playlists"></div>
      <button class="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>

      <button class="btn btn-default" id="obtain-playlists">Retrieve user playlists</button>
    </div>
  </div>
</template>

<script>
import querystring from "querystring";

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    login() {
      var state = this.generateRandomString(16);

      var redirect_uri = process.env.REDIRECT_URI;
      var client_id = process.env.CLIENT_ID; 
      var client_secret = process.env.CLIENT_SECRET; 

      console.log(client_id);
      console.log("client id: " + process.env.CLIENT_ID);
      // your application requests authorization
      var scope = "streaming playlist-read-private user-read-private user-read-email";
      window.location.replace(
        "https://accounts.spotify.com/authorize?" +
          querystring.stringify({
            response_type: "code",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
          })
      );
    },
    generateRandomString(length) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
  }
};
</script>
