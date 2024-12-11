document.getElementById('simulateBtn').addEventListener('click', function() {
    let codeType = document.getElementById('codeType').value;
    let output = document.getElementById('output');
    let progressBar = document.getElementById('progressBar');
    let successRateText = document.getElementById('successRate');
    let retransmissionsText = document.getElementById('retransmissions');
    let timeTakenText = document.getElementById('timeTaken');

    output.innerHTML = `<h3>Simulating ${codeType}...</h3>`;
    resetMetrics();

    // Start the simulation
    let startTime = Date.now();
    let totalPackets = 100;
    let successfulPackets = 0;
    let retransmissions = 0;

    for (let i = 0; i < totalPackets; i++) {
        setTimeout(() => {
            let result = simulateRatelessCode(codeType);
            if (result.success) {
                successfulPackets++;
            } else {
                retransmissions++;
            }

            // Update the progress
            let progress = Math.floor(((i + 1) / totalPackets) * 100);
            progressBar.value = progress;

            // Update performance metrics
            successRateText.innerHTML = `Success Rate: ${Math.round((successfulPackets / totalPackets) * 100)}%`;
            retransmissionsText.innerHTML = `Retransmissions: ${retransmissions}`;
            timeTakenText.innerHTML = `Time Taken: ${(Date.now() - startTime) / 1000}s`;

            // If simulation is complete
            if (i === totalPackets - 1) {
                output.innerHTML += `<p>Simulation Complete!</p>`;
            }
        }, i * 100); // Simulate each packet with a delay for visual effect
    }
});

function resetMetrics() {
    document.getElementById('successRate').innerHTML = `Success Rate: 0%`;
    document.getElementById('retransmissions').innerHTML = `Retransmissions: 0`;
    document.getElementById('timeTaken').innerHTML = `Time Taken: 0s`;
}

function simulateRatelessCode(codeType) {
    // Add basic error simulation: Random noise or erasure
    let isSuccess = Math.random() > 0.2; // 80% success rate (20% failure rate)
    return { success: isSuccess };
}
