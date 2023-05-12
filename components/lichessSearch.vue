<script>
import { Chess, validateFen } from 'chess.js';

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
          const chess = new Chess();
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
          chess.loadPgn(this.chessLink, { strict: false });
          const headers = chess.header();
          for (const key in headers) {
            chess.removeHeader(key);
          }
          let gameDetails = {
            pgn: chess.pgn().replaceAll(/{.*?}/gm, ""),
            color: 'white',
            url: "",
          }
          this.$emit('gameUpdated', gameDetails);
          return;

        } catch (error) {
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
      const regExp = /https:\/\/lichess.org\/(.*)\/?(.*)$/;
      var match = url.match(regExp);

      if (match && match[1].length == 8) {
        return {
          gameId: match[1],
          color: match.length == 3 ? match[2] : 'white'
        }
      } else {
        this.parsingError = true;
        return "error";
      }
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