
const API_BASE = "https://cpdsuiasje.execute-api.us-east-2.amazonaws.com/development";

function fetchCategories() {
    fetch(`${API_BASE}/category`)
        .then(response => response.json())
        .then(({ data }) => {
            const categoryList = document.getElementById('categoryList');
            categoryList.innerHTML = '';
            data.forEach(category => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = category.name;
                categoryList.appendChild(li);
            });
        });
}

function fetchProducts() {
    fetch(`${API_BASE}/product`)
        .then(response => response.json())
        .then(({ data }) => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            data.forEach(product => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = product.name;
                productList.appendChild(li);
            });
        });
}

function addCategory() {
    const name = document.getElementById('categoryName').value;
    const sequence = document.getElementById('categorySeq').value;

    fetch(`${API_BASE}/category`, {
        method: 'POST',
        body: JSON.stringify({ name, sequence })
    }).then(() => {
        fetchCategories();
        
    });
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const content = document.getElementById('productContent').value;
    const sequence = document.getElementById('productSeq').value;

    fetch(`${API_BASE}/product`, {
        method: 'POST',
        body: JSON.stringify({ name, category, content, sequence })
    }).then(() => fetchProducts());
}

function saveCategory() {
    const id = document.getElementById('categoryId').value;
    const name = document.getElementById('categoryName').value;
    const sequence = document.getElementById('categorySeq').value;
    const btn = document.getElementById('save-category');  // or get the specific button by another method
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    btn.disabled = true;


    if (id) {
        fetch(`${API_BASE}/category/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, sequence })
        }).then(() => {
            clearCategoryForm();
            fetchCategories();
            const btn = document.querySelector('.edit-btn');  // or get the specific button by another method
            btn.innerHTML = 'Save Category';
            btn.disabled = false;

        }).catch((error) => {
            console.log(error);
            btn.innerHTML = 'Save Category';
            btn.disabled = false;
        });
    } else {
        fetch(`${API_BASE}/category`, {
            method: 'POST',
            body: JSON.stringify({ name, sequence })
        }).then(() => {
            clearCategoryForm();
            fetchCategories();
            btn.innerHTML = 'Save Category';
            btn.disabled = false;
        }).catch((error) => {
            console.log(error);
            btn.innerHTML = 'Save Category';
            btn.disabled = false;
        });
    }
}

function deleteCategory(id) {
    const btn = document.getElementById(`delete-category-${id}`);  // or get the specific button by another method
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    btn.disabled = true;
    fetch(`${API_BASE}/category/${id}`, {
        method: 'DELETE'
    }).then(() => {
        fetchCategories();
        btn.innerHTML = 'Delete';
        btn.disabled = false;
    });
}

function editCategory(id, name, sequence) {
    document.getElementById('categoryId').value = id;
    document.getElementById('categoryName').value = name;
    document.getElementById('categorySeq').value = sequence;
}

function clearCategoryForm() {
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryName').value = '';
    document.getElementById('categorySeq').value = '';
}

// Similarly, you can create functions for products: saveProduct, deleteProduct, editProduct, clearProductForm.

// Adjust fetchCategories to include edit and delete buttons:

function fetchCategories() {
    fetch(`${API_BASE}/category`)
        .then(response => response.json())
        .then(({ data }) => {
            const categoryList = document.getElementById('categoryList');
            categoryList.innerHTML = '';
            data.forEach(category => {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'pt-3', 'pb-3');
                
                const contentDiv = document.createElement('div');
                li.appendChild(contentDiv);
            
                const categoryName = document.createElement('div');
                categoryName.classList.add('h5');  // Bootstrap typography for headings
                categoryName.textContent = category.name;
                contentDiv.appendChild(categoryName);
            
                const categoryDetails = document.createElement('div');
                categoryDetails.classList.add('mt-2', 'small', 'text-muted');  // Bootstrap class for smaller muted text
                contentDiv.appendChild(categoryDetails);
            
                const categorySequence = document.createElement('div');
                categorySequence.textContent = `Sequence: ${category.sequence}`;
                categoryDetails.appendChild(categorySequence);
            
                const btnGroup = document.createElement('div');
                btnGroup.classList.add('btn-group', 'mt-3', 'd-block');  // "d-block" to ensure it's a block element
                li.appendChild(btnGroup);
            
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.classList.add('btn', 'btn-primary', 'btn-sm', 'mr-2');
                editBtn.onclick = () => editCategory(category.id, category.name, category.sequence);
                btnGroup.appendChild(editBtn);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.setAttribute('id', `delete-category-${category.id}`);
                deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                deleteBtn.onclick = () => deleteCategory(category.id);
                btnGroup.appendChild(deleteBtn);
                
                categoryList.appendChild(li);
            });
        });
}

// Remember to call the functions on page load:
function populateCategoryDropdown() {
    fetch(`${API_BASE}/category`)
        .then(response => response.json())
        .then(({ data }) => {
            const categories = data;
            const dropdown = document.getElementById('productCategory');
            dropdown.innerHTML = '';
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                dropdown.appendChild(option);
            });
        });
}

function saveProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const content = document.getElementById('productContent').value;
    const sequence = document.getElementById('productSeq').value;
    const btn = document.getElementById('save-product');  // or get the specific button by another method
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    btn.disabled = true;

    if (id) {
        fetch(`${API_BASE}/product/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, category, content, sequence })
        }).then(() => {
            clearProductForm();
            fetchProducts();
            const btn = document.getElementById('save-product');  // or get the specific button by another method
            btn.innerHTML = 'Save Product';
            btn.disabled = false;
        }).catch((error) => {
            console.log(error);
            btn.innerHTML = 'Save Product';
            btn.disabled = false;
        });
    } else {
        fetch(`${API_BASE}/product`, {
            method: 'POST',
            body: JSON.stringify({ name, category, content, sequence })
        }).then(() => {
            clearProductForm();
            fetchProducts();
            btn.innerHTML = 'Save Product';
            btn.disabled = false;
        }).catch((error) => {
            console.log(error);
            btn.innerHTML = 'Save Product';
            btn.disabled = false;
        });
    }
}

