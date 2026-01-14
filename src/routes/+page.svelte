<script lang="ts">
  import Landing from '$lib/components/sections/Landing.svelte';
  import TotalStreams from '$lib/components/sections/TotalStreams.svelte';
  import WeekdayDist from '$lib/components/sections/WeekdayDist.svelte';
  import CategoryDist from '$lib/components/sections/CategoryDist.svelte';
  import DanClancy from '$lib/components/sections/DanClancy.svelte';
  import LongestStream from '$lib/components/sections/LongestStream.svelte';
  import FunStats from '$lib/components/sections/FunStats.svelte';
  import Joeler from '$lib/components/sections/Joeler.svelte';
  import '$lib/chart.ts';
</script>

<Landing />
<TotalStreams />
<WeekdayDist />
<CategoryDist />
<DanClancy />
<LongestStream />
<FunStats />
<Joeler />
