let nytItems;
let nytUrl;
let articleImageUrl;
let articleCaption;
let articleLink;
let loader = $('ajax-loader');
let $stories = $('stories');

$(document).ready(function(){

  $(loader).hide();
  //When a selection is made make even t

  $('.select').on('change', function(event){
    let section = $(this).val();
    event.preventDefault();

    $stories.empty();
    nytItems = '';

    let nytUrl = `http://api.nytimes.com/svc/topstories/v2/ ${section} .json?api-key=4a9e2e417a0b42359afada8fbb0249df`;

      $.ajax({
            url: nytUrl,
            method: 'GET',
            datatype: JSON 
          }).done(function(data) {
            console.log(data.results);
              if(data.length !== 0) {
                nytItems += '<ul>';

                $.each(data.results, function(key, value){
                  console.log(value);
                  articleImageUrl = value.multimedia[4].url;
                  articleCaption = value.abstract;
                  articleLink = value.url;

                  nytItems += `<li class=article-item>
                                <a href=${articleLink}"target"="_blank">
                                  <div class ="article" style="background-image:url(${articleImageUrl})">
                                    <div class="story-meta">
                                      <p> (${articleCaption || 'this story has no caption.'})
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              </li>`;
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
