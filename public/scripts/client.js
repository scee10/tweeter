// --------------------- FUNCTIONS --------------------- //

// creates a new tweet
const createTweetElement = function(tweet) {
  // prevents xxs attacks
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // article HTML structure for new tweet
  let $tweet = $(
    `<article class ="box">
  <header class="dummy-tweets"> 
      <span class="name-and-tag">
        <img src="${tweet.user.avatars}"/>
        <p class="name">${tweet.user.name}</p>
        <p class="socialtag">${tweet.user.handle}</p> 
    </span>
  </header>
  <div class="middle-section">
   ${escape(tweet.content.text)}
  </div>
  <footer class="footer">
    <span class="bottom">
    <span>${timeago.format(tweet.created_at)}</span>
    <span class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
  </span>
  </span>
  </footer>
 </article>`
  );
  return $tweet;
};

// prepends current tweet to entire tweet container
const renderTweets = function(tweets) {
  $('.tweet-container').empty();
  for (let tweet of tweets) {
    // takes return value and appends it to the tweets container
    $('.tweet-container').prepend(createTweetElement(tweet));
  }
};

// load tweets on page
const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: '/tweets',
    dataType: 'JSON'})
    .then(posts => {
      renderTweets(posts);
    })
    .catch(err => {
      console.log('err', error);
    });
};

// --------------------- ON DOCUMENT READY ---------------------- //
 
$(document).ready(function() {
  // loadtweets right away
  loadTweets();

  // --------------- > SUBMITTING FORM < --------------- //
  const $form = $('.submit-form');
  $form.submit(function(event) {
  // prevent the redirect to /tweets/ on submit
    event.preventDefault();

    // setting length of textarea
    const textArea = $("textarea").val().length;

    //conditionals to display appropriate error messages if length is > 140 or < 0
    if (textArea > 140) {
      return $('.error').text('🙀 OOPS! This tweet is too long.').slideDown();
    } else if (textArea === 0 || textArea === null) {
      return $('.error').text('🤔 OOPS! You did not tweet anything...').slideDown();
    }
    $('.error').slideUp();

    //after submitting tweet
    const serializedTweet = $(event.target).serialize();
    $.ajax({
      type: "POST",
      url: '/tweets/',
      data: serializedTweet,
    })
    //reset counter and text area
      .then((data) => {
        $('.counter').text('140');
        $('.submit-form')[0].reset();
      })
      .then((data) => {
        loadTweets();
      })
      .catch(err => {
        console.log('err', error);
      });
  });
});