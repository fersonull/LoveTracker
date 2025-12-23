export const DateUtils = {
  // Calculate relationship duration from start date to now
  calculateDuration(startDateString) {
    const startDate = new Date(startDateString);
    const now = new Date();
    
    // Calculate total days
    const timeDiff = now.getTime() - startDate.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    // Calculate years and months
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    // Adjust for negative days
    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalMonths = years * 12 + months;
    
    return {
      totalDays,
      totalMonths,
      years,
      months,
      days
    };
  },

  // Format duration for display
  formatDuration(duration) {
    const { years, months, days } = duration;
    
    if (years > 0) {
      if (months > 0) {
        return `${years} year${years > 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
      }
      return `${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  },

  // Get next milestone dates
  getNextMilestones(startDateString) {
    const startDate = new Date(startDateString);
    const now = new Date();
    
    // Next monthsary (same date next month)
    const nextMonthsary = new Date(now);
    nextMonthsary.setMonth(nextMonthsary.getMonth() + 1);
    nextMonthsary.setDate(startDate.getDate());
    
    // Next anniversary (same date next year)
    const nextAnniversary = new Date(startDate);
    nextAnniversary.setFullYear(now.getFullYear());
    
    // If this year's anniversary has passed, set it to next year
    if (nextAnniversary < now) {
      nextAnniversary.setFullYear(now.getFullYear() + 1);
    }
    
    return {
      nextMonthsary,
      nextAnniversary
    };
  },

  // Format date for display
  formatDate(date) {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Format date for short display
  formatShortDate(date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};