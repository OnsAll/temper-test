<template>
  <div class="wrapper">
    <div
      class="grid container md:grid-cols-2 sm:grid-cols-1 gap-x-28 gap-y-4 mx-auto px-4"
    >
      <div>
        <div class="flex flex-col items-center" v-if="!loading && !posts">
          Something went wrong while retrieving posts...
          <div class="mt-3">
            <button
              type="button"
              class="flex bg-green-temper-100 hover:bg-green-temper-200 text-light-green-temper font-bold py-2 px-4 rounded"
              @click="getPostsList()"
            >
              <ArrowPath></ArrowPath>
              Retry
            </button>
          </div>
        </div>
        <PostsList v-else :posts="posts" @moveElement="moveElement"></PostsList>
      </div>
      <div>
        <ActionsList
          :actions="actions"
          @rewindOrder="rewindOrder"
        ></ActionsList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostsList from "@/components/PostsList.vue";
import ActionsList from "@/components/ActionsList.vue";
import PostService from "@/services/PostService";
import { onMounted, ref } from "vue";
import type { Action, Post } from "@/types/Post";
import ArrowPath from "@/components/icons/ArrowPath.vue";

const posts = ref();
const actions = ref([] as Action[]);
const loading = ref(true);

async function getPostsList() {
  loading.value = true;
  posts.value = await PostService.getPosts();
  loading.value = false;
}

function swapElements(
  elements: Post[],
  oldIndex: number,
  newIndex: number
): Post[] {
  const temp = elements[oldIndex];
  elements[oldIndex] = elements[newIndex];
  elements[newIndex] = temp;
  return elements;
}
async function moveElement(action: Action) {
  posts.value = swapElements(
    [...posts.value],
    action.oldIndex,
    action.newIndex
  );
  addAction(action);
}
function addAction(action: Action) {
  actions.value.unshift({
    ...action,
    id: Math.random(),
  });
}

function rewindOrder(index: number) {
  let copyPost = [...posts.value];

  // swap elements back to old order
  for (let i = 0; i <= index; i++) {
    copyPost = swapElements(
      copyPost,
      actions.value[i].oldIndex,
      actions.value[i].newIndex
    );
  }

  posts.value = copyPost;
  //remove all actions that has index equal or above the selected action item
  actions.value = actions.value.filter((_, actionIndex) => actionIndex > index);
}
onMounted(() => {
  getPostsList();
});
</script>
