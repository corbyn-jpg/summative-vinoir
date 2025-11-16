Param(
  [string]$Branch = "production-main",
  [string]$HerokuApp = "vinoir",
  [switch]$SplitFallback
)

Write-Host "=== Vinoir Backend Deploy ===" -ForegroundColor Cyan

# --- Pre-flight: Heroku CLI availability ---
if (-not (Get-Command heroku -ErrorAction SilentlyContinue)) {
  Write-Host "Heroku CLI not found on PATH." -ForegroundColor Red
  Write-Host "Install options:" -ForegroundColor Yellow
  Write-Host "  winget install -e --id Heroku.HerokuCLI" -ForegroundColor DarkCyan
  Write-Host "  or download: https://cli-assets.heroku.com/heroku-x64.exe" -ForegroundColor DarkCyan
  Write-Host "Then run: heroku login" -ForegroundColor DarkCyan
  Write-Host "Re-run this script afterwards." -ForegroundColor Yellow
  exit 127
}

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

# Ensure Heroku remote (create if missing)
$herokuRemote = git remote get-url heroku 2>$null
if (-not $herokuRemote) {
  Write-Host "Adding heroku remote for app $HerokuApp" -ForegroundColor Yellow
  try {
    heroku git:remote -a $HerokuApp | Out-Null
  } catch {
    Write-Host "Failed to add Heroku remote via CLI. Falling back to manual git remote add." -ForegroundColor Yellow
    git remote add heroku https://git.heroku.com/$HerokuApp.git 2>$null
  }
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
    Write-Host "Subtree push failed." -ForegroundColor Red
    Write-Host "Try: powershell -ExecutionPolicy Bypass -File .\\scripts\\deploy-backend.ps1 -SplitFallback" -ForegroundColor Yellow
    exit 1
  } else {
    Write-Host "Subtree push succeeded." -ForegroundColor Green
  }
} else {
  Write-Host "Using split fallback method" -ForegroundColor Yellow
  if (git show-ref --quiet refs/heads/heroku-backend) { git branch -D heroku-backend | Out-Null }
  git subtree split --prefix mem-backend -b heroku-backend
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Subtree split failed." -ForegroundColor Red
    exit 1
  }
  git push heroku heroku-backend:main
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed. Ensure remote exists: git remote add heroku https://git.heroku.com/$HerokuApp.git" -ForegroundColor Red
    git branch -D heroku-backend | Out-Null
    exit 1
  }
  git branch -D heroku-backend | Out-Null
  Write-Host "Split fallback deployment complete." -ForegroundColor Green
}

Write-Host "Tail Heroku logs? (Y/N)" -NoNewline
$response = Read-Host
if ($response -match '^[Yy]') {
  heroku logs --tail
}
