/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { json } = require("express/lib/response");

// Test / driver code (temporary). Eventually will get this from the server.

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

 for (let tweet of tweets) {
  $('.tweet-container').prepend(createTweetElement(tweet))
 }
}

const createTweetElement = function(tweet) {
 let $tweet = $(`
  <article class ="box">
  <header class="dummy-tweets"> 
      <span class="name-and-tag">
        <img src="${tweet.user.avatars}"/>
        <p class="name">${tweet.user.name}</p>
        <p class="socialtag">${tweet.user.handle}</p> 
    </span>
  </header>
  <div class="middle-section">
   ${tweet.content.text}
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
 </article>
  `);
 return $tweet;
}

const loadTweets = function () {

 $.ajax({method: "GET", url: '/tweets', dataType: 'JSON'})
  .then(posts => {
   renderTweets(posts)
  })
  .catch(err => {console.log('err', error)}) 

}

$(document).ready(function () {
 
 loadTweets();

 const $form = $('.submit-form')
 $form.submit(function(event) {
  // prevent the post request
  event.preventDefault();

  //post the data instead on same page
  const serializedTweet = $(event.target).serialize();
  $.post('/tweets/', serializedTweet)

 })
})