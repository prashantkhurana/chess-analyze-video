
<script>
export default {
    props: ['videoUrl'],

}
</script>

<template>
    <div class="" v-if="videoUrl">
        <iframe :src="videoUrl" title="YouTube video player" frameborder="0" class ="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    </div>
    
</template>