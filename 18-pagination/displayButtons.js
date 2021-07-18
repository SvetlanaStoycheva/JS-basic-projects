const displayButtons = (btnContainer, pages, index) => {
  //   console.log(btnContainer, pages, index);

  const btns = pages.map((item, i) => {
    return `
    <button class="page-btn 
    ${index === i ? 'active-btn' : null}" data-index='${i}'>${i + 1}</button>
    `;
  });
  btns.push(`<button class='next-btn'>next</button>`);
  btns.unshift(`<button class='prev-btn'>prev</button>`);
  btnContainer.innerHTML = btns.join('');
};

export default displayButtons;
