Vue.component('btntree', {
  template: `
<div data-id="btntree-template">
  <template v-if="!tree.contents">
    <button type="button" class="panel-button"
      @click="$emit('click-' + tree.name)">
      {{ tree.text ? tree.text : tree.path }}
    </button>
  </template>
  <template v-else>
    <template v-if="tree.contents.length === 0">
      <button type="button" class="panel-button">{{ tree.text ? tree.text : tree.path }}</button>
    </template>
    <template v-for="t in tree.contents">
      <btntree :tree="t" />
    </template>
  </template>
</div>
`,
  props: ["tree"]
});