<script lang="ts">
  // https://github.com/saadeghi/svelte-countup/issues/4

  import { inview } from 'svelte-inview';

  interface Props {
    value: number;
    initial?: number;
    duration?: number;
    step?: number;
    roundto?: number;
    format?: boolean;
    class?: string;
  }

  let { value, initial = 0, duration = 1000, step = 1, roundto = 1, format = true, ...rest }: Props = $props();

  let isInView: boolean = $state(false);

  function formatNumber(input: number) {
    if (format) {
      return Math.round(input).toLocaleString();
    }
    return input;
  }

  // svelte-ignore state_referenced_locally
  let counterResult: number = $state(initial);
  let timers: NodeJS.Timeout;

  // svelte-ignore state_referenced_locally
  while (duration / ((value - initial) / step) < 2) {
    step++;
  }

  timers = setInterval(
    () => {
      if (isInView) {
        if (counterResult < value) {
          counterResult += step;
        } else {
          clearInterval(timers);
          counterResult = Math.round(value / roundto) * roundto;
        }
      }
    },
    // svelte-ignore state_referenced_locally
    duration / ((value - initial) / step)
  );
</script>

<span
  use:inview
  oninview_change={(event: CustomEvent<ObserverEventDetails>) => {
    const { inView } = event.detail;
    isInView = inView;
  }}
  {...rest}
>
  {formatNumber(counterResult)}
</span>
