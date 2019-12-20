Vue.component('btntree', {
	template: `
<div data-id="btntree-template">
	<template v-if="!tree[config.group_property]">
	<button type="button" class="btntree-button" :name="tree.name"
		@click="onClickNode"
	>
  	<template v-for="n in (depth + 2)">&nbsp;</template>
  	<span>{{ tree[config.text_property] }}</span>
	</button>
	</template>
	<template v-else>
		<button type="button" class="btntree-button" :name="tree.name"
			@click="onClickTree"
		>
			<template v-for="n in depth">&nbsp;</template>
			<span v-if="tree[config.group_property].length === 0">
				{{ config.icon_empty }}
			</span>
			<span v-else-if="!tree[config.expanded_property]" >
				{{ config.icon_expand }}
			</span>
			<span v-else>
				{{ config.icon_shrink }}
			</span>
			<span>{{ tree[config.text_property] }}</span>
		</button>
 		<ul v-if="tree.expanded">
	  <template v-for="t in tree[config.group_property]">
				<li>
					<btntree 
						:tree="t" 
						:depth="depth + 1"
						:config="config"
						@btntree-click="onClickChildNode"
					/>
	     	</li>
	  </template>
	  </ul>
  </template>
</div>
`,
	methods: {
		'onClickChildNode': function(t, p) {
			// bubble
			p.splice(0, 0, this.tree);
			this.$emit('btntree-click', t, p);
		},
		'onClickNode': function() {
			// initial click
			this.$emit('btntree-click', this.tree, []);
		},
		'onClickTree': function() {
			let expandedPropName = this.config.expanded_property;
			// dynamically added expanded property as needed.
			if (!this.tree.hasOwnProperty(expandedPropName)) {
				this.$set(this.tree, expandedPropName, false);
			}
			this.tree[expandedPropName] = !this.tree[expandedPropName];
		}
	},
	props: {
		'tree': {
			type: Object
		},
		'depth': {
			type: Number,
			default: 0
		},
		'config': {
			type: Object,
			default: function () {
				return {
					'text_property': 'text',
					'group_property': 'contents',
					'icon_empty': '-',
					'icon_expand': '>',
					'icon_shrink': '<',
					'expanded_property': 'expanded'
				}
			}
		}
	}
});