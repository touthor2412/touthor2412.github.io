"""Resize photos for the website and remove their hidden data (EXIF, GPS, XMP).

Clean new photos into a folder in the site:

    python tools/clean_photos.py C:/Users/me/Pictures/trip/*.jpg --out assets/images/posts/my-story

Check that every photo already in the site is clean:

    python tools/clean_photos.py --check assets/images

Each cleaned photo is at most 1600px wide. To get under about 300 KB the script
first lowers the JPEG/WebP quality, then makes the photo smaller (never below
800px wide). The original files are never changed.
"""

import argparse
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

MAX_WIDTH = 1600
MIN_WIDTH = 800        # never shrink below this just to save bytes
MAX_BYTES = 300 * 1024
QUALITIES = (85, 80, 75, 70, 65, 60)
PHOTO_TYPES = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"}
SITE_TYPES = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def web_name(path):
    """'My Photo 01.JPG' -> 'my-photo-01'"""
    stem = re.sub(r"[^a-z0-9]+", "-", path.stem.lower()).strip("-")
    return stem or "photo"


def hidden_data(img):
    """Names of the metadata blocks still inside an opened image."""
    found = []
    exif = img.getexif()
    if len(exif):
        found.append("GPS" if exif.get_ifd(0x8825) else "EXIF")
    for key in ("xmp", "XML:com.adobe.xmp", "photoshop", "comment"):
        if img.info.get(key):
            found.append(key)
    return found


def clean(src, out_dir):
    with Image.open(src) as img:
        img = ImageOps.exif_transpose(img)   # keep the photo the right way up
        icc = img.info.get("icc_profile")    # colour profile only, no personal data
        img.info.clear()

        if img.width > MAX_WIDTH:
            height = round(img.height * MAX_WIDTH / img.width)
            img = img.resize((MAX_WIDTH, height), Image.LANCZOS)

        as_webp = src.suffix.lower() == ".webp"
        if not as_webp and img.mode != "RGB":
            if "A" in img.getbands():         # put see-through parts on white
                background = Image.new("RGB", img.size, "white")
                background.paste(img, mask=img.getchannel("A"))
                img = background
            else:
                img = img.convert("RGB")
        dest = out_dir / (web_name(src) + (".webp" if as_webp else ".jpg"))

        # Lower the quality first; if that is not enough, make the photo a bit smaller.
        while True:
            for quality in QUALITIES:
                options = {"quality": quality, "icc_profile": icc}
                if as_webp:
                    img.save(dest, "WEBP", method=6, **options)
                else:
                    img.save(dest, "JPEG", optimize=True, progressive=True, **options)
                if dest.stat().st_size <= MAX_BYTES:
                    break
            if dest.stat().st_size <= MAX_BYTES or img.width <= MIN_WIDTH:
                break
            img = img.resize((round(img.width * 0.85), round(img.height * 0.85)), Image.LANCZOS)

    with Image.open(dest) as check:
        left = hidden_data(check)
        size = check.size
    if left:
        dest.unlink()
        raise RuntimeError(f"{src.name}: still has {', '.join(left)} after cleaning")

    kb = dest.stat().st_size // 1024
    note = "" if kb <= MAX_BYTES // 1024 else "  (still over 300 KB, try cropping it)"
    print(f"  {src.name} -> {dest.as_posix()}  {size[0]}x{size[1]}, {kb} KB{note}")


def check_folder(folder):
    files = [p for p in sorted(folder.rglob("*")) if p.suffix.lower() in SITE_TYPES]
    problems = 0
    for path in files:
        with Image.open(path) as img:
            left = hidden_data(img)
        kb = path.stat().st_size // 1024
        if left or path.stat().st_size > MAX_BYTES:
            problems += 1
            issues = left + ([f"{kb} KB"] if path.stat().st_size > MAX_BYTES else [])
            print(f"  FIX  {path.as_posix()}: {', '.join(issues)}")
    print(f"Checked {len(files)} image(s): {problems} need cleaning.")
    return problems == 0


def main():
    parser = argparse.ArgumentParser(description="Resize photos and remove EXIF/GPS data.")
    parser.add_argument("photos", nargs="*", type=Path, help="photo files to clean")
    parser.add_argument("--out", type=Path, help="folder to save the cleaned photos in")
    parser.add_argument("--check", type=Path, metavar="FOLDER",
                        help="only report images in FOLDER that still have hidden data or are too big")
    args = parser.parse_args()

    if args.check:
        sys.exit(0 if check_folder(args.check) else 1)
    if not args.photos or not args.out:
        parser.error("give one or more photos and --out FOLDER (or use --check FOLDER)")

    args.out.mkdir(parents=True, exist_ok=True)
    failed = 0
    for src in args.photos:
        if src.suffix.lower() not in PHOTO_TYPES:
            print(f"  skip {src.name}: not a photo type this script knows")
            continue
        try:
            clean(src, args.out)
        except Exception as error:   # keep going with the other photos
            failed += 1
            print(f"  FAILED {error}")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
