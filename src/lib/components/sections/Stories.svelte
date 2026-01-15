<script lang="ts">
  import Section from '../Section.svelte';
  import SectionHeader from '../SectionHeader.svelte';

  import { stats } from '$lib';

  const stories = [
    'Bridesmaid and her ChatGPT speech',
    'January 6th Tommyinit',
    "Twitch's free PC perk",
    'Navalny and Pickle Rick',
    'Racist Cuban/Dominican Uber driver',
    "xQc and Atrioc's Honda Fit",
    'Juno bails on watching Midsommar',
    'Atrioc gets an N64 for Christmas in Germany',
    "Twitch's open bar",
    "Twitch's nap pods",
  ];

  const counts = stats.storyCount.map(([_, count]) => count).slice(0, stories.length);
</script>

<Section id="stories" nextId="finale">
  <SectionHeader>Stories</SectionHeader>

  <iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/4Mye4rBaiUs?si=S3gl_7zegpbKhLOU&amp;start=5671"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
    class="aspect-video w-full rounded-lg"
  ></iframe>

  <p class="text-center text-xl sm:max-w-80">Anyways...</p>

  <table class="[&_th,td]:p-5">
    <caption class="sr-only">A count of every story Atrioc has told this year</caption>

    <thead>
      <tr class="bg-cgray-900 text-xl">
        <th class="rounded-tl-lg text-left">Story</th>
        <th class="rounded-tr-lg text-right">Count</th>
      </tr>
    </thead>

    <tbody class="[&_tr]:bg-cgray-900 [&_tr]:odd:bg-cgray-800">
      {#each stories as story, idx}
        <tr class="group">
          <td class="text-left wrap-break-word group-last:rounded-bl-lg">{story}</td>
          <td class="text-right group-last:rounded-br-lg">{counts[idx]}</td>
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
