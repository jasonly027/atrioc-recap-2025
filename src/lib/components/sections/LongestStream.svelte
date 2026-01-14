<script lang="ts">
  import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { Bar } from 'svelte5-chartjs';

  import Section from '../Section.svelte';
  import SectionHeader from '../SectionHeader.svelte';

  import { stats } from '$lib';

  Chart.register({
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
  });

  const topics = [
    'Silksong Day 1, Sep. 4',
    'Atricon, Nov. 22',
    'Mario64 Speedrunners vs Hunters, Jan. 31',
    'Trump Inauguration & Stock Comp., Jan. 20',
    'Peak w/ friends, Jul. 21',
  ];

  const durations = stats.longest_streams.map((stream) => stream[0]);

  function formatSeconds(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.round((seconds % 3600) / 60);
    return `${h} hrs and ${m} mins`;
  }

  let innerWidth = $state(0);
  const labelRotation = $derived(innerWidth < 640 ? -50 : 0);

  const data = {
    labels: topics,
    datasets: [
      {
        data: durations,
        axis: 'y',
        borderRadius: 7,
      },
    ],
  };
</script>

<svelte:window bind:innerWidth />

<Section id="longest-stream" nextId="fun-stats" class="gap-6">
  <SectionHeader>Longest Streams</SectionHeader>

  <div class="relative h-160 w-[90vw] max-w-240">
    <Bar
      {data}
      options={{
        scales: { x: { display: false } },
        indexAxis: 'y',
        maintainAspectRatio: false,

        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'start',
            formatter: formatSeconds,
            rotation: labelRotation,
          },
        },
      }}
      plugins={[ChartDataLabels]}
    />
  </div>
</Section>
