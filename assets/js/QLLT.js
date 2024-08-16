console.log('dasdasdsadsadasd');
$(document).ready(function(){
    options = {
        series: [{
            name: 'Thưởng',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Lương',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Thuế',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    };
    
    chart = new ApexCharts(document.querySelector("#chartCol"), options);
    chart.render();
});

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
//TAB 2
count1 = 1;
var dsLuong = [];
var luongId= "";
var STT1= 0;

async function fetchLuong() {
    fetch('https://localhost:44302/api/Salarys')
        .then(response => {return response.json()})
        .then(data => {
            dsLuong = data;
            renderLuong();
            initializeDataTable();
        })
        .catch(error => console.error('Error fetching luong:', error));
}

function renderLuong() {
    var listThueBlock = document.querySelector('.list-luong tbody');
    listThueBlock.innerHTML = '';
    var htmls = dsLuong.map(function (luong) {
        STT1++;
        return `
           <tr class="item-Luong-${luong.salaryId}">
                <td>${luong.salaryId}</td>
                <td>${luong.salaryType}</td>
                <td>${luong.money}</td>

                <td>
                    <span onclick="getLuongID(${luong.salaryId})" class="btn btn-success btn1" data-bs-toggle="modal"
                                data-bs-target="#suaLuong">Sửa</span>
                    <span onclick="getLuongID(${luong.salaryId})" class="btn btn-danger btn1" data-bs-toggle="modal"
                                data-bs-target="#xoaLuong">Xóa</span>
                </td>
            </tr>
        `;
    });
    listThueBlock.innerHTML = htmls.join('');            
    //initializeDataTable();
}
fetchLuong();
function getLuongID(id) {
    fetch(`https://localhost:44302/api/Salarys/${id}`)
        .then(response => response.json())
        .then(item => {
            if (item) {
                luongId = item.salaryId;
                document.getElementById('loai1').value = item.salaryType;
                document.getElementById('sotien1').value = item.money;
            } else {
                console.error('Salary not found with ID:', id);
            }
        })
        .catch(error => console.error('Error fetching luong by ID:', error));
}


function createLuong() {
    try{
        var dsluong = document.querySelector('.list-luong tbody');
        var item = {
            salaryType: document.getElementById('loai').value,
            money: document.getElementById('sotien').value
        };

    
        fetch('https://localhost:44302/api/Salarys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                SalaryType: item.salaryType,
                Money: item.money
            })
        })
        .then(response => { 
            if (!response.ok) {
                return response.json().then(data => {
                    showErrorPopup(data.title);
                });
            }
            fetchLuong();
            return response.json();
        ;})
        .then(data => {
            dsluong.push(item);
            fetchLuong();
        })
        .catch(error => console.error('Error creating luong:', error)
        );
        document.getElementById('loai').value= "";
        document.getElementById('sotien').value= "";
    }catch (error) {
        showErrorPopup('An unexpected error occurred.');
    }
}


function deleteLuong(id) {
    fetch(`https://localhost:44302/api/Salarys/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => { 
      if (response.ok) {
        // Xóa thành công, cập nhật lại danh sách
        console.log('Xóa bản ghi thành công');
        fetchLuong(); // Sau khi xóa, gọi lại fetchLuong() để cập nhật lại danh sách
      } else { 
        // Xóa không thành công, hiển thị thông báo lỗi
        return response.json().then(data => {
          console.error('Error deleting luong:', data.title);
        });
      }
    })
    .catch(error => console.error('Error deleting luong:', error));
  }


function editLuong(id) {
    var item = {
        salaryType: document.getElementById('loai1').value,
        money: document.getElementById('sotien1').value
    };

    fetch(`https://localhost:44302/api/Salarys/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                showErrorPopup(data.title);
            });
        }
            fetchLuong();
            location.reload();
            renderLuong();
            return response.json();
    })
    .then(updatedItem => { 
        var index = dsLuong.findIndex(obj => obj.salaryId === id);
        dsLuong[index] = updatedItem;  // Update the item in the local array
        fetchLuong(); // Sau khi cập nhật, gọi lại fetchLuong() để cập nhật
        renderLuong();  // Re-render the entire list to reflect changes
    })
    .catch(error => console.error('Error editing luong:', error));
}
//Hệ số lương
var hslID = "";
var dsHeSoLuong =[];
async function fetchHSL() {
    fetch('https://localhost:44302/api/HeSos')
        .then(response => {return response.json()})
        .then(data => {
            dsHeSoLuong = data;
            renderHSL();
            //initializeDataTable();
        })
        .catch(error => console.error('Error fetching HSL: ', error));
        
    }
