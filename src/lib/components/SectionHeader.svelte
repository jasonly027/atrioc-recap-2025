<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    children?: Snippet<[]>;
    class?: ClassValue;
  }

  const { children, class: className }: Props = $props();
</script>

<h2 class={['text-center text-heading-sm sm:text-heading-lg', className]}>
  {@render children?.()}
</h2>
