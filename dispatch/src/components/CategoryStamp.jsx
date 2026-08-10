import { categoryMeta } from '../lib/categories';

export default function CategoryStamp({ category }) {
  const meta = categoryMeta(category);
  return <span className={`stamp ${meta.stampClass}`}>{meta.label}</span>;
}
