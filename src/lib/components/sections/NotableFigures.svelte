<script lang="ts">
  import Section from '../Section.svelte';
  import SectionHeader from '../SectionHeader.svelte';

  import { stats } from '$lib';
  import { startCase } from 'es-toolkit/compat';

  const people = stats.notableCount
    .map(([name, count]) => [startCase(name as string), count as number] as const)
    .slice(0, 21);

  const topPeople = $state(people.slice(0, 5).map(([name, count]) => ({ name, count, hidden: true })));
</script>

<Section id="notable-figures" nextId="collabs">
  <SectionHeader>Notable Figures</SectionHeader>

  <p class="max-w-65 text-center text-xl sm:max-w-lg">
    Throughout the year, Atrioc covered news on many well-known people. Who did he talk about the most?
  </p>

  <table class="[&_th,td]:p-5">
    <caption class="sr-only"> Atrioc's most mentioned notable figures</caption>

    <thead>
      <tr class="bg-cgray-900 text-xl">
        <th class="rounded-tl-lg text-left">Person</th>
        <th class="rounded-tr-lg text-right">Count</th>
      </tr>
    </thead>

    <tbody class="[&_tr]:bg-cgray-900 [&_tr]:odd:bg-cgray-800">
      {#each topPeople as { name, count, hidden }, idx}
        <tr class="group" onclick={() => (topPeople[idx]!.hidden = false)}>
          {#if hidden}
            <td colspan="2" class="cursor-pointer bg-primary-600 text-center tracking-wide group-even:bg-primary-500"
              >???</td
            >
          {:else}
            <td class="text-left group-last:rounded-bl-lg">{name}</td>
            <td class="text-right group-last:rounded-br-lg">{count}</td>
          {/if}
        </tr>
      {/each}

      {#each people.slice(5) as [name, count]}
        <tr class="group">
          <td class="text-left group-last:rounded-bl-lg">{name}</td>
          <td class="text-right group-last:rounded-br-lg">{count}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</Section>

<style>
  tbody > tr:nth-child(odd) {
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%2349404e' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
</style>
