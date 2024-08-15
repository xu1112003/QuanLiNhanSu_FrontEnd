$(document).ready(() => {
    new ApexCharts(document.querySelector("#pieChart"), {
      series: [3, 5, 36, 20, 14],
      chart: {
        height: 350,
        type: "pie",
        toolbar: {
          show: true,
        },
      },
      labels: [
        "Administrator",
        "IT Manage",
        "Kinh doanh",
        "Kỹ thuật",
        "Tài chính",
      ],
    }).render();
  });
  $(document).ready(() => {
    $(".btnAdmin").click(function (event) {
      event.preventDefault();
      var link = $(this).attr("href");
      $("#main").load(link);
    });
  });

  var positions = [];

  function fetchPosition() {
    fetch("https://localhost:44302/api/Positions")
      .then((response) => response.json())
      .then((data) => {
        positions = data;
        renderNhomQuyen();
        initializeDataTable();
      })
      .catch((error) => console.error("Error fetching position:", error));
  }
  fetchPosition();
  function renderNhomQuyen() {
    // var STT = 1;
    var listNhomQuyen = document.querySelector(".list-nhomQuyen tbody");
    console.log(positions);
    var htmls = positions.map(function (position) {
      return `
                  <tr class="item-${position.positionId}">
                    <th scope="row">${position.positionId++}</th>
                      <td>${position.positionName}</td>
                      <td>${position.description}</td>
                      <td>${position.number}</td>
                      <td>${position.heSo}</td>
  
                      <td><span onclick="openEditModal(${
                        position.positionId
                      })" class="btn btn-outline-success btn1" data-bs-toggle="modal"
                              data-bs-target="#suaNhomQuyen"> 
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-pencil-square"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                  />
                                </svg>
                            </span> 
                          <span onclick="openDeleteModal(${
                            position.positionId
                          })" class="btn btn-outline-danger btn1" data-bs-toggle="modal"
                              data-bs-target="#xoaNhomQuyen">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-trash3-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
                                  />
                                </svg>
                          </span>
                      </td>
                  </tr>
              `;
    });
    //   console.log(htmls);
    listNhomQuyen.innerHTML = htmls.join("");
  }
  function initializeDataTable() {
    const datatables = document.querySelectorAll(".datatable");
    datatables.forEach((datatable) => {
      new simpleDatatables.DataTable(datatable, {
        labels: {
          placeholder: "Tìm kiếm...", // Placeholder cho ô tìm kiếm
          perPage: "Số mục mỗi trang", // Dropdown số mục mỗi trang
          noRows: "Không có dữ liệu", // Thông báo khi không có hàng dữ liệu
          info: "Hiển thị {start} đến {end} của {rows} mục", // Thông tin về các mục hiển thị
        },
        columns: [
          { select: 2, sortSequence: ["desc", "asc"] },
          { select: 3, sortSequence: ["desc", "asc"] },
        ],
      });
    });
  }
  fetchPosition();
  // hienThi();
  //   renderNhomQuyen();
  function addNhomQuyen() {
    // Lấy dữ liệu từ form
    const newPosition = {
      positionName: document.getElementById("tenNhomQuyen").value,
      description: document.getElementById("moTaNhomQuyen").value,
      number: document.getElementById("thanhVienNhomQuyen").value,
      heSo: document.getElementById("heSoNhomQuyen").value,
    };

    // Gửi dữ liệu đến API
    fetch("https://localhost:44302/api/Positions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPosition),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received from API:", data);
        positions.push(data); // Thêm nhân viên mới vào danh sách
        // fetchEmployee();
        location.reload();
        // Xóa dữ liệu form sau khi thêm thành công
        document.getElementById("tenNhomQuyen").value = "";
        document.getElementById("moTaNhomQuyen").value = "";
        document.getElementById("thanhVienNhomQuyen").value = "";
        document.getElementById("heSoNhomQuyen").value = "";
      })
      .catch((error) => console.error("Error adding position:", error));

  }
  let positionToDelete;
  function openDeleteModal(id) {
    positionToDelete = id;
  }
  function deleteNhomQuyen(id) {
    fetch(`https://localhost:44302/api/Positions/${positionToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(() => {
        // fetchPosition();
        location.reload();
      })
      .catch((error) => console.error("Error deleting position:", error));
  }
  let positionToEdit;
  function openEditModal(id) {
    positionToEdit = id;
    const position = positions.find((pos) => pos.positionId === id);
    console.log(position);
    if (position) {
      document.getElementById("maNhomQuyen1").value = position.positionId;
      document.getElementById("tenNhomQuyen1").value = position.positionName;
      document.getElementById("moTaNhomQuyen1").value = position.description;
      document.getElementById("thanhVienNhomQuyen1").value = position.number;
      document.getElementById("heSoNhomQuyen1").value = position.heSo;
    }
  }
  function editNhomQuyen() {
    const positionId = document.getElementById("maNhomQuyen1").value;
    const positionName = document.getElementById("tenNhomQuyen1").value;
    const description = document.getElementById("moTaNhomQuyen1").value;
    const number = document.getElementById("thanhVienNhomQuyen1").value;
    const heSo = document.getElementById("heSoNhomQuyen1").value;

    fetch(`https://localhost:44302/api/Positions/${positionToEdit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        positionId: positionId,
        positionName: positionName,
        description: description,
        number: number,
        heSo: heSo,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Nếu API trả về mã trạng thái 200 OK hoặc 204 No Content, không cần đọc nội dung
        if (response.status === 200 || response.status === 204) {
          // Cập nhật danh sách tổ chức
          // fetchPosition();
          location.reload();
        } else {
          // Đọc và xử lý phản hồi nếu cần
          return response.json();
        }
      })
      .catch((error) => console.error("Error updating position:", error));
  }
