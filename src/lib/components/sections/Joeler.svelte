<script lang="ts">
  import { stats } from '$lib';
  import Counter from '../Counter.svelte';
  import Section from '../Section.svelte';
  import SectionHeader from '../SectionHeader.svelte';
</script>

<Section id="joeler" class="gap-15">
  <SectionHeader>Joeler</SectionHeader>

  <div class="flex flex-col items-center gap-15">
    <img src="/joeler.avif" alt="Spinning Fish" />

    <p class="max-w-48 text-xl sm:max-w-96">
      Ari appeared in <Counter
        value={stats.total_joeler}
        class="inline-block w-[2ch] text-right underline decoration-2 underline-offset-4"
      /> streams! Let's look back on one such time where Atrioc also masterfully plugs his paid course.
    </p>

    <iframe
      src="https://www.youtube.com/embed/iauOFJG3KME?si=DrSSbhDZQKUFBvZU&amp;start=8373"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      class="h-45 w-full sm:h-54.75"
    ></iframe>
  </div>
</Section>
