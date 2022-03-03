$(document).ready(function() {
 console.log('Doc Ready')

 // use jq to access tweet text on input 

 $('#tweet-text').on('input', function () {
  const charCount = $(this).val().length;
  const max = 140;
  const difference = max - charCount; 
  // appending parents to counter class using find
  const counter = $(this).parents('.new-tweet').find('.counter')

  counter.text(difference)

  // changing counter colour to red when counter goes less than 0
  if (difference < 0) {
   // add class in css 
   counter.addClass('red') 
  } else {
   // remove class if its not less than 0
   counter.removeClass('red')
  };

 })

});

// on input, you want to see the length of .target.value (set to variable)
// animate counter 
// if the length is greater than 140, go into red