# PWA Icon Generation Instructions

Due to image generation quota limits, please create the PWA icons manually using one of these methods:

## Option 1: Use an Online Tool
1. Visit [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) or [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload the existing `src/app/icon.svg` file
3. Generate 192x192 and 512x512 PNG icons
4. Save them as:
   - `public/icon-192.png`
   - `public/icon-512.png`

## Option 2: Use ImageMagick or Similar Tool
If you have ImageMagick installed, run:
```bash
# Convert SVG to 192x192 PNG
magick convert -background none -resize 192x192 src/app/icon.svg public/icon-192.png

# Convert SVG to 512x512 PNG
magick convert -background none -resize 512x512 src/app/icon.svg public/icon-512.png
```

## Option 3: Use a Design Tool
1. Open `src/app/icon.svg` in Figma, Sketch, or similar
2. Export as PNG at 192x192 and 512x512 sizes
3. Save to the public folder

## Temporary Workaround
For now, you can copy the existing `icon.svg` to the public folder as a temporary placeholder:
```bash
Copy-Item src/app/icon.svg public/icon-192.png
Copy-Item src/app/icon.svg public/icon-512.png
```

The app will still work, but browsers may not display the icons optimally until proper PNG files are created.
