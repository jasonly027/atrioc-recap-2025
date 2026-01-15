<script lang="ts">
  import type { Snippet } from 'svelte';
  import Section from '../Section.svelte';
  import SectionHeader from '../SectionHeader.svelte';
  import Counter from '../Counter.svelte';
  import { stats } from '$lib';
</script>

{#snippet fillerContainer(id: string, content: Snippet<[]>, nextId?: string)}
  <div
    {id}
    class="flex min-h-[max(100vh,30rem)] flex-col items-center justify-center p-4 text-heading-sm font-bold sm:text-heading-lg"
  >
    <div class="flex-1"></div>
    <div class="flex flex-col items-center justify-center gap-15">
      {@render content()}
    </div>
    <div class="flex-1"></div>
    {#if nextId}
      <a href={`#${nextId}`} aria-label="Next Section" class="mt-8 mb-4"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class=" size-8 stroke-cgray-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
        </svg></a
      >
    {/if}
  </div>
{/snippet}

{#snippet filler1()}
  <div class="max-w-96 text-center sm:max-w-120">Finally, the moment we've all be waiting for...</div>
{/snippet}

{#snippet filler2()}
  <div class="max-w-96 text-center sm:max-w-120">The question every chatter wants the answer to...</div>
{/snippet}

{#snippet filler3()}
  <div>...</div>
{/snippet}

{#snippet filler4()}
  <img src="/flork.webp" alt="Flork waiting emote" />
{/snippet}

{#snippet filler5()}
  <img src="/madgetime.webp" alt="Madgetime emote" />
{/snippet}

{#snippet filler6()}
  <img src="/yok.avif" alt="YOK emote" />
{/snippet}

{@render fillerContainer('finale', filler1, 'filler-2')}
{@render fillerContainer('filler-2', filler2, 'filler-3')}
{@render fillerContainer('filler-3', filler3, 'filler-4')}
{@render fillerContainer('filler-4', filler4, 'filler-5')}
{@render fillerContainer('filler-5', filler4, 'filler-6')}
{@render fillerContainer('filler-6', filler5, 'filler-7')}
{@render fillerContainer('filler-7', filler6, 'yok')}

<Section id="yok" nextId="thank-you">
  <SectionHeader>Year of Kindness</SectionHeader>

  <div class="flex flex-col items-center justify-center gap-8 text-center text-8xl sm:flex-row sm:items-baseline">
    <Counter value={stats.total_yok} />

    <div class="flex items-baseline justify-center">
      <img src="/yok.avif" alt="YOK emote" />
      <span>'s</span>
    </div>
  </div>

  <p class="max-w-96 text-center text-xl">
    Atrioc crashed out <span class="underline underline-offset-2">at least</span>
    {stats.total_yok} times towards his chat. For some chatters' interpretations, this will be more.
  </p>
</Section>
