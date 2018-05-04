// ON PAGE LOAD
$(document).ready(() => {
    loadTweets();
    loadFollowers();
    loadFriends();

    $("#post").on("click", () => {
        postTweet();
    });

    $("#post").keypress(event => {
        if(event.keyCode === 13) postTweet();
    });
});

// LOAD DATA
function loadTweets() {
    $.getJSON("/twitter/statuses/user_timeline")
    .then(data => { displayTweets(data) })
    .catch(err => { console.log(err) });
}

function loadFollowers() {
    $.getJSON("/twitter/followers/list")
    .then(data => { displayUsers(data, "followers") })
    .catch(err => { console.log(err) });
}

function loadFriends() {
    $.getJSON("/twitter/friends/list")
    .then(data => { displayUsers(data, "friends") })
    .catch(err => { console.log(err) });
}

// POST DATA
function postTweet() {
    let input = $("#tweet").val();

    $.post("/twitter/statuses/update", {status: input})
    .then(() => {
        loadTweets();
        $("#tweet").val("");
    }).catch(err => { console.log(err)});
}

// DISPLAY DATA
function displayTweets(tweets) {
    if(!tweets.length) {
        $(".list--tweets").append("<li>You haven't posted anything yet!</li>");
    } else {
        $(".list--tweets").empty();
        tweets.forEach(tweet => {
            let newTweet = $(`<li class="list__item">${tweet.text.substring(0, 48)}...</li>`);
            $(".list--tweets").append(newTweet);
        });
    }
}

function displayUsers(data, type = "followers") {
    if (!data.users.length) {
        $(`.list--${type}`).append("<li>None!</li>");
    } else {
        data.users.forEach(user => {
            let newUser = $(`<li class="list__item">${user.name}</li>`);
            $(`.list--${type}`).append(newUser);
        });
    }
}