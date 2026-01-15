<script lang="ts">
  import Fact from '../Fact.svelte';
  import Section from '../Section.svelte';
</script>

<Section id="dan-clancy" nextId="longest-stream">
  <Fact>
    The Dan Clancy Power Hour was the only stream where all Atrioc did was waffle.

    {#snippet footer()}
      <iframe
        src="https://www.youtube-nocookie.com/embed/8F_9IwD6pbk?si=ygxHjsDnm7acrMGK"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="aspect-video w-full rounded-lg max-sm:max-w-48"
      ></iframe>
    {/snippet}
  </Fact>
</Section>
