<script>

export default {
    methods : {
        loadSample() {
            useTrackEvent('loadSampleGameAndVideo');
            this.$emit('loadSampleGameAndVideo');
        }

    },
    emits : ['loadSampleGameAndVideo']
}

</script>

<template>
    <div class="navbar bg-base-100 normal-case text-xl align-middle justify-center">
        <div>
            Analyze positions with video
        </div>
        <label for="my-modal-4"
               class="btn absolute right-12">What Is this and how to use?</label>

        <input type="checkbox"
               id="my-modal-4"
               class="modal-toggle" />
        <label for="my-modal-4"
               class="modal cursor-pointer">
            <label class="modal-box absolute right-12"
                   for="">
                <h3 class="text-lg font-bold">What is it?</h3>
                <p class="py-4">Many youtubers post analysis videos of their own games or games from various
                    tournaments.While watching the videos I wish I can follow along with a chessboard to play some of my own
                    moves in the position to see how they are 1 move blunder.
                </p>
                <h3 class="text-lg font-bold">How to Use?</h3>
                <ul class="list-disc">
                    <li>Get the link of the youtube video</li>
                    <li>If the game is on lichess, get the game link</li>
                    <ul class="list-disc list-inside">
                        <li>Note the game cannot be in a broadcast or study and should have a url like
                            lichess.org/gameId</li>
                    </ul>
                    <li>If the game is on chess.com, get the pgn and paste it (or <a href="https://lichess.org/paste" class="underline">import</a>  the game to lichess and paste the
                        url)</li>
                    <li>If you want to analyze a specific position from the video, use this awesome <a href="https://chrome.google.com/webstore/detail/chessvisionai-chess-posit/johejpedmdkeiffkdaodgoipdjodhlld" class="underline">Chessvision.ai extension</a>
                        and copy the fen of the position and paste it in.</li>
                </ul>
                <br/>
                <button class="btn-secondary" @click="loadSample" >Click for sample video and game</button>
            </label>
    </label>
</div></template>