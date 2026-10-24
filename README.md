# touthor2412.github.io

Touthor's personal story site, built with Jekyll and hosted on GitHub Pages.

[How to add a story, a journey step and photos will be written here in Phase 6.]

## Adding photos

Every photo must be cleaned before it goes into the site. Cleaning makes it at most
1600px wide and under about 300 KB, and removes hidden data such as the GPS location.

1. Install Pillow once: `python -m pip install Pillow`
2. Clean the photos into a folder for the story (your originals are not changed):

   ```
   python tools/clean_photos.py "C:/Users/me/Pictures/trip/IMG_2041.jpg" --out assets/images/posts/leaving-laos
   ```

   The new file gets a web-safe name, for example `assets/images/posts/leaving-laos/img-2041.jpg`.
   Rename it to something clear, such as `cover.jpg`, if you like.
3. Before every commit, check that all photos in the site are clean:

   ```
   python tools/clean_photos.py --check assets/images
   ```

   It should say `0 need cleaning`.