function getHSLID(id) {

    fetch(`https://localhost:44302/api/HeSos/${id}`)
        .then(response => response.json())
        .then(item => {
            if (item) {
                hslID = item.id;
                document.getElementById('chucvu1').value = item.name;
                document.getElementById('heso1').value = item.heSo;
            } else {
                console.error('He so not found with ID:', id);
            }
        })
        .catch(error => console.error('Error fetching luong by ID:', error));
}
var count2 = 0;
function renderHSL() {
    var listThueBlock = document.querySelector('.list-hsl tbody');
    var htmls = dsHeSoLuong.map(function (position) {
        count2++;
        return `
           <tr class="item-hsl-${position.id}">
                <td>${position.id}</td>
                <td>${position.name}</td>
                <td>${position.heSo}</td>
                <td>
                    <span onclick="getHSLID(${position.id})" class="btn btn-success btn1" data-bs-toggle="modal"
                                    data-bs-target="#suaHSL">Sửa</span>
                    <span onclick="getHSLID(${position.id})" class="btn btn-danger btn1" data-bs-toggle="modal"
                                    data-bs-target="#xoaHSL">Xóa</span> 
                </td>
            </tr>
        `;
    });
    listThueBlock.innerHTML = htmls.join('');
    //initializeDataTable();
}
//fetchHSL();
function createHSL() {
    var dshsl = document.querySelector('.list-hsl');
    var item = {
        name: document.getElementById('chucvu').value,
        heSo: document.getElementById('heso').value
    };
    try{
        fetch('https://localhost:44302/api/HeSos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: item.name,
            HeSo: item.heSo
        })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    showErrorPopup(data.title);
                });
            }
                fetchHSL();
                return response.json();
        })
        .then(() => {
            // Re-fetch and render the updated salary list
            fetchHSL();
        })
        .catch(error => console.error('Error creating he so luong:', error));
    } catch (error){
        return Console.log(error);
    }
    //chèn vào sau thì thay beforeend bằng afterbegin
    
}
function deleteHSL(id) {
    fetch(`https://localhost:44302/api/HeSos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Xóa thành công, cập nhật lại danh sách
          console.log('Xóa bản ghi thành công');
          fetchHSL(); // Sau khi xóa, gọi lại fetchLuong() để cập nhật lại danh sách
        } else {
          // Xóa không thành công, hiển thị thông báo lỗi
          return response.json().then(data => {
            console.error('Error deleting luong:', data.message);
          });
        }
      })
      .catch(error => console.error('Error deleting luong:', error));
}
function editHSL(id) {
    var item = {
        name: document.getElementById('chucvu1').value,
        heSo: document.getElementById('heso1').value
    };

    fetch(`https://localhost:44302/api/HeSos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                showErrorPopup(data.title);
            });
        }
        fetchHSL();
        renderHSL();
        return response.json()
    })
    .then(updatedItem => {
        var index = dsHeSoLuong.findIndex(obj => obj.id === id);
        dsHeSoLuong[index] = updatedItem; 
        fetchHSL(); 
    })
    .catch(error => console.error('Error editing he so luong:', error));
}

