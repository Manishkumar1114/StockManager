const apiUrl = 'https://crudcrud.com/api/c03e7c48903345cb81ad609eb566c7b8/candies';

document.getElementById('addItemButton').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    if (name && description && price && quantity) {
        const candy = { name, description, price, quantity };
        addItem(candy);
    } else {
        alert('Please fill in all fields');
    }
});

function addItem(candy) {
    axios.post(apiUrl, candy)
        .then(response => {
            displayItem(response.data);
        })
        .catch(error => {
            console.error('There was an error adding the item!', error);
        });
}

function displayItem(candy) {
    const candyList = document.getElementById('candyList');
    
    const candyItem = document.createElement('div');
    candyItem.className = 'candy-item';
    candyItem.id = candy._id;

    const candyDetails = document.createElement('div');
    candyDetails.innerHTML = `<strong>${candy.name}</strong><br>${candy.description}<br>Price: $${candy.price}<br>Quantity: <span class="quantity">${candy.quantity}</span>`;
    
    const buyButton = document.createElement('button');
    buyButton.textContent = 'Buy 1';
    buyButton.addEventListener('click', function() {
        const quantityElement = candyItem.querySelector('.quantity');
        let currentQuantity = parseInt(quantityElement.textContent, 10);
        if (currentQuantity > 0) {
            quantityElement.textContent = --currentQuantity;
            updateQuantity(candy._id, currentQuantity);
        } else {
            alert('Out of stock');
        }
    });

    candyItem.appendChild(candyDetails);
    candyItem.appendChild(buyButton);
    candyList.appendChild(candyItem);
}

function updateQuantity(id, quantity) {
    axios.put(`${apiUrl}/${id}`, { quantity })
        .then(response => {
            console.log('Quantity updated successfully');
        })
        .catch(error => {
            console.error('There was an error updating the quantity!', error);
        });
}

window.onload = function() {
    axios.get(apiUrl)
        .then(response => {
            response.data.forEach(candy => {
                displayItem(candy);
            });
        })
        .catch(error => {
            console.error('There was an error fetching the candies!', error);
        });
};
