<template>
  <q-page class="flex flex-center">
    <custom-calendar />
  </q-page>
</template>

<style>
</style>

<script>
import CustomCalendar from 'components/CustomCalendar/CustomCalendar.vue'

export default {
  name: 'PageIndex',

  components: {
    CustomCalendar
  }
}
</script>
