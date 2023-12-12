<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <!-- Styles -->
    @viteReactRefresh
    @vite('resources/js/app.js')
</head>
<body>
    <!-- React root DOM -->
    <div id="form">
    </div>
</body>
</html>
