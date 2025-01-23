<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Pattern über page-title::before</title>
  <style>
    /* -------------------------
       1) Body-Hintergrund
       ------------------------- */
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      /* Globaler Pattern-Hintergrund */
      background:
        url('pattern.png') /* <-- Pfad anpassen */
        repeat
        #F2EDE9; /* Falls das Bild nicht überall greift, hier eine Grundfarbe */

      font-family: sans-serif;
      min-height: 100vh;
    }

    /* -------------------------
       2) Container zum Ausprobieren
       ------------------------- */
    .content {
      width: 80%;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    /* -------------------------
       3) Page-Title mit 2 Pseudos
       ------------------------- */
    .page-title {
      position: relative;  /* wichtig, damit ::before/::after absolute positioniert werden können */
      display: inline-block;
      z-index: 3;          /* Text-Ebene ganz oben */
      font-size: 3rem;
      font-weight: bold;
      text-transform: uppercase;
      color: #03305D;      /* var(--blue) falls du eine CSS-Variable hast */
      margin-bottom: 2rem;
    }

    /* --- Das hintere Pseudo-Element (z. B. Farbfläche, Schatten usw.) --- */
    .page-title::before {
      content: "";
      position: absolute;
      top: 0;
      left: -20px;
      right: -20px;
      bottom: 0;

      /* Beispiel: ein halbtransparenter Hintergrund + Schatten */
      background-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 0 10px rgba(0,0,0,0.2);

      /* z-index: 1 -> liegt unterhalb des .page-title (z-index: 3) */
      z-index: 1;
    }

    /* --- Das vordere Pseudo-Element (Pattern über ::before, aber unter Text) --- */
    .page-title::after {
      content: "";
      position: absolute;
      top: 0;
      left: -20px;
      right: -20px;
      bottom: 0;

      /* Separates Pattern (evtl. das gleiche wie im Body,
         oder ein anderes) */
      background: url('pattern.png') /* <-- Pfad anpassen */
                  repeat center center;
      opacity: 0.8;

      /* Ein bisschen offset, damit man das "Darüberliegen" sieht */
      /* oder es komplett deckungsgleich lassen */
      transform: translate(10px, 10px);

      /* z-index: 2 -> liegt über ::before (z-index: 1), unter dem Text (z-index: 3) */
      z-index: 2;
    }

    /* Etwas Beispieltext darunter */
    .more-text {
      color: #03305D;
      font-size: 1.2rem;
      line-height: 1.4;
      max-width: 600px;
      margin: 2rem auto 0;
    }
  </style>
</head>
<body>

  <div class="content">
    <h1 class="page-title">Beispiel-Titel</h1>

    <p class="more-text">
      Hier siehst du den Effekt:
      - Der Body hat ein eigenes Pattern (im Hintergrund).<br>
      - <code>.page-title::before</code> legt eine leicht transparente weiße Fläche mit Schatten darunter.<br>
      - <code>.page-title::after</code> legt ein **weiteres** Pattern leicht versetzt oben drauf.<br>
      Und der Text <strong>.page-title</strong> selbst liegt mit <code>z-index: 3</code> ganz oben.
    </p>
  </div>

</body>
</html>
