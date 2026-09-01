const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");

const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const todayButton = document.getElementById("todayButton");

const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];

const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar() {
    daysContainer.innerHTML = "";
    monthYear.textContent = `${months[currentMonth]} ${currentYear}`;
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let startDay = firstDay.getDay();
    if (startDay === 0) {
        startDay = 6;
    } else {
        startDay--;
    }
    const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
        const day = document.createElement("div");
        day.textContent = daysInPreviousMonth - i;
        day.classList.add("other-month");
        daysContainer.appendChild(day);
    }
    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
        const day = document.createElement("div");
        day.textContent = dayNumber;
        if (dayNumber === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            day.classList.add("today");
        }
        daysContainer.appendChild(day);
    }
    const totalCells = 42;
    const cellsUsed = startDay + daysInMonth;
    const remainingCells = totalCells - cellsUsed;
    for (let dayNumber = 1; dayNumber <= remainingCells; dayNumber++) {
        const day = document.createElement("div");
        day.textContent = dayNumber;
        day.classList.add("other-month");
        daysContainer.appendChild(day);
    }
}
prevMonthButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});
nextMonthButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});
todayButton.addEventListener("click", () => {
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar();
});
renderCalendar();