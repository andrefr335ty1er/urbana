const webPlayer = async (accessToken) => {
    var deviceID = '';
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = accessToken;
      const player = new Spotify.Player({
        name: "Urbana Web Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.3,
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", (state) => {
        //console.log(state);
        //console.log("Paused:" + state.paused);
      });

      // Ready
      player.addListener("ready", async ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        await sessionStorage.setItem("deviceID", device_id);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      if (player.connect()) {
        console.log("Web Player connected!");
      }
    }

    //return deviceID;
}

export default webPlayer;