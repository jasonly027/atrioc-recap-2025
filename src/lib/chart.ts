import { Chart } from 'chart.js';

const fontFamily = '-apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue';

Chart.defaults.color = 'oklch(98.4% 0.003 247.858)';
Chart.defaults.set('plugins.datalabels', {
  color: Chart.defaults.color,
  font: {
    size: 18,
    weight: 'bold',
    family: fontFamily,
  },
});

Chart.defaults.font.size = 18;
Chart.defaults.font.weight = 'bold';
Chart.defaults.font.family = fontFamily;

Chart.defaults.backgroundColor = ['hsl(268, 70%, 50%)', 'hsl(274, 90%, 70%)'];
