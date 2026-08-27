$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

function Publish-DocumentationChanges {
    $changes = git status --porcelain -- docs mkdocs.yml
    if (-not $changes) {
        return
    }

    git add -- docs mkdocs.yml
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "docs: auto-update $timestamp"
    git push origin main
}

$watcher = [System.IO.FileSystemWatcher]::new($projectRoot, "*")
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

Register-ObjectEvent -InputObject $watcher -EventName Changed -SourceIdentifier "MkDocsSourceChanged" | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName Created -SourceIdentifier "MkDocsSourceCreated" | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName Deleted -SourceIdentifier "MkDocsSourceDeleted" | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName Renamed -SourceIdentifier "MkDocsSourceRenamed" | Out-Null

while ($true) {
    $event = Wait-Event
    $changedPath = $event.SourceEventArgs.FullPath
    $relativePath = $changedPath.Substring($projectRoot.Length).TrimStart("\\")

    if ($relativePath -eq "mkdocs.yml" -or $relativePath -like "docs\*") {
        Publish-DocumentationChanges
    }

    Remove-Event -EventIdentifier $event.EventIdentifier
}