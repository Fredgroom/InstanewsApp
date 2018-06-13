
$(document).ready(function(){

var nytItems;
var nytUrl;
var articleImageUrl;
var articleCaption;
var articleLink;
var loader = $('ajax-loader');
var $stories = $('stories');

  $(loader).hide();
  //When a selection is made make even t
  $(loader)

  $('.select').on('change', function(event){
    var section = $(this).val();
    event.preventDefault();

    $stories.empty();
    nytItems = '';

    var nytUrl = 'http://api.nytimes.com/svc/topstories/v2/' + section +  '.json?api-key=0751ffff01d7a70710354972fa0ad4a9:19:75124095';

      $.ajax({
            url: nytUrl,
            method: 'GET',
            datatype: JSON 
          }).done(function(data) {
            var nytData = (data.results);
              
              if(data.length !== 0) {
                nytItems += '<ul>';

                $.each(data.results, function(key, value){
                  console.log(value);
                  articleImageUrl = value.multimedia[4].url; 
                  if (articleImageUrl !== undefined) {
                    articleImageUrl = value.multimedia[4].url} 
                  else {
                    articleImageUrl = 'http://www.placecage.com/200/300'};

                  articleCaption = value.abstract;
                  articleLink = value.url;

                  nytItems += '<li class="article-item">'; 
                  nytItems += '<a href="' + articleLink + '" target="_blank">'; 
                  nytItems += '<div class="article" style="background-image:url(' + articleImageUrl + ')">'; 
                  nytItems += '<div class="story-meta">';
                  nytItems += '<p>';
                  nytItems += (  articleCaption   || "this story has no caption.");
                  nytItems += '</p>'; 
                  nytItems += '</div>'; 
                  nytItems += '</div>'; 
                  nytItems += '</a>'; 
                  nytItems += '</li>';
                });

                nytItems += '</ul>';
                $(".success").append(nytItems);
              } else {
                  nytItems += '<p class = "feedback">Sorry!</p>';
              }
            }) 
              .fail(function() {
                $('fail').append("<p>Sorry this hasn't worked</p>");
            });
          });
});
