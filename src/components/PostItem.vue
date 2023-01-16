<template>
  <div class="w-full shadow-lg bg-white rounded-lg">
    <div class="flex p-6 items-center">
      <div class="flex-auto text-slate-500 text-left">
        <div class="font-semibold">Post {{ post.id }}</div>
        {{ post.title }}
      </div>
      <div>
        <ArrowUp
          :data-testid="'arrow-up-' + index"
          class="cursor-pointer"
          @click="moveElement(index - 1)"
          v-if="!isFirstElement()"
        ></ArrowUp>
        <ArrowDown
          :data-testid="'arrow-down-' + index"
          class="cursor-pointer"
          @click="moveElement(index + 1)"
          v-if="!isLastElement()"
        ></ArrowDown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import type { PropType } from "vue";
import type { Post } from "@/types/Post";

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  arraySize: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["moveElement"]);
function isFirstElement(): boolean {
  return props.index === 0;
}
function isLastElement(): boolean {
  return props.index === props.arraySize - 1;
}
function moveElement(newIndex: number) {
  emit("moveElement", { post: props.post, oldIndex: props.index, newIndex });
}
</script>
