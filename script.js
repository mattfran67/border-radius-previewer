/* Elementos DOM */
// input
const inputs = document.querySelectorAll('#borders input');
const sizeInputs = document.querySelectorAll('#widthHeight input');
//checkbox
const showSizeInputs = document.querySelector('#showSizeInputs');
const showSideInputs = document.querySelector('#showSideInputs');
// objeto
const object = document.querySelector('#object');
// botão copiar
const copy = document.querySelector('#copy');
// modal
const modal = document.querySelector('.modal-container');

const border = [
  'borderTopLeftRadius',
  'borderTopRightRadius', 
  'borderBottomRightRadius', 
  'borderBottomLeftRadius',
  'borderRadius'
];

const size = ['width', 'height'];

/* EventListeners */

// Mostra os inputs de tamanho
showSizeInputs.addEventListener('click', ({ target: { checked }}) => {
  document.querySelector('#widthHeight')
  .style.display = checked ? 'block' : 'none';
});

// Mostra o input de todos os lados
showSideInputs.addEventListener ('click', ({ target: { checked }}) => {
  const display = checked ? 'none' : 'block';
  for (let i = 0; i < 4; i++) {
    inputs[i].style.display = display;
    inputs[i].previousElementSibling.style.display = display;
  }

  document.querySelector('#allSidesInput')
  .style.display = checked ? 'block' : 'none';
  inputs[4].value = '';
  object.style.borderRadius = '0';
});

// Muda o 'border-radius' do elemento
inputs.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    const value = inputFormat(e);

    object.style[border[index]] = `${Number(value)}px`;
  });
});

// Redimensiona o elemento
sizeInputs.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    const value = inputFormat(e);

    object.style[size[index]] = `${value}px`;
  });
});

// Copia o 'border-radius' do elemento
copy.addEventListener('click', () => {
  navigator.clipboard.writeText(object.style.borderRadius);
  modal.style.display = 'block';
  setTimeout(() => modal.style.display = 'none', 3900);
})

/* Funções */
function inputFormat(e) {
  const pattern = /^((0|[1-9]\d?|[1-4]\d{2})(\.\d{0,3})?)?$/;
  let value;

  e.preventDefault();
  value = e.target.value;

  if (/\d|\./.test(e.key)) {
    value += e.key;
  } else if (e.key === 'Backspace') {
    value = value.slice(0, value.length - 1);
  }
  
  e.target.value = pattern.test(value) ? value : e.target.value;
  return e.target.value;
}