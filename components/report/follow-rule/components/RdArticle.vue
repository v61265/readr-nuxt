<template>
  <article class="article">
    <section
      v-for="section in articleSections"
      :id="`section-${section.type}`"
      :key="section.type"
      :ref="`section`"
    >
      <RdArticleSection
        :loadScrollMagicScriptTimes="loadScrollMagicScriptTimes"
        :sectionArticle="section.value"
        :triggerHook="triggerHook"
        @toggleFull="toggleFull"
      />
    </section>
  </article>
</template>

<script>
/* global ScrollMagic */
/* eslint no-undef: "error" */
import RdArticleSection from './RdArticleSection.vue'

export default {
  components: {
    RdArticleSection,
  },
  props: {
    cmsData: {
      type: Object,
      default: () => {},
    },
    loadScrollMagicScriptTimes: {
      type: Number,
      default: 0,
    },
    triggerHook: {
      type: Number,
      default: 0.2,
    },
  },
  data() {
    return {
      contentGroup: [],
      sceneArray: [],
      heightArray: [],
      isLeave: false,
      isTouchStart: false,
      hasSendGa: false,
    }
  },
  computed: {
    viewportHeight() {
      return this.$store.getters[
        ('viewport/viewportHeight', 'viewport/viewportWidth')
      ]
    },
    articleSections() {
      return this.cmsData.contentApiData.article
    },
  },
  watch: {
    loadScrollMagicScriptTimes(times) {
      if (times === 4) this.addTagObserver()
    },
  },

  methods: {
    sendGaEvent({ action, label }) {
      this.$ga.event('projects', action, label)
    },
    addTagObserver() {
      // const triggerHook = 90 / this.viewportHeight
      this.$refs.section.map((target) =>
        this.heightArray.push(target.clientHeight)
      )
      const controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: this.triggerHook,
          reverse: true,
        },
      })
      for (let i = 0; i < this.articleSections.length; i++) {
        this.sceneArray[i] = new ScrollMagic.Scene({
          duration: this.heightArray[i],
          triggerElement: `#section-${i + 1}`,
        })
          .on('enter', () => {
            console.log('enter paragraph to', i + 1)
            this.$emit('chaneParagraph', i + 1)
          })
          .on('start end', (e) => {
            if (
              e.type === 'end' &&
              e.scrollDirection === 'FORWARD' &&
              i === 3 &&
              !this.hasSendGa
            ) {
              this.$ga.event('projects', 'click', '全文文末')
              this.hasSendGa = true
            } else if (
              (e.type = 'start' && e.scrollDirection === 'REVERSE' && i === 0)
            ) {
              this.$emit('toggleFull', 'enter')
            }
          })
          // .addIndicators() // add indicators (requires plugin)
          .addTo(controller)
      }
    },
    toggleFull(type) {
      this.$emit('toggleFull', type)
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  padding: 48px 20px;
  color: #000000;
  background-color: rgba(254, 234, 223, 1);
  @include media-breakpoint-up(md) {
    padding: 48px 100px;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 100px;
  }
}
</style>
