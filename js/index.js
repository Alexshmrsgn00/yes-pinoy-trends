// Function to fetch the data and display the posts
function loadLatestPosts() {
    // 1. Fetch the data from the JSON file
    fetch('js/post.json')
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the JSON response into a JavaScript object/array
            return response.json();
        })
        .then(allPosts => {
            // 2. Sort the posts by date, descending (newest first)
            const sortedPosts = allPosts.sort((a, b) => {
                // Comparing dates: b.date - a.date sorts descending
                return new Date(b.date) - new Date(a.date);
            });

            // 3. Get the top N posts (e.g., the 3 latest)
            const latestPosts = sortedPosts.slice(0, 3);
            
            // 4. Select the container element
            const latestPostsContainer = document.getElementById('latest-posts');

            // 5. Generate and inject the HTML
            let postsHtml = '';
            latestPosts.forEach(post => {
                postsHtml += `
                    <div class="latest-post-item">
                        <h3><a href="${post.url}">${post.title}</a></h3>
                        <p class="post-date">${post.date}</p>
                        <p>${post.snippet}</p>
                    </div>
                `;
            });
            latestPostsContainer.innerHTML = postsHtml;
        })
        .catch(error => {
            // Handle any errors during the fetch process
            console.error('Error loading the posts data:', error);
            document.getElementById('latest-posts').innerHTML = '<p>Could not load the latest posts.</p>';
        });
}

// Call the function when the script loads
loadLatestPosts();