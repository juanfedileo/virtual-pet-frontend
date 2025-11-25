export const normalizeStatus = (s?: string) => (s || '').toString().trim().toLowerCase();

export const translateStatusToSpanish = (s?: string) => {
  const st = normalizeStatus(s);
  if (!st) return '';
  if (st === 'pending' || st === 'processing') return 'en proceso';
  if (st === 'ready to ship') return 'listo para enviar';
  if (st === 'shipped') return 'enviado';
  if (st === 'delivered') return 'entregado';
  return st; // fallback: return normalized value
};

export const statusChipColor = (s?: string) => {
  const st = normalizeStatus(s);
  if (st === 'delivered') return 'success';
  if (st === 'shipped') return 'primary';
  if (st === 'ready to ship') return 'warning';
  if (st === 'pending' || st === 'processing') return 'warning';
  return 'default';
};
