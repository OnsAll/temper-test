import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import PostsOverview from "@/components/PostsOverview.vue";
import axios from "axios";
import { post1, post2, post3, post4, post5, post6 } from "./mocks/MockPost";
import { arrowDownSelector, arrowUpSelector } from "./PostItem.spec";
import { Post } from "@/types/Post";

function getSortedPostIds(wrapper: VueWrapper): number[] {
  const posts = wrapper.findAll('[data-test-post-item="post-item"]');
  const sortedPosts = [];
  for (let i = 0; i < posts.length; i++) {
    const domPostId = (posts[i].getCurrentComponent()?.props?.post as Post)?.id;
    sortedPosts.push(domPostId);
  }
  return sortedPosts;
}
describe("PostsOverview.vue", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    //mock api call get posts
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: [post1, post2, post3, post4, post5, post6] });

    wrapper = mount(PostsOverview);
  });

  it("should swap post positions when pressing arrow down", async () => {
    const postPressIndex = 0;

    // Wait until the DOM updates.
    await flushPromises();

    await wrapper.find(arrowDownSelector(postPressIndex)).trigger("click");

    //test when click arrow down order of posts is correct
    expect(getSortedPostIds(wrapper)).toMatchObject([
      post2.id,
      post1.id,
      post3.id,
      post4.id,
      post5.id,
    ]);

    const actions = wrapper.findAll('[data-test-action-item="action-item"]');

    //after clicking on arrow down an action has to be added
    expect(actions.length).toBe(1);
    //test action props: post, old and new indexes are correct
    expect(actions[0].getCurrentComponent()?.props?.action).toMatchObject({
      newIndex: 1,
      oldIndex: 0,
      post: post1,
    });
  });
  it("should swap post positions when pressing arrow up", async () => {
    const postPressIndex = 3;

    await wrapper.find(arrowUpSelector(postPressIndex)).trigger("click");

    //test when click arrow up order of posts is correct
    expect(getSortedPostIds(wrapper)).toMatchObject([
      post1.id,
      post2.id,
      post4.id,
      post3.id,
      post5.id,
    ]);

    const actions = wrapper.findAll('[data-test-action-item="action-item"]');
    //after clicking on arrow up an action has to be added
    expect(actions.length).toBe(1);
    //test action props: post, old and new indexes are correct
    expect(actions[0].getCurrentComponent()?.props?.action).toMatchObject({
      newIndex: 2,
      oldIndex: 3,
      post: post4,
    });
  });

  it("should remove all actions above clicked action item including clicked item + reorder posts", async () => {
    const actionPressIndex = 2;

    //click multiple times on arrows up/down to reorder posts and add actions
    await wrapper.find(arrowDownSelector(0)).trigger("click");
    await wrapper.find(arrowDownSelector(1)).trigger("click");
    await wrapper.find(arrowDownSelector(2)).trigger("click");
    await wrapper.find(arrowUpSelector(1)).trigger("click");

    //click travel time button in action index 2
    await wrapper
      .find(`[data-test-travel-time=travel-time-${actionPressIndex}]`)
      .trigger("click");

    const actionsList = wrapper.findAll(`[data-test-action-item=action-item]`);

    //all actions above has to be removed including the clicked one, so only one action is left in actions array
    expect(actionsList.length).toBe(1);
    //test action left properties: post, old and new index are correct
    const action = actionsList[0].getCurrentComponent()?.props?.action;
    expect(action).toMatchObject({
      newIndex: 1,
      oldIndex: 0,
      post: post1,
    });

    //test posts order after rewind
    expect(getSortedPostIds(wrapper)).toMatchObject([
      post2.id,
      post1.id,
      post3.id,
      post4.id,
      post5.id,
    ]);
  });
});
