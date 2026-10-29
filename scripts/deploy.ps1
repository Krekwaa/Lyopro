param(
  [string]$Profile = "lyopro",
  [string]$Bucket = "lyopro.tech",
  [string]$DistributionId = "E3AFQOEHM5RTVF"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$awsCommand = Get-Command aws -ErrorAction SilentlyContinue
if ($awsCommand) {
  $aws = $awsCommand.Source
} else {
  $aws = Join-Path $env:LOCALAPPDATA "Programs\Amazon\AWSCLIV2\Amazon\AWSCLIV2\aws.exe"
}

if (-not (Test-Path -LiteralPath $aws)) {
  throw "AWS CLI was not found."
}

function Assert-LastCommand {
  param([string]$Step)
  if ($LASTEXITCODE -ne 0) {
    throw "$Step failed with exit code $LASTEXITCODE."
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = Join-Path $projectRoot "deployment-backups\$timestamp"
New-Item -ItemType Directory -Force -Path $backupPath | Out-Null

# Clean-route aliases such as `en` and `en/...` cannot coexist as a file and a
# directory on Windows. Back up the canonical build assets; deploy recreates
# every extensionless route alias from its corresponding index.html.
Write-Host "Backing up the current website..."
& $aws s3 sync "s3://$Bucket/" $backupPath `
  --profile $Profile `
  --exclude "*" `
  --include "*.*" `
  --only-show-errors `
  --no-cli-pager
Assert-LastCommand "Backup"

Write-Host "Building the static website..."
& npm.cmd run build
Assert-LastCommand "Build"

Write-Host "Uploading the new build..."
& $aws s3 sync ".\out" "s3://$Bucket/" `
  --profile $Profile `
  --delete `
  --cache-control "public,max-age=0,must-revalidate" `
  --only-show-errors `
  --no-cli-pager
Assert-LastCommand "S3 sync"

& $aws s3 cp ".\out\_next\static" "s3://$Bucket/_next/static/" `
  --recursive `
  --profile $Profile `
  --cache-control "public,max-age=31536000,immutable" `
  --only-show-errors `
  --no-cli-pager
Assert-LastCommand "Static asset upload"

# The current CloudFront distribution uses the S3 REST origin without a
# directory-index rewrite. Upload route objects both with and without a trailing
# slash so /en and /en/ (and every nested route) resolve to the same page.
$outRoot = (Resolve-Path ".\out").Path
$pages = Get-ChildItem ".\out" -Recurse -Filter "index.html" |
  Where-Object { $_.DirectoryName -ne $outRoot }

foreach ($page in $pages) {
  $relativeDirectory = $page.DirectoryName.Substring($outRoot.Length + 1).Replace("\", "/")
  $routeKeys = @($relativeDirectory, "$relativeDirectory/")

  foreach ($key in $routeKeys) {
    & $aws s3api put-object `
      --bucket $Bucket `
      --key $key `
      --body $page.FullName `
      --content-type "text/html; charset=utf-8" `
      --cache-control "public,max-age=0,must-revalidate" `
      --profile $Profile `
      --no-cli-pager | Out-Null
    Assert-LastCommand "Route upload: $key"
  }
}

Write-Host "Invalidating CloudFront..."
$invalidationId = & $aws cloudfront create-invalidation `
  --distribution-id $DistributionId `
  --paths "/*" `
  --profile $Profile `
  --query "Invalidation.Id" `
  --output text `
  --no-cli-pager
Assert-LastCommand "CloudFront invalidation"

& $aws cloudfront wait invalidation-completed `
  --distribution-id $DistributionId `
  --id $invalidationId `
  --profile $Profile `
  --no-cli-pager
Assert-LastCommand "CloudFront wait"

Write-Host "Deployment complete: https://www.lyopro.tech/en/"
Write-Host "Backup saved to: $backupPath"
