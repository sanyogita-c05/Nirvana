$service = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue

if ($service) {
    Write-Host "MongoDB service found."

    if ($service.Status -ne "Running") {
        Start-Service "MongoDB"
        Write-Host "MongoDB started."
    }
    else {
        Write-Host "MongoDB is already running."
    }
}
else {
    Write-Host "MongoDB is not installed."
    Write-Host "MongoDB installation will be handled by the ArtisanSuite installer."
}