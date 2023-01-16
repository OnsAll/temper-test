<script setup lang="ts">
import PostsOverview from "@/components/PostsOverview.vue";
</script>

<template>
  <PostsOverview></PostsOverview>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.container {
  margin-top: 60px;
}
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wrapper:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 150px 1500px;
  border-color: transparent transparent transparent #7469be;
  left: 0;
  top: 0;
  position: absolute;
  z-index: -1;
}
@media (max-width: 600px) {
  .wrapper:after {
    border-width: 0 0 140px 500px;
  }
}
</style>
