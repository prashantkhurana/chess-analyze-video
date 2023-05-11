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

<!-- <style scoped>
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
  background-color: #111;
}

/* Control the right side */
.right {
  right: 0;
  background-color: #111;
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
</style> -->

