Vue.component('btntree', {
  template: `
<div data-id="btntree-template">
  <button type="button" class="panel-button" :name="tree.name">
    {{ tree.text ? tree.text : tree.path }}
  </button>
 	<template v-if="tree.contents && (tree.contents.length !== 0)"> 		
 		<ul>
	  <template v-for="t in tree.contents">
	      <li>
	      	<btntree :tree="t" />
	     	</li>
	  </template>
	  </ul>
  </template>
</div>
`,
  props: ["tree"]
});