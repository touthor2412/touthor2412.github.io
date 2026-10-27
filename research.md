---
layout: page
title: Research
permalink: /research/
description: Teaching a computer to judge the quality of Kohaku koi.
wrap: wrap--research
eyebrow: "Master's research · Niigata University"
kicker: "Teaching a computer to"
big: "Judge koi"
lead: "Kohaku koi are white fish with red patterns, and in Japan a beautiful one can win prizes. Judging them takes years of experience. I'm testing whether an AI model can learn what a high-quality Kohaku looks like."
body_class: research
---
<section class="research-block" aria-labelledby="idea-title">
  <h2 id="idea-title">The idea in three steps</h2>
  <ol class="steps">
    <li>
      <span class="step-num" aria-hidden="true">1</span>
      <h3>Learn from winners</h3>
      <p>The model studies photos of award-winning Kohaku, so it learns what "good" looks like.</p>
    </li>
    <li>
      <span class="step-num" aria-hidden="true">2</span>
      <h3>Blur it, then rebuild it</h3>
      <p>A new photo gets covered with noise, and the model tries to rebuild the fish from what it learned.</p>
    </li>
    <li>
      <span class="step-num" aria-hidden="true">3</span>
      <h3>Measure the difference</h3>
      <p>If the rebuilt fish looks very different from the photo, that fish is less like the winners.</p>
    </li>
  </ol>
</section>

<div class="research-block image-strip">
  <figure>
    <div class="placeholder" role="img" aria-label="Placeholder for an original koi photo">[Original photo]</div>
    <figcaption>The photo goes in</figcaption>
  </figure>
  <figure>
    <div class="placeholder" role="img" aria-label="Placeholder for a noisy koi photo">[With noise added]</div>
    <figcaption>Noise is added</figcaption>
  </figure>
  <figure>
    <div class="placeholder" role="img" aria-label="Placeholder for a rebuilt koi photo">[Rebuilt by the model]</div>
    <figcaption>The model rebuilds it, and we compare</figcaption>
  </figure>
</div>

<div class="research-block panel">
  <div>
    <h2>Why it matters</h2>
    <p>Koi are a big part of Niigata's culture and its local industry. A tool like this could one day help breeders and buyers by giving a second opinion that is consistent and easy to explain.</p>
  </div>
  <div>
    <h2>For the curious</h2>
    <p>The model is a Denoising Diffusion Probabilistic Model (DDPM). The gap between the photo and the rebuilt fish, called the reconstruction error, is the quality signal.</p>
  </div>
</div>

<section class="research-block" aria-labelledby="talks-title">
  <h2 id="talks-title">Talks and papers</h2>
  <ul class="talks">
    <li>
      <span class="talk-date">November 2026</span>
      <span class="talk-text">Oral presentation at INCC 2026, Niigata · [link to slides or paper after the talk]</span>
    </li>
    <li>
      <span class="talk-date">[Date]</span>
      <span class="talk-text">[Poster presentation: title and place]</span>
    </li>
  </ul>
</section>

<p class="muted">Supervised by Yamazaki Tatsuya sensei, Graduate School of Science and Technology, Niigata University.</p>
