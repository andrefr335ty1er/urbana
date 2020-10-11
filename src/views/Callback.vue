<script>
import request from "request";
import querystring from "querystring";

export default {
  name: "Callback",
  data() {
    return {};
  },
  methods: {},
  mounted() {

    var redirect_uri = process.env.VUE_APP_REDIRECT_URI;
    var client_id = process.env.VUE_APP_CLIENT_ID; 
    var client_secret = process.env.VUE_APP_CLIENT_SECRET; 

    var urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get("code") || null;
    var state = urlParams.get("state") || null;

    if (state === null) {
      window.location.replace("/#" +
          querystring.stringify({
            error: "state_mismatch"
          })
      );
    } else {
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code"
        },
        headers: {
          Authorization: "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64")
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

          // pass the token to profile page
          window.location.replace("/profile?" +
              querystring.stringify({
                access_token: body.access_token,
                refresh_token: body.refresh_token
              })
          );
        } else {
          window.location.replace("/#" +
              querystring.stringify({
                error: "invalid_token"
              })
          );
        }
      });
    }
  }
};
</script>