declare global {
    function formatDate(date: Date | string, format?: string): string;
    function isHappeningNow(date: Date | string): string;
  }
  
  function isHappeningNow(date: Date | string): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
  
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    const diffMs = dateObj.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000); 
    const diffHours = Math.round(diffMs / 3600000); 
    const diffDays = Math.round(diffMs / 86400000); 
  
    // Check if happening now (within 5 minutes before or after)
    if (Math.abs(diffMins) <= 5) {
      return 'happening';
    }
    
    // Check if the date is in the future
    if (diffMs > 0) {
      if (diffMins < 60) {
        return `in ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
      }
      if (diffHours < 24) {
        return `in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
      }
      if (diffDays < 7) {
        return `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
      }
      // More than a week away
      return 'upcoming'; // Changed to return 'upcoming' for dates more than 7 days in the future
    }
    
    // Date is in the past
    if (diffMins >= -60) {
      return `${Math.abs(diffMins)} minute${Math.abs(diffMins) !== 1 ? 's' : ''} ago`;
    }
    if (diffHours >= -24) {
      return `${Math.abs(diffHours)} hour${Math.abs(diffHours) !== 1 ? 's' : ''} ago`;
    }
    if (diffDays >= -7) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`;
    }
    
    // More than a week ago
    return 'Past';
  }


  function formatDate(date: Date | string, format: string = 'date'): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    if (format === 'date') {
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
    
    if (format === 'time') {
      return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    if (format === 'datetime') {
      return `${formatDate(dateObj, 'date')} ${formatDate(dateObj, 'time')}`;
    }
    
    let result = format;
    result = result.replace(/yyyy/g, dateObj.getFullYear().toString());
    result = result.replace(/MM/g, (dateObj.getMonth() + 1).toString().padStart(2, '0'));
    result = result.replace(/dd/g, dateObj.getDate().toString().padStart(2, '0'));
    result = result.replace(/HH/g, dateObj.getHours().toString().padStart(2, '0'));
    // Minutes (mm)
    result = result.replace(/mm/g, dateObj.getMinutes().toString().padStart(2, '0'));
    // Seconds (ss)
    result = result.replace(/ss/g, dateObj.getSeconds().toString().padStart(2, '0'));
    
    return result;
  }
  
  globalThis.formatDate = formatDate;
  globalThis.isHappeningNow = isHappeningNow;
  
  export { formatDate , isHappeningNow };