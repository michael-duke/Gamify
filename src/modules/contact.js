const content = document.getElementById('content');

const contact = `
<div class="w-[900px] sm:w-screen mt-4 sm:mt-8 mx-auto p-6 shadow-lg rounded-lg bg-gray-100 text-gray-700">
  <h2 class="font-semibold text-3xl mb-5">Hello Gamers!</h2>
  <h3 class="text-slate-600 font-bold text-lg">
    Do you have any questions or you just want to say Hello? You can reach
    out to us!
  </h3>
  <hr class="my-6 border-gray-300" />
  <p>
  <ul class="text-slate-600 ml-16 font-bold list-disc">
    <li><p>Our e-mail: mail@mail.com</p></li>
    <li><p>Our phone number: +251(929)287463 / +2347018669454</p></li>
    <li><p>Our address: Streetname 22, 123456 City, Country</p></li>
  </ul>
  </p>
</div>
`;

const renderContact = () => {
  content.insertAdjacentHTML('beforeend', contact);
};

export default renderContact;