async function getAirportInfo() {
    const code = document.getElementById("codeInput").value.toUpperCase();
    const resultDiv = document.getElementById("result");
    const loadingDiv = document.getElementById("loading");

    resultDiv.innerHTML = "";
    loadingDiv.style.display = "block"; // Show loading message

    try {
        const response = await fetch("dataset.json");
        const airports = await response.json();
        const airport = airports.find(a => a.iata === code || a.icao === code);

        if (airport) {
            resultDiv.innerHTML = `
                <h3>${airport.name}</h3>
                <p><strong>ICAO:</strong> ${airport.icao} | <strong>IATA:</strong> ${airport.iata}</p>
                <p><strong>Location:</strong> ${airport.lat}, ${airport.lon}</p>
                <p><strong>Country:</strong> ${airport.country}</p>
            `;
        } else {
            resultDiv.innerHTML = "<p style='color: red;'>Airport not found!</p>";
        }
    } catch (error) {
        resultDiv.innerHTML = "<p style='color: red;'>Failed to load airport data.</p>";
        console.error("Error loading the dataset:", error);
    } finally {
        loadingDiv.style.display = "none"; // Hide loading message
    }
}
