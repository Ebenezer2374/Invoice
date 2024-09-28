const invoiceForm = document.getElementById("invoice-form");
const invoiceItems = document.getElementById("invoice-items");
const addItemButton = document.getElementById("add-item");
const totalElement = document.getElementById("total");

let total = 0;

function addItem() {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="number" class="qty"></td>
        <td><input type="text" class="description"></td>
        <td><input type="number" class="rate"></td>
        <td><span class="amount">0</span></td>
        <td><button type="button" class="delete-item">Del</button></td>
    `;

    invoiceItems.appendChild(row);

    // Update total on input changes
    row.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
            const qty = parseInt(row.querySelector(".qty").value) || 0;
            const rate = parseInt(row.querySelector(".rate").value) || 0;
            const amount = qty * rate;
            row.querySelector(".amount").textContent = amount;
            updateTotal();
        });
    });

    // Add delete button functionality
    row.querySelector(".delete-item").addEventListener("click", () => {
        invoiceItems.removeChild(row);
        updateTotal();
    });
}

function updateTotal() {
    total = 0;
    invoiceItems.querySelectorAll(".amount").forEach(amountElement => {
        total += parseInt(amountElement.textContent) || 0;
    });
    totalElement.textContent = total;
}

addItemButton.addEventListener("click", addItem);

window.onload = function(){
    document.getElementById("download")
    .addEventListener("click",()=>{
        const invoice = this.document.getElementById("invoice");
        console.log(invoice);
        console.log(window);
        var opt = {
            margin:       1,
            filename:     'myfile.pdf',
            image:        { type: 'jpeg', quality: 0.98},
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait'}
        };
        html2pdf().from(invoice).set(opt).save();
    })
}