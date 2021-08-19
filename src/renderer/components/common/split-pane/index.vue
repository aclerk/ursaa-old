<template>
  <div ref="splitPane" class="daily-split-pane" :class="direction" :style="{ flexDirection: direction }">
    <div class="daily-pane daily-split-pane-one" :style="lengthType + ':' + paneLengthValue">
      <slot name="one"></slot>
    </div>
    <div
      class="daily-split-pane-trigger"
      :style="lengthType + ':' + triggerLengthValue"
      @mousedown="handleMouseDown"
    ></div>
    <div class="daily-pane daily-split-pane-two">
      <slot name="two"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'split-pane',
  props: {
    direction: {
      type: String,
      default: 'row'
    },
    min: {
      type: Number,
      default: 10
    },

    max: {
      type: Number,
      default: 90
    },

    paneLengthPercent: {
      type: Number,
      default: 50
    },

    triggerLength: {
      type: Number,
      default: 4
    }
  },
  computed: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    lengthType() {
      return this.direction === 'row' ? 'width' : 'height';
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    paneLengthValue() {
      return `calc(${this.paneLengthPercent}% - ${this.triggerLength / 2 + 'px'})`;
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    triggerLengthValue() {
      return this.triggerLength + 'px';
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      triggerLeftOffset: 0 // 鼠标距滑动器左(顶)侧偏移量
    };
  },
  methods: {
    // 按下滑动器
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleMouseDown(e) {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);

      if (this.direction === 'row') {
        this.triggerLeftOffset = e.pageX - e.srcElement.getBoundingClientRect().left;
      } else {
        this.triggerLeftOffset = e.pageY - e.srcElement.getBoundingClientRect().top;
      }
    },

    // 按下滑动器后移动鼠标
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleMouseMove(e) {
      const clientRect = this.$refs.splitPane.getBoundingClientRect();
      let paneLengthPercent = 0;

      if (this.direction === 'row') {
        const offset = e.pageX - clientRect.left - this.triggerLeftOffset + this.triggerLength / 2;
        paneLengthPercent = (offset / clientRect.width) * 100;
      } else {
        const offset = e.pageY - clientRect.top - this.triggerLeftOffset + this.triggerLength / 2;
        paneLengthPercent = (offset / clientRect.height) * 100;
      }

      if (paneLengthPercent < this.min) {
        paneLengthPercent = this.min;
      }
      if (paneLengthPercent > this.max) {
        paneLengthPercent = this.max;
      }

      this.$emit('update:paneLengthPercent', paneLengthPercent);
    },

    // 松开滑动器
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove);
    }
  }
};
</script>

<style scoped lang="less">
.daily-split-pane {
  height: 100%;
  display: flex;
  &.row {
    .daily-pane {
      height: 100%;
    }
    .daily-split-pane-trigger {
      height: 100%;
      cursor: col-resize;
    }
  }
  &.column {
    .daily-pane {
      width: 100%;
    }
    .daily-split-pane-trigger {
      width: 100%;
      cursor: row-resize;
    }
  }
  .daily-split-pane-one {
    background-color: #f3f3f3;
  }
  .daily-split-pane-trigger {
    user-select: none;
    background: #f1f1f1;
  }
  .daily-split-pane-two {
    flex: 1;
  }
}
</style>
