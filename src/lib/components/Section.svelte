<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';

  type Props = SvelteHTMLElements['article'] & { nextId?: string };

  const { nextId, children, class: className, ...rest }: Props = $props();
</script>

<article
  class={[
    'relative flex min-h-[max(100vh,30rem)] flex-col items-center justify-center p-4 font-bold sm:text-lg',
    className,
  ]}
  {...rest}
>
  <div class="flex-1"></div>
  {@render children?.()}
  <div class="flex-1"></div>
  {#if nextId}
    <a href={`#${nextId}`} aria-label="Next Section"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        class=" size-8 stroke-cgray-400"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
      </svg></a
    >
  {/if}
</article>
