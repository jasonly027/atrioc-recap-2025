<script lang="ts">
  import { Bar } from 'svelte5-chartjs';
  import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';

  import Section from '../Section.svelte';
  import SectionHeader from '../SectionHeader.svelte';
  import { stats } from '$lib';

  Chart.register({
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
  });

  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const days = Object.values(stats.weekdayDist).map((val, idx) => ({ day: labels[idx], ...val }));
  const largestCount = Math.max(...days.map(({ count }) => count));

  const data = {
    labels,
    datasets: [
      {
        data: days,
        parsing: {
          xAxisKey: 'day',
          yAxisKey: 'count',
        },
        borderRadius: 10,
      },
    ],
  };
</script>

<Section id="weekday-dist" nextId="category-dist" class="gap-15">
  <SectionHeader>Streams Per Week Day</SectionHeader>
  <div class="relative h-120 w-[90vw] max-w-240">
    <Bar
      {data}
      options={{
        scales: { y: { display: false, max: largestCount + 15 } },
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            labels: {
              count: {
                anchor: 'end',
                align: 'end',
                formatter: ({ count }) => count,
              },

              percent: {
                anchor: 'center',
                formatter: ({ percent }) => `${percent}%`,
              },
            },
          },
        },
      }}
      plugins={[ChartDataLabels]}
    />
  </div>
</Section>
