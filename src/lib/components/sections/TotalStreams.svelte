<script lang="ts">
  import Section from '../Section.svelte';
  import Counter from '../Counter.svelte';
  import SectionHeader from '../SectionHeader.svelte';

  import { stats } from '$lib';
</script>

<Section id="total-streams" nextId="weekday-dist" class="gap-20">
  <SectionHeader>Stream Frequency</SectionHeader>

  <div class="flex flex-col justify-center gap-20 sm:flex-row sm:items-baseline">
    <div class=" flex flex-col items-center">
      <span class="text-[1.6rem]">Total Streams</span>
      <Counter value={stats.total_streams} class="-mt-3 w-[3ch] text-right text-8xl tracking-wide" />
    </div>

    <p class="max-w-105 text-xl sm:text-[1.6rem]">
      Atrioc streamed {((stats.total_streams / 365) * 100).toFixed(1)}% of the year! A stream is defined as every VOD
      for a given day.
    </p>
  </div>
</Section>
