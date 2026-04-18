// GET CATEGORY FROM URL
let params = new URLSearchParams(window.location.search);
let category = params.get("category");

// SET TITLE
document.getElementById("pageTitle").innerText = category.toUpperCase();

// PRODUCT DATA
let products = {
    kids: [
        {name: "Custom designed", price: 999, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"},
        {name: "Cartoon Printed T-shirt", price: 499, img: "cart42.jpg"},
        {name: "Cotton Shorts Set", price: 699, img: "cart43.jpg"},
        {name: "Denim Overalls", price: 999, img: "cart44.jpg"},
        {name: "Mini Hoodie Set", price: 1199, img: "cart45.jpg"},
        {name: "Printed Night Suit", price: 799, img: "cart46.jpg"},
        {name: "Color Block T-shirt", price: 599, img: "cart47.jpg"},
        {name: "Street Style Cargo Pants", price: 1299, img: "cart48.jpg"},
        {name: "Tie-Dye Sweatshirt", price: 1199, img: "cart49.jpg"},
        {name: "Varsity Jacket", price: 1999, img: "cart50.jpg"},
        {name: "Ripped Jeans", price: 1399, img: "cart51.jpg"},
        {name: "Long Sleeve Graphic Tee", price: 899, img: "cart52.jpg"}
    ],
    trend: [
        { name: "Oversized Street Hoodie", price: 1699, img: "cart2.jpg"},
        { name: "Normal Wear", price: 599, img: "cart3.jpg"},
        { name: "Silver Chain Street Style", price: 799, img: "https://images.unsplash.com/photo-1544441893-675973e31985"},
        { name: "Perfect Winter Outfit", price: 699, img: "cart8.jpg"},
        { name: "Stylish Shirts", price: 1599, img: "cart12.jpg"},
        { name: "Causual Wear", price: 899, img: "cart11.jpg"},
        { name: "Plain T-Shirt", price: 899, img: "cart1.jpg" },
        { name: "Oversized T-shirt", price: 799, img: "cart15.jpg"},
        { name: "Slim Fit Jeans", price: 1499, img: "cart16.jpg"},
        {name: "Casual Checked Shirt", price: 999, img: "cart17.jpg"},
        {name: "Polo T-shirt", price: 899, img: "cart18.jpg"},
        {name: "Hoodie Sweatshirt", price: 1799, img: "cart19.jpg"},
        {name: "Formal Blazer", price: 2999, img: "cart20.jpg"},
        {name: "Cargo Pants", price: 1299, img: "cart21.jpg"},
        {name: "Denim Jacket", price: 1999, img: "cart22.jpg"},
        {name: "Kurta Set", price: 1599, img: "cart23.jpg"},
        {name: "Tracksuit", price: 1899, img: "cart24.jpg"},
        {name: "Custom Initial Hoodie", price: 1799, img: "cart4.jpg"},
        {name: "Printed Shirt", price: 1099, img: "cart25.jpg"},
        {name: "Chinos Pants", price: 1399, img: "cart26.jpg"}
    ],
    men: [
        {name: "Leather Jacket", price: 2999, img: "cart27.jpg" },
        {name: "Mandarin Collar Shirt", price: 1199, img: "cart28.jpg"},
        {name: "Washed Denim Shorts", price: 999, img: "cart29.jpg"},
        {name: "Longline T-shirt", price: 899, img: "cart30.jpg"},
        {name: "Zip-Up Bomber Jacket", price: 2499, img: "cart31.jpg"},
        {name: "Knitted Polo Shirt", price: 1399, img: "cart32.jpg"},
        {name: "Tapered Fit Trousers", price: 1599, img: "cart33.jpg"},
        {name: "Printed Co-ord Set", price: 2099, img: "cart34.jpg"},
        {name: "Sleeveless Hoodie", price: 1299, img: "cart35.jpg"},
        {name: "Pleated Pants", price: 1699, img: "cart36.jpg"},
        {name: "Denim Shirt", price: 1499, img: "cart37.jpg"},
        {name: "Mesh Panel T-shirt", price: 999, img: "cart38.jpg"},
        {name: "Utility Vest", price: 1799, img: "cart39.jpg"},
        {name: "Cuban Collar Shirt", price: 1299, img: "cart40.jpg"},
        {name: "Techwear Joggers", price: 1899, img: "cart41.jpg"}
    ],
    sale: [
        {name: "Discount Hoodie", price: 999, img: "cart53.jpg" },
        {name: "Leather Jacket", price: 2499, img: "cart54.jpg"},
        {name: "Biker Jacket", price: 2999, img: "cart55.jpg"},
        {name: "Bomber Leather Jacket", price: 2799, img: "cart56.jpg"},
        {name: "Crew Neck Sweater", price: 1199, img: "cart57.jpg"},
        {name: "V-Neck Sweater", price: 1299, img: "cart58.jpg"},
        {name: "Turtleneck Sweater", price: 1399, img: "cart59.jpg"},
        {name: "Thermal Gloves", price: 999, img: "cart60.jpg"},
        {name: "Sports Gloves", price: 799, img: "cart61.jpg"},
        {name: "Leather Blazer", price: 3199, img: "cart62.jpg"},
        {name: "Faux Leather Coat", price: 2699, img: "cart63.jpg"},
        {name: "Leather Pants", price: 2299, img: "cart64.jpg"}
    ]
};



// DISPLAY PRODUCTS
let container = document.getElementById("productList");

if (products[category]) {
    products[category].forEach(p => {
        let div = document.createElement("div");
        div.classList.add("product");

        div.innerHTML = `
            <img src="${p.img}">
            <div class="info">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button onclick="addToCart('${p.name}', ${p.price}, '${p.img}')">ADD TO BAG</button>
            </div>
        `;

        container.appendChild(div);
    });
} else {
    container.innerHTML = "<p>No products found</p>";
}


// CART FUNCTION (reuse)
function addToCart(name, price, img) {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    let cartKey = "cart_" + user.email;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // CHECK IF ITEM ALREADY EXISTS
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            img: img,
            quantity: 1
        });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert(name + " added to bag 🛍️");
}
