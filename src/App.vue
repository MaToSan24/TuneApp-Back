<template>
  <div :class="containerClass">

    <div class="layout-main-container">
      <div class="layout-main">
          <router-view />
      </div>
    </div>
      
  </div>
</template>

<script>
  export default {
    data() {
        return {
            layoutMode: 'overlay',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
        }
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-static': this.layoutMode === 'static',
            }];
        }
    }
  }
</script>