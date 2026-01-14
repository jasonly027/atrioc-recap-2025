<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet<[]>;
  }

  const { children }: Props = $props();
</script>

<h2 class="text-center text-heading-sm sm:text-heading-lg">
  {@render children?.()}
</h2>
