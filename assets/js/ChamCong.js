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
        renderCong(); // Hiển thị danh sách congs
        initializeDataTable();

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
        // Kiểm tra xem DataTable đã được khởi tạo chưa
        if (datatable.DataTable) {
            datatable.DataTable.destroy(); // Hủy DataTable hiện tại
        }
        // Khởi tạo DataTable mới
        new simpleDatatables.DataTable(datatable, {
            labels: {
                placeholder: "Tìm kiếm...",
                perPage: "Số mục mỗi trang",
                noRows: "Không có dữ liệu",
                info: "Hiển thị {start} đến {end} của {rows} mục"
            },
            columns: [
                { select: 1, sortSequence: ["desc", "asc"] },
                { select: 2, sortSequence: ["desc", "asc"] }
            ]
        });
    });
}

function renderCong() {
    var listChamCongBlock = document.querySelector('.list-chamCong tbody');
    listChamCongBlock.innerHTML = '';
    var htmls = congs.map(function (chamCong) {
        var mau = "";
        if (chamCong.checkOut == "00:00:00") {
            chamCong.checkOut = "Unchecked";
        }
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
                </tr>
            `;
    });
    listChamCongBlock.innerHTML = htmls.join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng là 0-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

fetchCong();

var time, day, tt;
function openModal(modalId) {
    var modalElement = document.getElementById(modalId);
    var modal = new bootstrap.Modal(modalElement);
    modal.show();
}
function closeModal(modalId) {
    var modalElement = document.getElementById(modalId);
    var modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
}
document.addEventListener('DOMContentLoaded', function () {
    function renderTrafficChart() {
        Chart = echarts.init(document.querySelector("#trafficChart"));
        Chart.setOption({

            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 168, name: 'Đã chấm công', itemStyle: { color: '#2bb15f' } },
                        { value: 12, name: 'Đi muộn', itemStyle: { color: 'rgb(255, 232, 21)' } },
                        { value: 2, name: 'Nghỉ phép', itemStyle: { color: '#ff0000' } },

                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    }
    // Gọi hàm renderTrafficChart sau khi nội dung đã được load
    renderTrafficChart();
    $("#addChamCong").click(() => {

        var video = document.getElementById('video');
        var canvasElement = document.getElementById('canvas');
        var canvas = canvasElement.getContext('2d');
        var loadingMessage = document.getElementById('loadingMessage');

        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(function (stream) {
                video.srcObject = stream;
                video.setAttribute('playsinline', true);
                video.play();
                requestAnimationFrame(tick);
            });

        function tick() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvasElement.hidden = false;
                canvasElement.height = video.videoHeight;
                canvasElement.width = video.videoWidth;
                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                var code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });
                if (code) {
                    console.log("Found QR code:", code);
                    checkEmployeeByQR(code.data);
                    // closeModal("addChamCongModal");
                    // // capNhatTime();

                    // openModal("modalConfirm");
                }
            }
            requestAnimationFrame(tick);
        }


    })
    $("#addCheckout").click(() => {
        var date = new Date();
        var hour = String(date.getHours()).padStart(2, '0');
        var minute = String(date.getMinutes()).padStart(2, '0');
        var second = String(date.getSeconds()).padStart(2, '0');
        var thoigianht = date.getFullYear() + "-" + formatMonth(date.getMonth() + 1) + "-" + date.getDate() + "T00:00:00";
        var timenow = hour + ":" + minute + ":" + second;
        var cong = congs.find(c => c.ngayCham === thoigianht);
        console.log(thoigianht);
        if (cong) {
            document.getElementById('checkout').textContent = timenow;
            openEditModal(cong.congId);
        }
        else {
            document.getElementById('checkout').textContent = "Bạn chưa checkin!";
        }
    })
    document.getElementById("addChamCongModal").addEventListener('hidden.bs.modal', function () {

        myFunction();
    });

    function myFunction() {

        video.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
    }
    function DisplayInforCheckin(em) {
        document.getElementById('employeeid').textContent = em.id;
        document.getElementById('name').textContent = em.name;
        capNhatTime();
    }
    function checkEmployeeByQR(qrData) {
        $.ajax({
            url: `https://localhost:44302/api/Employees/${qrData}`,
            type: 'GET',
            success: function (response) {
                if (response && response.id) {
                    console.log("Employee found:", response);
                    video.srcObject.getTracks().forEach(function (track) {
                        track.stop();
                    });

                    var em = employees.find(emp => emp.employeeId === response.employeeId);
                    DisplayInforCheckin(em);
                    closeModal("addChamCongModal");
                    // capNhatTime();

                    openModal("modalConfirm");
                } else {
                    alert("QR không hợp lệ hoặc không tìm thấy nhân viên.");
                    return;
                }
            },
            error: function () {
                alert("Đã xảy ra lỗi khi kiểm tra QR code.");
                return;
            }
        });
    }
    function formatMonth(month) {
        return (month < 10 ? '0' : '') + month;
    }
    function formatTimeUnit(unit) {
        return unit < 10 ? '0' + unit : unit;
    }
    function capNhatTime() {
        var date = new Date();
        var hour = formatTimeUnit(date.getHours());
        var minute = formatTimeUnit(date.getMinutes());
        var second = formatTimeUnit(date.getSeconds());
        var thoigianht = date.getFullYear() + "-" + formatMonth(date.getMonth() + 1) + "-" + date.getDate();
        var checkin = hour + ":" + minute + ":" + second;
        day = date.getDate() + "/" + formatMonth(date.getMonth() + 1) + "/" + date.getFullYear();
        time = hour + ":" + minute + ":" + second;
        var trangthai = "";
        if ((hour == 7 && second != 0) || hour > 7) {
            trangthai = "Late";
        }
        else {
            trangthai = "On-time";
        }
        tt = trangthai;
        var checkinDay = document.getElementById("ngaycham");
        var chamCongTimeSpan = document.getElementById("checkin");
        var trangThai = document.getElementById("trangthai");

        // Gán giá trị thời gian chấm công vào nội dung của thẻ span
        checkinDay.textContent = thoigianht;
        chamCongTimeSpan.textContent = checkin;
        trangThai.textContent = trangthai;
    }
});
function addCong() {
    // Lấy dữ liệu từ form
    const cong = {
        employeeId: document.getElementById('employeeid').textContent,
        ngayCham: document.getElementById('ngaycham').textContent,
        checkIn: document.getElementById('checkin').textContent,
        checkOut: "00:00:00",
        status: document.getElementById('trangthai').textContent
    };

    // Gửi dữ liệu đến API
    fetch('https://localhost:44302/api/ChamCongs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cong)

    })
        .then(response => {
            console.log(JSON.stringify(cong));
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received from API:', data);
            employees.push(data); // Thêm nhân viên mới vào danh sách
            location.reload();
            // Xóa dữ liệu form sau khi thêm thành công
            document.getElementById('employeeid').textContent = "";
            document.getElementById('ngaycham').textContent = "";
            document.getElementById('checkin').textContent = "";
            document.getElementById('trangthai').textContent = "";
        })
        .catch(error => console.error('Error adding employee:', error));
}


let congIdToEdit;
function openEditModal(id) {
    congIdToEdit = id;
}

function editCong() {
    // Lấy thông tin từ modal
    const checkOut = document.getElementById('checkout').textContent;
    console.log(congIdToEdit);
    // Lấy thông tin cong hiện tại để không mất các thuộc tính khác
    fetch(`https://localhost:44302/api/ChamCongs/${congIdToEdit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cong => {
            // Cập nhật thông tin cong với các giá trị mới
            const updatedCong = {
                ...cong,
                checkOut: checkOut

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
                location.reload();
            } else {
                return response.json();
            }
        })
        .catch(error => console.error('Error updating cong:', error));
}
