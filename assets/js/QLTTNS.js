// var express = require('express')
// var cors = require('cors')
// var app = express()

// app.use(cors())

var employees = [];

function fetchEmployee() {
  fetch('https://localhost:44302/api/employees')
    .then(response => response.json())
    .then(data => {
      employees = data;
      renderEmployee();
      initializeDataTable();
    })
    .catch(error => console.error('Error fetching employee:', error));
}

function renderEmployee() {
  var STT = 1;
  var listThueBlock = document.querySelector('.list-nhanVien tbody');
  var htmls = employees.map(function (employee) {
    return `
                <tr class="item-${employee.id}">
                    <th scope="row">${STT++}</th>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.role}</td>
                    <td>${employee.address}</td>

                    <td>
                        <span onclick="openEditModal(${employee.id})" class="btn btn-outline-success btn1" data-bs-toggle="modal"
                            data-bs-target="#suaNhanVien">
                            Sửa
                            </span> 
                        <span onclick="openDeleteModal(${employee.id})" class="btn btn-outline-danger btn1" data-bs-toggle="modal"
                            data-bs-target="#xoaNhanVien">
                            Xóa
                            </span>
                    </td>
                </tr>
            `;
  });
  listThueBlock.innerHTML = htmls.join('');
}

function initializeDataTable() {
  const datatables = document.querySelectorAll('.datatable');
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable, {
      labels: {
        placeholder: "Tìm kiếm...", // Placeholder cho ô tìm kiếm
        perPage: "Số mục mỗi trang", // Dropdown số mục mỗi trang
        noRows: "Không có dữ liệu", // Thông báo khi không có hàng dữ liệu
        info: "Hiển thị {start} đến {end} của {rows} mục" // Thông tin về các mục hiển thị
      },
      columns: [
        { select: 2, sortSequence: ["desc", "asc"] },
        { select: 3, sortSequence: ["desc", "asc"] }
      ]
    });
  });
}

fetchEmployee();

function addNhanVien() {
  // Lấy dữ liệu từ form
  const newEmployee = {
    name: document.getElementById('hoTenNV').value,
    email: document.getElementById('emailNV').value,
    gender: document.getElementById('gioiTinhNV').value,
    role: document.getElementById('nghiepVuNV').value,
    address: document.getElementById('diaChiNV').value
  };

  // Gửi dữ liệu đến API
  fetch('https://localhost:44302/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEmployee)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received from API:', data);
      employees.push(data); // Thêm nhân viên mới vào danh sách
      // fetchEmployee(); 
      location.reload();
      // Xóa dữ liệu form sau khi thêm thành công
      document.getElementById('hoTenNV').value = '';
      document.getElementById('emailNV').value = '';
      document.getElementById('gioiTinhNV').value = '';
      document.getElementById('nghiepVuNV').value = '';
      document.getElementById('diaChiNV').value = '';
    })
    .catch(error => console.error('Error adding employee:', error));
}

let employeeToDelete;
function openDeleteModal(id){
  employeeIdToDelete = id;
}

function deleteEmployee() {
  fetch(`https://localhost:44302/api/employees/${employeeIdToDelete}`, {
      method: 'DELETE',
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.text();
  })
  .then(() => {
      // fetchEmployee();
      location.reload();
  })
  .catch(error => console.error('Error deleting employee:', error));
}

let employeeIdToEdit;
function openEditModal(id) {
  employeeIdToEdit = id;
  const employee = employees.find(emp => emp.id === id);
  if (employee) {
      document.getElementById('hoTenNV1').value = employee.name;
      document.getElementById('emailNV1').value = employee.email;
      document.getElementById('gioiTinhNV1').value = employee.gender;
      document.getElementById('nghiepVuNV1').value = employee.role;
      document.getElementById('diaChiNV1').value = employee.address;
  }
}

function editEmployee() {
  const name = document.getElementById('hoTenNV1').value;
  const email = document.getElementById('emailNV1').value;
  const gender = document.getElementById('gioiTinhNV1').value;
  const role = document.getElementById('nghiepVuNV1').value;
  const address = document.getElementById('diaChiNV1').value;

  fetch(`https://localhost:44302/api/employees/${employeeIdToEdit}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          email: email,
          gender: gender,
          role: role,
          address: address
      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      // Nếu API trả về mã trạng thái 200 OK hoặc 204 No Content, không cần đọc nội dung
      if (response.status === 200 || response.status === 204) {
          // Cập nhật danh sách nhân viên
          // fetchEmployee(); 
          location.reload();
      } else {
          // Đọc và xử lý phản hồi nếu cần
          return response.json();
      }
  })
  .catch(error => console.error('Error updating employee:', error));
}