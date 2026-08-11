import { categoryMeta } from '../lib/categories';

export default function CategoryStamp({ category }) {
  const meta = categoryMeta(category);
  return (
    <span className="cat-kicker" style={{ '--pill-color': `var(${meta.cssVar})` }}>
      {meta.label}
    </span>
  );
}
