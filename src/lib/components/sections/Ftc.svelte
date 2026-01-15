<script lang="ts">
  import { stats } from '$lib';
  import Counter from '../Counter.svelte';
  import Fact from '../Fact.svelte';
  import Section from '../Section.svelte';
</script>

<Section id="ftc" nextId="stories">
  <Fact>
    Atrioc coerced <Counter
      value={stats.firstTimeChatter.total}
      class="inline-block w-[2ch] text-right underline decoration-2 underline-offset-4"
    /> first time chatters for a topic. Of those chatters, <Counter
      value={stats.firstTimeChatter.success}
      class="inline-block w-[2ch] text-right underline decoration-2 underline-offset-4"
    /> , chose to respond instead of leaving.
    {#snippet footer()}
      <div class="flex gap-6">
        <img src="/stare.webp" alt="Peepo Stare" />
        <img src="/stare.webp" alt="Peepo Stare" />
        <img src="/stare.webp" alt="Peepo Stare" />
      </div>
    {/snippet}
  </Fact>
</Section>
