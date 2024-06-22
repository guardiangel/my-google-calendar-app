function findAvailableTimeSlots(startTime, endTime, busySlots, duration) {
    // Helper function to parse date strings and get time in milliseconds
    function parseTime(timeStr) {
        return new Date(timeStr).getTime();
    }

    // Helper function to format time in "YYYY-MM-DD HH:MM:SS" format
    function formatTime(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const availableSlots = [];
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const oneHour = duration * 60 * 60 * 1000; // Duration in milliseconds

    // Sort busySlots by start time
    busySlots.sort((a, b) => parseTime(a.start) - parseTime(b.start));

    // Initialize the previous end time as the start of the day
    let prevEnd = start;

    for (const slot of busySlots) {
        const slotStart = parseTime(slot.start);
        const slotEnd = parseTime(slot.end);

        // Check if there's a gap of at least one hour between the previous end time and the current slot start
        while (prevEnd + oneHour <= slotStart) {
            availableSlots.push({
                start: formatTime(prevEnd),
                end: formatTime(prevEnd + oneHour)
            });
            prevEnd += oneHour; // Move the previous end time forward by one hour
        }

        // Move the previous end time to the end of the current slot if it is later
        if (slotEnd > prevEnd) {
            prevEnd = slotEnd;
        }
    }

    // Check for any remaining time after the last busy slot until the end of the day
    while (prevEnd + oneHour <= end) {
        availableSlots.push({
            start: formatTime(prevEnd),
            end: formatTime(prevEnd + oneHour)
        });
        prevEnd += oneHour;
    }

    return availableSlots;
}

// Example usage:
const startTime = "2024-06-22 09:00:00";
const endTime = "2024-06-22 17:00:00";
const busySlots = [
    { start: "2024-06-22 10:30:00", end: "2024-06-22 11:45:00" },
    { start: "2024-06-22 12:30:00", end: "2024-06-22 13:45:00" }
];
const duration = 1; // Duration in hours

const availableTimeSlots = findAvailableTimeSlots(startTime, endTime, busySlots, duration);
console.log(availableTimeSlots);
