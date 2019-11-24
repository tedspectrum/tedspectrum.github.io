Vue.component('panel', {
  template: `
<div data-id='panel-template'>
  <transition name='overlay'>
    <div v-if='active && overlay' class='overlay' @click='$emit("close")'></div>
  </transition>
  <transition :name='transition'>
    <div v-if='active' class='panel' :class='classes'>
      <slot></slot>
    </div>
  </transition>
</div>
`,
  props: ["classes", "transition", "active", "overlay"]
});