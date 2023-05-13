<script>
export default defineNuxtComponent({
  data() {
    return {
      //videoUrl: "https://www.youtube.com/embed/_12GLmqEvE0",
      videoUrl : "",
       //lichessUrl : "https://lichess.org/broadcast/superbet-chess-classic-romania/round-1/AbANFXsd"
       //lichessUrl : "https://lichess.org/analysis/pgn/1. d4 c6 2. c4 d6 3. Nc3 Nf6 4. e4 Bd7 5. e5 dxe5 6. dxe5 Bg4 7. f3 Qxd1+ 8. Nxd1 Nfd7 9. fxg4 Nxe5 10. Nf3 Ned7 11. Bd2 e6 12. Bc3 Be7 13. Be2 Na6 14. O-O O-O 15. Nf2 Bf6 16. Bxf6 Nxf6 17. g5 Nd7 18. g6 Nac5 19. gxh7+ Kxh7 20. Nd3 Kg8 21. Nxc5 Nxc5 22. Rad1 Rac8 23. b4 Na6 24. c5 Nc7 25. a3 Nd5 26. Rb1 Ne3 27. Rfe1 Nd5 28. Bf1 Rfd8 29. Bc4 f6 30. Bxd5 cxd5 31. Nd4 e5 32. Nf5 d4 33. Nd6 Rd7 34. Rbd1 Rcd8 35. Nf5 b6 36. g4 bxc5 37. bxc5 Rd5 38. Rc1 Rc8 39. c6 Kf7 40. Nd6+ Rxd6 41. c7 Rxc7 42. g5 Rdd7 43. g6+ Ke6 44. Rcd1 d3 45. Rf1 d2 46. h4 Rc1 47. Rf2 Rxd1+ 48. Kg2 e4 49. h5 Re1 50. h6 d1=Q 51. h7 Rg1+ 52. Kh3 Rh1+ 53. Kg3 Qg1+ 54. Kf4 Qxf2+ 55. Kxe4 Qf3+"
       //lichessUrl : "https://lichess.org/broadcast/2023-tepe-sigeman--co/round-5/GNxeGsCm",
      //  lichessUrl : "https://lichess.org/study/embed/GNxeGsCm/bfZ6IaPF"
      lichessUrl : ""
      }

  },


  methods: {
    getVideoUrl(videoId) {
      this.videoUrl = "https://www.youtube.com/embed/" + videoId;
    },
    getLichessUrl(gameDetails) {
      if (gameDetails.fen) 
      { 
        this.lichessUrl = "https://lichess.org/analysis/" + gameDetails.fen;
        return;
      }
      this.lichessUrl = "https://lichess.org/analysis/pgn/" + gameDetails.pgn + "?color=" + gameDetails.color;
    },
    loadSampleGameAndVideo() {
      this.lichessUrl = `https://lichess.org/analysis/pgn/1. e4 c5 2. Nf3 Nc6 3. Bb5 g6 4. Nc3 Bg7 5. O-O Nf6 6. Re1 O-O 7. Bf1 d6 8. h3 a6 9. d3 b5 10. Be3 Bb7 11. Qd2 Re8 12. Ne2 d5 13. e5 Nd7 14. e6 fxe6 15. Ng5 d4 16. Bf4 Nf8 17. Bh2 e5 18. Ng3 Rc8 19. f4 exf4 20. Qxf4 Qd5 21. Re4 Bh6 22. h4 Ne6 23. Qg4 Nxg5 24. hxg5 Bxg5 25. Rae1 Be3+ 26. Kh1 Rf8 27. c4 bxc4 28. dxc4 Qf7 29. Bd3 Nb4 30. R4xe3 dxe3 31. Rxe3 Nxd3 32. Rxd3 Qf2 0-1`;
this.videoUrl = "https://www.youtube.com/embed/11hlPJYNX_s";
    }
  }
})

</script>

<template >
  <Title>
    Analyze chess positions with video. Watch video and analyze side by side.
  </Title>
  <Meta>
    Analyze chess positions with video. Watch video and analyze side by side.
  </Meta>
  <div class="h-screen">
    <Header class="flex flex-row justify-center h-10 align-middle" @load-sample-game-and-video="loadSampleGameAndVideo"></Header>
    <div class="flex flex-row justify-between m-5">
      <LichessSearch  @game-updated="getLichessUrl"></LichessSearch>
      <YoutubeSearch @video-id-updated="getVideoUrl"></YoutubeSearch>
    </div>
    <div class="flex h-5/6">
      <Lichess :url = "lichessUrl" class="h-full w-1/2"></Lichess>
      <Youtube :video-url="videoUrl" class="h-full w-1/2 "></Youtube>
    </div>
  </div>
</template>




<style scoped>
/* Split the screen in half */
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

/* Control the left side */
.left {
  left: 0;
  /* background-color: #111;   */
}

/* Control the right side */
.right {
  right: 0;
  /* background-color: #111; */
}

.lichess-board {
  height: 100%;
  width: 100%;
}

.youtube {
  /* height: 500%;
  width: 50%;
  position: relative; */
  /* z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px; */
}
</style>