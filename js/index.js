var nytData,
nytItems,
nytUrl,
endpoint,
articleImageUrl,
articleCaption,
articleLink;
var section = $(this).val();
var loader = $('ajax-loader');
var $stories = $('stories');

$(document).ready(function(){

  $(loader).hide();
  //When a selection is made make even t
  $('.select').on('change', function(event){

    event.preventDefault();

    $stories.empty();
    nytData, nytItems = '';

    var nytUrl = 'http://api.nytimes.com/svc/topstories/v2/' + section +  '.json?api-key=4a9e2e417a0b42359afada8fbb0249df';

    alert(nytUrl);

    });

    $.ajax({
      url: nytUrl,
      method: 'GET',
      datatype: JSON 
    }).done(function(data) {
        if(nytData.length !== 0) {
          nytItems += '<ul>';
          $.each(function(key, value){
            articleImageUrl = value.multimedia[4].url;
            articleCaption = value.abstract;
            articleLink = value.url;
            nytItems += '<li class=article-item>';
            nytItems += '<a href=#' + articleLink + '"target"="_blank">';
            nytItems += '<div class ="article" ;style="background-image":url(' + articleImageUrl +')">';
            nytItems += '<div class="story-meta>'
            nytItems += '<p>' + (articleCaption || 'this story has no caption.') + '</p>';
            nytItems += '</div>';
            nytItems += '</div>';
            nytItems += '</div>';
            nytItems += '</a>';
            nytItems += '</li>';
          });
          nytItems += '</ul>';
        } else {
            nytItems += '<p class = "feedback">Sorry!</p>';
        }
      }) 
        .fail(function() {

      });
    
});
