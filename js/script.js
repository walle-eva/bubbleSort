 
class Books {
   constructor(){	
      let  booksAdd = document.querySelector('.button-get');
      booksAdd.addEventListener('click', this.addBooks.bind(this));
	  
	  let  booksSort = document.querySelector('.button-sort');
      booksSort.addEventListener('click', this.sortBooks.bind(this));
	  
	  let  booksDel = document.querySelector('.button-reset');
      booksDel.addEventListener('click', this.delBooks.bind(this));
	  
	  

   }

   //кол-во книг на полке, в зависимости от ширины окна браузера
   getbookAmount(){
	  let bookshelf = document.querySelector('.bookshelf');
	  let bookshelfWidth = bookshelf.clientWidth;
	  let bookWidth = 50;//ширина книги
	  let bookAmount = Math.floor(bookshelfWidth / bookWidth);
	  return bookAmount;
   }
   
   //номера томов книг в случайном порядке при расстановке книг на полке
   getRandom(min, max, num){
	   let arr = []; 
	   let res = [];
	   for(let i = min; i <= max; i++ ){
		   arr.push(i);
	   }	   
	   for(let i = 0; i < num; i++){
	      res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0])
	   }
	   return res;
   }
  
   //ставим книги на полку
   addBooks(){
      let bookshelf = document.querySelector('.bookshelf-containerbooks');
	  let bookAmaunt = this.getbookAmount();
	  let numb = this.getRandom(1, bookAmaunt, bookAmaunt);
	  let info = document.querySelector('.info');
	  let booksSort = document.querySelector('.button-sort > button');
	  let booksDel = document.querySelector('.button-reset > button');
	  
	  //если полка с книгами заполнена, удаляем книги, заполняем новыми
	  if(bookshelf.children.length){
		 while (bookshelf.firstChild) {
            bookshelf.removeChild(bookshelf.firstChild);
	     }
	  }
	  
	  if(info.children.length){
	     while (info.firstChild) {
            info.removeChild(info.firstChild);
	     }
		 info.classList.remove('active');
	  }
	  
	  if(booksSort.hasAttribute('disabled')){
		  booksSort.removeAttribute('disabled');
		  booksSort.classList.remove('disable');
	  }
	  
	  if(booksDel.hasAttribute('disabled')){
		  booksDel.removeAttribute('disabled');
		  booksDel.classList.remove('disable');
	  }
	  
	  //заполнение полки книгами
	  for(let i = 0; i < bookAmaunt; i++){
		  let bookContainer = document.createElement('div');
		  bookContainer.classList.add('book');
		  bookContainer.style.left = i * 50 + 'px';
		  
		  let bookNumb = document.createElement('span');
		  bookNumb.classList.add('book-numb');
		  bookNumb.setAttribute('data-numb', numb[i]);
		  bookNumb.innerHTML = numb[i];
		  bookContainer.appendChild(bookNumb);
		  bookshelf.appendChild(bookContainer);
	  }
   }
   
   //сортируем книги на полке
   sortBooks(){ 	  
	  event.target.setAttribute("disabled", "true");
	  event.target.classList.add('disable');
	  //коллекция книг
	  let arrBooks = document.querySelectorAll('.book');
	  arrBooks = Array.from(arrBooks);
	  //получаем номера томов
	  let arrBooksNumb = arrBooks.map((item) => {
	     return (
		    +item.innerText
		 )
	  })
	  
	  let info = document.querySelector('.info');
	  let infoStartSort = document.createElement('p');
	  let currentInfoStart = document.createElement('p');
	  
	  info.classList.add('active');
	  infoStartSort.classList.add('info-start-end');
	  infoStartSort.innerHTML = 'Идёт сортировка:';
	  
	  currentInfoStart.classList.add('info-current');
	  currentInfoStart.innerHTML = 'Исходные данные <br>' + arrBooksNumb;
	  
	  info.appendChild(infoStartSort);
	  info.appendChild(currentInfoStart);
	  
	  //задержка для елементов цикла
	  function sleep(ms) {
	   	 return new Promise(resolve => setTimeout(resolve, ms));
	  }
	  //сброс цикла
	  function breakSort(){
		 if(info.classList.contains('active')){
		    return true;
		 }else {
			return false;
		 }
	  }  
		
	  async function animateSort() {	
	     //сортировка пузырьком
		 for(let i = 0, endI = arrBooksNumb.length - 1; i < endI; i++){
            let wasSwap = false;
		    for (let j = 0, endJ = endI - i; j < endJ; j++)  {
		       if (arrBooksNumb[j] > arrBooksNumb[j + 1]) {		
			      //меняем местами элементы в массиве
				  [arrBooksNumb[j], arrBooksNumb[j + 1]] = [arrBooksNumb[j + 1], arrBooksNumb[j]];
			      [arrBooks[j], arrBooks[j + 1]] = [arrBooks[j + 1], arrBooks[j]];
			       wasSwap = true;
			
		   	       let sortStop = await breakSort();
			       if(!sortStop){return}
			      
				   await sleep(2000);
			       //меняем местами книги на полке
				   arrBooks[j].style.left = parseInt(getComputedStyle(arrBooks[j]).left) - 50 + 'px';
			       arrBooks[j + 1].style.left = parseInt(getComputedStyle(arrBooks[j + 1]).left) + 50 + 'px';
			    }	
		    }
		    if (!wasSwap) break;
	
		    let spanInfoSort = document.createElement('p');
		    spanInfoSort.classList.add('info-current');
		    spanInfoSort.innerHTML = 'Проход ' + (i + 1) + '<br>' + arrBooksNumb;
		    info.appendChild(spanInfoSort);
		 }   
		 infoStartSort.innerHTML = 'Сортировка закончена <br>';
		 return arrBooksNumb;
	  }  
      animateSort();	  
   }
   
   //убираем книги с полки
   delBooks(){
      let bookshelf = document.querySelector('.bookshelf-containerbooks');
	  let info = document.querySelector('.info');
	  let booksSort = document.querySelector('.button-sort > button');
	  event.target.setAttribute('disabled', 'true');
	  event.target.classList.add('disable');
	  
	  booksSort.setAttribute('disabled', 'true');
	  booksSort.classList.add('disable');
	  
	  //если полка с книгами заполнена, удаляем книги
	  if(bookshelf.children.length){
		  while (bookshelf.firstChild) {
            bookshelf.removeChild(bookshelf.firstChild);
	     }
	  }
	  
	  if(info.children.length){
	     while (info.firstChild) {
            info.removeChild(info.firstChild);
	     }
		 info.classList.remove('active');
	  }
   }
}


let books = new Books();

