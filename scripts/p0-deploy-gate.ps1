param(
    [string]$BaseUrl = "https://cocktail-app-sand.vercel.app"
)

Write-Host "[1/3] run lint"
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "lint failed"
    exit 1
}

Write-Host "[2/3] run build"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "build failed"
    exit 1
}

Write-Host "[3/3] readiness check"
try {
    $status = Invoke-WebRequest -Uri $BaseUrl -UseBasicParsing -Method Head -TimeoutSec 10 -ErrorAction Stop
    Write-Host "service ready: $($status.StatusCode)"
} catch {
    Write-Host "service ready check failed: $($_.Exception.Message)"
    exit 1
}

Write-Host "P0 deploy gate passed"
exit 0

