<template>
  <div class="flex-auto w-full shadow-lg bg-white p-2">
    <div class="flex flex-wrap p-2 gap-x-4">
      <div class="flex-auto text-slate-500 text-left">
        {{ getActionLabel() }}
      </div>
      <div>
        <button
          :data-test-travel-time="'travel-time-' + index"
          class="bg-green-temper-100 hover:bg-green-temper-200 text-light-green-temper font-bold py-2 px-4 rounded"
          @click="rewindOrder"
        >
          Time travel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Action } from "@/types/Post";

const emit = defineEmits(["rewindOrder"]);

const props = defineProps({
  action: {
    type: Object as PropType<Action>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
function rewindOrder() {
  emit("rewindOrder", props.index);
}
function getActionLabel(): string {
  return `Moved post ${props.action.post.id} from index ${props.action.oldIndex} to index ${props.action.newIndex}`;
}
</script>
