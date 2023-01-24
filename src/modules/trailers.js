const content = document.getElementById('content');

const trailers = `
<div class="trailers hide-section ml-2 mt-2 sm:mt-8 grid gap-4 grid-flow-col auto-cols-max overflow-x-scroll">
<div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white w-[450px] sm:w-[350px] h-[400px]">
    <iframe class="w-full h-2/3" src="https://www.youtube.com/embed/VbIc2_FwReE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="p-6">
      <h5 class="text-gray-900 text-2xl font-medium mb-2">Atomic Heart</h5>
      
    </div>
  </div>
</div>
<div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white w-[450px] sm:w-[350px] h-[400px]">
    <iframe class="w-full h-2/3" src="https://www.youtube.com/embed/N4RnZdWIOzo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="p-6">
      <h5 class="text-gray-900 text-2xl font-medium mb-2">FIFA |23</h5>
    </div>
  </div>
</div>
<div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white w-[450px] sm:w-[350px] h-[400px]">
    <iframe class="w-full h-2/3" src="https://www.youtube.com/embed/ONgW4-tZmR0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="p-6">
      <h5 class="text-gray-900 text-2xl font-medium mb-2">Need for Speed |2022</h5>
    </div>
  </div>
</div>
<div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white w-[450px] sm:w-[350px] h-[400px]">
    <iframe class="w-full h-2/3" src="https://www.youtube.com/embed/oceLRiqQsko" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="p-6">
      <h5 class="text-gray-900 text-2xl font-medium mb-2">The Lords of the Fallen</h5>
    </div>
  </div>
</div>
<div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white w-[450px] sm:w-[350px] h-[400px]">
    <iframe class="w-full h-2/3" src="https://www.youtube.com/embed/ssrNcwxALS4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="p-6">
      <h5 class="text-gray-900 text-2xl font-medium mb-2">Assassin's Creed Valhalla </h5>
    </div>
  </div>
</div>
<div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white w-[450px] sm:w-[350px] h-[400px]">
    <iframe class="w-full h-2/3" src="https://www.youtube.com/embed/nCk1__TYksU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="p-6">
      <h5 class="text-gray-900 text-2xl font-medium mb-2">High on Life</h5>
    </div>
  </div>
</div>
<div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white w-[450px] sm:w-[350px] h-[400px]">
    <iframe class="w-full h-2/3" src="https://www.youtube.com/embed/4weR8ODzCRQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="p-6">
      <h5 class="text-gray-900 text-2xl font-medium mb-2">Call of Duty Modern Warfare 2</h5>
    </div>
  </div>
</div>
</div>
`;

const renderTrailers = () => {
  content.insertAdjacentHTML('beforeend', trailers);
};

export default renderTrailers;