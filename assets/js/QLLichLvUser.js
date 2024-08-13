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
    var listThueBlock = document.querySelector('#list-lichLamViecUser');
    var htmls = lichs.map(function (schedule) {
      return `
                  <tr class="item-${schedule.scheduleId}">
                      <th scope="row" class="text-center">${STT++}</th>
                      <td class="text-center">${formatDate(schedule.workingDate)}</td>
                      <td class="text-center">${schedule.morningActivity}</td>
                      <td class="text-center">${schedule.afternoonActivity}</td>
                      <td class="text-center">${schedule.eveningActivity}</td>
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