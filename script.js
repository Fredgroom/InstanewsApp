console.log('hello world');

$.get('ajax.html', function(data) {
    $('#ajax').append(data).selectric();
  });