export const dateFormatter = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'N/A';
  }
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('es-CL', options);
};