// Phúc lợi
var count_PL = 0;
var itemId_PL = "";
var dsPhucLoi = [];
async function fetchPL() {
    try{
        const response = await fetch('https://localhost:44302/api/PhucLois');
        const data = await response.json();
        dsPhucLoi = data;
        //await fetchLuong();
        await fetchHSL();
        renderPhucLoi();
        //initializeDataTable();
    }
    
        catch(error){ console.error('Error fetching Phuc Loi:', error);}

}
function getItemID_PL(id) {
    fetch(`https://localhost:44302/api/PhucLois/${id}`)
        .then(response => response.json())
        .then(item => {
            if (item) {
                itemId_PL = item.phucLoiId;
                document.getElementById('tenPhucLoi1').value = item.phucLoiType;
                document.getElementById('ndPhucLoi1').value = item.money;
            } else {
                console.error('Phuc Loi not found with ID:', id);
            }
        })
        .catch(error => console.error('Error fetching phuc loi by ID:', error));
}
function renderPhucLoi() {
    var listPhucLoiBlock = document.querySelector('.list-phucLoi tbody');
    var htmls = dsPhucLoi.map(function (PhucLoi) {
        count_PL++;
        return `
            <tr class="item-PL-${PhucLoi.phucLoiId}">
                <th>${PhucLoi.phucLoiId}</th>
                <td>${PhucLoi.phucLoiType}</td>
                <td>${PhucLoi.money}</td>

                <td><span onclick="getItemID_PL(${PhucLoi.phucLoiId})" class="btn btn-success btn1" data-bs-toggle="modal"
                        data-bs-target="#suaPhucLoi">Sửa</span> 
                    <span onclick="getItemID_PL(${PhucLoi.phucLoiId})" class="btn btn-danger btn1" data-bs-toggle="modal"
                        data-bs-target="#xoaPhucLoi">Xóa</span>
                </td>
            </tr>
        `;
    });
    listPhucLoiBlock.innerHTML = htmls.join('');
    //initializeDataTable();
}
// hienThi();
fetchPL();
function addPhucLoi() {
    var item = {
        phucLoiType: document.getElementById('tenPhucLoi').value,
        money: document.getElementById('ndPhucLoi').value
    };

    fetch('https://localhost:44302/api/PhucLois', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                showErrorPopup(data.title);
            });
        }
            return response.json();})
    .then(() => {
        fetchPL();
    })
    .catch(error => console.error('Error creating Phuc Loi:', error));
}
function deletePhucLoi(id) {
    fetch(`https://localhost:44302/api/PhucLois/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          console.log('Xóa bản ghi thành công');
          fetchPL(); 
        } else {
          return response.json().then(data => {
            console.error('Error deleting Pl:', data.message);
          });
        }
      })
      .catch(error => console.error('Error deleting Pl:', error));
}
function editPhucLoi(id) {
    var item = {
        phucLoiType: document.getElementById('tenPhucLoi1').value,
        money: document.getElementById('ndPhucLoi1').value
    };

    fetch(`https://localhost:44302/api/PhucLois/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                showErrorPopup(data.title);
            });
        }
            return response.json();
        })
    .then(updatedItem => {
        var index = dsPhucLoi.findIndex(obj => obj.phucLoiId === id);
        dsPhucLoi[index] = updatedItem;  
        fetchPL(); 
    })
    .catch(error => console.error('Error editing luong:', error));
}
function showErrorPopup(errorMessage) {

    document.getElementById("errorMessage1").textContent = errorMessage;
    document.getElementById("errorPopup1").style.display = "block";  
}

function closePopup() {
    document.getElementById("errorPopup1").style.display = "none";
}
function getThucLinh() {
    fetch('https://localhost:44302/api/UserSalary/Tong')
        .then(response => response.json())
        .then(data => {
            document.getElementById("totalCost").textContent= `đ ${data.tong.toLocaleString()}`;
            document.getElementById("monthly").textContent= `đ ${data.monthly.toLocaleString()}`;
            document.getElementById("yearly").textContent= `đ ${data.yearly.toLocaleString()}`;
            document.getElementById("ttl").textContent= `đ ${data.tongThucLinh.toLocaleString()}`;
            let ttlmonth = data.tongThucLinh / 12;
            document.getElementById("ttl-monthly").textContent= `đ ${ttlmonth.toLocaleString()}`;
            let ttlyear = data.tongThucLinh;
            document.getElementById("ttl-year").textContent= `đ ${ttlyear.toLocaleString()}`;
        })
        .catch(error => console.error('Error fetching Tong:', error));
}
