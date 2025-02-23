const axios = require("axios");

const checkHoliday = async (date) => {
  try {
    const country = "IQ"; // Change this to match the user's country
    const year = new Date(date).getFullYear();

    const url = `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_API_KEY}&country=${country}&year=${year}`;

    const response = await axios.get(url);
    const holidays = response.data.response.holidays.map(
      (holiday) => holiday.date.iso
    );
    console.log(date);
    
    // Check if the given date is a holiday
    if (holidays.includes(date)) {
      return true;
    }

    // Check if the given date is a weekend (Saturday or Sunday)
    const dayOfWeek = new Date(date).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error checking holidays:", error);
    return false;
  }
};

module.exports = checkHoliday;
