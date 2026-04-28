$candidates = @(
  # Fish / seafood
  '1467003909585-2f8a72700288',
  '1559847844-5315695dadae',
  '1485921325833-c519f76c4927',
  '1519708227418-c8fd9a32b7a2',
  '1532634896-26909d0d4b6a',
  # Dessert
  '1551024601-bec78aea704b',
  '1488477181946-6428a0291777',
  '1486427944299-d1955d23e34d',
  '1541599540903-216a46ca1dc0',
  # Heating / hvac / pipe
  '1581094288338-2314dddb7ece',
  '1604061986761-d9d0cc41b0d1',
  '1581092335397-9583eb92d232',
  '1582719188393-bb71ca45dbb9',
  '1565538810643-b5bdb714032a',
  # Medical
  '1576091160550-2173dba999ef',
  '1551076805-e1869033e561',
  '1579165466949-3180a3d056d5',
  # Yoga / retreat
  '1545389336-cf090694435e',
  '1544367567-0f2fcb009e0b',
  '1607962837359-5e7e89f86776',
  '1599901860904-17e6ed7083a0',
  '1591291621164-2c6367723315'
)
foreach ($id in $candidates) {
  try {
    $r = Invoke-WebRequest -UseBasicParsing -Uri ('https://images.unsplash.com/photo-'+$id+'?w=200') -Method Head -TimeoutSec 10 -ErrorAction Stop
    if ($r.StatusCode -eq 200) { "OK: $id" } else { "BAD($($r.StatusCode)): $id" }
  } catch { "ERR: $id" }
}
