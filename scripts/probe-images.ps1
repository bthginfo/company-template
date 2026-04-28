$files = @('src/lib/demo-content.ts','src/templates/_shared/TemplateApp.tsx','src/admin/AdminEditorBody.tsx','src/showcase/AgencyShowcase.tsx','src/showcase/Cases.tsx')
$text = ($files | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$ids = [regex]::Matches($text, 'photo-([a-zA-Z0-9_\-]+?)\?') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
"Total unique IDs: $($ids.Count)"
$bad=@()
foreach ($id in $ids) {
  try {
    $r = Invoke-WebRequest -UseBasicParsing -Uri ('https://images.unsplash.com/photo-'+$id+'?w=200') -Method Head -TimeoutSec 10 -ErrorAction Stop
    if ($r.StatusCode -ne 200) { $bad += $id; "BAD($($r.StatusCode)): $id" }
    else { "OK: $id" }
  } catch {
    $bad += $id
    "ERR: $id"
  }
}
""
"Bad IDs ($($bad.Count)):"
$bad -join "`n"
