Vue.component('panel', {
  template: `
<div data-id='panel-template'>
  <transition name='overlay'>
    <div v-if='active' class='overlay' @click='$emit("panel-close")'></div>
  </transition>
  <transition :name='transition'>
    <div v-if='active' class='panel' :class='classes'>
      <slot></slot>
    </div>
  </transition>
</div>
`,
  props: ["classes", "transition", "active"]
});