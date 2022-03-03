// --------------------- ON DOCUMENT READY ---------------------- //

$(document).ready(function() {
  //access tweet-text area on input
  $('#tweet-text').on('input', function() {
    const charCount = $(this).val().length;
    const max = 140;
    const difference = max - charCount;
    const counter = $(this).parents('.new-tweet').find('.counter');

    //updates number as user is typing
    counter.text(difference);
  
    // changing counter colour to red when counter goes less than 0
    if (difference < 0) {
      // add class in css
      counter.addClass('red');
    } else {
      // remove class if its not less than 0
      counter.removeClass('red');
    }
  });
});

