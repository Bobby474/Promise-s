document.addEventListener("DOMContentLoaded", function () {
    const orderFoodBtn = document.getElementById("orderFoodBtn");

    orderFoodBtn.addEventListener("click", () => {
        const selectedItems = getSelectedItems();
        if (selectedItems.length > 0) {
            processOrder(selectedItems);
        } else {
            alert("Please select at least one item to order.");
        }
    });
});

function getSelectedItems() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedItems = [];

    checkboxes.forEach((checkbox) => {
        selectedItems.push({
            name: checkbox.id,
            price: parseFloat(checkbox.parentNode.previousElementSibling.textContent.slice(1))
        });
    });

    return selectedItems;
}

function processOrder(selectedItems) {
    const orderPromise = new Promise((resolve) => {
        const randomSeconds = Math.floor(Math.random() * 5000) + 1000;
        setTimeout(() => {
            resolve();
        }, randomSeconds);
    });

    orderPromise.then(() => {
        displayOrderConfirmation(selectedItems);
    });
}

function displayOrderConfirmation(selectedItems) {
    const contentDiv = document.querySelector(".content");

    contentDiv.innerHTML = "";

    const orderDetails = document.createElement("div");
    orderDetails.classList.add("order-details");

    selectedItems.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `<p>${item.name}</p><p>₹${item.price.toFixed(2)}</p>`;
        orderDetails.appendChild(itemDiv);
    });

    const totalPrice = selectedItems.reduce((total, item) => total + item.price, 0);
    const totalPriceDiv = document.createElement("div");
    totalPriceDiv.innerHTML = `<p>Total Price:</p><p>₹${totalPrice.toFixed(2)}</p>`;
    orderDetails.appendChild(totalPriceDiv);

    const orderInfo = document.createElement("div");
    orderInfo.style.position = "absolute";
    orderInfo.style.top = "10px";
    orderInfo.style.right = "10px";
    orderInfo.innerHTML = `Order ID: ${generateOrderId()}`;

    contentDiv.appendChild(orderDetails);
    contentDiv.appendChild(orderInfo);
}

function generateOrderId() {
    return Math.floor(Math.random() * 1000) + 1;
}
