param(
    [string]$BaseUrl = "https://cocktail-app-sand.vercel.app",
    [string]$CocktailName = "Margarita",
    [string]$IngredientName = "vodka"
)

function Test-Page {
    param(
        [string]$Path
    )

    $uri = "$BaseUrl$Path"
    Write-Host "[check] GET $uri"
    try {
        $response = Invoke-WebRequest -Uri $uri -Method Get -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
        if ($response.StatusCode -ne 200) {
            throw "status=$($response.StatusCode)"
        }
        if (-not $response.Content -or $response.Content.Length -lt 100) {
            throw "empty-response"
        }
        Write-Host "pass: $Path"
        return $true
    } catch {
        Write-Host "fail: $Path -> $($_.Exception.Message)"
        return $false
    }
}

$encode = {
    param($value)
    [System.Uri]::EscapeDataString($value)
}

$routes = @(
    "/",
    "/cocktails",
    "/ingredients",
    "/myingredients",
    "/login",
    "/join",
    "/cocktails/" + (& $encode $CocktailName),
    "/ingredients/" + (& $encode $IngredientName)
)

$allPass = $true
foreach ($route in $routes) {
    if (-not (Test-Page -Path $route)) {
        $allPass = $false
    }
}

if (-not $allPass) {
    Write-Host "P0 핵심 경로 스모크 테스트 실패"
    exit 1
}

Write-Host "P0 핵심 경로 스모크 테스트 통과"
exit 0
