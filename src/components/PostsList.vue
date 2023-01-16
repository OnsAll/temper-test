<template>
  <div class="mb-8">
    <div class="text-left text-xl font-bold mb-8 text-white">
      <label> Sortable Post List </label>
    </div>
    <transition-group name="post" tag="div" class="grid gap-6">
      <PostItem
        data-test-post-item="post-item"
        v-for="(post, index) in posts"
        :key="post.id"
        :post="post"
        :index="index"
        :arraySize="posts ? posts.length : 0"
        @moveElement="moveElement"
      ></PostItem>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import PostItem from "./PostItem.vue";

import type { PropType } from "vue";
import type { Action, Post } from "@/types/Post";

defineProps({
  posts: Array as PropType<Post[]>,
});

const emit = defineEmits(["moveElement"]);

function moveElement(action: Action) {
  emit("moveElement", action);
}
</script>
<style scoped>
.post-move {
  transition: all 0.75s ease;
}
</style>
