"""Makes the site's icons and share card. Run by hand when the brand changes; the results are committed.

  python scripts/make-images.py <path to the app's 1024px icon.png>

Icons come from the app's own icon, so the site and the app always match. The share card is scripts/og-card.html
rendered by headless Chrome (Pillow is needed for the icons, Chrome or Edge for the card).
"""
import os
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
icon = Image.open(sys.argv[1]).convert("RGBA")


def save(size: int, dest: str) -> None:
    icon.resize((size, size), Image.LANCZOS).save(ROOT / dest, optimize=True)
    print("wrote", dest)


save(192, "public/icon-192.png")
save(512, "public/icon-512.png")
save(512, "public/logo.png")
save(180, "src/app/apple-icon.png")
icon.resize((48, 48), Image.LANCZOS).save(ROOT / "src/app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("wrote src/app/favicon.ico")

browsers = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
]
browser = next((b for b in browsers if os.path.exists(b)), None)
if not browser:
    sys.exit("No Chrome or Edge found: public/og.png was not updated.")
out = ROOT / "public" / "og.png"
subprocess.run(
    [browser, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1200,630",
     f"--screenshot={out}", (ROOT / "scripts" / "og-card.html").as_uri()],
    check=True, capture_output=True, timeout=120,
)
im = Image.open(out)
assert im.size == (1200, 630), im.size
im.convert("RGB").save(out, optimize=True)
print("wrote public/og.png", im.size)
