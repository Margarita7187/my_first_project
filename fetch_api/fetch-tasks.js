const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// ЗАДАНИЕ 1: Базовые GET запросы
async function fetchGetRequest() {
    const output = document.getElementById('get-output');
    output.textContent = "Loading...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        output.textContent = `Title: ${data.title}\nBody: ${data.body}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchJsonData() {
    const output = document.getElementById('get-data');
    output.textContent = "Loading users...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const users = await response.json();
        
        output.innerHTML = users.slice(0, 3).map(user => `
            <div class="user-card">
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
            </div>
        `).join('');
        
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchWithError() {
    const output = document.getElementById('get-output');
    output.textContent = "Testing error handling...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts/9999`);
        if (!response.ok) throw new Error(`HTTP 404: Post not found`);
    } catch (error) {
        output.textContent = `Caught error: ${error.message}`;
        output.className = 'output error';
    }
}

function setupGetRequests() {
    document.getElementById('fetch-get').addEventListener('click', fetchGetRequest);
    document.getElementById('fetch-json').addEventListener('click', fetchJsonData);
    document.getElementById('fetch-error').addEventListener('click', fetchWithError);
}

// ЗАДАНИЕ 2: POST, PUT, DELETE запросы
async function fetchPostRequest() {
    const output = document.getElementById('crud-output');
    output.textContent = "Sending POST...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: 'New Post',
                body: 'This is a new post',
                userId: 1
            })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        output.textContent = `Created post with ID: ${data.id}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchPutRequest() {
    const output = document.getElementById('crud-output');
    output.textContent = "Sending PUT...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: 1,
                title: 'Updated Post',
                body: 'This post was updated',
                userId: 1
            })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        output.textContent = `Updated: ${data.title}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchPatchRequest() {
    const output = document.getElementById('crud-output');
    output.textContent = "Sending PATCH...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: 'Patched Title'})
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        output.textContent = `Patched title to: ${data.title}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchDeleteRequest() {
    const output = document.getElementById('crud-output');
    output.textContent = "Sending DELETE...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {method: 'DELETE'});
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        output.textContent = `Post deleted successfully`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

function setupCrudRequests() {
    document.getElementById('fetch-post').addEventListener('click', fetchPostRequest);
    document.getElementById('fetch-put').addEventListener('click', fetchPutRequest);
    document.getElementById('fetch-patch').addEventListener('click', fetchPatchRequest);
    document.getElementById('fetch-delete').addEventListener('click', fetchDeleteRequest);
}

// ЗАДАНИЕ 3: Заголовки и параметры
async function fetchWithHeaders() {
    const output = document.getElementById('headers-output');
    output.textContent = "Sending request with headers...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Custom-Header': 'MyCustomValue'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        output.textContent = 'Request with custom headers successful';
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchWithParams() {
    const output = document.getElementById('headers-output');
    output.textContent = "Sending request with URL params...";
    
    try {
        const params = new URLSearchParams({'_limit': '2', '_sort': 'id'});
        const response = await fetch(`${API_BASE_URL}/posts?${params}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        output.textContent = `Got ${data.length} posts with URL parameters`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

function setupHeadersAndParams() {
    document.getElementById('fetch-headers').addEventListener('click', fetchWithHeaders);
    document.getElementById('fetch-params').addEventListener('click', fetchWithParams);
}

// ЗАДАНИЕ 4: Обработка ответов
async function fetchAndCheckStatus() {
    const output = document.getElementById('response-output');
    output.textContent = "Checking response status...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        output.textContent = `Status: ${response.status} - ${response.statusText}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchBlobData() {
    const output = document.getElementById('response-output');
    const container = document.getElementById('image-container');
    output.textContent = "Loading image...";
    
    try {
        const response = await fetch('https://picsum.photos/100/100');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        container.innerHTML = `<img src="${imageUrl}" alt="Random image">`;
        output.textContent = 'Image loaded as blob successfully';
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

function setupResponseHandling() {
    document.getElementById('fetch-status').addEventListener('click', fetchAndCheckStatus);
    document.getElementById('fetch-blob').addEventListener('click', fetchBlobData);
}

// ЗАДАНИЕ 5: Обработка ошибок
async function fetchNetworkError() {
    const output = document.getElementById('error-output');
    output.textContent = "Testing network error...";
    
    try {
        await fetch('http://invalid-url-that-does-not-exist-12345.com');
    } catch (error) {
        output.textContent = `Network error caught: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchHttpError() {
    const output = document.getElementById('error-output');
    output.textContent = "Testing HTTP error...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/nonexistent-endpoint`);
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
        output.textContent = `HTTP error caught: ${error.message}`;
        output.className = 'output error';
    }
}

function setupErrorHandling() {
    document.getElementById('fetch-network-error').addEventListener('click', fetchNetworkError);
    document.getElementById('fetch-http-error').addEventListener('click', fetchHttpError);
}

// ЗАДАНИЕ 6: Параллельные запросы
async function fetchWithPromiseAll() {
    const output = document.getElementById('parallel-output');
    output.textContent = "Running parallel requests...";
    
    try {
        const [users, posts, comments] = await Promise.all([
            fetch(`${API_BASE_URL}/users`).then(r => r.json()),
            fetch(`${API_BASE_URL}/posts`).then(r => r.json()),
            fetch(`${API_BASE_URL}/comments`).then(r => r.json())
        ]);
        output.textContent = `Results:\nUsers: ${users.length}\nPosts: ${posts.length}\nComments: ${comments.length}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

function setupParallelRequests() {
    document.getElementById('fetch-promise-all').addEventListener('click', fetchWithPromiseAll);
}

// ЗАДАНИЕ 7: Реальные сценарии
async function fetchUserWithPosts() {
    const output = document.getElementById('scenario-output');
    output.textContent = "Loading user and posts...";
    
    try {
        const user = await fetch(`${API_BASE_URL}/users/1`).then(r => r.json());
        const posts = await fetch(`${API_BASE_URL}/posts?userId=1`).then(r => r.json());
        
        output.textContent = `User: ${user.name}\nEmail: ${user.email}\nNumber of posts: ${posts.length}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.className = 'output error';
    }
}

function setupRealScenarios() {
    document.getElementById('fetch-user-posts').addEventListener('click', fetchUserWithPosts);
}

document.addEventListener('DOMContentLoaded', function() {
    setupGetRequests();
    setupCrudRequests();
    setupHeadersAndParams();
    setupResponseHandling();
    setupErrorHandling();
    setupParallelRequests();
    setupRealScenarios();
});