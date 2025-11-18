
document.getElementById('submit-btn').addEventListener('click', function(){
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if(name.length < 6 || name.length > 100) {
        alert("Name should be between 6 and 100 characters");
        return;
    }
    if(email && !email.includes("@")) {
        alert("Please enter a valid professional email address");
        return;
    }
});



