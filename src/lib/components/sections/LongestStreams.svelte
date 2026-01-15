<script lang="ts">
  import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { Bar } from 'svelte5-chartjs';
  import { intervalToDuration, formatDuration as formatDur } from 'date-fns';

  import Section from '../Section.svelte';
  import SectionHeader from '../SectionHeader.svelte';

  import { stats } from '$lib';

  Chart.register({
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
  });

  function formatDuration(seconds: number) {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    return formatDur(duration, { format: ['days', 'hours', 'minutes'] });
  }

  let innerWidth = $state(0);
  const labelRotation = $derived(innerWidth < 640 ? -50 : 0);

  const topics = [
    'Silksong Day 1, Sep. 4',
    'Atricon, Nov. 22',
    'Mario64 Speedrunners vs Hunters, Jan. 31',
    'Trump Inauguration & Stock Comp., Jan. 20',
    'Peak w/ friends, Jul. 21',
  ];

  const durations = stats.longest_streams.map((stream) => stream[0]);

  const data = {
    labels: topics,
    datasets: [
      {
        data: durations,
        axis: 'y',
        borderRadius: 5,
      },
    ],
  };
</script>

<svelte:window bind:innerWidth />

<Section id="longest-stream" nextId="fun-stats">
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
            formatter: formatDuration,
            rotation: labelRotation,
          },
        },
      }}
      plugins={[ChartDataLabels]}
    />
  </div>
</Section>
