<script>
import { Chess, validateFen } from 'chess.js';
import { getMovesFromPgn } from 'utils/utils';
export default {
  data() {
    return {
      chessLink: "",
      parsingError: false,
      errorText: "Cannot Parse. Please check link : example https://lichess.org/z5njiep5/black ",

    }
  },
  emits: ['gameUpdated'],
  mounted() {
    const input = this.$refs.input;
    input.setAttribute('size', input.getAttribute('placeholder').length);
  },
  methods: {
    urlSubmitted() {
      useTrackEvent('lichessSearch');
      if (!this.isValidHttpUrl(this.chessLink)) {
        try {
          const { ok, error } = validateFen(this.chessLink);
          if (ok) {
            let gameDetails = {
              pgn: "",
              fen: this.chessLink,
              color: 'white',
              url: "",
            }
            this.$emit('gameUpdated', gameDetails);
            return;
          }

          const moves = getMovesFromPgn(this.chessLink);
          let gameDetails = {
            pgn: moves,
            color: 'white',
            url: "",
          }
          this.$emit('gameUpdated', gameDetails);
          return;

        } catch (error) {
          console.log(error);
          this.parsingError = true;
        }
      }
      let gameDetails = this.getGameDetailsFromUrl(this.chessLink);
      if (this.parsingError) {
        return;
      }
      const pgn = this.getPgn(gameDetails).then(pgn => {
        gameDetails = {
          ...gameDetails,
          pgn: pgn,
          url: this.chessLink,

        }
        this.$emit('gameUpdated', gameDetails);
      });
    },
    isValidHttpUrl(string) {
      let url;

      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    },
    getGameDetailsFromUrl(url) {
      this.parsingError = false;
      if (url.indexOf("https://lichess.org/") === -1) {
        this.parsingError = true;
        return "error";
      }
      const gameIdAndColor = url.substring(this.endIndexOf(url, "https://lichess.org/") + 1);
      return {
        gameId: gameIdAndColor.split("/")[0],
        color: gameIdAndColor.indexOf("/") !== -1 ? gameIdAndColor.split("/")[1] : 'white'
      }

    },
    endIndexOf(string, substring) {
      var io = string.indexOf(substring);
      return io == -1 ? -1 : io + substring.length -1 ;
    },

    async getPgn(gameDetails) {
      const headers = { "accept": "application/json" };
      let method = "GET"
      const { data, pending, error } = await useFetch("https://lichess.org/game/export/" + gameDetails.gameId, {
        method, headers,
        query: { pgnInJson: true, tags: false, clocks: false, evals: false }
      })
      return data.value.pgn;
    }

  }
}
</script>


<template>
  <div class="flex justify-start gap-4">
    <textarea ref="input"
              @keyup.enter="urlSubmitted"
              v-model="chessLink"
              placeholder="Enter Lichess game or paste pgn/fen."
              class="border  border-sky-500" />
    <button @click="urlSubmitted"
            class="btn-primary font-bold rounded-md">Open For Analysis</button>
    <p v-if="parsingError">{{ errorText }}</p>
  </div>
</template>

<style>
input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  font-size: inherit;
}
</style>