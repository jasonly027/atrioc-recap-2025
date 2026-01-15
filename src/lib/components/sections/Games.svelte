<script lang="ts">
  import { BarController, BarElement, CategoryScale, Chart, LinearScale, LogarithmicScale } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { Bar } from 'svelte5-chartjs';

  import { intervalToDuration, formatDuration as formatDur } from 'date-fns';

  import Section from '../Section.svelte';
  import SectionHeader from '../SectionHeader.svelte';

  import { stats } from '$lib';
  import { startCase } from 'es-toolkit';

  Chart.register({
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
  });

  function formatDuration(seconds: number) {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    return formatDur(duration, { format: ['days', 'hours', 'minutes'] });
  }

  let innerWidth = $state(0);
  const labelRotation = $derived(innerWidth < 640 ? -50 : 0);

  const patchName: Record<string, string> = {
    ['aoe2']: 'AOE 2',
    ['tft']: 'TFT',
    ['minecraft rts']: 'Minecraft RTS',
    ["who's your daddy"]: "Who's Your Daddy?!",
    ['sc2']: 'SC2',
    ['osrs']: 'OSRS',
  };

  const games = stats.gameLengths
    .map(([name, duration]) => ({
      name: patchName[name as string] ?? startCase(name as string),
      duration,
    }))
    .reverse();

  const labels = games.map(({ name }) => name);

  const data = {
    labels,
    datasets: [
      {
        data: games,
        axis: 'y',
        parsing: {
          xAxisKey: 'duration',
          yAxisKey: 'name',
        },
        borderRadius: 5,
      },
    ],
  };
</script>

<svelte:window bind:innerWidth />

<Section id="games" nextId="ftc">
  <SectionHeader>Games by Duration</SectionHeader>

  <p class="text-xl">Something, something, JxmyHighroller.</p>

  <div class="relative h-360 w-[90vw] max-w-240">
    <Bar
      {data}
      options={{
        scales: { x: { display: false, type: 'linear' } },
        indexAxis: 'y',
        maintainAspectRatio: false,

        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            formatter: ({ duration }) => formatDuration(duration),
            rotation: labelRotation,
          },
        },
      }}
      plugins={[ChartDataLabels]}
    />
  </div>
</Section>
