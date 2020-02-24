document.addEventListener("DOMContentLoaded", function() {
 const API_URL = 'https://vision.squidit.com.br/v1/feed/test?count=36';

  searchAPI(API_URL)
      .then((data))

  function searchAPI(el) {
      return fetch(el)
          .then((data) => data.json())
  }
  
  function load(url) {
      return function () {
          searchAPI(API_URL + '&nextUrl=' + encodeURIComponent(url) )
              .then((data))
      }
  }

  function data({ medias: data , pagination : data2}){
      data.map((data) => {
          const root = document.getElementById('root');
          
          let a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('href', data.link);
         
          let divCard = document.createElement('div');
          divCard.setAttribute('class', 'card-img');
         
          let img = document.createElement('img');
          img.src = data.imagens.resolucaoMedia.url;
         
          let hover = document.createElement('div');
          hover.setAttribute('class', 'hover-card');

          let hoverTitle = document.createElement('div');
          hoverTitle.setAttribute('class', 'hover-card-title');
          
          let ul = document.createElement('ul');

          let user = document.createElement('li');
          user.innerHTML = `@${data.usuario.username}`;
 
          let likes = document.createElement('li');
          likes.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i> ' + data.upvotes;

          let comments = document.createElement('li');
          comments.innerHTML = '<i class="fa fa-comment" aria-hidden="true"></i> ' + data.comentarios;

          let datePost = document.createElement('li');
          datePost.innerHTML = '<i class="fa fa-calendar" aria-hidden="true"></i> ' + formatDate(data.criadoEm);

          root.appendChild(a);
          a.appendChild(divCard);
          divCard.appendChild(img);
          divCard.appendChild(hover);
          hover.appendChild(hoverTitle);
          hoverTitle.appendChild(ul);
          ul.appendChild(user);
          ul.appendChild(likes);
          ul.appendChild(comments);
          ul.appendChild(datePost);
      });
      let button = document.getElementById('button');
      button.onclick = load(data2.next_url);
  }

  function formatDate(varDate){
    var dateTime = new Date(varDate);
    return (
        (dateTime.getDate() > 9) ? 
        (dateTime.getDate()) : 
        ('0' + dateTime.getDate())
      ) + '/' + 
      (
        (dateTime.getMonth() > 8) ? 
        (dateTime.getMonth() + 1) : 
        ('0' + (dateTime.getMonth() + 1))
      ) + '/' + 
      dateTime.getFullYear();
  }

});