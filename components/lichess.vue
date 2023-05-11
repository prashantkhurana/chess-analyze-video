<script>

export default {
    props: ['url'],

}
</script>

<template>
  <div class="">
    <iframe v-if="url" :src=url class ="h-full w-full"  ></iframe>
  </div>
  
</template>