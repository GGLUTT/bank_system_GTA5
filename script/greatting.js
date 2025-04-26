
function getTimeBasedGreeting(userName) {
    const currentHour = new Date().getHours();
    let greeting = "Welcome";
    if (currentHour < 12) greeting = "Good Morning";
    else if (currentHour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    return `${greeting}, ${userName}!`;
}
