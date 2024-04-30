document.addEventListener('DOMContentLoaded', () => {
    let totalWeight = 0;
    const totalWeightDisplay = document.getElementById('total-weight');
    const currentBarDisplay = document.getElementById('current-bar');
    const currentWeightsDisplay = document.getElementById('current-weights');

    // Separate handlers for barbell and weight plate clicks
    const barbellClickHandler = (bar) => {
        const weight = parseFloat(bar.getAttribute('data-weight'));
        currentBarDisplay.src = bar.src;
        currentBarDisplay.style.display = 'block';
        // Adjust the total weight only if a different barbell is selected
        if (totalWeight === 0 || totalWeight === currentBarWeight) {
            totalWeight = weight;
        } else {
            totalWeight = totalWeight - currentBarWeight + weight;
        }
        currentBarWeight = weight;
        totalWeightDisplay.textContent = `Total Weight: ${totalWeight} lbs`;
    };

    const weightClickHandler = (weight) => {
        const weightValue = parseFloat(weight.getAttribute('data-weight')) * 2;
        addWeightPlate(weight.src, weight.getAttribute('data-weight'));
        totalWeight += weightValue;
        totalWeightDisplay.textContent = `Total Weight: ${totalWeight} lbs`;
    };

    document.querySelectorAll('.weight:not(.barbell)').forEach(weight => {
        weight.addEventListener('click', () => weightClickHandler(weight));
    });

    document.querySelectorAll('.barbell').forEach(bar => {
        bar.addEventListener('click', () => barbellClickHandler(bar));
    });


    function addWeightPlate(src, dataWeight) {
        let img = document.createElement('img');
        img.src = src;
        img.setAttribute('data-weight', dataWeight); // Store the weight as a data attribute for sorting
        img.classList.add('display-weight');
        currentWeightsDisplay.appendChild(img);
        sortWeightsByDescendingOrder();
    }
    
    function sortWeightsByDescendingOrder() {
        let weightsArray = Array.from(currentWeightsDisplay.children);
        // Sort by the numeric weight value, parsed from the 'data-weight' attribute
        weightsArray.sort((a, b) => parseFloat(b.getAttribute('data-weight')) - parseFloat(a.getAttribute('data-weight')));
        // Re-append children in sorted order
        currentWeightsDisplay.innerHTML = '';
        weightsArray.forEach(img => currentWeightsDisplay.appendChild(img));
    }
    
    
    document.getElementById('clear-button').addEventListener('click', () => {
        totalWeight = 0;
        totalWeightDisplay.textContent = 'Total Weight: 0 lbs';
        currentBarDisplay.style.display = 'none'; // Hide the bar image
        currentWeightsDisplay.innerHTML = ''; // Clear all weight plates
    });
});
