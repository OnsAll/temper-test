<template>
  <div class="rounded-lg shadow-lg bg-white mb-3">
    <div class="bg-white p-3">
      <h5
        class="text-gray-600 text-xl leading-tight font-medium mb-2 text-left"
      >
        List of actions committed
      </h5>
    </div>
    <transition name="actions-list" mode="out-in">
      <transition-group
        v-if="actions.length"
        name="list"
        tag="div"
        class="p-6 bg-light-gray grid gap-y-px"
      >
        <ActionItem
          data-test-action-item="action-item"
          v-for="(action, index) in actions"
          :key="action.id"
          :action="action"
          :index="index"
          @rewindOrder="rewindOrder"
        ></ActionItem>
      </transition-group>
      <div v-else class="p-6 bg-light-gray grid gap-y-px text-center">
        No actions available
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import ActionItem from "@/components/ActionItem.vue";
import type { PropType } from "vue";
import type { Action } from "@/types/Post";

const emit = defineEmits(["rewindOrder"]);

defineProps({
  actions: Array as PropType<Action[]>,
});
function rewindOrder(index: number) {
  emit("rewindOrder", index);
}
</script>
<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-active {
  position: absolute;
}

.actions-list-enter-active,
.actions-list-leave-active {
  transition: 0.3s ease all;
}

.actions-list-enter-from,
.actions-list-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
