<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome {{ $name }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            color: #333;
        }
        .container {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 10px;
            border: 1px solid #dee2e6;
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 10px;
        }
        h2 {
            color: #34495e;
            margin-top: 25px;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            background: white;
            margin: 8px 0;
            padding: 12px;
            border-radius: 6px;
            border-left: 4px solid #3498db;
        }
        .nav-link {
            display: inline-block;
            margin-top: 20px;
            color: #2980b9;
            text-decoration: none;
            font-weight: bold;
        }
        .nav-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome, {{ $name }}!</h1>
        <p>We're glad to see you learning Laravel.</p>
        
        <h2>Available Courses:</h2>
        <ul>
            @foreach($courses as $course)
                <li>{{ $course }}</li>
            @endforeach
        </ul>
        
        <a href="/greeting" class="nav-link">← Back to Greeting</a>
    </div>
</body>
</html>