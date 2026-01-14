<script lang="ts">
  import { stats } from '$lib';
  import Counter from '../Counter.svelte';
  import Fact from '../Fact.svelte';
  import Section from '../Section.svelte';
</script>

<Section id="fun-stats" nextId="joeler" class="gap-15">
  <Fact>
    Atrioc blew his nose <Counter
      value={stats.total_nose_blow}
      class="inline-block w-[2ch] text-right underline decoration-2 underline-offset-4"
    /> times during streams. Has he locked in the deviated septum surgery yet?
  </Fact>
  <Fact>
    Atrioc went to adjust his thermostat <Counter
      value={stats.total_ac_adjust}
      class="inline-block w-[2ch] text-right underline decoration-2 underline-offset-4"
    /> times during streams. Luckily, he has a mini split now.
  </Fact>
</Section>
