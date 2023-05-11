<script>
export default {
    data() {
        return {
            youtubeUrl: "",
            errorText: "Cannot Parse Youtube Link. Please contact the author.",
            parsingError: false
        }
    },
    emits: ['videoIdUpdated'],
    mounted() {
        const input = this.$refs.input;
        input.setAttribute('size', input.getAttribute('placeholder').length);
    },
    methods: {
        urlSubmitted() {
            const videoId = this.getVideoIdFromUrl(this.youtubeUrl);
            if (this.parsingError) {
                return;
            }
            this.$emit('videoIdUpdated', videoId);

        },
        getVideoIdFromUrl(url) {
            this.parsingError = false;
            const videoId = 1;
            const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            } else {
                this.parsingError = true;
                return "error";
            }

        }
    }
}
</script>


<template>
    <div class="flex justify-start gap-4">
        <input ref="input"
               @keyup.enter="urlSubmitted"
               v-model="youtubeUrl"
               class="border border-sky-500"
               placeholder="Enter Youtube url" />
        <button @click="urlSubmitted"
                class="btn-primary font-bold rounded-md">Watch Video</button>
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