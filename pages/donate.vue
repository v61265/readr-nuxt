<template>
  <div>
    <RdHeader />
    <RdDonateContainer />
  </div>
</template>

<script>
import RdHeader from '~/components/shared/Header/RdHeader.vue'
import RdDonateContainer from '~/components/app/Donate/RdDonateContainer.vue'

import { SITE_TITLE } from '~/helpers/index.js'

export default {
  name: 'Donate',

  components: {
    RdHeader,
    RdDonateContainer,
  },
  head() {
    const metaTitle = `贊助 READr - ${SITE_TITLE}`

    return {
      title: metaTitle,
      meta: [{ hid: 'og:title', property: 'og:title', content: metaTitle }],
      script: [
        {
          hid: 'tappay',
          src: 'https://js.tappaysdk.com/tpdirect/v3',
          defer: true,
        },
      ],
    }
  },
}
</script>
