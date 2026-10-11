import { Plate } from './Plate.jsx';
import { cldUrl, isCldUrl } from '../lib/cloudinary.js';

const SRCSET_WIDTHS = [400, 800, 1200];

/**
 * ProductMedia — the single image surface for a lot.
 *
 * If the product carries a real photograph (`product.image`) it renders
 * that photo; otherwise it falls back to the engraved <Plate> illustration.
 * Drop-in replacement for <Plate /> wherever a product is displayed, so a
 * lot can move from illustration to photography one field at a time.
 *
 * Cloudinary delivery URLs get a responsive srcSet (400/800/1200) + sizes;
 * local paths, empty strings, and undefined render exactly as before.
 *
 * Props mirror <Plate />: { product, variant, ratio, className, children }
 */
export function ProductMedia({
  product,
  variant = 'light',
  ratio = 'aspect-[4/5]',
  className = '',
  imgClassName = '',
  children,
}) {
  if (product?.image) {
    const dark = variant === 'dark';
    const src = product.image;
    const cloudinary = isCldUrl(src);
    const srcSet = cloudinary
      ? SRCSET_WIDTHS.map((w) => `${cldUrl(src, { w })} ${w}w`).join(', ')
      : undefined;
    const sizes = cloudinary
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      : undefined;

    return (
      <div
        className={`relative overflow-hidden ${ratio} ${className}`}
        style={{ background: dark ? '#0a0a0c' : '#ececef' }}
      >
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={product.imageAlt || product.title}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
        />
        {children}
      </div>
    );
  }

  return (
    <Plate
      art={product?.art}
      variant={variant}
      lot={product?.lot}
      ratio={ratio}
      className={className}
    >
      {children}
    </Plate>
  );
}
