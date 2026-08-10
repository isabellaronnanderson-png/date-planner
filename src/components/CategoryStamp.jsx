import { categoryMeta } from '../lib/categories';

export default function CategoryStamp({ category }) {
  const meta = categoryMeta(category);
  const Icon = meta.Icon;
  return (
    <span className="cat-pill" style={{ '--pill-color': `var(${meta.cssVar})` }}>
      {Icon && <Icon className="cat-pill-icon" />}
      {meta.label}
    </span>
  );
}
