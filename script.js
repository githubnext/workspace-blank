document.getElementById('sleepForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const x = parseFloat(document.getElementById('hoursBefore').value);
    const y = parseFloat(document.getElementById('hoursAfter').value);

    const weeklyDifference = (x - y) * 7;
    const monthlyDifference = (x - y) * 30 / 24;
    const yearlyDifference = (x - y) * 365 / 24;

    document.getElementById('weeklyResult').textContent = `You will sleep ${weeklyDifference} hours less per week.`;
    document.getElementById('monthlyResult').textContent = `You will sleep ${monthlyDifference.toFixed(2)} days less per month.`;
    document.getElementById('yearlyResult').textContent = `You will sleep ${yearlyDifference.toFixed(2)} days less per year.`;
});
