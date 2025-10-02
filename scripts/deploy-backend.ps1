Param(
  [string]$Branch = "production-main",
  [string]$HerokuApp = "vinoir",
  [switch]$SplitFallback
)

Write-Host "=== Vinoir Backend Deploy ===" -ForegroundColor Cyan

# Ensure we're at repo root
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
Set-Location $repoRoot

# Confirm branch
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne $Branch) {
  Write-Host "Switching to branch $Branch" -ForegroundColor Yellow
  git checkout $Branch | Out-Null
}

# Pull latest
Write-Host "Pulling latest changes for $Branch" -ForegroundColor Yellow
git pull origin $Branch

# Ensure Heroku remote
$herokuRemote = git remote get-url heroku 2>$null
if (-not $herokuRemote) {
  Write-Host "Adding heroku remote for app $HerokuApp" -ForegroundColor Yellow
  heroku git:remote -a $HerokuApp
}

# Show pending changes
$pending = git status --short
if ($pending) {
  Write-Host "Uncommitted changes detected. Please commit before deploying:" -ForegroundColor Red
  Write-Host $pending
  exit 1
}

# Try subtree push
Write-Host "Pushing mem-backend subtree from $Branch to Heroku main" -ForegroundColor Green
if (-not $SplitFallback) {
  git subtree push --prefix mem-backend heroku $Branch:main
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Subtree push failed. Re-run with -SplitFallback switch." -ForegroundColor Red
    exit 1
  }
  else {
    Write-Host "Subtree push succeeded." -ForegroundColor Green
  }
}
else {
  Write-Host "Using split fallback method" -ForegroundColor Yellow
  # Clean previous temp branch
  if (git show-ref --quiet refs/heads/heroku-backend) { git branch -D heroku-backend | Out-Null }
  git subtree split --prefix mem-backend -b heroku-backend
  git push heroku heroku-backend:main
  git branch -D heroku-backend | Out-Null
  Write-Host "Split fallback deployment complete." -ForegroundColor Green
}

Write-Host "Tail Heroku logs? (Y/N)" -NoNewline
$response = Read-Host
if ($response -match '^[Yy]') {
  heroku logs --tail
}
