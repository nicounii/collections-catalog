# Task Report: 04-image-pipeline-cloudinary

**Feature:** sale-catalog-v2
**Completed:** 2026-10-11T05:15:21.305Z
**Status:** success
**Commit:** 5a901ea7524873525f87dc54d7a8a9d6c156e02d

---

## Summary

Created src/lib/cloudinary.js (cldUrl(url,{w,h,crop,quality,format}) injects transformation params only for res.cloudinary.com /image/upload/ URLs; local paths/empty/undefined pass through unchanged; isCldUrl exported), enhanced src/components/ProductMedia.jsx to emit srcSet (400/800/1200) + sizes for Cloudinary-backed images while keeping loading=lazy/decoding=async and the <Plate> glyph fallback untouched, and created docs/image-pipeline.md (signed/restricted preset settings, naming, never-open-unsigned rule, no API secret in client). ProductCard.jsx needed no change — it already passes ratio and ProductMedia computes srcSet internally. Verified: cldUrl('https://res.cloudinary.com/demo/image/upload/sample.jpg',{w:400}) → w_400,c_fill,q_auto,f_auto; pass-through for /photos/..., undefined, ''; srcSet shape correct; npm run build passes. Not run: interactive npm run dev browser check (headless env). OPERATOR deferred: create Cloudinary account + signed preset, upload public/photos/*, set image_url in Airtable for launch subset.

---

## Changes

- **Files changed:** 3
- **Insertions:** +106
- **Deletions:** -1

### Files Modified

- `docs/image-pipeline.md`
- `src/components/ProductMedia.jsx`
- `src/lib/cloudinary.js`
