<script lang="ts">
  import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { Bar } from 'svelte5-chartjs';

  import { startCase } from 'es-toolkit';

  import Section from '../Section.svelte';
  import SectionHeader from '../SectionHeader.svelte';

  import { stats } from '$lib';

  Chart.register({
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
  });

  const other = { category: 'Other', count: 0, percent: 0 };
  const categories = Object.entries(stats.categoryDist)
    .map(([category, data]) => ({ category: startCase(category), ...data }))
    // Merge small categories into 'Other'
    .filter(({ count, percent }) => {
      if (count <= 2) {
        other.count += count;
        other.percent += percent;
        return false;
      } else {
        return true;
      }
    })
    .sort((a, b) => b.count - a.count);
  categories.push(other); // Other is always last

  // Patch House MD label
  const houseMd = categories.find(({ category }) => category === 'House Md');
  if (houseMd) {
    houseMd.category = 'House M.D.';
  }

  let innerWidth = $state(0);
  const labelRotation = $derived(innerWidth < 640 ? 50 : 0);

  const labels = categories.map(({ category }) => category);

  const data = {
    labels,
    datasets: [
      {
        data: categories,
        axis: 'y',
        parsing: {
          xAxisKey: 'count',
          yAxisKey: 'category',
        },
        borderRadius: 5,
      },
    ],
  };
</script>

<svelte:window bind:innerWidth />

<Section id="category-dist" nextId="dan-clancy">
  <SectionHeader>Category Frequency</SectionHeader>

  <p class="text-center text-xl">Nearly all streams included Atrioc waffling or reacting to something!</p>

  <div class="relative h-240 w-[90vw] max-w-240">
    <Bar
      {data}
      options={{
        scales: { x: { display: false }, y: { ticks: { minRotation: labelRotation } } },
        indexAxis: 'y',
        maintainAspectRatio: false,

        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            formatter: ({ percent }) => `${percent}%`,
          },
        },
      }}
      plugins={[ChartDataLabels]}
    />
  </div>
</Section>
