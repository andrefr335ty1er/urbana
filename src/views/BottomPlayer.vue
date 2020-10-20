<template>
  <footer class="fixed bottom-0 left-0 w-full bg-gray-300 rounded-t-md">
    <div class="py-3 px-5 flex justify-between">
      <div class="flex">
        <img :src="this.trackImage" height="42" width="42" />
        <div class="flex flex-col items-start ml-4">
          <span>{{ this.trackTitle }}</span>
          <span class="text-gray-600 text-sm">{{ this.trackArtists }}</span>
        </div>
      </div>

      <div class="space-x-10">
        <button
          class="focus:outline-none"
          title="Previous"
          v-on:click="prevNextTrack('previous')"
        >
          <svg
            class="hover:text-orange-500"
            height="30"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
            />
          </svg>
        </button>
        <button class="focus:outline-none" title="Play">
          <svg
            class="hover:text-orange-500"
            height="38"
            width="38"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
        <button
          class="focus:outline-none"
          title="Next"
          v-on:click="prevNextTrack('next')"
        >
          <svg
            class="hover:text-orange-500"
            height="30"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
            />
          </svg>
        </button>
      </div>

      <div>
        <input
          class="rounded-lg focus:outline-none overflow-hidden appearance-none bg-gray-400 h-2 w-130"
          type="range"
          min="1"
          max="100"
          step="1"
          value="50"
          v-model="volume"
          v-on:change="adjustVolume"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import querystring from "querystring";

export default {
  name: "BottomPlayer",
  data() {
    return {
      volume: 50,
      config: {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      },
      deviceID: sessionStorage.getItem("deviceID"),
    };
  },
  props: ["trackImage", "trackTitle", "trackArtists"],
  methods: {
    prevNextTrack(prevNext) {
      var url =
        "https://api.spotify.com/v1/me/player/" +
        prevNext +
        "?" +
        querystring.stringify({
          device_id: this.deviceID,
        });
      this.$http
        .post(url, null, this.config)
        .then((response) => {
          console.log(prevNext);
          console.log(response);
        })
        .catch((e) => {
          if (e.response) {
            var err = e.response.data.error;
            console.log(err.status + " " + err.message);
          } else {
            console.log(e.status + " " + e.message);
          }
        });
    },
    adjustVolume() {
      console.log(this.volume);
      var url =
        "https://api.spotify.com/v1/me/player/volume?" +
        querystring.stringify({
          device_id: this.deviceID,
          volume_percent: this.volume,
        });
      this.$http
        .put(url, null, this.config)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          if (e.response) {
            var err = e.response.data.error;
            console.log(err.status + " " + err.message);
          } else {
            console.log(e.status + " " + e.message);
          }
        });
    },
  },
};
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  width: 15px;
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  cursor: pointer;
  background: #fff;
  box-shadow: -405px 0 0 400px #ed8936;
  border-radius: 100%;
}
</style>