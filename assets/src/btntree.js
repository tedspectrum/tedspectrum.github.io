Vue.component('btntree', {
  template: `
<div data-id="btntree-template">
  <button type="button" class="panel-button" :name="tree.name">
  	<template v-for="n in depth">&nbsp;</template>
  	<span v-if="tree.contents && (tree.contents.length !== 0)">
      +
    </span>
    <span v-else>&nbsp;</span>
  	<span>
    {{ tree.text ? tree.text : tree.path }}
    </span>
  </button>
 	<template v-if="tree.contents && (tree.contents.length !== 0)"> 		
 		<ul>
	  <template v-for="t in tree.contents">
	      <li>
	      	<btntree :tree="t" :depth="depth + 1"/>
	     	</li>
	  </template>
	  </ul>
  </template>
</div>
`,
  props: ['tree', 'depth']
});