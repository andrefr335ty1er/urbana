<template>
  <div>
    <div class="w-1/2">
      <div class="sticky h-10 items-center grid grid-cols-7 gap-4 border-b-2 z-10">
        <div class="col-span-1">#</div>
        <div class="flex col-span-3">TITLE</div>
        <div class="col-span-2">ALBUM</div>
        <div class="col-span-1">DURATION</div>
      </div>
      <!-- bg-gradient-to-r hover:from-orange-400 via-red-500 hover:to-pink-500 -->
      <div
        class="active-track items-center p-1 grid grid-cols-7 group gap-4 mb-2 hover:bg-gray-300 rounded-sm hover:shadow-lg"
        v-for="playlistTrack in playlistTracks"
        :key="playlistTrack.id"
        :id="playlistTrack.id"
      >
        <div class="col-span-1 items-center">
          <button class="focus:outline-none" v-on:click="activate(playlistTrack.id)">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" height="32" weight="32" class="opacity-0 border-pink-300 group-hover:opacity-100">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div class="flex col-span-3">
          <img width="50" height="50" :src="playlistTrack.image" class="mr-2" />
          <div class="flex flex-col items-start">
            <span class="one-line">{{ playlistTrack.name }} </span>
            <span class="one-line text-gray-600 text-sm">{{
              playlistTrack.artists
            }}</span>
          </div>
        </div>
        <div class="one-line col-span-2">{{ playlistTrack.album }}</div>
        <div class="col-span-1">{{ playlistTrack.duration }}</div>
      </div>


      <div>

      </div>
    </div>

    <footer class="fixed bottom-0 left-0 w-full">
      <div>Prendemos</div>
    </footer>
  </div>
</template>

<script>
import querystring from "querystring";
import moment from "moment";

export default {
  name: "Tracks",
  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      },
      playlistTracks: [],
      activeTrackID: '',
    };
  },
  mounted() {
    var url =
      "https://api.spotify.com/v1/playlists/" +
      this.$route.params.playlistID +
      "/tracks?" +
      querystring.stringify({
        fields:
          "items(track(album(name,images),artists(name),duration_ms,href,id,name,uri))",
      });

    this.$http
      .get(url, this.config)
      .then((response) => {
        console.log(response.data);

        var data = response.data.items;
        for (var i = 0; i < data.length; i++) {
          var artistName = "";
          for (var j = 0; j < data[i].track.artists.length; j++) {
            if (data[i].track.artists.length - 1 == j) {
              artistName += data[i].track.artists[j].name;
            } else {
              artistName += data[i].track.artists[j].name + ", ";
            }
          }

          var tempTime = moment.duration(data[i].track.duration_ms);
          var duration = tempTime.minutes() + ":" + tempTime.seconds();

          var obj = {
            number: i + 1,
            id: data[i].track.id,
            image: data[i].track.album.images[2].url,
            name: data[i].track.name,
            album: data[i].track.album.name,
            artists: artistName,
            duration,
          };

          this.playlistTracks.push(obj);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    activate(id){
      if(this.activeTrackID !== ''){
        var removeEl = document.getElementById(this.activeTrackID);
        removeEl.classList.remove("text-orange-500");  
      }

      this.activeTrackID = id;
      var el = document.getElementById(id);
      el.classList.add("text-orange-500");
    }
  }
};
</script>