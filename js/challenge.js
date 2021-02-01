const counter = document.getElementById( "counter" );
const minus = document.getElementById( "minus" );
const plus = document.getElementById( "plus" );
const heart = document.getElementById( "heart" );
const pause = document.getElementById( "pause" );
const likesList = document.querySelector( "ul.likes" );
const commentList = document.getElementById( "list" );
const commentInput = document.getElementById( "comment-input" );
const submitComment = document.getElementById( "submit" );

let timer = setInterval( incrementCounter, 1000 );
let paused = false;

const likes = {};

function incrementCounter() {
    counter.innerText = parseInt( counter.innerText ) + 1;
}

function decrementCounter() {
    counter.innerText = parseInt( counter.innerText ) - 1;
}

function togglePause() {
    if ( paused ) {
        timer = setInterval( incrementCounter, 1000 );
        pause.innerText = "pause";
        paused = false;
        minus.disabled = false;
        plus.disabled = false;
        heart.disabled = false;
        submitComment.disabled = false;
    } else {
        clearInterval( timer );
        pause.innerText = "resume";
        paused = true;
        minus.disabled = true;
        plus.disabled = true;
        heart.disabled = true;
        submitComment.disabled = true;
    }
}

function likeNumber() {
    if ( likes[ counter.innerText ] ) {
        likes[ counter.innerText ]++;
    } else {
        likes[ counter.innerText ] = 1;
    }
    renderLikes();
}

function renderLikes() {
    likesList.innerHTML = "";
    for ( const number in likes ) {
        let thisLike = document.createElement( "li" );
        thisLike.innerText = `${ number } has been liked ${ likes[ number ] } ${ likes[ number ] > 1 ? "times" : "time" }`;
        likesList.appendChild( thisLike );
    }
}

function leaveComment( comment ) {
    let newComment = document.createElement( "p" );
    newComment.innerText = comment;
    commentList.appendChild( newComment );
    commentInput.value = "";
}

document.addEventListener( "DOMContentLoaded", function() {
    plus.addEventListener( "click", incrementCounter );
    minus.addEventListener( "click", decrementCounter );
    heart.addEventListener( "click", likeNumber );
    pause.addEventListener( "click", togglePause );
    submitComment.addEventListener( "click", ( submit ) => { 
        submit.preventDefault();
        leaveComment( commentInput.value );
    } );
} );