let comments = [];
let selectedRating = 0;

const stars = document.querySelectorAll('.stars');
stars.forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.value);
        updateStars();
    });
});

function updateStars() {
    stars.forEach(star => {
        star.classList.toggle('selected', parseInt(star.dataset.value) <= selectedRating);
    });
}

document.getElementById('submit-btn').addEventListener('click', function(){
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const commentText = document.getElementById('comment').value.trim();

    if(name.length < 2 || name.length > 50) {
        alert("Name should be between 2 and 50 characters");
        return;
    }
    if(email && !email.includes("@")) {
        alert("Please enter a valid email address");
        return;
    }
    if(commentText.length < 10 || commentText.length > 500) {
        alert("Comment should be between 10 and 500 characters");
        return;
    }

    comments.push({name, email, commentText, rating: selectedRating});
    document.getElementById('comment-form').reset();
    selectedRating = 0;
    updateStars();
    displayComments();
    updateStats();
});

function displayComments() {
    const list = document.getElementById('comments-list');
    list.innerHTML = '';
    comments.forEach(c => {
        const div = document.createElement('div');
        div.classList.add('comment');
        div.innerHTML = `<strong>${c.name}</strong> ${c.email ? '('+c.email+')' : ''}<br>${c.commentText}${c.rating ? `<br>Rating: ${c.rating} ★` : ''}`;
        list.appendChild(div);
    });
}

function updateStats() {
    document.getElementById('total-comments').innerText = comments.length;
    const totalRating = comments.reduce((sum, c) => sum + (c.rating || 0), 0);
    const ratedCount = comments.filter(c => c.rating > 0).length;
    document.getElementById('average-rating').innerText = ratedCount ? (totalRating / ratedCount).toFixed(2) : 0;
}
