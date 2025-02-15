<template>
  <div class="post-list mb-10">
    <div class="h-[500px] flex flex-col">
      <DynamicScroller
        v-if="posts.length"
        class="h-full"
        :items="posts"
        :min-item-size="54"
        key-field="id"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
          >
            <PostCard class="w-[90%] lg:w-1/2 mx-auto" :post="item" />
          </DynamicScrollerItem>
        </template>

        <template #after>
          <template v-if="loading">
            <div v-for="i in 5" :key="i" class="w-[90%] lg:w-1/2 mx-auto">
              <PostSkelton />
            </div>
          </template>
          <div
            v-if="!hasMore"
            class="text-center text-gray-600 dark:text-gray-400 mt-4"
          >
            No more posts
          </div>
          <div
            ref="target"
            v-intersection-observer="[
              onIntersectionObserver,
              { scroller_wrapper },
            ]"
            class="h-5"
          ></div>
        </template>
      </DynamicScroller>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DynamicScroller } from "vue3-virtual-scroller";

import { vIntersectionObserver } from "@vueuse/components";

const posts = ref([]);
const page = ref(1);
const hasMore = ref(true);
const loading = ref(false);
const target = ref(null);

const fetchPosts = async () => {
  if (!hasMore.value || loading.value) return;
  loading.value = true;

  try {
    const { data } = await useDollarFetch(`posts?page=${page.value}`);
    const fetchedPosts = data.value.data;

    if (fetchedPosts?.length) {
      posts.value.push(...fetchedPosts);
      page.value++;
      scroller_wrapper.value.scrollTo({
        top: scroller_wrapper.value.scrollTop - 30,
        behavior: "smooth",
      });
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 400);
  }
};

const { debounce } = useHelpers();
const optimizedHandleIntersection = debounce(() => {
  fetchPosts();
}, 300);

function onIntersectionObserver([entry]: IntersectionObserverEntry[]) {
  optimizedHandleIntersection();
}

const scroller_wrapper = ref(null);
import { nextTick } from "vue";

onMounted(() => {
  nextTick(() => {
    scroller_wrapper.value = document.querySelector(".vue-recycle-scroller");
  });
  fetchPosts();
});
</script>

<style>
/* hide scroll */
/* .vue-recycle-scroller::-webkit-scrollbar {
  display: none;
}
.vue-recycle-scroller::-webkit-scrollbar-thumb {
  display: none;
}
.vue-recycle-scroller::-webkit-scrollbar-track {
  display: none;
} */

/* @media (min-width: 1024px) { */
.vue-recycle-scroller::-webkit-scrollbar {
  display: block;
  width: 6px;
}
.vue-recycle-scroller::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 10px;
}
/* } */
</style>
