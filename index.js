import reddit from './redditapi';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
// form event listener
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    const searchLimit = document.getElementById('limit').value;
    const searchTerm = searchInput.value;
    //check input
    if (searchTerm === '') {
        showMessage('Please add a search term','alert alert-danger')
    }
    // search reddit
    searchInput.value = '';
    reddit.search(searchTerm, searchLimit, sortBy).then(results => {
        let output = '<div class="card-columns">';
        // loop through posts
        results.forEach(post => {
            // check for image
            let image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
            output += `
            <div class='card mb-2'>
            <img class='card-img-top' src='${image}' alt='card image cap'>
            <div class='card-body'>
            <h5 class='card-title'>${post.title}</h5>
            <p class='card-text'>${truncateText(post.selftext,100)}</p>
            <a href='${post.url}' target='_blank' class='btn btn-primary'> Read More </a>
            <hr>
            <span class='badge badge-secondary'> Subreddit: ${post.subreddit}</span>
            <span class='badge badge-dark'> Score: ${post.score}</span>
            </div>
            </div>
            `
        })
        output += '</div>';
        document.getElementById('results').innerHTML = output
    })
})
// show message
function showMessage(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const searchContainer = document.getElementById('search-container')
    const search = document.getElementById('search')
    searchContainer.insertBefore(div, search)
    setTimeout(()=>document.querySelector('.alert').remove(),2000)
}
//truncate text
function truncateText(text, limit) {
    const shortend = text.indexOf('', limit);
    if (shortend == -1) return text;
    return text.substring(0,shortend)
}
