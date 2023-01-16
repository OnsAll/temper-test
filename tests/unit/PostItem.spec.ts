import { shallowMount } from "@vue/test-utils";
import PostItem from "@/components/PostItem.vue";
import { mockPostList, post2 } from "./mocks/MockPost";

export const arrowUpSelector = (index: number) =>
  `[data-testid=arrow-up-${index}]`;
export const arrowDownSelector = (index: number) =>
  `[data-testid=arrow-down-${index}]`;

describe("PostItem.vue", () => {
  const props = {
    index: 1,
    arraySize: mockPostList.length,
    post: post2,
  };
  it("should show arrow up and down", () => {
    const wrapper = shallowMount(PostItem, { props });

    //except first and last post items arrow up and down should be visible
    expect(wrapper.find(arrowUpSelector(1))).toBeDefined();
    expect(wrapper.find(arrowDownSelector(1))).toBeDefined();
  });

  it("should show arrow down only", () => {
    const wrapper = shallowMount(PostItem, {
      props: {
        ...props,
        index: 0,
      },
    });

    //if post is first item in array, only arrow down should be visible
    expect(wrapper.find(arrowUpSelector(0)).exists()).toBeFalsy();
    expect(wrapper.find(arrowDownSelector(0))).toBeDefined();
  });

  it("should show arrow up only", () => {
    const wrapper = shallowMount(PostItem, {
      props: {
        ...props,
        index: mockPostList.length - 1,
      },
    });

    //if post is last item in array, only arrow up should be visible
    expect(
      wrapper.find(arrowUpSelector(mockPostList.length - 1))
    ).toBeDefined();
    expect(
      wrapper.find(arrowDownSelector(mockPostList.length - 1)).exists()
    ).toBeFalsy();
  });

  it("should emit event move post item when click on arrow down icon", async () => {
    const wrapper = shallowMount(PostItem, { props });

    //click arrow down on second item
    await wrapper.find(arrowDownSelector(1)).trigger("click");

    //test if event to move item is emitted
    expect(wrapper.emitted()).toHaveProperty("moveElement");

    const downEvent = await wrapper.emitted("moveElement")?.[0];

    //test if event props sent are correct
    expect(downEvent?.[0]).toMatchObject({
      oldIndex: 1,
      newIndex: 2,
      post: post2,
    });
  });

  it("should emit event move post item when click on arrow up icon", async () => {
    const wrapper = shallowMount(PostItem, { props });

    //click arrow up on second item
    await wrapper.find(arrowUpSelector(1)).trigger("click");

    //test if event to move item is emitted
    expect(wrapper.emitted()).toHaveProperty("moveElement");

    const downEvent = await wrapper.emitted("moveElement")?.[0];

    //test if event props sent are correct
    expect(downEvent?.[0]).toMatchObject({
      oldIndex: 1,
      newIndex: 0,
      post: post2,
    });
  });
});
