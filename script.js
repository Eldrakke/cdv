const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const inquiryForm = document.querySelector('#inquiry-form');
inquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const needs = data.getAll('needs');
  const message = [
    'Olá, CDV! Gostaria de conversar sobre um evento.',
    '',
    '*Meu contato*',
    `Nome: ${data.get('name')}`,
    data.get('company') && `Empresa/instituição: ${data.get('company')}`,
    data.get('clientPhone') && `Meu WhatsApp: ${data.get('clientPhone')}`,
    '',
    '*Sobre o evento*',
    `Tipo: ${data.get('eventType')}`,
    `Data/período: ${data.get('date') || 'Ainda não definido'}`,
    `Local: ${data.get('location')}`,
    `Público estimado: ${data.get('audience') || 'Ainda não definido'}`,
    `Preciso de: ${needs.length ? needs.join(', ') : 'Gostaria de conversar para entender as possibilidades'}`,
    data.get('details') && `\n*Detalhes e objetivos*\n${data.get('details')}`,
  ].filter((line) => line !== false && line !== null && line !== undefined).join('\n');
  window.location.href = `https://wa.me/5561983491568?text=${encodeURIComponent(message)}`;
});

