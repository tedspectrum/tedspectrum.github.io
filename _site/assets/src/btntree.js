Vue.component('btntree', {
  template: `
<div data-id="btntree-template">
  <template v-if="!tree.contents">
    <button type="button" class="panel-button"
      @click="onBtnClick(tree)">
      {{ tree.text ? tree.text : tree.path }}
    </button>
  </template>
  <template v-else>
    <template v-if="tree.contents.length === 0">
      <button type="button" class="panel-button"
      @click="onBtnClick(tree)">
      {{ tree.text ? tree.text : tree.path }}
      </button>
    </template>
    <template v-for="t in tree.contents">
      <btntree :tree="t" 
			@btnclick="onBtnClick(t)"
      />
    </template>
  </template>
</div>
`,
	methods: {
		onBtnClick: function(b) {
			this.$emit('btnclick', b);
		}
	},
  props: ["tree"]
});