// I called the form
const form = document.getElementById("crud-form")
// I called each field of the form
const roomNumber = document.getElementById("number")
const roomType = document.getElementById("type")
const roomPrice = document.getElementById("price")
const bed = document.getElementById("beds")
const bath = document.getElementById("baths")
const breakfast = document.getElementById("breakfast")
const wifi = document.getElementById("wifi")
const airConditioning = document.getElementById("air-Conditioning")
const tbody = document.querySelector("tbody")

// Create function
async function create(roomNumber, roomType, roomPrice, bed, bath, breakfast, wifi, airConditioning) {
    const newRoom = {
        number: roomNumber.value,
        type: roomType.value,
        price: roomPrice.value,
        beds: bed.value,
        baths: bath.value,
        breakfast: breakfast.value,
        wifi: wifi.value,
        airConditioning: airConditioning.value
    }
    console.log(newRoom);
    await fetch("http://localhost:3000/rooms", {
        method: "POST", 
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRoom) 
    })
    await show()
};

// Show function
async function show() {
    const reply = await fetch("http://localhost:3000/rooms");
    const data = await reply.json();
    console.log(data);
    tbody.innerHTML = "";
    data.forEach((room) => {
      tbody.innerHTML += `
      <td>${room.number}</td>
      <td>${room.type}</td>
      <td>${room.price}</td>
      <td>${room.beds}</td>
      <td>${room.baths}</td>
      <td>${room.breakfast}</td>
      <td>${room.wifi}</td>
      <td>${room.airConditioning}</td>
      <td>
        <button type="button" data-id=${room.id} class="btn btn-warning">Edit</button>
        <button type="button" data-id=${room.id} class="btn btn-danger">Delete</button>
      </td>
      `;
    });
  };

// Update function
async function update(breakfast, wifi, airConditioning, roomNumber, roomType, roomPrice, bed, bath) {
    const updateData = {
        breakfast: breakfast.value,
        wifi: wifi.value,
        airConditioning: airConditioning.value,
        number: roomNumber.value,
        type: roomType.value,
        price: roomPrice.value,
        beds: bed.value,
        baths: bath.value
    }

    await fetch("http://localhost:3000/rooms", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData) 
    })
    await show()
}

// Delete function
async function deleteRoom(id) { 
    await fetch(`"http://localhost:3000/rooms",${id}`, { 
        method: "DELETE", 
        headers: { 
            "Content-Type": "application/json", 
        }
    })
    await show() 
};