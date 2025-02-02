const request = Object.fromEntries(
    location.search
        .slice(1)
        .split('&')
        .map(param => param.split('='))
);
const driverId = request?.id ?? `MzQx`;

const actionButton = document.getElementById("action");
const elIds = ["fromDate", "toDate"];

elIds.forEach(id => {
    const el = document.getElementById(id);
    if (isEmpty(el.value) && request[id]) {
        el.value = request[id]
            .split('-')
            .toReversed()
            .join('-');
    }
});

actionButton.addEventListener("click", () => {
    if (!driverId) {
        return;
    }
    const dates = elIds
        .map(id => document.getElementById(id).value);
    if (dates.some(date => !date || date.length === 0)) {
        alert("Проверьте даты");
        return;
    }

    const code = btoa(`${driverId}#${dates[0]}#${dates[1]}`);
    location.assign(`https://eco.kociuk.pl/chart.php?code=${code}`);
});