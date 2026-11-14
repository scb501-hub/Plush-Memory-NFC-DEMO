# NFC Memory Plushy — site

Full-screen photo page that shows a random image from `images/` on every load, with
a soft blurred backdrop (pulled from the photo itself) and a thin brass frame around
the sharp photo. No captions, no buttons — the page is driven entirely by the NFC
tap (each tap = a fresh page load = a new random photo).

Currently loaded with 4 placeholder illustrations (not real photos) just to prove the
layout, random pick, and aspect-ratio handling work. Swap these out before gifting.

## Testing locally

Because the page loads `manifest.json` with `fetch()`, opening `index.html` directly
by double-clicking it won't work in most browsers (blocked by local file security
rules). Instead, serve the folder:

```
cd nfc-memory-site
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser (or on your phone, if it's on the
same wifi network, using your computer's local IP instead of `localhost`). Reload
the page a few times to see the shuffle in action.

## Replacing the placeholder photos

1. Put your real photos in `images/` (jpg or png both work).
2. Edit `manifest.json` and list each filename, e.g.:

```json
{
  "images": [
    "images/beach-trip.jpg",
    "images/birthday.jpg",
    "images/dog.jpg"
  ]
}
```

3. Delete the old `sample1.jpg`–`sample4.jpg` placeholders once you're happy with
   your real set.

Tip: keep individual photos under ~1–2MB (resize/compress first) so the page loads
quickly on mobile data.

## Deploying so the NFC tag can point to it

1. Create a free GitHub account (or use your existing student-pack one).
2. Create a new public repository and upload these files (or push via git).
3. In the repo's Settings → Pages, enable GitHub Pages for the main branch.
4. GitHub gives you a live URL like `https://yourusername.github.io/repo-name/`.
5. (Optional, since you have the GitHub Student Developer Pack) redeem the free
   one-year custom domain via the Student Pack's Namecheap offer, and point it at
   your GitHub Pages site for a shorter, more personal link.

## Writing the NFC tag

Use a free app like **NFC Tools** (iOS) to:
1. Scan the tag once to confirm its exact model (213/215/216).
2. Write a new "URL/URI" record containing your GitHub Pages (or custom domain) link.

Test by tapping the tag with a phone before sewing it into the plushy.
