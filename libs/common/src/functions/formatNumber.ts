export const formatNumber = (value: number | string, {locale= 'en-AU', isCurrency = false, currency = 'AUD', isCompact = false, decimalDigits}: {locale? : string; isCurrency?: boolean; currency?: string; isCompact?: boolean; decimalDigits?: number} = {}) => {
 if (value === null || value === undefined) {
        return '';
  }

  const numberValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numberValue)) {
      return '';
  }

  return new Intl.NumberFormat(locale, {
    ...(isCurrency && { style: 'currency', currency }),
    ...(isCompact && { notation: 'compact'}),
    ...(decimalDigits && {minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits})
  }).format(numberValue);
}

