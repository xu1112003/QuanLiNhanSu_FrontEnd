var congs = [];
var employees = [];

// Đánh dấu hàm fetchEmployee là async
async function fetchEmployee() {
    try {
        const response = await fetch('https://localhost:44302/api/employees');
        const data = await response.json();
        employees = data;
    } catch (error) {
        console.error('Error fetching employee:', error);
    }
}

// Đánh dấu hàm fetchCong là async
async function fetchCong() {
    try {
        const response = await fetch('https://localhost:44302/api/ChamCongs');
        const data = await response.json();
        congs = data;
        await fetchEmployee(); // Đợi cho fetchEmployee hoàn tất

        addName(); // Cập nhật danh sách congs với tên nhân viên
        console.log(employees);
        console.log(congs);
        renderCong(); // Hiển thị danh sách congs

        initializeDataTable();
        DisplayInforOnTop();
    } catch (error) {
        console.error('Error fetching cong:', error);
    }
}
function addName() {
    const employeeMap = employees.reduce((map, employee) => {
        map[employee.id] = employee;
        return map;
    }, {});

    // Cập nhật mảng congs với thông tin nhân viên
    congs = congs.map(cong => {
        const employee = employeeMap[cong.employeeId] || {}; // Lấy thông tin nhân viên, hoặc một đối tượng rỗng nếu không tìm thấy
        return {
            ...cong,
            employeeName: employee.name || 'Unknown',  
            employeeEmail: employee.email || 'Unknown',
            employeeGender: employee.gender || 'Unknown',
            employeeRole: employee.role || 'Unknown',
            employeeAddress: employee.address || 'Unknown'
        };
    });
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

function renderCong() {
    var listChamCongBlock = document.querySelector('.list-chamCong tbody');
    var htmls = congs.map(function (chamCong) {
        var mau = "";
        if (chamCong.status == "Late") {
            mau = "bg-warning";
        }
        else {
            mau = "bg-success";
        }
        return `
                <tr class="item-${chamCong.congId}">
                    <td>${chamCong.employeeName}</th>
                    <td>${formatDate(chamCong.ngayCham)}</td>
                    <td>${chamCong.checkIn}</td>
                    
                    <td>
                        <span class="badge p-2 ${mau}">${chamCong.status}</span>
                    </td>
                    <td>${chamCong.checkOut}</td>
                    <td style="width: 135px;">
                        <span onclick="openEditModal(${chamCong.congId})" data-bs-toggle="modal"
                            data-bs-target="#suaChamCong" class="btn btn-outline-success btn1">Sửa</span>
                        <span onclick="openDeleteModal(${chamCong.congId})" data-bs-toggle="modal"
                            data-bs-target="#xoaChamCong" class="btn btn-outline-danger btn1">Xóa</span>
                    </td>
                </tr>
            `;
    });
    listChamCongBlock.innerHTML = htmls.join('');
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
fetchCong();


function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng là 0-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

let congToDelete;
function openDeleteModal(id) {
    congToDelete = id;
}

function deleteCong() {
    fetch(`https://localhost:44302/api/ChamCongs/${congToDelete}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(() => {
            // fetchCong();
            location.reload();
        })
        .catch(error => console.error('Error deleting cong:', error));
}

let congIdToEdit;
function openEditModal(id) {
    congIdToEdit = id;
  const cong = congs.find(emp => emp.congId === id);
  if (cong) {
      document.getElementById('checkin').value = cong.checkIn;
      document.getElementById('checkout').value = cong.checkOut;
      document.getElementById('ngaycham').value = formatDate(cong.ngayCham);
  }
}
// {
//     "congId": 1,
//     "employeeId": 1,
//     "ngayCham": "2024-01-01T00:00:00",
//     "checkIn": "09:00:00",
//     "checkOut": "17:00:00",
//     "status": "Present"
//   }
function editCong() {
    // Lấy thông tin từ modal
    const checkIn = document.getElementById('checkin').value;
    const checkOut = document.getElementById('checkout').value;
    const ngayCham = document.getElementById('ngaycham').value;
    let status = "";

    // Lấy thông tin cong hiện tại để không mất các thuộc tính khác
    fetch(`https://localhost:44302/api/ChamCongs/${congIdToEdit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cong => {
            if(checkIn < "07:00:00"){
                status = "On-time";
            }
            else{
                status = "Late";
            }
            // Cập nhật thông tin cong với các giá trị mới
            const updatedCong = {
                ...cong,
                ngayCham: ngayCham,
                checkIn: checkIn, // Chỉ cập nhật các thuộc tính cần thiết
                checkOut: checkOut,
                status: status
                
            };

            // Gửi yêu cầu PUT để cập nhật
            return fetch(`https://localhost:44302/api/ChamCongs/${congIdToEdit}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCong)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.status === 200 || response.status === 204) {
                // Cập nhật danh sách chấm công
                // fetchCong(); 
                location.reload();
            } else {
                return response.json();
            }
        })
        .catch(error => console.error('Error updating cong:', error));
}

function DisplayInforOnTop(){
    // Tạo đối tượng ngày hôm nay
    let today = new Date();
    let todayString = today.toISOString().split('T')[0];
    console.log(todayString);
    document.getElementById('ngaycham').max = todayString;
    let soLuong = employees.length;
    let todayCongs = congs.filter(cong => formatDate(cong.ngayCham) == todayString);
    console.log(todayCongs);
    let daCham = todayCongs.length;
    let diMuon = soLuong - daCham;
    document.getElementById('soLuong').textContent = soLuong;
    document.getElementById('daCham').textContent = daCham;
    document.getElementById('diMuon').textContent = diMuon;
}
