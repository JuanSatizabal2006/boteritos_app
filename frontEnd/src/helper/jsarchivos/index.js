const accItems = document.querySelectorAll(".acc-item")
accItems.forEach(accItem =>{
  accItem.addEventListener('click', () =>{
    accItem.classList.toggle("open")
    accItem.classList.toggle("close")
  })
})