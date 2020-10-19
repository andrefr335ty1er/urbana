<template>
  <div class="bg-gradient-to-b from-orange-400 via-red-500 to-pink-500 h-full">
    <div class="flex flex-row-reverse p-5">
      <a :href="this.profile.external_urls.spotify">
        <img class="rounded-full h-40" :src="this.profile.images[0].url" />
      </a>
      <div class="flex flex-col-reverse">
        <p class="text-3xl text-white">{{ this.profile.display_name }}</p>
        <p class="text-lg text-left text-white">PROFILE</p>
      </div>
    </div>

    <h2 class="text-left text-2xl text-white">Playlists</h2>

    <div class="flex flex-start flex-wrap sm:flex-wrap md:flex-wrap">
      <div
        class="w-40 p-4 m-2 bg-red-300 hover:cursor-pointer rounded-md bg-no-repeat bg-right-bottom"
        v-on:click="getPlaylistItems(playlist.id)"
        v-for="playlist in playlists"
        :key="playlist.id"
      >
        <img
          class="justify-center object-cover"
          :src="
            playlist.images.length > 0
              ? playlist.images[0].url
              : require('@/assets/music.png')
          "
        />
        <dd class="mt-2 justify-center text-white">{{ playlist.name }}</dd>

        <!-- <button class="w-10 absolute bottom-0 right-0"><img :src="backgroundUrl"></button> -->
      </div>
    </div>
  </div>
</template>

<script src="https://sdk.scdn.co/spotify-player.js"></script>
<script>
import request from "request";
import webPlayer from "./WebPlayer.js";
import querystring from "querystring";
import backgroundUrl from "@/assets/play.png";

export default {
  name: "Profile",
  data() {
    return {
      backgroundUrl,
      profile: {},
      playlists: [],
      config: {
        headers: {
          Authorization: "Bearer " + this.getURLParams().get("access_token"),
        },
      },
    };
  },
  methods: {
    getURLParams() {
      var urlParams = new URLSearchParams(window.location.search);
      return urlParams;
    },
    refreshToken(refresh_token) {
      console.log("Getting new access token [start]");

      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
          Authorization:
            "Basic " +
            new Buffer(
              process.env.VUE_APP_CLIENT_ID + ":" + process.env.VUE_APP_CLIENT_SECRET
            ).toString("base64"),
        },
        form: {
          grant_type: "refresh_token",
          refresh_token: refresh_token,
        },
        json: true,
      };

      var new_token;
      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //sessionStorage.setItem('accessToken', body.access_token);
          new_token = body.access_token;
        }
      });

      console.log("Getting new access token [end]");
      return new_token;
    },
    getPlaylistItems(playlistID) {
      this.$router.push({ name: 'Tracks', params : { playlistID } });
    },
  },
  mounted() {
    var access_token = this.getURLParams().get("access_token") || null;
    var refresh_token = this.getURLParams().get("refresh_token") || null;
    var error = this.getURLParams().get("error") || null;

    if (error) {
      alert("There was an error during the authentication");
    } else {
      if (access_token) {
        this.$http
          .get("https://api.spotify.com/v1/me/playlists", this.config)
          .then((response) => {
            //console.log(response.data.items);
            this.playlists = response.data.items;
          })
          .catch((error) => {
            console.log(error);
          });

        this.$http
          .get("https://api.spotify.com/v1/me", this.config)
          .then((response) => {
            this.profile = response.data;
            sessionStorage.setItem("userID", response.data.id);
            sessionStorage.setItem("accessToken", access_token);
          })
          .catch((error) => {
            console.log(error);
          });

        // initialize the web player
        webPlayer(access_token);
        
      }
    }

    //setTimeout(this.readyWebPlayer(this.refreshToken(refresh_token)), 60);
  },
};
</script>


<style scoped>
</style>