function deleteProduct(id) {
    const btn = document.getElementById(`delete-product-${id}`);  // or get the specific button by another method
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    btn.disabled = true;
    fetch(`${API_BASE}/product/${id}`, {
        method: 'DELETE'
    }).then(() => {
        fetchProducts();
        btn.innerHTML = 'Delete';
        btn.disabled = false;
    });
}

function editProduct(id, name, category, content, sequence) {
    document.getElementById('productId').value = id;
    document.getElementById('productName').value = name;
    document.getElementById('productCategory').value = category;
    document.getElementById('productContent').value = content;
    document.getElementById('productSeq').value = sequence;
}

function clearProductForm() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productContent').value = '';
    document.getElementById('productSeq').value = '';
}

function fetchProducts() {
    fetch(`${API_BASE}/product`)
        .then(response => response.json())
        .then(({ data }) => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            data.forEach(product => {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'pt-3', 'pb-3');
                
                const contentDiv = document.createElement('div');
                li.appendChild(contentDiv);
            
                const productName = document.createElement('div');
                productName.classList.add('h5');  // Bootstrap typography for headings
                productName.textContent = product.name;
                contentDiv.appendChild(productName);
            
                const productDetails = document.createElement('div');
                productDetails.classList.add('mt-2', 'small', 'text-muted');  // Bootstrap class for smaller muted text
                contentDiv.appendChild(productDetails);
            
                const productCategory = document.createElement('div');
                productCategory.textContent = `Category: ${product.category}`;
                productDetails.appendChild(productCategory);
            
                const productContent = document.createElement('div');
                productContent.textContent = `Content: ${product.content}`;
                productDetails.appendChild(productContent);
            
                const productSequence = document.createElement('div');
                productSequence.textContent = `Sequence: ${product.sequence}`;
                productDetails.appendChild(productSequence);
            
                const btnGroup = document.createElement('div');
                btnGroup.classList.add('btn-group', 'mt-3', 'd-block');  // "d-block" to ensure it's a block element
                li.appendChild(btnGroup);
            
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.classList.add('btn', 'btn-primary', 'btn-sm', 'mr-2');
                editBtn.onclick = () => editProduct(product.id, product.name, product.category, product.content, product.sequence);
                btnGroup.appendChild(editBtn);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.setAttribute('id', `delete-product-${product.id}`);
                deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                deleteBtn.onclick = () => deleteProduct(product.id);
                btnGroup.appendChild(deleteBtn);
                
                productList.appendChild(li);
            });




        });
}

// Adjust the DOMContentLoaded listener to also populate the category dropdown:

document.addEventListener("DOMContentLoaded", function () {
    fetchCategories();
    fetchProducts();
    populateCategoryDropdown();
});

