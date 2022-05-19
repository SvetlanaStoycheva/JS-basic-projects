const items = [...document.querySelectorAll('.number')];

const updateCount = (el) => {
  const value = parseInt(el.dataset.value);
  //incrementing by a random value. It will go faster if we divide by 100 => value/100
  const increment = Math.ceil(value / 1000);
  let initialValue = 0;

  const increaseCount = setInterval(() => {
    initialValue += increment;

    if (initialValue > value) {
      initialValue = value;
      clearInterval(increaseCount);
      return;
    }
    el.textContent = `${initialValue}+`;
  }, 1);
};

items.forEach((item) => {
  updateCount(item);
});
