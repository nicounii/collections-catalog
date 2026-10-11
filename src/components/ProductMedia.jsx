import { Plate } from './Plate.jsx';

/**
 * ProductMedia — the single image surface for a lot.
 *
 * If the product carries a real photograph (`product.image`) it renders
 * that photo; otherwise it falls back to the engraved <Plate> illustration.
 * Drop-in replacement for <Plate /> wherever a product is displayed, so a
 * lot can move from illustration to photography one field at a time.
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
    return (
      <div
        className={`relative overflow-hidden ${ratio} ${className}`}
        style={{ background: dark ? '#0a0a0c' : '#ececef' }}
      >
        <img
          src={product.image}
          alt={product.imageAlt || `${product.title}, ${product.era}`}
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
