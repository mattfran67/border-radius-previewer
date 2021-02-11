// Elementos DOM
const inputs = document.querySelectorAll('#borders input');
const showSizeInputs = document.querySelector('#showSizeInputs');
const sizeInputs = document.querySelectorAll('#widthHeight input');
const object = document.querySelector('#object');

const border = [
  'borderTopLeftRadius',
  'borderTopRightRadius', 
  'borderBottomRightRadius', 
  'borderBottomLeftRadius'
];

const size = ['width', 'height'];

// EventListeners
showSizeInputs.addEventListener('click', e => {
  document.querySelector('#widthHeight')
  .style.display = e.target.checked ? 'block' : 'none';
})

inputs.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    const value = inputFormat(e);

    object.style[border[index]] = `${Number(value)}px`;
  });
});

sizeInputs.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    const value = inputFormat(e);

    object.style[size[index]] = `${value}px`;
  });
})

// Funções
function inputFormat(e) {
  const pattern = /^((0|\d{1,2}|[1-4]\d{0,2})(\.\d{0,3})?)?$/;
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