export const DateFormat = (date) => {
  
    const format = new Date(date || new Date());
    
    const formattedDate = format.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString || new Date());
    return date?.toISOString().split('T')[0]; // Extracts the YYYY-MM-DD part
}