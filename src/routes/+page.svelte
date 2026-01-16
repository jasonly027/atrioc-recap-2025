<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';

  import Landing from '$lib/components/sections/Landing.svelte';
  import TotalStreams from '$lib/components/sections/TotalStreams.svelte';
  import WeekdayDist from '$lib/components/sections/WeekdayDist.svelte';
  import CategoryDist from '$lib/components/sections/CategoryDist.svelte';
  import DanClancy from '$lib/components/sections/DanClancy.svelte';
  import LongestStreams from '$lib/components/sections/LongestStreams.svelte';
  import FunStats from '$lib/components/sections/FunStats.svelte';
  import Joeler from '$lib/components/sections/Joeler.svelte';
  import Gss from '$lib/components/sections/Gss.svelte';
  import NotableFigures from '$lib/components/sections/NotableFigures.svelte';
  import Collabs from '$lib/components/sections/Collabs.svelte';
  import Games from '$lib/components/sections/Games.svelte';
  import Ftc from '$lib/components/sections/Ftc.svelte';
  import Stories from '$lib/components/sections/Stories.svelte';
  import Yok from '$lib/components/sections/Yok.svelte';
  import ThankYou from '$lib/components/sections/ThankYou.svelte';
  import Author from '$lib/components/sections/Author.svelte';
  import '$lib/chart.ts';
</script>

<MetaTags
  title="Atrioc Recap - YOK 2025"
  description="A look back at all the things that happened with Atrioc in 2025."
  openGraph={{
    type: 'website',
  }}
/>

<Landing />
<TotalStreams />
<WeekdayDist />
<CategoryDist />
<DanClancy />
<LongestStreams />
<FunStats />
<Joeler />
<Gss />
<NotableFigures />
<Collabs />
<Games />
<Ftc />
<Stories />
<Yok />
<ThankYou />
<Author />
