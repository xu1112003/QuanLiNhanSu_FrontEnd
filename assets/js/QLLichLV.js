// var express = require('express')
// var cors = require('cors')
// var app = express()

// app.use(cors())
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng là 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

var lichs = [];

function fetchLich() {
  fetch('https://localhost:44302/api/Schedules')
    .then(response => response.json())
    .then(data => {
      lichs = data;
     
      renderLich();
      //  initializeDataTable();
    })
    .catch(error => console.error('Error fetching schedule:', error));
}

function renderLich() {
  var STT = 1;
  var listThueBlock = document.querySelector('#list-lichLamViec');
  var htmls = lichs.map(function (schedule) {
    return `
                <tr class="item-${schedule.scheduleId}">
                    <th scope="row">${STT++}</th>
                    <td>${formatDate(schedule.workingDate)}</td>
                    <td>${schedule.morningActivity}</td>
                    <td>${schedule.afternoonActivity}</td>
                    <td>${schedule.eveningActivity}</td>
                   

                    <td>
                        <span onclick="openEditModal(${schedule.scheduleId})" class="btn btn-outline-success btn1" data-bs-toggle="modal"
                            data-bs-target="#modalEditAWorkSchedule">
                            Sửa
                            </span> 
                        <span onclick="openDeleteModal(${schedule.scheduleId})" class="btn btn-outline-danger btn1" data-bs-toggle="modal"
                            data-bs-target="#modalDeleteAWorkSchedule">
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
  
  fetchLich();


  function addLichLV() {
    // Lấy dữ liệu từ form
    const newLichLV = {
        workingDate: document.getElementById('inputDate').value,
        morningActivity: document.getElementById('inputDescribeMorningWork').value,
        afternoonActivity: document.getElementById('inputDescribeAfternoonWork').value,
        eveningActivity: document.getElementById('inputDescribeEveningWork').value,
      
    };
  
    // Gửi dữ liệu đến API
    fetch('https://localhost:44302/api/Schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLichLV)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received from API:', data);
        lichs.push(data); // Thêm lịch làm việc mới vào danh sách
        // location.reload();
        fetchLich(); 
        // Xóa dữ liệu form sau khi thêm thành công
        document.getElementById('inputDate').value = '';
        document.getElementById('inputDescribeMorningWork').value = '';
        document.getElementById('inputDescribeAfternoonWork').value = '';
        document.getElementById('inputDescribeEveningWork').value = '';
        
      })
      .catch(error => console.error('Error adding employee:', error));
  }


  let scheduleIdToDelete;
function openDeleteModal(scheduleId){
  scheduleIdToDelete = scheduleId;
 
}

function deleteSchedule() {
  fetch(`https://localhost:44302/api/Schedules/${scheduleIdToDelete}`, {
      method: 'DELETE',
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.text();
  })
  .then(() => {
      fetchLich();
  })
  .catch(error => console.error('Error deleting schedule:', error));
}




let scheduleIdToEdit;
function openEditModal(scheduleId) {
  scheduleIdToEdit = scheduleId;
  const schedule = lichs.find(sch => sch.scheduleId === scheduleId);
 
  if (schedule) {
      document.getElementById('inputDate1').value = schedule.workingDate;
      document.getElementById('inputDescribeMorningWork1').value = schedule.morningActivity;
      document.getElementById('inputDescribeAfternoonWork1').value = schedule.afternoonActivity;
      document.getElementById('inputDescribeEveningWork1').value = schedule.eveningActivity;
    
  }
}

function editSchedule() {
  
  const workingDate = document.getElementById('inputDate1').value;
  const morningActivity = document.getElementById('inputDescribeMorningWork1').value;
  const afternoonActivity = document.getElementById('inputDescribeAfternoonWork1').value;
  const eveningActivity = document.getElementById('inputDescribeEveningWork1').value;

  

  fetch(`https://localhost:44302/api/Schedules/${scheduleIdToEdit}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scheduleId: scheduleIdToEdit,
        workingDate: workingDate,
        morningActivity: morningActivity,
        afternoonActivity: afternoonActivity,
        eveningActivity: eveningActivity
        
      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      // Nếu API trả về mã trạng thái 200 OK hoặc 204 No Content, không cần đọc nội dung
      if (response.status === 200 || response.status === 204) {
          // Cập nhật danh sách nhân viên
          fetchLich(); 
      } else {
          // Đọc và xử lý phản hồi nếu cần
          return response.json();
      }
  })
  .catch(error => console.error('Error updating schedule:', error));
}


function filterSchedule() {
  const startDate = document.getElementById('inputStartDate').value;
  
  const endDate = document.getElementById('inputEndDate').value;

// Gọi API với fetch
  fetch(`https://localhost:44302/api/Schedules/filter?startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          
      }
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then((data) => {
        lichs = data;
     
        renderLich();
    })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
}
